
// Lặp qua từng phần tử <tr> và thêm sự kiện click
document.querySelectorAll('.table_body tr').forEach(row => {
    row.addEventListener('click', () => {
        window.location.href = "../Patient_Information/index.html";
        // Thêm code xử lý sự kiện click ở đây
    });
});

document.querySelector(".button .btn button").addEventListener("click", () => {
    window.location.href = "../Patient_Information/index.html";
});



  