// ============================================
//  SKINCARE PERFECT – PRODUCT JS
// ============================================

let nhom7AllProducts = [];

async function nhom7LoadProducts() {
    try {
        const response = await fetch(`${NHOM7_BASE_URL}/products`);
        const products = await response.json();
        nhom7AllProducts = products;
        nhom7RenderProducts(products);
    } catch (error) {
        console.error(error);
        const container = document.getElementById("nhom7-product-list");
        if (container) {
            container.innerHTML = `
                <div style="text-align:center;padding:60px 20px;color:#9a8080;">
                    <div style="font-size:40px;margin-bottom:12px;">🌿</div>
                    <p style="font-size:15px;">Không thể tải sản phẩm. Vui lòng thử lại.</p>
                </div>
            `;
        }
    }
}

function nhom7FormatPrice(price) {
    return Number(price).toLocaleString('vi-VN');
}

function nhom7RenderProducts(products) {
    const container = document.getElementById("nhom7-product-list");
    if (!container) return;

    if (!products.length) {
        container.innerHTML = `
            <div style="text-align:center;padding:60px 20px;color:#9a8080;grid-column:1/-1;">
                <div style="font-size:40px;margin-bottom:12px;">🔍</div>
                <p style="font-size:15px;">Không tìm thấy sản phẩm nào trong danh mục này.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = products.map(product => {

        // Tính giá gốc giả (tăng 25%)
        const oldPrice = Math.round(Number(product.price) * 1.25 / 1000) * 1000;
        const brandName = product.brand?.name || 'SKINCARE';

        return `
        <div class="nhom7-product-card" onclick="location.href='/nhom7product-detail.html?id=${product.id}'">

            <div class="nhom7-product-image">
                <img
                    src="/nhom7images/products/${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/400x300/f0e8e0/e8547a?text=Skincare'"
                >
                <span class="nhom7-sale-badge">-20%</span>

                <div class="nhom7-product-overlay">
                    <button class="nhom7-quick-view"
                            onclick="event.stopPropagation();location.href='/nhom7product-detail.html?id=${product.id}'">
                        Xem chi tiết →
                    </button>
                </div>
            </div>

            <div class="nhom7-product-info">
                <span class="nhom7-brand">${brandName.toUpperCase()}</span>

                <h3>${product.name}</h3>

                <div class="nhom7-price-box">
                    <span class="nhom7-price">${nhom7FormatPrice(product.price)}đ</span>
                    <span class="nhom7-old-price">${nhom7FormatPrice(oldPrice)}đ</span>
                </div>

                <p class="nhom7-freeship">✦ FREESHIP TỪ 99K</p>

                <div class="nhom7-product-bottom">
                    <span class="nhom7-sold">🔥 Bán chạy</span>
                    <a href="/nhom7product-detail.html?id=${product.id}"
                       onclick="event.stopPropagation()">+</a>
                </div>
            </div>

        </div>
        `;
    }).join('');
}

function nhom7FilterCategory(categoryName) {
    // Highlight active category
    document.querySelectorAll('.nhom7-category-menu li').forEach(li => {
        li.style.color = '';
        li.style.background = '';
        li.style.fontWeight = '';
    });

    const filtered = nhom7AllProducts.filter(p => p.category?.name === categoryName);
    nhom7RenderProducts(filtered);

    // Scroll to products
    document.getElementById('nhom7-product-list-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

nhom7LoadProducts();