export function fetchData(callback) {
    
    setTimeout(() => {
      const mockData = [
        { id: 1, name: 'Thariga' },
        { id: 2, name: 'Teju' },
        { id: 3, name: 'Dhanu' }
      ];
      callback(mockData);
    }, 2000); 
  }
  