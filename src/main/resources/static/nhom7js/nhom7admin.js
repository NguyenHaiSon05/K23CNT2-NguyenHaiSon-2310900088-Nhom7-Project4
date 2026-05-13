const role =
    localStorage.getItem("nhom7_role");

if(role !== "ADMIN"){

    alert("Bạn không có quyền truy cập");

    window.location.href = "/";
}
async function nhom7LoadAdminProducts() {

    try {

        const response =
            await fetch("http://localhost:8080/api/products");

        const products =
            await response.json();

        const table =
            document.getElementById("nhom7-admin-product-list");

        let html = "";

        products.forEach(product => {

            html += `

            <tr>

                <td>${product.id}</td>

                <td>
                    <img
                        src="/nhom7images/${product.image}"
                        width="70"
                    >
                </td>

                <td>${product.name}</td>

                <td>${product.price}đ</td>

                <td>${product.stock}</td>

                <td>

                    <button
                        class="nhom7-edit-btn"
                        onclick="nhom7EditProduct(${product.id})"
                    >
                        Sửa
                    </button>

                    <button
                        class="nhom7-delete-btn"
                        onclick="nhom7DeleteProduct(${product.id})"
                    >
                        Xóa
                    </button>

                </td>

            </tr>

            `;
        });

        table.innerHTML = html;

    } catch (error) {

        console.error(error);
    }
}

async function nhom7DeleteProduct(id) {

    const confirmDelete =
        confirm("Bạn có chắc muốn xóa sản phẩm?");

    if(!confirmDelete){
        return;
    }

    try {

        await fetch(
            `http://localhost:8080/api/products/${id}`,
            {
                method: "DELETE"
            }
        );

        alert("Xóa thành công");

        nhom7LoadAdminProducts();

    } catch (error) {

        console.error(error);
    }
}

function nhom7EditProduct(id){

    alert("Chức năng sửa sẽ làm tiếp 😄");
}

async function nhom7AddProduct(){

    const name =
        document.getElementById("nhom7-name").value;

    const price =
        document.getElementById("nhom7-price").value;

    const stock =
        document.getElementById("nhom7-stock").value;

    const imageFile =
        document.getElementById("nhom7-image").files[0];

    const image =
        "products/" + imageFile.name;

    const description =
        document.getElementById("nhom7-description").value;

    const product = {

        name: name,

        price: price,

        stock: stock,

        image: image,

        description: description,

        ingredients: "Đang cập nhật",

        status: true,

        category: {
            id: 1
        },

        brand: {
            id: 1
        }
    };

    try{

        await fetch(
            "http://localhost:8080/api/products",
            {
                method: "POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify(product)
            }
        );

        alert("Thêm sản phẩm thành công");

        nhom7LoadAdminProducts();

    }catch(error){

        console.error(error);
    }
}
document
    .getElementById("nhom7-image")
    .addEventListener("change", function(event){

        const file =
            event.target.files[0];

        if(file){

            const imageUrl =
                URL.createObjectURL(file);

            const preview =
                document.getElementById(
                    "nhom7-preview-image"
                );

            preview.src = imageUrl;

            preview.style.display = "block";
        }
    });
nhom7LoadAdminProducts();