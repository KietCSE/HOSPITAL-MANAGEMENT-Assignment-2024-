let currentURL = new URL(window.location.href);

// Lấy giá trị của tham số "id" từ URL
let idToSearch = currentURL.searchParams.get("id");

let globalData

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
            globalData = devices
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
            <td onclick="gotoForm(${devices.itemsList[i].id})">Cập nhật</></td>`
        tbody_list.appendChild(row)
    }
}

function toggleCheckbox(checkbox) {
    var otherCheckboxId = checkbox.id === "Use" ? "Broken" : "Use";
    var otherCheckbox = document.getElementById(otherCheckboxId);

    if (checkbox.checked) {
        otherCheckbox.disabled = true;
    } else {
        otherCheckbox.disabled = false;
    }
}

function gotoForm(id) {
    console.log(id)
    var idUpdateInput = document.getElementById('ID');
    idUpdateInput.value = id;

    var form = document.getElementById('updateItem');
    form.scrollIntoView({ behavior: "smooth" });
}

document.getElementById("ID").addEventListener("input", function (event) {
    let ID = this.value;
    let parts = ID.split("_");
    if (parts.length !== 0) {
        let beforeUnderscore = parts[0];
        let afterUnderscore = parts[1];
        if (beforeUnderscore === idToSearch) {
            let item = globalData.itemsList[afterUnderscore]
            if (item.state==="damaged") {
                document.getElementById("Use").disabled = true
                document.getElementById("Broken").disabled = true
            } else {
                document.getElementById("Use").disabled = false
                document.getElementById("Broken").disabled = false
            }
        }
    }
});

document.getElementById("updateItem").addEventListener("submit", function (event){
    event.preventDefault()
    var ID = document.getElementById("ID")
    var Use = document.getElementById("Use")
    var location = document.getElementById("location")
    var Broken = document.getElementById("Broken")
    let postData
    if (ID.value==="") {
        alert("Chưa nhập ID")
    } else {
        if (Use.checked) {
            if (location.value==="") {
                alert("Chưa nhập vị trí")
            } else {
                postData = {
                    ID: ID.value,
                    Act: "Use",
                    Location: location.value
                }
            }
        } else if (Broken.checked) {
            postData = {
                ID: ID.value,
                Act: "Broken",
                Location: ""
            }
        } else {
            alert("Chưa chọn loại yêu cầu")
        }
    }
    if (postData !== undefined) {
        console.log(postData)
        fetch('/api/devices/updateItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("Đã xảy ra lỗi khi gửi dữ liệu.");
                }
            })
            .then(data => {
                console.log(data)
                if (data===true) {
                    alert("Cập nhật thành công")
                    window.location.reload()
                } else {
                    alert("Sai ID hoặc lỗi trong lúc gửi dữ liệu")
                }
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi:', error);
                alert("Đã xảy ra lỗi khi gửi dữ liệu.");
            });
    }
});

document.getElementById("save").addEventListener("click", function (event) {
    let confirmation = confirm("Xác nhận lưu trạng thái hiện tại?");
    if (confirmation === true) {
        fetch('/api/devices/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plan'
            },
            body: idToSearch
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("Đã xảy ra lỗi khi gửi dữ liệu.");
                }
            })
            .then(data => {
                if (data === true) {
                    alert("Lưu thành công")
                    window.location.reload()
                } else {
                    alert("Đã xảy ra lỗi khi gửi dữ liệu.");
                }
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi:', error);
                alert("Đã xảy ra lỗi khi gửi dữ liệu.");
            });
    }
});

document.getElementById("delete").addEventListener("click", function (event) {
    console.log(globalData)
    if (globalData.damagedAmount !== globalData.totalAmount) {
        alert("Chỉ có thể xóa nhóm thiết bị khi tất cả thiết bị đều hỏng")
    } else {
        let confirmation = confirm("Xác nhận xóa nhóm thiết bị này?");
        if (confirmation === true) {
            fetch('/api/devices/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'text/plan'
                },
                body: idToSearch
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        alert("Đã xảy ra lỗi khi gửi dữ liệu.");
                    }
                })
                .then(data => {
                    if (data === true) {
                        alert("Đã xóa")
                        window.location.href="/tool/form";
                    } else {
                        alert("Đã xảy ra lỗi khi gửi dữ liệu.");
                    }
                })
                .catch(error => {
                    console.error('Đã xảy ra lỗi:', error);
                    alert("Đã xảy ra lỗi khi gửi dữ liệu.");
                });
        }
    }
});