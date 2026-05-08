async function nhom7LoadProducts() {
    try {
        const response = await fetch(`${NHOM7_BASE_URL}/products`);
        const products = await response.json();

        nhom7RenderProducts(products);
    } catch (error) {
        console.error(error);
    }
}

function nhom7RenderProducts(products) {
    const container =
        document.getElementById("nhom7-product-list");

    let html = "";

    products.forEach(product => {
        html += `
            <div class="nhom7-product-card">
                <img src="/nhom7images/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price} VND</p>

                <a href="/nhom7product-detail.html?id=${product.id}">
                    Xem chi tiết
                </a>
            </div>
        `;
    });

    container.innerHTML = html;
}

nhom7LoadProducts();