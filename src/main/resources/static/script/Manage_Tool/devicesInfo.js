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
            return response.json()
            // Thực hiện các hành động khác sau khi gửi thành công
        } else {
            alert("Đã xảy ra lỗi khi gửi dữ liệu.");
        }
    })
    .then(data => {
        if (data.length == 0) {
            alert("Không tìm thấy, sai ID")
        } else {
            console.log(data)
            let devices = data[0]
            useDevicesData(devices)
        }
    })
    .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
        alert("Đã xảy ra lỗi khi gửi dữ liệu.");
    });

function useDevicesData(devices) {
    //
    document.getElementById("infoName").innerHTML = devices.name
    document.getElementById("infoID").innerHTML = devices.id
    document.getElementById("infoType").innerHTML = devices.type
    document.getElementById("infoSupplier").innerHTML = devices.supplier
    document.getElementById("infoDateIn").innerHTML = devices.date
    document.getElementById("infoLastUpdate").innerHTML =
        devices.updateLog[devices.updateLog.length-1].date
    document.getElementById("infoTotalAmount").innerHTML = devices.totalAmount
    document.getElementById("infoInUseAmount").innerHTML = devices.inUseAmount
    document.getElementById("infoDamagedAmount").innerHTML = devices.damagedAmount
    document.getElementById("infoStoredAmount").innerHTML = devices.storedAmount

    //===================//
    //Hiển thị Update Log
    const tbody = document.getElementById("logTable").getElementsByTagName('tbody')[0];

    for (let i = 0; i < devices.updateLog.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML =
            `<td>${devices.updateLog[i].date}</td>
            <td>${devices.updateLog[i].totalAmount}</td>
            <td>${devices.updateLog[i].inUseAmount}</td>
            <td>${devices.updateLog[i].damagedAmount}</td>
            <td>${devices.updateLog[i].storedAmount}</td>`
        tbody.appendChild(row)
    }
    //===================//
    //Hiển thị danh sách chi tiết
    const tbody_list = document.getElementById("itemList").getElementsByTagName('tbody')[0];

    for (let i = 0; i < devices.itemsList.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML =
            `<td>${i+1}</td>
            <td>${devices.itemsList[i].id}</td>
            <td>${devices.itemsList[i].located}</td>
            <td>${devices.itemsList[i].state}</td>
            <td><a href="/tool/updateItem?id=${devices.itemsList[i].id}">Chi tiết</a></td>`
        tbody_list.appendChild(row)
    }
}