var items_number = document.getElementById('number');
var SPAN = document.getElementById('Is_aval');

try {
    var number = parseInt(items_number.textContent.trim());
    if (isNaN(number)) {
        throw "Không phải là số";
    } else if (number === 0) {
        SPAN.textContent = "Không có sẵn";
        SPAN.style.color = "red";
    } else if (number > 0) {
        SPAN.textContent = "Còn hàng";
        SPAN.style.color = "green";
    } else {
        throw "Số lượng thuốc không hợp lệ";
    }
} catch (error) {
    SPAN.textContent = error;
    SPAN.style.color = "red";
}

document.querySelector('.Click').addEventListener("click", () => {
       window.location.href = '/medicine/form';
});