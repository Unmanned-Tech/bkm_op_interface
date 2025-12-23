<template>
    <button 
        id="unlockBtn" 
        @click="sendUnblockCommand()" 
        class="safety-unlock" 
        :class="buttonClass"
        :disabled="isProcessing"
    >
        <span v-if="isProcessing" class="processing-spinner">
            <i class="bi bi-arrow-clockwise"></i>
        </span>
        Приводы {{ safetyState === "unlocked" ? "разблокированы" : "заблокированы" }}
    </button>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRosStore } from "@/stores/ConfigStore";
import ROSLIB from "roslib";

export default {
    name: "SafetyUnlockButton",
    
    props: {
        // Дополнительные классы для кнопки
        customClass: {
            type: String,
            default: ""
        },
        // Показывать время последнего действия
        showLastAction: {
            type: Boolean,
            default: true
        }
    },
    
    emits: ['unlock-success', 'unlock-error', 'state-changed'],
    
    setup(props, { emit }) {
        const rosStore = useRosStore();
        const safetyState = ref(null);
        const isProcessing = ref(false);
        const lastActionTime = ref(null);
        const lastError = ref(null);
        
        let safetyStateTopic = null;
        let retryInterval = null;
        let retryCount = 0;
        const MAX_RETRIES = 3;

        // Вычисляемый класс для кнопки
        const buttonClass = computed(() => {
            const baseClass = getButtonClass(safetyState.value);
            return props.customClass ? `${baseClass} ${props.customClass}` : baseClass;
        });

        // Получаем цвет/класс кнопки в зависимости от состояния
        const getButtonClass = (status) => {
            if (status === "locked") return "lock";
            if (status === "unlocked") return "unlock";
            return "unknown";
        };

        // Парсим сообщение о состоянии
        const parseStatusMessage = (status) => {
            if (!status) return "unknown";
            
            if (status.includes("F_STATUS_INIT_LOCK") ||
                status.includes("F_STATUS_SW_LOCK") ||
                status.includes("F_STATUS_HW_LOCK") ||
                status.includes("F_STATUS_NOCON_LOCK")) {
                return "locked";
            } else if (status.includes("F_STATUS_NORMAL") || status.includes("F_STATUS_NORMAL_INH")) {
                return "unlocked";
            } else {
                return "unknown";
            }
        };

        // Подписываемся на топик состояния безопасности
        const subscribeToSafetyState = () => {
            if (!rosStore.ros) {
                console.warn("No ROS connection, will retry...");
                scheduleRetry();
                return;
            }

            try {
                safetyStateTopic = new ROSLIB.Topic({
                    ros: rosStore.ros,
                    name: "/safety/status",
                    messageType: "std_msgs/msg/String",
                    queue_size: 10
                });

                safetyStateTopic.subscribe((msg) => {
                    const newState = parseStatusMessage(msg.data);
                    if (safetyState.value !== newState) {
                        safetyState.value = newState;
                        lastActionTime.value = new Date();
                        emit('state-changed', newState);
                    }
                });

                // Очищаем ретраи при успешной подписке
                if (retryInterval) {
                    clearInterval(retryInterval);
                    retryInterval = null;
                }
                retryCount = 0;

            } catch (error) {
                console.error("Error subscribing to safety state:", error);
                scheduleRetry();
            }
        };

        // Планируем повторную попытку подключения
        const scheduleRetry = () => {
            if (retryCount >= MAX_RETRIES) {
                console.error("Max retries reached for safety subscription");
                return;
            }

            if (!retryInterval) {
                retryInterval = setInterval(() => {
                    retryCount++;
                    console.log(`Retrying safety subscription (attempt ${retryCount})`);
                    subscribeToSafetyState();
                }, 3000);
            }
        };

        // Отправляем команду разблокировки
        const sendUnblockCommand = async () => {
            if (!rosStore.ros) {
                lastError.value = "Нет подключения к ROS";
                emit('unlock-error', lastError.value);
                return;
            }

            if (isProcessing.value) return;

            isProcessing.value = true;
            lastError.value = null;

            try {
                const unlockService = new ROSLIB.Service({
                    ros: rosStore.ros,
                    name: "/safety/unlock",
                    serviceType: "std_srvs/srv/Trigger"
                });

                const request = new ROSLIB.ServiceRequest({});
                
                unlockService.callService(request, (response) => {
                    isProcessing.value = false;
                    
                    if (response.success) {
                        lastActionTime.value = new Date();
                        emit('unlock-success', response);
                        console.debug("Safety unlock successful:", response.message);
                    } else {
                        lastError.value = response.message || "Неизвестная ошибка";
                        emit('unlock-error', lastError.value);
                        console.error("Safety unlock failed:", response.message);
                    }
                });

                // Таймаут на случай, если сервис не ответит
                setTimeout(() => {
                    if (isProcessing.value) {
                        isProcessing.value = false;
                        lastError.value = "Таймаут ожидания ответа";
                        emit('unlock-error', lastError.value);
                    }
                }, 5000);

            } catch (error) {
                isProcessing.value = false;
                lastError.value = error.message;
                emit('unlock-error', error.message);
                console.error("Error calling safety service:", error);
            }
        };

        // Форматируем время последнего действия
        const formatLastAction = () => {
            if (!lastActionTime.value) return "";
            
            const now = new Date();
            const diffMs = now - lastActionTime.value;
            const diffMins = Math.floor(diffMs / 60000);
            
            if (diffMins < 1) return "только что";
            if (diffMins === 1) return "1 мин назад";
            if (diffMins < 60) return `${diffMins} мин назад`;
            
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours === 1) return "1 час назад";
            if (diffHours < 24) return `${diffHours} час назад`;
            
            const diffDays = Math.floor(diffHours / 24);
            if (diffDays === 1) return "1 день назад";
            return `${diffDays} дней назад`;
        };

        // Получаем текущее состояние (публичный метод)
        const getCurrentState = () => {
            return {
                state: safetyState.value,
                lastAction: lastActionTime.value,
                lastError: lastError.value,
                isProcessing: isProcessing.value
            };
        };

        // Принудительно обновляем состояние
        const refreshState = () => {
            if (safetyStateTopic) {
                safetyStateTopic.unsubscribe();
            }
            subscribeToSafetyState();
        };

        onMounted(() => {
            subscribeToSafetyState();
        });

        onUnmounted(() => {
            if (safetyStateTopic) {
                safetyStateTopic.unsubscribe();
            }
            if (retryInterval) {
                clearInterval(retryInterval);
            }
        });

        return {
            safetyState,
            isProcessing,
            lastActionTime,
            lastError,
            buttonClass,
            sendUnblockCommand,
            formatLastAction,
            getCurrentState,
            refreshState
        };
    }
};
</script>

<style scoped>
.safety-unlock {
    padding: .75rem 1.5rem;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    border: 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 250px;
    position: relative;
    overflow: hidden;
}

.safety-unlock:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.safety-unlock:active {
    transform: translateY(0);
    filter: brightness(0.9);
}

.safety-unlock:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
}

/* Состояния кнопки */
.lock {
    background-color: color-mix(in srgb, var(--p-red-950) 30%, transparent);
    color: var(--p-red-500);
    border-color: var(--p-red-900);
}

.lock:hover:not(:disabled) {
    background-color: color-mix(in srgb, var(--p-red-950) 40%, transparent);
    border-color: var(--p-red-700);
}

.unlock {
    background-color: var(--p-green-950);
    color: var(--p-emerald-400);
    border-color: var(--p-emerald-900);
}

.unlock:hover:not(:disabled) {
    background-color: color-mix(in srgb, var(--p-green-950) 90%, var(--p-emerald-950));
    border-color: var(--p-emerald-700);
}

.unknown {
    background-color: color-mix(in srgb, var(--grey6) 80%, transparent);
    color: var(--grey3);
    border-color: var(--grey5);
}

/* Спиннер обработки */
.processing-spinner {
    display: inline-flex;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Время последнего действия */
.last-action {
    font-size: 0.85rem;
    opacity: 0.8;
    font-weight: normal;
}

/* Индикатор состояния (точка) */
.safety-unlock::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
}

.lock::before {
    background-color: var(--p-red-500);
    box-shadow: 0 0 8px var(--p-red-500);
}

.unlock::before {
    background-color: var(--p-emerald-500);
    box-shadow: 0 0 8px var(--p-emerald-500);
}

.unknown::before {
    background-color: var(--grey3);
}

/* Анимация пульсации для locked состояния */
@keyframes pulse-lock {
    0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

.lock {
    animation: pulse-lock 2s infinite;
}

/* Адаптивность */
@media screen and (max-width: 768px) {
    .safety-unlock {
        min-width: auto;
        width: 100%;
        margin: 0.5rem 0;
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
    }
    
    .last-action {
        display: none;
    }
}

/* Темная/светлая тема */
@media (prefers-color-scheme: light) {
    .lock {
        background-color: color-mix(in srgb, var(--p-red-100) 30%, white);
        color: var(--p-red-700);
    }
    
    .unlock {
        background-color: color-mix(in srgb, var(--p-green-100) 30%, white);
        color: var(--p-green-700);
    }
}
</style>