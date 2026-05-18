// ============================================
//  SKINCARE PERFECT – ADMIN JS
// ============================================

// --- AUTH CHECK ---
const role = localStorage.getItem("nhom7_role");
if (role !== "ADMIN") {
    alert("Bạn không có quyền truy cập trang này!");
    window.location.href = "/";
}

// ─────────────────────────────────────────────
//  TOAST
// ─────────────────────────────────────────────
function nhom7Toast(msg, type = "success") {
    const toast = document.getElementById("sp-toast");
    toast.textContent = msg;
    toast.className = `sp-toast sp-toast--show sp-toast--${type}`;
    setTimeout(() => { toast.className = "sp-toast"; }, 3000);
}

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
function nhom7FormatDate(dateStr) {
    if (!dateStr) return "–";
    return new Date(dateStr).toLocaleDateString("vi-VN");
}

function nhom7FormatMoney(num) {
    return Number(num).toLocaleString("vi-VN") + "đ";
}

function nhom7UserInitial(name) {
    return (name || "U").charAt(0).toUpperCase();
}

// ─────────────────────────────────────────────
//  SECTION NAVIGATION
// ─────────────────────────────────────────────
const sectionTitles = {
    dashboard:  "Dashboard",
    products:   "Quản lý Sản phẩm",
    categories: "Quản lý Danh mục",
    users:      "Quản lý Người dùng",
    orders:     "Quản lý Đơn hàng"
};

function nhom7ShowSection(name) {
    document.querySelectorAll(".sp-section").forEach(s => s.classList.remove("active"));
    document.querySelectorAll(".sp-nav-item").forEach(n => n.classList.remove("active"));
    document.getElementById(`section-${name}`)?.classList.add("active");
    document.querySelector(`[data-section="${name}"]`)?.classList.add("active");
    document.getElementById("sp-page-heading").textContent = sectionTitles[name] || name;

    if (name === "categories") nhom7LoadCategories();
    if (name === "users")      nhom7LoadUsers();
    if (name === "orders")     nhom7LoadOrders();
}

// ─────────────────────────────────────────────
//  LOGOUT
// ─────────────────────────────────────────────
function nhom7Logout() {
    if (confirm("Bạn có muốn đăng xuất không?")) {
        localStorage.removeItem("nhom7_token");
        localStorage.removeItem("nhom7_role");
        window.location.href = "/nhom7login.html";
    }
}

// ═════════════════════════════════════════════
//  PRODUCTS
// ═════════════════════════════════════════════
let nhom7AllProducts = [];

async function nhom7LoadAdminProducts() {
    try {
        const res      = await fetch("http://localhost:8080/api/products");
        const products = await res.json();
        nhom7AllProducts = products;
        nhom7RenderTable(products);
        nhom7RenderRecent(products);
        document.getElementById("card-products").textContent = products.length;
    } catch (e) {
        console.error(e);
        nhom7Toast("Không thể tải danh sách sản phẩm", "error");
    }
}

function nhom7RenderTable(products) {
    const tbody = document.getElementById("nhom7-admin-product-list");
    if (!products.length) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:#aaa;">Không tìm thấy sản phẩm nào</td></tr>`;
        return;
    }
    tbody.innerHTML = products.map(p => `
        <tr>
            <td><span style="color:#aaa;font-size:13px;">#${p.id}</span></td>
            <td><img src="/nhom7images/products/${p.image}" alt="${p.name}"
                     onerror="this.src='https://placehold.co/56x56/ffd6e7/ff4f8b?text=SP'"></td>
            <td>
                <div style="font-weight:600;font-size:14px;">${p.name}</div>
                <div style="color:#aaa;font-size:12px;margin-top:2px;">${p.brand?.name || ''}</div>
            </td>
            <td style="font-weight:600;color:#ff4f8b;">${nhom7FormatMoney(p.price)}</td>
            <td><span style="font-weight:500;">${p.stock}</span> <span style="color:#aaa;font-size:12px;">sp</span></td>
            <td>
                <span class="sp-badge ${p.status ? 'sp-badge--active' : 'sp-badge--inactive'}">
                    ${p.status ? '● Đang bán' : '● Tạm dừng'}
                </span>
            </td>
            <td>
                <div class="sp-action-btns">
                    <button class="sp-edit-btn"   onclick="nhom7OpenEdit(${p.id})">✏ Sửa</button>
                    <button class="sp-delete-btn" onclick="nhom7DeleteProduct(${p.id})">✕ Xóa</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function nhom7RenderRecent(products) {
    const tbody = document.getElementById("sp-recent-products");
    if (!tbody) return;
    tbody.innerHTML = [...products].slice(-5).reverse().map(p => `
        <tr>
            <td><img src="/nhom7images/products/${p.image}"
                     onerror="this.src='https://placehold.co/40x40/ffd6e7/ff4f8b?text=SP'"
                     style="width:40px;height:40px;"></td>
            <td style="font-weight:500;font-size:13px;">${p.name}</td>
            <td style="color:#ff4f8b;font-weight:600;">${nhom7FormatMoney(p.price)}</td>
            <td>${p.stock}</td>
        </tr>
    `).join('');
}

function nhom7FilterProducts() {
    const q = document.getElementById("sp-search").value.toLowerCase();
    nhom7RenderTable(nhom7AllProducts.filter(p =>
        p.name.toLowerCase().includes(q) || String(p.id).includes(q)
    ));
}

async function nhom7DeleteProduct(id) {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
        await fetch(`http://localhost:8080/api/products/${id}`, { method: "DELETE" });
        nhom7Toast("Đã xóa sản phẩm thành công ✓");
        nhom7LoadAdminProducts();
    } catch (e) { nhom7Toast("Xóa thất bại!", "error"); }
}

async function nhom7AddProduct() {
    const name        = document.getElementById("nhom7-name").value.trim();
    const price       = document.getElementById("nhom7-price").value;
    const stock       = document.getElementById("nhom7-stock").value;
    const description = document.getElementById("nhom7-description").value.trim();
    const categoryId  = document.getElementById("category").value;
    const brandId     = document.getElementById("brand").value;
    const imageFile   = document.getElementById("nhom7-image").files[0];

    if (!name || !price || !stock || !categoryId || !brandId) {
        nhom7Toast("Vui lòng điền đầy đủ thông tin!", "error"); return;
    }
    const image = imageFile ? imageFile.name : "default.png";
    const product = { name, price, stock, image, description, ingredients: "Đang cập nhật", status: true, category: { id: categoryId }, brand: { id: brandId } };
    const btn = document.getElementById("sp-submit-btn");
    btn.textContent = "Đang thêm..."; btn.disabled = true;
    try {
        await fetch("http://localhost:8080/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(product) });
        nhom7Toast("Thêm sản phẩm thành công ✓");
        nhom7ResetForm();
        nhom7LoadAdminProducts();
    } catch (e) { nhom7Toast("Thêm sản phẩm thất bại!", "error"); }
    finally { btn.textContent = "+ Thêm sản phẩm"; btn.disabled = false; }
}

function nhom7ResetForm() {
    ["nhom7-name","nhom7-price","nhom7-stock","nhom7-description"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("category").value = "";
    document.getElementById("brand").value    = "";
    nhom7RemoveImage();
    document.getElementById("sp-form-title").textContent = "✦ Thêm sản phẩm mới";
    document.getElementById("sp-submit-btn").textContent = "+ Thêm sản phẩm";
}

function nhom7RemoveImage() {
    document.getElementById("sp-preview-wrap").style.display = "none";
    document.getElementById("nhom7-preview-image").src = "";
    document.getElementById("nhom7-image").value = "";
}

document.getElementById("nhom7-image").addEventListener("change", function (e) {
    const file = e.target.files[0]; if (!file) return;
    document.getElementById("nhom7-preview-image").src = URL.createObjectURL(file);
    document.getElementById("sp-preview-wrap").style.display = "block";
});

let formOpen = true;
function nhom7ToggleForm() {
    formOpen = !formOpen;
    document.getElementById("sp-form-body").classList.toggle("sp-hidden", !formOpen);
    document.getElementById("sp-toggle-form-btn").textContent = formOpen ? "Thu gọn ↑" : "Mở rộng ↓";
}

function nhom7OpenEdit(id) {
    const p = nhom7AllProducts.find(x => x.id === id); if (!p) return;
    document.getElementById("edit-id").value          = p.id;
    document.getElementById("edit-name").value        = p.name;
    document.getElementById("edit-price").value       = p.price;
    document.getElementById("edit-stock").value       = p.stock;
    document.getElementById("edit-description").value = p.description || "";
    document.getElementById("sp-modal").style.display = "flex";
}

function nhom7CloseModal() { document.getElementById("sp-modal").style.display = "none"; }

async function nhom7SaveEdit() {
    const id       = document.getElementById("edit-id").value;
    const existing = nhom7AllProducts.find(x => String(x.id) === String(id));
    const updated  = { ...existing, name: document.getElementById("edit-name").value.trim(), price: document.getElementById("edit-price").value, stock: document.getElementById("edit-stock").value, description: document.getElementById("edit-description").value.trim() };
    try {
        await fetch(`http://localhost:8080/api/products/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
        nhom7Toast("Cập nhật thành công ✓"); nhom7CloseModal(); nhom7LoadAdminProducts();
    } catch (e) { nhom7Toast("Cập nhật thất bại!", "error"); }
}

document.getElementById("sp-modal").addEventListener("click", function (e) { if (e.target === this) nhom7CloseModal(); });

// ═════════════════════════════════════════════
//  CATEGORIES
// ═════════════════════════════════════════════
let nhom7AllCategories = [];

async function nhom7LoadCategories() {
    try {
        const res        = await fetch("http://localhost:8080/api/categories");
        const categories = await res.json();
        nhom7AllCategories = categories;
        nhom7RenderCategoryTable(categories);
        nhom7PopulateCategorySelect(categories);
        document.getElementById("card-categories").textContent = categories.length;
    } catch (e) { console.error(e); nhom7Toast("Không thể tải danh mục", "error"); }
}

function nhom7PopulateCategorySelect(categories) {
    const select = document.getElementById("category");
    const cur    = select.value;
    select.innerHTML = `<option value="">Chọn danh mục</option>`;
    categories.filter(c => c.status).forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id; opt.textContent = c.name; select.appendChild(opt);
    });
    select.value = cur;
}

function nhom7RenderCategoryTable(categories) {
    const tbody = document.getElementById("nhom7-admin-category-list");
    if (!categories.length) { tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:#aaa;">Chưa có danh mục nào</td></tr>`; return; }
    tbody.innerHTML = categories.map(c => {
        const count = nhom7AllProducts.filter(p => p.category?.id === c.id).length;
        return `<tr>
            <td><span style="color:#aaa;font-size:13px;">#${c.id}</span></td>
            <td><div style="font-weight:600;font-size:14px;">${c.name}</div></td>
            <td style="color:#888;font-size:13px;">${c.description || '–'}</td>
            <td><span style="background:#fff0f5;color:#ff4f8b;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">${count} sản phẩm</span></td>
            <td><span class="sp-badge ${c.status ? 'sp-badge--active' : 'sp-badge--inactive'}">${c.status ? '● Hoạt động' : '● Tạm dừng'}</span></td>
            <td><div class="sp-action-btns">
                <button class="sp-edit-btn" onclick="nhom7OpenCatEdit(${c.id})">✏ Sửa</button>
                <button class="sp-delete-btn" onclick="nhom7DeleteCategory(${c.id})">✕ Xóa</button>
            </div></td>
        </tr>`;
    }).join('');
}

function nhom7FilterCategories() {
    const q = document.getElementById("sp-cat-search").value.toLowerCase();
    nhom7RenderCategoryTable(nhom7AllCategories.filter(c => c.name.toLowerCase().includes(q) || String(c.id).includes(q)));
}

async function nhom7AddCategory() {
    const name   = document.getElementById("cat-name").value.trim();
    const desc   = document.getElementById("cat-desc").value.trim();
    const status = document.getElementById("cat-status").value === "true";
    if (!name) { nhom7Toast("Vui lòng nhập tên danh mục!", "error"); return; }
    const btn = document.getElementById("sp-cat-submit-btn");
    btn.textContent = "Đang thêm..."; btn.disabled = true;
    try {
        await fetch("http://localhost:8080/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, description: desc, status }) });
        nhom7Toast("Thêm danh mục thành công ✓"); nhom7ResetCategoryForm(); nhom7LoadCategories();
    } catch (e) { nhom7Toast("Thêm danh mục thất bại!", "error"); }
    finally { btn.textContent = "+ Thêm danh mục"; btn.disabled = false; }
}

function nhom7ResetCategoryForm() {
    document.getElementById("cat-name").value   = "";
    document.getElementById("cat-desc").value   = "";
    document.getElementById("cat-status").value = "true";
}

async function nhom7DeleteCategory(id) {
    const count = nhom7AllProducts.filter(p => p.category?.id === id).length;
    if (count > 0) { nhom7Toast(`Không thể xóa! Danh mục còn ${count} sản phẩm`, "error"); return; }
    if (!confirm("Bạn có chắc muốn xóa danh mục này?")) return;
    try {
        await fetch(`http://localhost:8080/api/categories/${id}`, { method: "DELETE" });
        nhom7Toast("Đã xóa danh mục thành công ✓"); nhom7LoadCategories();
    } catch (e) { nhom7Toast("Xóa thất bại!", "error"); }
}

function nhom7OpenCatEdit(id) {
    const c = nhom7AllCategories.find(x => x.id === id); if (!c) return;
    document.getElementById("edit-cat-id").value     = c.id;
    document.getElementById("edit-cat-name").value   = c.name;
    document.getElementById("edit-cat-desc").value   = c.description || "";
    document.getElementById("edit-cat-status").value = String(c.status);
    document.getElementById("sp-cat-modal").style.display = "flex";
}

function nhom7CloseCatModal() { document.getElementById("sp-cat-modal").style.display = "none"; }

async function nhom7SaveCatEdit() {
    const id     = document.getElementById("edit-cat-id").value;
    const name   = document.getElementById("edit-cat-name").value.trim();
    const desc   = document.getElementById("edit-cat-desc").value.trim();
    const status = document.getElementById("edit-cat-status").value === "true";
    if (!name) { nhom7Toast("Tên danh mục không được để trống!", "error"); return; }
    try {
        await fetch(`http://localhost:8080/api/categories/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, description: desc, status }) });
        nhom7Toast("Cập nhật danh mục thành công ✓"); nhom7CloseCatModal(); nhom7LoadCategories();
    } catch (e) { nhom7Toast("Cập nhật thất bại!", "error"); }
}

document.getElementById("sp-cat-modal").addEventListener("click", function (e) { if (e.target === this) nhom7CloseCatModal(); });

// ═════════════════════════════════════════════
//  USERS
// ═════════════════════════════════════════════
let nhom7AllUsers   = [];
let nhom7UserFilter = "ALL";

async function nhom7LoadUsers() {
    try {
        const res   = await fetch("http://localhost:8080/api/users");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const users = await res.json();
        nhom7AllUsers = users;
        document.getElementById("card-users").textContent = users.length;
        nhom7ApplyUserFilter();
    } catch (e) { console.error(e); nhom7Toast("Không thể tải danh sách người dùng", "error"); }
}

function nhom7SetUserFilter(role, btn) {
    nhom7UserFilter = role;
    document.querySelectorAll(".sp-filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    nhom7ApplyUserFilter();
}

function nhom7ApplyUserFilter() {
    const q = (document.getElementById("sp-user-search")?.value || "").toLowerCase();
    let filtered = nhom7AllUsers;
    if (nhom7UserFilter !== "ALL") filtered = filtered.filter(u => u.role === nhom7UserFilter);
    if (q) filtered = filtered.filter(u => u.fullName?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.username?.toLowerCase().includes(q));
    nhom7RenderUserTable(filtered);
}

function nhom7FilterUsers() { nhom7ApplyUserFilter(); }

function nhom7RenderUserTable(users) {
    const tbody   = document.getElementById("nhom7-admin-user-list");
    const countEl = document.getElementById("sp-user-count");
    if (countEl) countEl.textContent = `${users.length} người dùng`;
    if (!users.length) { tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:40px;color:#aaa;">Không tìm thấy người dùng nào</td></tr>`; return; }
    tbody.innerHTML = users.map(u => {
        const isAdmin  = u.role === "ADMIN";
        const isActive = u.status === true || u.status === 1;
        return `<tr>
            <td><span style="color:#aaa;font-size:13px;">#${u.id}</span></td>
            <td>
                <div class="sp-user-cell">
                    <div class="sp-user-cell-avatar ${isAdmin ? 'sp-user-cell-avatar--admin' : ''}">${nhom7UserInitial(u.fullName)}</div>
                    <div>
                        <div style="font-weight:600;font-size:14px;">${u.fullName || '–'}</div>
                        <div style="color:#aaa;font-size:12px;">@${u.username}</div>
                    </div>
                </div>
            </td>
            <td style="font-size:13px;color:#555;">${u.email || '–'}</td>
            <td style="font-size:13px;color:#555;">${u.phone || '–'}</td>
            <td><span class="sp-role-badge ${isAdmin ? 'sp-role-badge--admin' : 'sp-role-badge--user'}">${isAdmin ? '⊛ Admin' : '◎ Khách'}</span></td>
            <td><span class="sp-badge ${isActive ? 'sp-badge--active' : 'sp-badge--inactive'}">${isActive ? '● Hoạt động' : '● Bị khóa'}</span></td>
            <td style="font-size:12px;color:#aaa;">${nhom7FormatDate(u.createdAt)}</td>
            <td>
                <div class="sp-action-btns">
                    <button class="sp-edit-btn" onclick="nhom7OpenUserEdit(${u.id})">✏ Sửa</button>
                    <button class="sp-delete-btn ${isAdmin ? 'sp-btn-disabled' : ''}" onclick="nhom7DeleteUser(${u.id})" ${isAdmin ? 'disabled' : ''}>✕ Xóa</button>
                </div>
            </td>
        </tr>`;
    }).join('');
}

function nhom7OpenUserEdit(id) {
    const u = nhom7AllUsers.find(x => x.id === id); if (!u) return;
    document.getElementById("edit-user-id").value       = u.id;
    document.getElementById("edit-user-fullname").value = u.fullName  || "";
    document.getElementById("edit-user-username").value = u.username  || "";
    document.getElementById("edit-user-email").value    = u.email     || "";
    document.getElementById("edit-user-phone").value    = u.phone     || "";
    document.getElementById("edit-user-address").value  = u.address   || "";
    document.getElementById("edit-user-role").value     = u.role      || "USER";
    document.getElementById("edit-user-status").value   = String(u.status === true || u.status === 1);
    document.getElementById("modal-user-avatar").textContent   = nhom7UserInitial(u.fullName);
    document.getElementById("modal-user-fullname").textContent = u.fullName || "";
    document.getElementById("modal-user-username").textContent = "@" + (u.username || "");
    document.getElementById("sp-user-modal").style.display = "flex";
}

function nhom7CloseUserModal() { document.getElementById("sp-user-modal").style.display = "none"; }

async function nhom7SaveUserEdit() {
    const id       = document.getElementById("edit-user-id").value;
    const existing = nhom7AllUsers.find(x => String(x.id) === String(id));
    const updated  = { ...existing, fullName: document.getElementById("edit-user-fullname").value.trim(), email: document.getElementById("edit-user-email").value.trim(), phone: document.getElementById("edit-user-phone").value.trim(), address: document.getElementById("edit-user-address").value.trim(), role: document.getElementById("edit-user-role").value, status: document.getElementById("edit-user-status").value === "true" };
    try {
        await fetch(`http://localhost:8080/api/users/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
        nhom7Toast("Cập nhật người dùng thành công ✓"); nhom7CloseUserModal(); nhom7LoadUsers();
    } catch (e) { nhom7Toast("Cập nhật thất bại!", "error"); }
}

async function nhom7DeleteUser(id) {
    const u = nhom7AllUsers.find(x => x.id === id); if (!u) return;
    if (u.role === "ADMIN") { nhom7Toast("Không thể xóa tài khoản Admin!", "error"); return; }
    if (!confirm(`Xóa tài khoản "${u.fullName}"? Hành động này không thể hoàn tác!`)) return;
    try {
        await fetch(`http://localhost:8080/api/users/${id}`, { method: "DELETE" });
        nhom7Toast("Đã xóa người dùng thành công ✓"); nhom7LoadUsers();
    } catch (e) { nhom7Toast("Xóa thất bại!", "error"); }
}

document.getElementById("sp-user-modal").addEventListener("click", function (e) { if (e.target === this) nhom7CloseUserModal(); });

// ═════════════════════════════════════════════
//  ORDERS
// ═════════════════════════════════════════════
let nhom7AllOrders   = [];
let nhom7OrderFilter = "ALL";

// Config trạng thái đơn hàng
const nhom7OrderStatusConfig = {
    PENDING:   { label: "Chờ xử lý",   cls: "sp-order-badge--pending"   },
    CONFIRMED: { label: "Đã xác nhận", cls: "sp-order-badge--confirmed" },
    SHIPPING:  { label: "Đang giao",   cls: "sp-order-badge--shipping"  },
    DELIVERED: { label: "Đã giao",     cls: "sp-order-badge--delivered" },
    CANCELLED: { label: "Đã hủy",     cls: "sp-order-badge--cancelled" }
};

async function nhom7LoadOrders() {
    try {
        const res    = await fetch("http://localhost:8080/api/orders");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const orders = await res.json();
        nhom7AllOrders = orders;

        // Cập nhật card dashboard
        document.getElementById("card-orders").textContent = orders.length;

        // Cập nhật thống kê nhanh
        nhom7UpdateOrderStats(orders);
        nhom7ApplyOrderFilter();
    } catch (e) {
        console.error(e);
        nhom7Toast("Không thể tải danh sách đơn hàng", "error");
    }
}

function nhom7UpdateOrderStats(orders) {
    document.getElementById("ostat-all").textContent       = orders.length;
    document.getElementById("ostat-pending").textContent   = orders.filter(o => o.orderStatus === "PENDING").length;
    document.getElementById("ostat-confirmed").textContent = orders.filter(o => o.orderStatus === "CONFIRMED").length;
    document.getElementById("ostat-shipping").textContent  = orders.filter(o => o.orderStatus === "SHIPPING").length;
    document.getElementById("ostat-delivered").textContent = orders.filter(o => o.orderStatus === "DELIVERED").length;
    document.getElementById("ostat-cancelled").textContent = orders.filter(o => o.orderStatus === "CANCELLED").length;
}

function nhom7SetOrderFilter(status, btn) {
    nhom7OrderFilter = status;
    // Chỉ reset filter btn trong section orders
    document.querySelectorAll("#section-orders .sp-filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    nhom7ApplyOrderFilter();
}

function nhom7ApplyOrderFilter() {
    const q = (document.getElementById("sp-order-search")?.value || "").toLowerCase();
    let filtered = nhom7AllOrders;

    if (nhom7OrderFilter !== "ALL") {
        filtered = filtered.filter(o => o.orderStatus === nhom7OrderFilter);
    }
    if (q) {
        filtered = filtered.filter(o =>
            String(o.id).includes(q) ||
            o.user?.fullName?.toLowerCase().includes(q) ||
            o.shippingAddress?.toLowerCase().includes(q)
        );
    }
    nhom7RenderOrderTable(filtered);
}

function nhom7FilterOrders() { nhom7ApplyOrderFilter(); }

function nhom7RenderOrderTable(orders) {
    const tbody   = document.getElementById("nhom7-admin-order-list");
    const countEl = document.getElementById("sp-order-count");
    if (countEl) countEl.textContent = `${orders.length} đơn hàng`;

    if (!orders.length) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:40px;color:#aaa;">Không tìm thấy đơn hàng nào</td></tr>`;
        return;
    }

    tbody.innerHTML = orders.map(o => {
        const cfg = nhom7OrderStatusConfig[o.orderStatus] || { label: o.orderStatus || "–", cls: "" };
        return `<tr>
            <td><span style="color:#aaa;font-size:13px;">#${o.id}</span></td>
            <td>
                <div style="font-weight:600;font-size:14px;">${o.user?.fullName || '–'}</div>
                <div style="color:#aaa;font-size:12px;">@${o.user?.username || '–'}</div>
            </td>
            <td style="font-size:13px;color:#555;">${nhom7FormatDate(o.orderDate)}</td>
            <td style="font-weight:700;color:#ff4f8b;">${nhom7FormatMoney(o.totalAmount)}</td>
            <td>
                <span style="background:#f0f9ff;color:#0369a1;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;">
                    ${o.paymentMethod || '–'}
                </span>
            </td>
            <td style="font-size:12px;color:#666;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${o.shippingAddress || '–'}
            </td>
            <td>
                <span class="sp-order-badge ${cfg.cls}">● ${cfg.label}</span>
            </td>
            <td>
                <button class="sp-edit-btn" onclick="nhom7OpenOrderDetail(${o.id})">🔍 Chi tiết</button>
            </td>
        </tr>`;
    }).join('');
}

// Mở modal chi tiết đơn hàng
function nhom7OpenOrderDetail(id) {
    const o = nhom7AllOrders.find(x => x.id === id); if (!o) return;
    const cfg = nhom7OrderStatusConfig[o.orderStatus] || { label: o.orderStatus || "–", cls: "" };

    document.getElementById("edit-order-id").value           = o.id;
    document.getElementById("modal-order-id").textContent    = `#${o.id}`;
    document.getElementById("modal-order-user").textContent  = o.user?.fullName || "–";
    document.getElementById("modal-order-date").textContent  = nhom7FormatDate(o.orderDate);
    document.getElementById("modal-order-payment").textContent = o.paymentMethod || "–";
    document.getElementById("modal-order-address").textContent = o.shippingAddress || "–";
    document.getElementById("modal-order-total").textContent  = nhom7FormatMoney(o.totalAmount);
    document.getElementById("edit-order-status").value       = o.orderStatus || "PENDING";

    // Render sản phẩm trong đơn
    const itemsEl = document.getElementById("modal-order-items");
    if (o.orderDetails && o.orderDetails.length > 0) {
        itemsEl.innerHTML = o.orderDetails.map(d => `
            <div class="sp-order-item-row">
                <img src="/nhom7images/products/${d.product?.image || 'default.png'}"
                     onerror="this.src='https://placehold.co/48x48/ffd6e7/ff4f8b?text=SP'"
                     alt="${d.product?.name || ''}">
                <div class="sp-order-item-info">
                    <div class="sp-order-item-name">${d.product?.name || 'Sản phẩm'}</div>
                    <div class="sp-order-item-qty">x${d.quantity}</div>
                </div>
                <div class="sp-order-item-price">${nhom7FormatMoney(d.price)}</div>
            </div>
        `).join('');
    } else {
        itemsEl.innerHTML = `<div style="color:#aaa;font-size:13px;padding:12px 0;">Không có thông tin sản phẩm</div>`;
    }

    document.getElementById("sp-order-modal").style.display = "flex";
}

function nhom7CloseOrderModal() { document.getElementById("sp-order-modal").style.display = "none"; }

// Cập nhật trạng thái đơn hàng
async function nhom7SaveOrderStatus() {
    const id        = document.getElementById("edit-order-id").value;
    const newStatus = document.getElementById("edit-order-status").value;
    const existing  = nhom7AllOrders.find(x => String(x.id) === String(id));

    try {
        await fetch(`http://localhost:8080/api/orders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...existing, orderStatus: newStatus })
        });
        const cfg = nhom7OrderStatusConfig[newStatus];
        nhom7Toast(`Đã cập nhật trạng thái: ${cfg?.label || newStatus} ✓`);
        nhom7CloseOrderModal();
        nhom7LoadOrders();
    } catch (e) {
        nhom7Toast("Cập nhật trạng thái thất bại!", "error");
    }
}

document.getElementById("sp-order-modal").addEventListener("click", function (e) { if (e.target === this) nhom7CloseOrderModal(); });

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
(async () => {
    await nhom7LoadAdminProducts();
    await nhom7LoadCategories();
    await nhom7LoadUsers();
    await nhom7LoadOrders();
})();