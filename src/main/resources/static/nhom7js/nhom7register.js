const form = document.getElementById("nhom7-register-form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        fullName: document.getElementById("fullName").value.trim(),
        username: document.getElementById("username").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value
    };

    try {
        const response = await fetch(`${NHOM7_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            window.location.href = "/nhom7login.html";
        } else {
            alert(result.message || "Đăng ký thất bại");
        }

    } catch (err) {
        alert("Lỗi kết nối server");
        console.error(err);
    }
});