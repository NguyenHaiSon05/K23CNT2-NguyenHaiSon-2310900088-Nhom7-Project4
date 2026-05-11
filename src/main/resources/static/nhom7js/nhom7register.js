const form = document.getElementById("nhom7-register-form");

form.addEventListener("submit", async function (e){

    e.preventDefault();

    const data = {
        fullName: document.getElementById("fullName").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    console.log(data);

    alert("Đăng ký thành công (demo)");
});