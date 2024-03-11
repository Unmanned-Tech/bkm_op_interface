#!/bin/bash

# Флаг для проверки выполнения скрипта
script_executed=false

# Обработчик сигнала прерывания
cleanup() {
    echo "Received Ctrl+C. Cleaning up..."
    
    if [ "$script_executed" = true ]; then
        bash ~/stop_all.sh
    fi

    # Завершаем выполнение текущего скрипта
    exit 0
}

# Назначаем обработчик сигнала прерывания
trap cleanup INT

# Ваши команды
cd ~
~/PS5-Camera-Firmware-Loader/cpp/ps5_camera_firmware_loader /home/kam3do/Downloads/21.01-03.20.00.04-00.00.00.bin

v4l2-ctl -d /dev/v4l/by-id/usb-Omnivision_Technologies__Inc._USB_Camera-OV580-video-index0 --set-ctrl=auto_exposure=0

sudo systemctl enable ustreamer-ps5.service
sudo systemctl start ustreamer-ps5.service

cd ~/bkm_op_interface
screen -S npm-dev -dm bash -c 'npm run dev'

cd ~

screen -S rosbridge -dm bash -c 'ros2 launch rosbridge_server rosbridge_websocket_launch.xml' 

screen -S transport -dm bash -c 'ros2 run image_transport republish raw in:=/depth'

cd ~/ros2_ws/src/sipeed_tof_ms_a010_ros/ros2
source ~/.bashrc
source install/setup.sh

echo "Press Ctrl+C, to exit"

ros2 run sipeed_tof_ms_a010 publisher



# Устанавливаем флаг в true после выполнения скрипта
script_executed=true

# Ожидание сигнала прерывания
while true; do
    sleep 1
done
