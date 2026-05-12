let nhom7AllProducts = [];
async function nhom7LoadProducts() {
    try {
        const response = await fetch(`${NHOM7_BASE_URL}/products`);
        const products = await response.json();
        nhom7AllProducts = products;

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

            <div class="nhom7-product-image">

                <img
                    src="/nhom7images/${product.image}"
                    alt="${product.name}"
                >

                <span class="nhom7-sale-badge">
                    -20%
                </span>

            </div>

            <div class="nhom7-product-info">

                <span class="nhom7-brand">
                    SKINCARE
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="nhom7-price-box">

                    <span class="nhom7-price">
                        ${product.price}đ
                    </span>

                    <span class="nhom7-old-price">
                        500000đ
                    </span>

                </div>

                <p class="nhom7-freeship">
                    FREESHIP TỪ 99K
                </p>

                <div class="nhom7-product-bottom">

                    <span class="nhom7-sold">
                        🔥 Bán chạy
                    </span>

                    <a href="/nhom7product-detail.html?id=${product.id}">
                        +
                    </a>

                </div>

            </div>

        </div>

        `;
    });

    container.innerHTML = html;
}
function nhom7FilterCategory(categoryName){

    const filteredProducts =
        nhom7AllProducts.filter(product => {

            return product.category.name === categoryName;
        });

    nhom7RenderProducts(filteredProducts);
}

nhom7LoadProducts();