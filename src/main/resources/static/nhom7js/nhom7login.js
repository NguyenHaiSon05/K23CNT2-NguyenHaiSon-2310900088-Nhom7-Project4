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

        alert("Đăng nhập thành công");

        window.location.href = "/";

    }else{

        alert("Vui lòng nhập đầy đủ thông tin");
    }
}