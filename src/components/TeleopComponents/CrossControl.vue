<template>
    <div class="cross-control">
        <div class="control-header">
            <div class="header-icon">
                <i class="bi bi-arrows-move"></i>
            </div>
            <h3 class="header-title">Управление щеткой</h3>
        </div>

        <div class="cross-container">
            <!-- Верхняя стрелка (вверх) -->
            <button 
                class="cross-btn up"
                :class="{ 'active': activeButton === 3 }"
                @mousedown="startCommand(3)"
                @mouseup="stopCommand"
                @touchstart.prevent="startCommand(3)"
                @touchend.prevent="stopCommand"
            >
                <i class="bi bi-chevron-up"></i>
            </button>
            
            <!-- Левая стрелка (влево) -->
            <button 
                class="cross-btn left"
                :class="{ 'active': activeButton === 1 }"
                @mousedown="startCommand(1)"
                @mouseup="stopCommand"
                @touchstart.prevent="startCommand(1)"
                @touchend.prevent="stopCommand"
            >
                <i class="bi bi-chevron-left"></i>
            </button>
            
            <!-- Центральная кнопка -->
            <!-- <div class="center-btn">
                <div class="center-icon">
                    <i class="bi bi-circle-fill"></i>
                </div>
            </div> -->
            
            <!-- Правая стрелка (вправо) -->
            <button 
                class="cross-btn right"
                :class="{ 'active': activeButton === 2 }"
                @mousedown="startCommand(2)"
                @mouseup="stopCommand"
                @touchstart.prevent="startCommand(2)"
                @touchend.prevent="stopCommand"
            >
                <i class="bi bi-chevron-right"></i>
            </button>
            
            <!-- Нижняя стрелка (вниз) -->
            <button 
                class="cross-btn down"
                :class="{ 'active': activeButton === 4 }"
                @mousedown="startCommand(4)"
                @mouseup="stopCommand"
                @touchstart.prevent="startCommand(4)"
                @touchend.prevent="stopCommand"
            >
                <i class="bi bi-chevron-down"></i>
            </button>
        </div>
    </div>
</template>

<script>
import { ref, onUnmounted } from "vue";

export default {
    name: 'CrossControl',
    props: {
        sendInterval: {
            type: Number,
            default: 200
        }
    },
    emits: ['command-start', 'command-stop'],
    setup(props, { emit }) {
        const activeButton = ref(null);
        const isSendingCommand = ref(false);
        let commandInterval = null;

        const startCommand = (command) => {
            if (commandInterval) {
                clearInterval(commandInterval);
                commandInterval = null;
            }
            
            activeButton.value = command;
            isSendingCommand.value = true;
            
            emit('command-start', command);
            
            commandInterval = setInterval(() => {
                emit('command-start', command);
            }, props.sendInterval);
        };

        const stopCommand = () => {
            if (commandInterval) {
                clearInterval(commandInterval);
                commandInterval = null;
            }
            
            if (activeButton.value) {
                emit('command-stop', activeButton.value);
                activeButton.value = null;
                isSendingCommand.value = false;
            }
        };

        onUnmounted(() => {
            if (commandInterval) {
                clearInterval(commandInterval);
            }
        });

        return {
            activeButton,
            isSendingCommand,
            startCommand,
            stopCommand
        };
    }
};
</script>

<style scoped>
.cross-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    background: var(--card-bg);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 200px;
    /* transform: scale(0.85); */
    /* transform-origin: center; */
}

.control-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    width: 100%;
}

.header-icon {
    width: 32px;
    height: 32px;
    background: var(--primary-color);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
}

.header-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
}

.cross-container {
    width: 136px;
    height: 136px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 4px;
}

.cross-btn {
    border: none;
    border-radius: 8px;
    background: var(--surface-color);
    color: var(--text-color);
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    user-select: none;
    touch-action: manipulation;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--border-color);
}

.cross-btn:hover {
    background: var(--surface-dark);
}

.cross-btn.active {
    background: var(--primary-color);
    color: white;
    transform: translateY(0);
    border-color: var(--primary-color);
}

.cross-btn:active {
    transform: scale(0.98);
}

/* Расположение кнопок */
.up {
    grid-column: 2;
    grid-row: 1;
}

.left {
    grid-column: 1;
    grid-row: 2;
}

.right {
    grid-column: 3;
    grid-row: 2;
}

.down {
    grid-column: 2;
    grid-row: 3;
}

.center-btn {
    grid-column: 2;
    grid-row: 2;
    display: flex;
    align-items: center;
    justify-content: center;
}

.center-icon {
    width: 34px;
    height: 34px;
    background: var(--secondary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
}

.status-container {
    width: 100%;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    background: var(--surface-color);
    border-radius: 8px;
    border: 1px solid var(--border-color);
    transition: all 0.2s ease;
}

.status-indicator.active {
    background: rgba(var(--primary-color-rgb), 0.1);
    border-color: var(--primary-color);
}

.status-icon {
    width: 28px;
    height: 28px;
    background: var(--surface-dark);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: var(--primary-color);
}

.status-indicator.active .status-icon {
    background: var(--primary-color);
    color: white;
}

.status-text {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-color);
}

/* Для мобильных устройств */
@media (max-width: 768px) {
    .cross-control {
        padding: 8px;
        min-width: 180px;
    }
    
    .cross-container {
        width: 119px;
        height: 119px;
        gap: 3px;
    }
    
    .center-icon {
        width: 36px;
        height: 36px;
        font-size: 1.1rem;
    }
    
    .cross-btn {
        font-size: 1.3rem;
        border-radius: 6px;
    }
    
    .header-icon {
        width: 28px;
        height: 28px;
        font-size: 0.9rem;
    }
    
    .header-title {
        font-size: 0.9rem;
    }
    
    .status-icon {
        width: 24px;
        height: 24px;
        font-size: 0.9rem;
    }
    
    .status-text {
        font-size: 0.85rem;
    }
}

@media (max-width: 480px) {
    .cross-control {
        padding: 6px;
        min-width: 160px;
    }
    
    .cross-container {
        width: 102px;
        height: 102px;
        gap: 2px;
    }
    
    .center-icon {
        width: 32px;
        height: 32px;
        font-size: 1rem;
    }
    
    .cross-btn {
        font-size: 1.1rem;
        border-radius: 5px;
    }
    
    .control-header {
        gap: 6px;
        margin-bottom: 12px;
    }
    
    .header-icon {
        width: 24px;
        height: 24px;
        font-size: 0.8rem;
    }
    
    .header-title {
        font-size: 0.85rem;
    }
}

/* Для очень узких экранов */
@media (max-width: 360px) {
    .cross-control {
        min-width: 140px;
        padding: 4px;
    }
    
    .cross-container {
        width: 110px;
        height: 110px;
    }
    
    .center-icon {
        width: 28px;
        height: 28px;
    }
}

/* Переменные для цветов (если не определены в родительском компоненте) */
:root {
    --card-bg: #ffffff;
    --surface-color: #f5f5f5;
    --surface-dark: #e0e0e0;
    --border-color: #ddd;
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --text-color: #333;
    --primary-color-rgb: 0, 123, 255;
}

@media (prefers-color-scheme: dark) {
    :root {
        --card-bg: #2a2a2a;
        --surface-color: #3a3a3a;
        --surface-dark: #4a4a4a;
        --border-color: #444;
        --primary-color: #0d6efd;
        --secondary-color: #5a6268;
        --text-color: #f0f0f0;
    }
}
</style>