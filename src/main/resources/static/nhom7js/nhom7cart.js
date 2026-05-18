// ============================================
//  SKINCARE PERFECT – CART JS
// ============================================

// ── TOAST ──
function nhom7ToastCart(msg, type = "success") {
    const toast = document.getElementById("nhom7-toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.className   = `nhom7-toast show ${type}`;
    setTimeout(() => { toast.className = "nhom7-toast"; }, 2800);
}

// ── FORMAT GIÁ ──
function nhom7Fmt(num) {
    return Number(num).toLocaleString("vi-VN") + "đ";
}

// ── VOUCHER STATE ──
let nhom7DiscountPercent = 0;
let nhom7AppliedVoucher  = "";

// Danh sách voucher hợp lệ (khớp với DB)
const nhom7Vouchers = {
    "SALE10": 10,
    "SALE20": 20
};

// ── LOAD GIỎ HÀNG ──
function nhom7LoadCart() {
    const cart      = JSON.parse(localStorage.getItem("nhom7-cart")) || [];
    const container = document.getElementById("nhom7-cart-list");
    const countEl   = document.getElementById("nhom7-cart-count");

    // Cập nhật số lượng
    const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
    if (countEl) countEl.textContent = `${totalQty} sản phẩm`;

    // Giỏ trống
    if (!cart.length) {
        container.innerHTML = `
            <div class="nhom7-cart-empty">
                <div class="nhom7-cart-empty-icon">🛒</div>
                <h3>Giỏ hàng đang trống</h3>
                <p>Hãy khám phá các sản phẩm skincare tuyệt vời của chúng tôi!</p>
                <a href="/">Khám phá ngay</a>
            </div>
        `;
        nhom7UpdateSummary(0);
        return;
    }

    // Render items
    container.innerHTML = cart.map((item, index) => {
        const brandName  = item.brand?.name || "Skincare Perfect";
        const itemTotal  = item.price * item.quantity;
        return `
        <div class="nhom7-cart-item" id="nhom7-item-${index}">

            <img class="nhom7-cart-item-img"
                 src="/nhom7images/products/${item.image}"
                 alt="${item.name}"
                 onerror="this.src='https://placehold.co/100x100/f0e8e0/e8547a?text=SP'">

            <div class="nhom7-cart-item-info">
                <span class="nhom7-cart-item-brand">${brandName.toUpperCase()}</span>
                <div class="nhom7-cart-item-name">${item.name}</div>
                <div class="nhom7-cart-item-price">${nhom7Fmt(item.price)}</div>
                <div class="nhom7-cart-item-subtotal">Thành tiền: ${nhom7Fmt(itemTotal)}</div>
            </div>

            <div class="nhom7-cart-item-controls">
                <div class="nhom7-qty-box">
                    <button onclick="nhom7Decrease(${index})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="nhom7Increase(${index})">+</button>
                </div>
                <button class="nhom7-remove-btn" onclick="nhom7RemoveItem(${index})">
                    ✕ Xóa
                </button>
            </div>

        </div>
        `;
    }).join('');

    // Tính tổng
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    nhom7UpdateSummary(subtotal);
}

// ── CẬP NHẬT SUMMARY ──
function nhom7UpdateSummary(subtotal) {
    const discount  = Math.round(subtotal * nhom7DiscountPercent / 100);
    const total     = subtotal - discount;
    const shipFee   = subtotal >= 99000 ? "Miễn phí" : nhom7Fmt(30000);

    const subtotalEl  = document.getElementById("nhom7-subtotal");
    const shipEl      = document.getElementById("nhom7-ship-fee");
    const totalEl     = document.getElementById("nhom7-total-price");
    const discountRow = document.getElementById("nhom7-discount-row");
    const discountEl  = document.getElementById("nhom7-discount-amount");

    if (subtotalEl) subtotalEl.textContent = nhom7Fmt(subtotal);
    if (shipEl)     { shipEl.textContent = shipFee; shipEl.className = subtotal >= 99000 ? "nhom7-free" : ""; }
    if (totalEl)    totalEl.textContent   = nhom7Fmt(total);

    if (discountRow && discountEl) {
        if (discount > 0) {
            discountRow.style.display = "flex";
            discountEl.textContent = `–${nhom7Fmt(discount)}`;
        } else {
            discountRow.style.display = "none";
        }
    }
}

// ── TĂNG SỐ LƯỢNG ──
function nhom7Increase(index) {
    const cart = JSON.parse(localStorage.getItem("nhom7-cart")) || [];
    cart[index].quantity++;
    localStorage.setItem("nhom7-cart", JSON.stringify(cart));
    nhom7LoadCart();
}

// ── GIẢM SỐ LƯỢNG ──
function nhom7Decrease(index) {
    const cart = JSON.parse(localStorage.getItem("nhom7-cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
        nhom7ToastCart("Đã xóa sản phẩm khỏi giỏ hàng");
    }
    localStorage.setItem("nhom7-cart", JSON.stringify(cart));
    nhom7LoadCart();
}

// ── XÓA SẢN PHẨM ──
function nhom7RemoveItem(index) {
    const cart = JSON.parse(localStorage.getItem("nhom7-cart")) || [];
    const name = cart[index]?.name || "Sản phẩm";
    cart.splice(index, 1);
    localStorage.setItem("nhom7-cart", JSON.stringify(cart));
    nhom7ToastCart(`Đã xóa "${name}" khỏi giỏ hàng`);
    nhom7LoadCart();
}

// ── ÁP DỤNG VOUCHER ──
function nhom7ApplyVoucher() {
    const input = document.getElementById("nhom7-voucher-input");
    const code  = input?.value.trim().toUpperCase();

    if (!code) {
        nhom7ToastCart("Vui lòng nhập mã giảm giá!", "error"); return;
    }

    if (nhom7Vouchers[code]) {
        nhom7DiscountPercent = nhom7Vouchers[code];
        nhom7AppliedVoucher  = code;
        nhom7ToastCart(`✓ Áp dụng mã ${code} – Giảm ${nhom7DiscountPercent}%!`);
        nhom7LoadCart();
    } else {
        nhom7DiscountPercent = 0;
        nhom7AppliedVoucher  = "";
        nhom7ToastCart("Mã giảm giá không hợp lệ hoặc đã hết hạn!", "error");
        nhom7LoadCart();
    }
}

// ── CHECKOUT ──
function nhom7Checkout() {
    const username = localStorage.getItem("nhom7_username");
    if (!username) {
        nhom7ToastCart("Vui lòng đăng nhập để đặt hàng!", "error");
        setTimeout(() => { window.location.href = "/nhom7login.html"; }, 1500);
        return;
    }

    const cart = JSON.parse(localStorage.getItem("nhom7-cart")) || [];
    if (!cart.length) {
        nhom7ToastCart("Giỏ hàng đang trống!", "error"); return;
    }

    nhom7ToastCart("✓ Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
    setTimeout(() => {
        localStorage.removeItem("nhom7-cart");
        window.location.href = "/";
    }, 2000);
}

// ── AUTH HEADER ──
function nhom7RenderUserArea() {
    const userArea = document.getElementById("nhom7-user-area");
    if (!userArea) return;
    const username = localStorage.getItem("nhom7_username");
    if (username) {
        const initial = username.charAt(0).toUpperCase();
        userArea.innerHTML = `
            <div class="nhom7-user-box">
                <div class="nhom7-user-icon">${initial}</div>
                <div class="nhom7-user-info">
                    <span>${username}</span>
                    <button onclick="nhom7Logout()">Đăng xuất</button>
                </div>
            </div>
        `;
    } else {
        userArea.innerHTML = `
            <a href="/nhom7login.html"
               style="padding:9px 22px;border:1.5px solid var(--rose);border-radius:30px;
                      color:var(--rose);font-size:13px;font-weight:600;text-decoration:none;">
                Đăng nhập
            </a>
        `;
    }
}

function nhom7Logout() {
    localStorage.removeItem("nhom7_username");
    localStorage.removeItem("nhom7_role");
    localStorage.removeItem("nhom7-cart");
    window.location.href = "/";
}

// ── INIT ──
nhom7RenderUserArea();
nhom7LoadCart();