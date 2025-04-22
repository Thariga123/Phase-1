let product = {
    name: "Laptop",
    price: 1000,
    category: "Electronics",
    inStock: true
  };
  
  let { name, price, category, inStock } = product;
  
  console.log("Product Name: " + name);
  console.log("Price: $" + price);
  console.log("Category: " + category);
  console.log("In Stock: " + (inStock ? "Yes" : "No"));
  
  function formatProductDetails({ name, price, category, inStock }) {
    return `Product Name: ${name}\nPrice: $${price}\nCategory: ${category}\nIn Stock: ${inStock ? "Yes" : "No"}`;
  }
  
  console.log(formatProductDetails(product));
  