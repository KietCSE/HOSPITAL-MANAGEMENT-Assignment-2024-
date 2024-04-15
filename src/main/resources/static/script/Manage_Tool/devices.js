username = sessionStorage.getItem('Username');
if (username !== "" && username != null) {
    document.querySelector('.header .login-btn a').innerText = username;
}
else {
    document.querySelector('.header .login-btn a').innerText = "Tài khoản";
}

fetch('/api/devices/getFullDevices', {
    method: 'GET',
    headers: {
        'Content-Type': 'text/plan'
    },
    body: null
})
    .then(response => {
        if (!response.ok) {
            alert("Đã xảy ra lỗi khi lấy dữ liệu.");
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        if (data.length !== 0) {
            let table = document.querySelector(".table tbody");
            let rows = table.querySelectorAll("tr");
            for (let i = 0; i < rows.length; i++) {
                table.removeChild(rows[i])
            }
            for (let i = 0; i < data.length; i++) {
                let devices = data[i]
                let newRow = document.createElement('tr');
                newRow.innerHTML = `
                                <td>${i + 1}</td>
                                <td>${devices.id}</td>
                                <td>${devices.name}</td>
                                <td>${devices.date}</td>
                                <td>${devices.totalAmount}</td>
                                <td>${devices.inUseAmount}</td>
                                <td>${devices.damagedAmount}</td>
                                <td>${devices.storedAmount}</td>
                                <td><a href="/tool/info?id=${devices.id}">Chi tiết</a></td>`;
                document.querySelector(".table tbody").appendChild(newRow);
            }
        } else {
            alert("Danh sách thiết bị trống")
        }
    })
    .catch(error => {
        alert("Đã xảy ra lỗi khi lấy dữ liệu.");
    });

document.querySelector(".form .search button").addEventListener("click", function () {
    let input = document.querySelector(".form .search input").value;
    if (input !== "") {
        let table = document.querySelector(".table tbody");
        let rows = table.querySelectorAll("tr");
        for (let i = 0; i < rows.length; i++) {
            let cols = rows[i].querySelectorAll("td");
            let found = false;
            for (let j = 0; j < cols.length; j++) {
                if (cols[j].textContent === input) {
                    found = true;
                    break;
                }
            }
            if (found) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
    else {
        let table = document.querySelector(".table tbody");
        let rows = table.querySelectorAll("tr");
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.display = "";
        }
    }
});

document.getElementById("submit").addEventListener("click",
    function (event) {
        event.preventDefault(); // Ngăn chặn việc gử
        // Lấy thông tin từ các trường input trong form
        let name = document.getElementById("Name").value
        let type = document.getElementById("Type").value
        let supplier = document.getElementById("Supplier").value
        let totalAmount = document.getElementById("TotalAmount").value
        let date = document.getElementById("Date").value

        if (name === '' || type === '' || supplier === '' ||
            totalAmount === '' || date === '') {
            alert("Chưa điền đủ thông tin");
            return;
        }

        if (isNaN(parseInt(totalAmount)) || parseInt(totalAmount) < 0) {
            alert("Số lượng không hợp lệ")
            return;
        }

        let formData = {
            Name: name,
            Type: type,
            Supplier: supplier,
            TotalAmount: totalAmount,
            InUseAmount: 0,
            DamagedAmount: 0,
            StoredAmount: totalAmount,
            Date: date,
            Img_url: null
        };

        // Xử lý hình ảnh ///////////////////////////////////////
        let File = document.getElementById("Image");
        if (!File) {
            alert("Vui lòng chọn hình ảnh")
            return;
        }
        let file = File.files[0];
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
            alert("Định dạng ảnh không hợp lệ");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert("Kích thước ảnh không được vượt quá 2MB");
            return;
        }
        let f = new FormData();
        f.append("file", file);
        fetch('/api/Image', {
            method: 'POST',
            body: f
        }).then(response => {
            if (response.ok) {
                return response.text();
            }
            else {
                alert("Không thể upload hình ảnh");
            }
        }).then(url => {
            formData.Img_url = url;
            console.log(formData);
            fetch('/api/devices/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (response.ok) {
                        alert("Dữ liệu đã được gửi thành công!");
                    } else {
                        alert("Đã xảy ra lỗi khi gửi dữ liệu.");
                    }
                })
        }).catch(error => {
            alert(error);
        });
    });