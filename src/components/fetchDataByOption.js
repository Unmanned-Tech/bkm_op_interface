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
