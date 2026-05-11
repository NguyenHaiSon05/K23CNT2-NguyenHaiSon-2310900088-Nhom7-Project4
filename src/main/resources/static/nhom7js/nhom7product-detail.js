async function nhom7LoadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    try {
        const response = await fetch(
            `${NHOM7_BASE_URL}/products/${productId}`
        );

        const product = await response.json();

        document.getElementById("nhom7-product-detail").innerHTML = `
            <div class="nhom7-detail-card">
                <div class="nhom7-detail-image">
                    <img src="/nhom7images/${product.image}" alt="${product.name}">
                </div>

                <div class="nhom7-detail-info">
                    <h1>${product.name}</h1>
                    <p><strong>Giá:</strong> ${product.price} VND</p>
                    <p><strong>Thành phần:</strong> ${product.ingredients}</p>
                    <p><strong>Mô tả:</strong> ${product.description}</p>
                    <p><strong>Tồn kho:</strong> ${product.stock}</p>

                    <button onclick="nhom7AddToCart()">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
    }
}
let nhom7CurrentProduct = null;

async function nhom7LoadProductDetail() {

    const params = new URLSearchParams(window.location.search);

    const productId = params.get("id");

    try {

        const response = await fetch(
            `${NHOM7_BASE_URL}/products/${productId}`
        );

        const product = await response.json();

        nhom7CurrentProduct = product;

        document.getElementById("nhom7-product-detail")
            .innerHTML = `
            <div class="nhom7-detail-card">

                <div class="nhom7-detail-image">
                    <img src="/nhom7images/${product.image}" alt="${product.name}">
                </div>

                <div class="nhom7-detail-info">

                    <h1>${product.name}</h1>

                    <p>
                        <strong>Giá:</strong>
                        ${product.price} VND
                    </p>

                    <p>
                        <strong>Thành phần:</strong>
                        ${product.ingredients}
                    </p>

                    <p>
                        <strong>Mô tả:</strong>
                        ${product.description}
                    </p>

                    <p>
                        <strong>Tồn kho:</strong>
                        ${product.stock}
                    </p>

                    <button onclick="nhom7AddToCart()">
                        Thêm vào giỏ hàng
                    </button>

                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
    }
}

function nhom7AddToCart() {

    let cart =
        JSON.parse(localStorage.getItem("nhom7-cart")) || [];

    cart.push(nhom7CurrentProduct);

    localStorage.setItem(
        "nhom7-cart",
        JSON.stringify(cart)
    );

    alert("Đã thêm vào giỏ hàng");

    window.location.href = "/nhom7cart.html";
}

nhom7LoadProductDetail();

nhom7LoadProductDetail();