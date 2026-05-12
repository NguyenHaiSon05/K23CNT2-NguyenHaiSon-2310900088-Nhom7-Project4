function nhom7LoadCart() {

    const cart =
        JSON.parse(localStorage.getItem("nhom7-cart"))
        || [];

    const container =
        document.getElementById("nhom7-cart-list");

    let total = 0;

    let html = "";

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        html += `

        <div class="nhom7-cart-item">

            <div class="nhom7-cart-left">

                <img
                    src="/nhom7images/${item.image}"
                    alt="${item.name}"
                >

                <div class="nhom7-cart-info">

                    <h3>${item.name}</h3>

                    <p class="nhom7-cart-price">
                        ${item.price} VND
                    </p>

                    <button
                        onclick="nhom7RemoveItem(${index})"
                        class="nhom7-remove-btn"
                    >
                        Xóa
                    </button>

                </div>

            </div>

            <div class="nhom7-quantity-box">

                <button onclick="nhom7Decrease(${index})">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="nhom7Increase(${index})">
                    +
                </button>

            </div>

        </div>

        `;
    });

    container.innerHTML = html;

    document.getElementById("nhom7-total-price")
        .innerText =
        `Tổng tiền: ${total.toLocaleString()} VND`;
}

function nhom7Increase(index){

    let cart =
        JSON.parse(localStorage.getItem("nhom7-cart"));

    cart[index].quantity++;

    localStorage.setItem(
        "nhom7-cart",
        JSON.stringify(cart)
    );

    nhom7LoadCart();
}

function nhom7Decrease(index){

    let cart =
        JSON.parse(localStorage.getItem("nhom7-cart"));

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);
    }

    localStorage.setItem(
        "nhom7-cart",
        JSON.stringify(cart)
    );

    nhom7LoadCart();
}

function nhom7RemoveItem(index){

    let cart =
        JSON.parse(localStorage.getItem("nhom7-cart"));

    cart.splice(index,1);

    localStorage.setItem(
        "nhom7-cart",
        JSON.stringify(cart)
    );

    nhom7LoadCart();
}

nhom7LoadCart();