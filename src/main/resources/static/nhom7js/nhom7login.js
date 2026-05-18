function togglePassword() {
    const input = document.getElementById("nhom7-password");
    const iconEye = document.getElementById("icon-eye");
    const iconEyeOff = document.getElementById("icon-eye-off");

    if (input.type === "password") {
        input.type = "text";
        iconEye.style.display = "none";
        iconEyeOff.style.display = "block";
    } else {
        input.type = "password";
        iconEye.style.display = "block";
        iconEyeOff.style.display = "none";
    }
}

async function nhom7Login() {
    const email = document.getElementById("nhom7-email").value.trim();
    const password = document.getElementById("nhom7-password").value;

    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    try {
        const response = await fetch(`${NHOM7_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("nhom7_user", JSON.stringify(data));
            localStorage.setItem("nhom7_role", data.role);
            localStorage.setItem("nhom7_username", data.fullName);

            if (data.role === "ADMIN") {
                window.location.href = "/nhom7admin.html";
            } else {
                window.location.href = "/";
            }
        } else {
            alert(data.message || "Đăng nhập thất bại");
        }

    } catch (err) {
        alert("Lỗi kết nối server");
        console.error(err);
    }
}