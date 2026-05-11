function nhom7LoadCart() {

    const cart =
        JSON.parse(localStorage.getItem("nhom7-cart")) || [];

    const container =
        document.getElementById("nhom7-cart-list");

    let total = 0;

    let html = "";

    cart.forEach(item => {

        total += item.price;

        html += `
            <div class="nhom7-cart-card">

                <img src="/nhom7images/${item.image}" alt="${item.name}">

                <div>
                    <h3>${item.name}</h3>
                    <p>${item.price} VND</p>
                </div>

            </div>
        `;
    });

    container.innerHTML = html;

    document.getElementById("nhom7-total-price")
        .innerText = `Tổng tiền: ${total} VND`;
}

nhom7LoadCart();