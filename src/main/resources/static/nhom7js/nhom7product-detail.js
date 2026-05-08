async function nhom7LoadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const response = await fetch(
        `${NHOM7_BASE_URL}/products/${productId}`
    );

    const product = await response.json();

    document.getElementById("nhom7-product-detail").innerHTML = `
        <img src="/nhom7images/${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price} VND</p>
    `;
}

nhom7LoadProductDetail();