export function fetchDataByOption(option) {
  // Example data for different options
  const dataMap = {
    'БКМ-1': [
      { name: 'Уборка на тер. 2', time: '10:00', status: 'Выполнена', charge: '79%' },
      { name: 'Уборка на тер. N', time: '11:30', status: 'Ожидание', charge: '20%' },
      // Add more tasks for 'БКМ-1' option
    ],
    'БКМ-2': [
      { name: 'Уборка на тер. X', time: '11:30', status: 'Выполняется', charge: '42%' },
      { name: 'Уборка на тер. M', time: '11:30', status: 'Ожидание', charge: '-' },
      // Add more tasks for 'БКМ-2' option
    ],
    'БКМ-3': [
      { name: 'Подзарядка', time: '09:45', status: 'Выполняется', charge: '17%' },
      // Add more tasks for 'БКМ-3' option
    ],
  };

  return dataMap[option] || ['БКМ-1'];
}

export function fetchDataByOption1(option, searchQuery, selectedStatus) {
  const dataMap1 = {
    'БКМ-1': [
      { time: '18.11.23, 08:37', robot: 'БКМ-1', type: '<i class="bi bi-exclamation-diamond"></i>', notification: 'Система навигации БКМ 1 потеряла сигнал', status: 'Крит' },
    ],
    'БКМ-2': [
      { time: '19.11.23, 10:41', robot: 'БКМ-2', type: '<i class="bi bi-info-circle"></i>', notification: 'Уборка района №1 завершена успешно', status: 'Инф' },
      { time: '11.12.23, 13:24', robot: 'БКМ-2', type: '<i class="bi bi-exclamation-triangle"></i>', notification: 'Уровень заряда батареи БКМ 2 ниже 20%', status: 'Пред' },
      { time: '11.12.23, 20:32', robot: 'БКМ-2', type: '<i class="bi bi-exclamation-diamond"></i>', notification: 'Система обнаружения препятствий БКМ 2 не функционирует', status: 'Крит' },
    ],
    'БКМ-3': [
      { time: '19.11.23, 12:32', robot: 'БКМ-3', type: '<i class="bi bi-check-circle"></i>', notification: 'БКМ 3 вернулась на базу для плановой зарядки', status: 'Сист' },
      { time: '11.12.23, 09:41', robot: 'БКМ-3', type: '<i class="bi bi-info-circle"></i>', notification: 'Начало рабочего цикла по маршруту №5', status: 'Инф' },
    ],
    
  };
  let filteredData = [];

  if (option === "Все") {
    filteredData = Object.values(dataMap1).flat();
  } else {
    filteredData = dataMap1[option] || [];
  }

  if (selectedStatus) {
    filteredData = filteredData.filter(item => item.status === selectedStatus);
  }

  if (searchQuery) {
    filteredData = filteredData.filter(item => 
      item.notification.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filteredData.map(item => ({ ...item, list: item.robot }));

}
