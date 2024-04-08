document.getElementById("submit").addEventListener("click", function(event) {
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