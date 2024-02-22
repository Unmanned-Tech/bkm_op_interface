export function fetchDataByOption(option) {
  // Example data for different options
  const dataMap = {
    'БКМ-1': [
      { name: 'Уборка на тер. 2', time: '10:00', status: 'Выполнена', charge: '79%' },
      { name: 'Уборка на тер. N', time: '11:30', status: 'Ожидание', charge: '-' },
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

  return dataMap[option] || [];
}

export function fetchDataByOption1(option, searchQuery) {
  const dataMap1 = {
    'БКМ-1': [
      { time: '18.11.23, 08:37', robot: 'БКМ-1', type: '<i class="bi bi-exclamation-diamond"></i>', notification: 'Система навигации БКМ 1 потеряла сигнал' },
    ],
    'БКМ-2': [
      { time: '19.11.23, 10:41', robot: 'БКМ-2', type: '<i class="bi bi-info-circle"></i>', notification: 'Уборка района №1 завершена успешно' },
      { time: '11.12.23, 13:24', robot: 'БКМ-2', type: '<i class="bi bi-exclamation-triangle"></i>', notification: 'Уровень заряда батареи БКМ 2 ниже 20%' },
      { time: '11.12.23, 20:32', robot: 'БКМ-2', type: '<i class="bi bi-exclamation-diamond"></i>', notification: 'Система обнаружения препятствий БКМ 2 не функционирует' },
    ],
    'БКМ-3': [
      { time: '19.11.23, 12:32', robot: 'БКМ-3', type: '<i class="bi bi-check-circle"></i>', notification: 'БКМ 3 вернулась на базу для плановой зарядки' },
      { time: '11.12.23, 09:41', robot: 'БКМ-3', type: '<i class="bi bi-info-circle"></i>', notification: 'Начало рабочего цикла по маршруту №5' },
    ],
    
  };
  if (option === "Все") {
    const allData = Object.values(dataMap1).flat();
    return filterData(allData, searchQuery);
  } 
  const specificData = dataMap1[option] || [];
  return filterData(specificData, searchQuery); 
}

function filterData(data, searchQuery) {
  if(!searchQuery) {
    return data.map(item => ({ ...item, list: item.robot }));
  }

  return data.filter(item => 
    item.notification.toLowerCase().includes(searchQuery.toLowerCase())
  ).map(item => ({ ...item, list: item.robot }));
}
