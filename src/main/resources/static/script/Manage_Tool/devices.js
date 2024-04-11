document.getElementById("submit").addEventListener("click",
    function (event) {
        event.preventDefault(); // Ngăn chặn việc gửi yêu cầu mặc định của form

        // Lấy thông tin từ các trường input trong form
        let name = document.getElementById("Name").value
        let type = document.getElementById("Type").value
        let supplier = document.getElementById("Supplier").value
        let totalAmount = document.getElementById("TotalAmount").value
        let date = document.getElementById("Date").value


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

        if (name === '' || type === '' || supplier === '' ||
            totalAmount === '' || date === '') {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }

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
        fetch('/api/medicine/upload', {
            method: 'POST',
            body: f
        }).then(response => {
            if (response.ok) {
                return response.text();
            }
            else {
                throw new Error("Không thể up ảnh");
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

document.getElementById("search-submit").addEventListener("click",
    function (event) {
        event.preventDefault();
        var searchContent = document.getElementById("search-input").value;
        if (searchContent === "") {
            return
        } else {
            fetch('/api/devices/searchDevices', {
                method: 'POST', // Phương thức là POST
                headers: {
                    'Content-Type': 'text/plain' // Đặt kiểu nội dung là text/plain
                },
                body: searchContent // Nội dung của yêu cầu là nội dung text đã được xác định ở trên
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                        // Thực hiện các hành động khác sau khi gửi thành công
                    } else {
                        alert("Đã xảy ra lỗi khi gửi dữ liệu.");
                    }
                })
                .then(data => {
                    console.log(data)
                    if (data.length != 0) {
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
                                <td>${devices.totalAmount}</td>
                                <td>${devices.inUseAmount}</td>
                                <td>${devices.damagedAmount}</td>
                                <td>${devices.storedAmount}</td>
                                <td><a href="/tool/info?id=${devices.id}">Chi tiết</a></td>`;
                            document.querySelector(".table tbody").appendChild(newRow);
                        }
                    } else {
                        alert("Không tìm thấy")
                    }
                })
                .catch(error => {
                    console.error('Đã xảy ra lỗi:', error);
                    alert("Đã xảy ra lỗi khi gửi dữ liệu.");
                });
        }
    });