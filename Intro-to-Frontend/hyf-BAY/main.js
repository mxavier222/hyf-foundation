const products = getAvailableProducts();

const productList = document.querySelector("#products-list");

function renderProducts(products) {
  productList.innerHTML = "";

  for (const product of products) {
    const li = document.createElement("li");

    li.innerHTML = `
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>Rating: * ${product.rating}</p>
        `;

    productList.appendChild(li);
  }
}

renderProducts(products);
