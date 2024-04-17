username = sessionStorage.getItem('Username');
if (username !== "" && username != null) {
    document.querySelector('.header .login-btn a').innerText = username;
}
else {
    document.querySelector('.header .login-btn a').innerText = "Tài khoản";
}

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
    document.getElementById("img").src = devices.img_url

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

function onCheckboxChange(checkbox) {
    if (checkbox.checked) {
        disableOtherCheckboxes(checkbox);
    } else {
        activeOtherCheckboxes(checkbox);
    }
}

function disableOtherCheckboxes(checkedCheckbox) {
    let checkboxes = document.getElementsByClassName('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i];
        if (checkbox !== checkedCheckbox) {
            checkbox.disabled = true;
        }
    }
}
function activeOtherCheckboxes(checkedCheckbox) {
    let checkboxes = document.getElementsByClassName('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i];
        if (checkbox !== checkedCheckbox) {
            checkbox.disabled = false;
        }
    }
}

function gotoForm(id) {
    console.log(id)
    var idUpdateInput = document.getElementById('ID');
    idUpdateInput.value = id;

    var form = document.getElementById('updateItem');
    form.scrollIntoView({ behavior: "smooth" });
}

function indexOfItem(id) {
    for (let i = 0; i<globalData.itemsList.length; i++) {
        if (globalData.itemsList[i].id === id) {return i}
    }
    return -1
}

function checkIdInput(ID) {
    if (ID === "") {
        alert("Chưa nhập ID")
        return false
    } else {
        let useCheckbox = document.getElementById("Use")
        let brokenCheckbox = document.getElementById("Broken")
        let deleteCheckbox = document.getElementById("DeleteItem")
        let index = indexOfItem(ID)
        if (index === -1) {
            alert("Chỉ nhập ID trong danh sách bên trên")
            return false
        } else {
            let item = globalData.itemsList[index]
            if (item.state === "damaged") {
                if (useCheckbox.checked || brokenCheckbox.checked) {
                    alert("Thiết bị đã hỏng, không thể sử dụng hoặc tiếp tục báo lỗi")
                    return false
                } else if (deleteCheckbox.checked) {
                    return true
                } else {
                    alert("Chưa chọn loại yêu cầu")
                    return false
                }
            } else {
                if (deleteCheckbox.checked) {
                    alert("Không thể xóa thiết bị chưa hỏng")
                    return false
                }
            }
        }
    }
    return true
}

document.getElementById("submitForm").addEventListener("click", function (event) {
        event.preventDefault()
        let ID = document.getElementById("ID")
        let Use = document.getElementById("Use")
        let location = document.getElementById("location")
        let Broken = document.getElementById("Broken")
        let DeleteItem = document.getElementById("DeleteItem")
        let postData
        if (checkIdInput(ID.value)) {
            if (Use.checked) {
                if (location.value === "") {
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
            } else if (DeleteItem.checked) {
                postData = {
                    ID: ID.value,
                    Act: "DeleteItem",
                    Location: ""
                }
            }
        }
        if (postData !== undefined) {
            console.log(postData)
            let confirmation = confirm("Xác nhận thực hiện hành động này?");
            if (confirmation === true) {
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
                        if (data === true) {
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
        alert("Chỉ có thể xóa nhóm thiết bị khi tất cả thiết bị đều hỏng hoặc tổng số lượng = 0")
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