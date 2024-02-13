// your-data-fetching-file.js

export function fetchDataByOption(option) {
  // Example data for different options
  const dataMap = {
    'БКМ-1': [
      { name: 'Уборка на тер. 2', time: '10:00', status: 'Выполнена', charge: '79%' },
      { name: 'Уборка на тер. N', time: '11:30', status: 'Ожидание', charge: '80%' },
      // Add more tasks for 'БКМ-1' option
    ],
    'БКМ-2': [
      { name: 'Задача 2', time: '11:30', status: 'Выполнена', charge: '76%' },
      // Add more tasks for 'БКМ-2' option
    ],
    'БКМ-3': [
      { name: 'Задача 3', time: '09:45', status: 'Ожидание', charge: '60%' },
      // Add more tasks for 'БКМ-3' option
    ],
  };

  return dataMap[option] || [];
}
