function nhom7Login(){

    const email =
        document.getElementById("nhom7-email").value;

    const password =
        document.getElementById("nhom7-password").value;

    if(email && password){

        localStorage.setItem(
            "nhom7_username",
            email
        );

        // ADMIN LOGIN

        if(
            email === "admin@gmail.com"
            &&
            password === "admin123"
        ){

            localStorage.setItem(
                "nhom7_role",
                "ADMIN"
            );

            alert("Đăng nhập Admin thành công");

            window.location.href =
                "/nhom7admin.html";

            return;
        }

        // USER LOGIN

        localStorage.setItem(
            "nhom7_role",
            "USER"
        );

        alert("Đăng nhập thành công");

        window.location.href = "/";
    }
    else{

        alert("Vui lòng nhập đầy đủ thông tin");
    }
}