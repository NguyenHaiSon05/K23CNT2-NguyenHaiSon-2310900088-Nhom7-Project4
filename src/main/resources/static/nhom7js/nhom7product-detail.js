let nhom7CurrentProduct = null;

async function nhom7LoadProductDetail() {

    const params =
        new URLSearchParams(window.location.search);

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

                    <img
                        src="/nhom7images/${product.image}"
                        alt="${product.name}"
                    >

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

    const username =
        localStorage.getItem("nhom7_username");

    // CHƯA LOGIN
    if(!username){

        alert("Vui lòng đăng nhập");

        window.location.href =
            "/nhom7login.html";

        return;
    }

    // ĐÃ LOGIN
    let cart =
        JSON.parse(localStorage.getItem("nhom7-cart"))
        || [];

    const existingProduct = cart.find(
        item => item.id === nhom7CurrentProduct.id
    );

    if(existingProduct){

        existingProduct.quantity++;

    }else{

        nhom7CurrentProduct.quantity = 1;

        cart.push(nhom7CurrentProduct);
    }

    localStorage.setItem(
        "nhom7-cart",
        JSON.stringify(cart)
    );

    alert("Đã thêm vào giỏ hàng");

    window.location.href =
        "/nhom7cart.html";
}

nhom7LoadProductDetail();