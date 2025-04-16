export function fetchDataPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockData = [
          { id: 1, name: 'Thariga' },
          { id: 2, name: 'Teju' },
          { id: 3, name: 'Dhanu' }
        ];
  
       
        resolve(mockData);
        
      }, 2000); 
    });
  }
  