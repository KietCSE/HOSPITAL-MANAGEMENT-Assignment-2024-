document.getElementById("submit").addEventListener("click",
    function(event) {
    event.preventDefault(); // Ngăn chặn việc gửi yêu cầu mặc định của form

    // Lấy thông tin từ các trường input trong form
    var name = document.getElementById("Name").value
    var type = document.getElementById("Type").value
    var supplier = document.getElementById("Supplier").value
    var totalAmount = document.getElementById("TotalAmount").value
    var date = document.getElementById("Date").value

    if (name === '' || type === '' || supplier === '' ||
        totalAmount === '' || date === '') {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
    }

    var formData = {
        Name: name,
        Type: type,
        Supplier: supplier,
        TotalAmount: totalAmount,
        InUseAmount: 0,
        DamagedAmount: 0,
        StoredAmount: totalAmount,
        Date: date
    };
    console.log(formData)
    // Gửi yêu cầu POST đến server
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
                // Thực hiện các hành động khác sau khi gửi thành công
            } else {
                alert("Đã xảy ra lỗi khi gửi dữ liệu.");
            }
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi:', error);
            alert("Đã xảy ra lỗi khi gửi dữ liệu.");
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
                                <td><a href="/tool/info?id=${devices.id}">Info</a></td>`;
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