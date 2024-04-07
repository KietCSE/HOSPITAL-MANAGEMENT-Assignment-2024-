document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault(); // Ngăn chặn việc gửi yêu cầu mặc định của form
    var name = document.getElementById("Name").value;
    var type = document.getElementById("Type").value;
    var supplier = document.getElementById("Supplier").value;
    var totalAmount = document.getElementById("TotalAmount").value;
    var date = document.getElementById("Date").value;
    var img = document.getElementById("Img").files[0];

    // Kiểm tra xem các trường bắt buộc đã được nhập đầy đủ hay không
    if (name === '' || type === '' || supplier === '' || totalAmount === '' ||
        date === '' || img === undefined) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
    }

    // Kiểm tra độ lớn của file
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
    if (img.size > maxSizeInBytes) {
        alert("Kích thước file quá lớn. Vui lòng chọn một file nhỏ hơn.");
        return;
    }

    // Lấy thông tin từ các trường input trong form
    var formData = {
        Name: name,
        Type: type,
        Supplier: supplier,
        TotalAmount: totalAmount,
        Date: date,
        Img: img
    };

    // Gửi yêu cầu POST đến server
    fetch('/api/devices/add', {
        method: "POST",
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