const items = Array.from({ length: 10000 }, (_, index) => ({
    name: `Item ${index + 1}`,
    description: `This is a description of item ${index + 1}.`,
  }));
  
  export default items;
  