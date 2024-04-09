let currentURL = new URL(window.location.href);

// Lấy giá trị của tham số "id" từ URL
let idToSearch = currentURL.searchParams.get("id");

fetch('/api/devices/getInfoByID', {
    method: 'POST', // Phương thức là POST
    headers: {
        'Content-Type': 'text/plain' // Đặt kiểu nội dung là text/plain
    },
    body: idToSearch // Nội dung của yêu cầu là nội dung text đã được xác định ở trên
})
    .then(response => {
        if (response.ok) {
            alert("Lấy dữ liệu thành công")
            return response.json()
            // Thực hiện các hành động khác sau khi gửi thành công
        } else {
            alert("Đã xảy ra lỗi khi gửi dữ liệu.");
        }
    })
    .then(data => {
        if (data ===undefined) {
            alert("Không tìm thấy, sai ID")
        } else {
            console.log(data)
        }
    })
    .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
        alert("Đã xảy ra lỗi khi gửi dữ liệu.");
    });