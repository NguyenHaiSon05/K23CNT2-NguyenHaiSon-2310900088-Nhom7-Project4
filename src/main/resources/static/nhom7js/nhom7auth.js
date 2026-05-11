const userArea = document.getElementById("nhom7-user-area");

const username = localStorage.getItem("nhom7_username");

if(username){

    userArea.innerHTML = `
        <span>
            Xin chào, ${username}
        </span>

        <button onclick="nhom7Logout()">
            Đăng xuất
        </button>
    `;

}else{

    userArea.innerHTML = `
        <a href="/nhom7login.html">
            Đăng nhập
        </a>
    `;
}

function nhom7Logout(){

    localStorage.removeItem("nhom7_username");

    window.location.href = "/";
}