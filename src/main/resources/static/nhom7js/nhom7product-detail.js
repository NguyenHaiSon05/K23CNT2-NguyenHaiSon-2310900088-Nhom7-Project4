// ============================================
//  SKINCARE PERFECT – PRODUCT DETAIL JS
// ============================================

let nhom7CurrentProduct = null;
let nhom7Quantity        = 1;

// ── TOAST ──
function nhom7ToastDetail(msg, type = "success") {
    const toast = document.getElementById("nhom7-toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.className   = `nhom7-toast show ${type}`;
    setTimeout(() => { toast.className = "nhom7-toast"; }, 3000);
}

// ── FORMAT GIÁ ──
function nhom7FormatPrice(price) {
    return Number(price).toLocaleString("vi-VN");
}

// ── LOAD CHI TIẾT SẢN PHẨM ──
async function nhom7LoadProductDetail() {
    const params    = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    try {
        const response = await fetch(`${NHOM7_BASE_URL}/products/${productId}`);
        const product  = await response.json();
        nhom7CurrentProduct = product;

        // Breadcrumb
        const breadcrumb = document.getElementById("nhom7-breadcrumb-name");
        if (breadcrumb) breadcrumb.textContent = product.name;

        // Tiêu đề tab
        document.title = `${product.name} – Skincare Perfect`;

        // Tính giá gốc
        const oldPrice   = Math.round(Number(product.price) * 1.25 / 1000) * 1000;
        const brandName  = product.brand?.name || "Skincare Perfect";
        const categoryName = product.category?.name || "";
        const stockLabel = product.stock > 10
            ? `✦ Còn ${product.stock} sản phẩm`
            : product.stock > 0
                ? `⚠ Chỉ còn ${product.stock} sản phẩm`
                : `✕ Hết hàng`;

        // Ingredients → tags
        const tags = (product.ingredients || "")
            .split(",")
            .map(t => t.trim())
            .filter(Boolean)
            .map(t => `<span class="nhom7-detail-tag">${t}</span>`)
            .join("");

        document.getElementById("nhom7-product-detail").innerHTML = `
            <div class="nhom7-detail-card">

                <!-- ẢNH -->
                <div class="nhom7-detail-image">
                    <div class="nhom7-detail-image-main">
                        <img
                            src="/nhom7images/products/${product.image}"
                            alt="${product.name}"
                            onerror="this.src='https://placehold.co/600x600/f0e8e0/e8547a?text=Skincare'"
                        >
                        <span class="nhom7-detail-badge">-20%</span>
                        <span class="nhom7-detail-stock-badge">${stockLabel}</span>
                    </div>
                </div>

                <!-- THÔNG TIN -->
                <div class="nhom7-detail-info">

                    <div class="nhom7-detail-brand">${brandName.toUpperCase()}</div>

                    <h1>${product.name}</h1>

                    <div class="nhom7-detail-divider"></div>

                    <!-- GIÁ -->
                    <div class="nhom7-detail-price-wrap">
                        <div class="nhom7-detail-price">${nhom7FormatPrice(product.price)}đ</div>
                        <div class="nhom7-detail-old-price">${nhom7FormatPrice(oldPrice)}đ</div>
                        <span class="nhom7-detail-save">Tiết kiệm 20%</span>
                    </div>

                    <!-- META -->
                    <div class="nhom7-detail-meta">
                        ${categoryName ? `
                        <div class="nhom7-detail-meta-row">
                            <span class="nhom7-detail-meta-label">Danh mục</span>
                            <span class="nhom7-detail-meta-value">${categoryName}</span>
                        </div>` : ""}

                        ${product.description ? `
                        <div class="nhom7-detail-meta-row">
                            <span class="nhom7-detail-meta-label">Mô tả</span>
                            <span class="nhom7-detail-meta-value">${product.description}</span>
                        </div>` : ""}
                    </div>

                    <!-- THÀNH PHẦN TAGS -->
                    ${tags ? `
                    <div style="margin-bottom:20px;">
                        <div style="font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Thành phần chính</div>
                        <div class="nhom7-detail-tags">${tags}</div>
                    </div>` : ""}

                    <!-- CHỌN SỐ LƯỢNG -->
                    <div class="nhom7-detail-qty-wrap">
                        <span class="nhom7-detail-qty-label">Số lượng</span>
                        <div class="nhom7-detail-qty">
                            <button onclick="nhom7ChangeQty(-1)">−</button>
                            <span id="nhom7-qty-display">1</span>
                            <button onclick="nhom7ChangeQty(1)">+</button>
                        </div>
                        <span style="font-size:13px;color:var(--text-muted);margin-left:8px;">
                            (Tối đa ${product.stock})
                        </span>
                    </div>

                    <!-- NÚT HÀNH ĐỘNG -->
                    <div class="nhom7-detail-actions">
                        <button class="nhom7-detail-btn-main"
                                onclick="nhom7AddToCart()"
                                ${product.stock === 0 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
                            🛒 Thêm vào giỏ hàng
                        </button>
                        <button class="nhom7-detail-btn-secondary" title="Yêu thích" onclick="this.style.color='#e8547a';this.style.borderColor='#e8547a';">♡</button>
                    </div>

                    <!-- TRUST BADGES -->
                    <div class="nhom7-detail-trust">
                        <div class="nhom7-trust-item">
                            <span class="nhom7-trust-icon">🚚</span>
                            <span class="nhom7-trust-label">Freeship từ 99K</span>
                        </div>
                        <div class="nhom7-trust-item">
                            <span class="nhom7-trust-icon">✦</span>
                            <span class="nhom7-trust-label">Hàng chính hãng 100%</span>
                        </div>
                        <div class="nhom7-trust-item">
                            <span class="nhom7-trust-icon">↩</span>
                            <span class="nhom7-trust-label">Đổi trả trong 7 ngày</span>
                        </div>
                    </div>

                </div>
            </div>
        `;

    } catch (error) {
        console.error(error);
        document.getElementById("nhom7-product-detail").innerHTML = `
            <div style="text-align:center;padding:80px 20px;color:var(--text-muted);">
                <div style="font-size:48px;margin-bottom:16px;">🌿</div>
                <h3 style="font-family:'Cormorant Garamond',serif;font-size:24px;margin-bottom:8px;">Không tìm thấy sản phẩm</h3>
                <p style="font-size:14px;margin-bottom:24px;">Sản phẩm không tồn tại hoặc đã bị xóa.</p>
                <a href="/" style="background:var(--rose);color:white;padding:12px 28px;border-radius:30px;text-decoration:none;font-weight:600;font-size:14px;">
                    Về trang chủ
                </a>
            </div>
        `;
    }
}

// ── THAY ĐỔI SỐ LƯỢNG ──
function nhom7ChangeQty(delta) {
    if (!nhom7CurrentProduct) return;
    const max = nhom7CurrentProduct.stock || 99;
    nhom7Quantity = Math.max(1, Math.min(max, nhom7Quantity + delta));
    const el = document.getElementById("nhom7-qty-display");
    if (el) el.textContent = nhom7Quantity;
}

// ── THÊM VÀO GIỎ ──
function nhom7AddToCart() {
    const username = localStorage.getItem("nhom7_username");

    if (!username) {
        nhom7ToastDetail("Vui lòng đăng nhập để mua hàng!", "error");
        setTimeout(() => { window.location.href = "/nhom7login.html"; }, 1500);
        return;
    }

    if (nhom7CurrentProduct.stock === 0) {
        nhom7ToastDetail("Sản phẩm đã hết hàng!", "error");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("nhom7-cart")) || [];

    const existing = cart.find(item => item.id === nhom7CurrentProduct.id);

    if (existing) {
        existing.quantity = Math.min(
            existing.quantity + nhom7Quantity,
            nhom7CurrentProduct.stock
        );
    } else {
        cart.push({ ...nhom7CurrentProduct, quantity: nhom7Quantity });
    }

    localStorage.setItem("nhom7-cart", JSON.stringify(cart));

    nhom7ToastDetail(`✓ Đã thêm ${nhom7Quantity} sản phẩm vào giỏ hàng!`);
    setTimeout(() => { window.location.href = "/nhom7cart.html"; }, 1200);
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
                      color:var(--rose);font-size:13px;font-weight:600;text-decoration:none;
                      transition:0.3s;"
               onmouseover="this.style.background='var(--rose)';this.style.color='white';"
               onmouseout="this.style.background='';this.style.color='var(--rose)';">
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
nhom7LoadProductDetail();