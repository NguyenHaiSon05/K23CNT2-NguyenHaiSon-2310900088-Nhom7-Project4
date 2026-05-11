const userArea = document.getElementById("nhom7-user-area");

const username =
    localStorage.getItem("nhom7_username");

if(username){

    userArea.innerHTML = `

        <div class="nhom7-user-box">

            <div class="nhom7-user-icon">

            </div>

            <div class="nhom7-user-info">

                <span>
                    Tài khoản
                </span>

                <button onclick="nhom7Logout()">
                    Đăng xuất
                </button>

            </div>

        </div>

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