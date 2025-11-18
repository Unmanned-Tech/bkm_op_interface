import { ref, onUnmounted } from "vue";

export function useMicrophone() {
    const micStream = ref(null);
    const micPC = ref(null);
    const micTrack = ref(null);
    const isMicActive = ref(false);
    const micConnectionTimeout = ref(null);
    const micNotification = ref({
        show: false,
        type: '', // 'connecting', 'connected', 'error'
        message: ''
    });

    // Показать уведомление
    const showMicNotification = (type, message) => {
        micNotification.value = {
            show: true,
            type: type,
            message: message
        };
    };

    // Скрыть уведомление
    const hideMicNotification = () => {
        micNotification.value.show = false;
    };

    // Очистка таймера
    const clearMicTimeout = () => {
        if (micConnectionTimeout.value) {
            clearTimeout(micConnectionTimeout.value);
            micConnectionTimeout.value = null;
        }
    };

    // Полная очистка микрофона
    const cleanupMic = () => {
        clearMicTimeout();
        
        if (micStream.value) {
            console.log("Stopping microphone tracks...");
            micStream.value.getTracks().forEach(track => {
                track.stop();
                console.log("Stopped track:", track.kind);
            });
            micStream.value = null;
        }
        
        if (micPC.value) {
            console.log("Closing PeerConnection...");
            micPC.value.close();
            micPC.value = null;
        }
        
        micTrack.value = null;
        isMicActive.value = false;
        console.debug("Микрофон полностью отключен");
    };

    // Включение передачи звука (только трек)
    const enableMicTrack = () => {
        if (!micPC.value || !micTrack.value) return;

        micTrack.value.enabled = true;
        isMicActive.value = true;
        
        // Сбрасываем таймер отключения при активации
        clearMicTimeout();
        
        console.debug("Аудиотрек микрофона включен");
    };

    // Отключение звука без разрыва соединения
    const disableMicTrack = () => {
        if (!micPC.value || !micTrack.value) return;

        micTrack.value.enabled = false;
        isMicActive.value = false;
        
        console.debug("Аудиотрек микрофона отключен");

        // Ставим таймер на полное отключение через 60 секунд
        clearMicTimeout();
        micConnectionTimeout.value = setTimeout(() => {
            console.log("Таймаут неактивности: закрытие соединения");
            cleanupMic();
            showMicNotification('connected', 'Соединение закрыто по таймауту');
            
            // Автоматически скрываем уведомление через 3 секунды
            setTimeout(() => {
                hideMicNotification();
            }, 3000);
        }, 5 * 60 * 1000); // 5 минут
    };

    // Включение микрофона через WebRTC
    const startMic = async () => {
        // Если соединение уже активно и трек включен, ничего не делаем
        if (isMicActive.value && micPC.value && micPC.value.connectionState === 'connected' && micTrack.value && micTrack.value.enabled) {
            showMicNotification('connected', 'Микрофон уже активен');
            clearMicTimeout(); // Сбрасываем таймер отключения
            return;
        }

        // Если есть активное соединение, но трек отключен - просто включаем трек
        if (micPC.value && micPC.value.connectionState === 'connected' && micTrack.value) {
            enableMicTrack();
            showMicNotification('connected', 'Микрофон подключен');
            return;
        }

        // Если соединение устанавливается, ничего не делаем
        if (micNotification.value.type === 'connecting') {
            return;
        }

        try {
            console.debug("Активация микрофона через WebRTC");
            showMicNotification('connecting', 'Соединение устанавливается...');

            // Если есть старое соединение, закрываем его
            if (micPC.value) {
                cleanupMic();
            }

            // Создаем новое PeerConnection
            micPC.value = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
            });

            // Захватываем микрофон
            micStream.value = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                } 
            });

            console.log("Microphone access granted, tracks:", micStream.value.getTracks().length);

            // Сохраняем ссылку на аудиотрек
            micTrack.value = micStream.value.getAudioTracks()[0];
            
            // Изначально отключаем трек (включается только при явном вызове enableMicTrack)
            micTrack.value.enabled = false;

            // Добавляем треки в соединение
            for (const track of micStream.value.getTracks()) {
                micPC.value.addTrack(track, micStream.value);
            }

            // Создаем offer
            const offer = await micPC.value.createOffer();
            await micPC.value.setLocalDescription(offer);

            // Отправляем offer на go2rtc
            const res = await fetch("https://192.168.2.111:1265/api/webrtc?dst=mic", {
                method: "POST",
                body: offer.sdp,
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const answerSDP = await res.text();

            // Принимаем ответ
            await micPC.value.setRemoteDescription({
                type: "answer",
                sdp: answerSDP,
            });

            return new Promise((resolve, reject) => {
                const onConnectionStateChange = () => {
                    console.log("PeerConnection state changed:", micPC.value.connectionState);
                    if (micPC.value.connectionState === 'connected') {
                        micPC.value.onconnectionstatechange = null;
                        
                        // Включаем трек после успешного подключения
                        enableMicTrack();
                        showMicNotification('connected', 'Микрофон подключен');
                        resolve();
                    } else if (micPC.value.connectionState === 'failed') {
                        micPC.value.onconnectionstatechange = null;
                        showMicNotification('error', 'Ошибка подключения');
                        reject(new Error('Connection failed'));
                    }
                };

                micPC.value.onconnectionstatechange = onConnectionStateChange;

                setTimeout(() => {
                    if (micPC.value.connectionState !== 'connected') {
                        micPC.value.onconnectionstatechange = null;
                        showMicNotification('error', 'Таймаут подключения');
                        reject(new Error('Connection timeout'));
                    }
                }, 10000); // 10 секунд таймаут
            });

        } catch (error) {
            console.error("Ошибка при подключении микрофона:", error);
            showMicNotification('error', 'Ошибка подключения микрофона');
            cleanupMic();

            // Автоматически скрываем ошибку через 3 секунды
            setTimeout(() => {
                hideMicNotification();
            }, 3000);
        }
    };

    // Выключение микрофона - отключаем только трек, не разрывая соединение
    const stopMic = () => {
        console.log("Disabling microphone track...");
        hideMicNotification();
        
        if (micTrack.value && micPC.value && micPC.value.connectionState === 'connected') {
            // Отключаем только трек, оставляя соединение активным
            disableMicTrack();
        } else {
            // Если нет активного соединения или трека, выполняем полную очистку
            console.log("No active connection, performing full cleanup");
            cleanupMic();
        }
    };

    // Принудительное полное отключение (для случаев, когда нужно сразу разорвать соединение)
    const forceStopMic = () => {
        console.log("Forcing microphone stop...");
        hideMicNotification();
        cleanupMic();
    };

    // При размонтировании компонента очищаем ресурсы
    onUnmounted(() => {
        cleanupMic();
        clearMicTimeout();
    });

    return {
        micNotification,
        isMicActive,
        startMic,
        stopMic,
        forceStopMic,
        hideMicNotification,
        cleanupMic
    };
}