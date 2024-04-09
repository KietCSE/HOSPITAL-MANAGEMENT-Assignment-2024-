function toggleContent() {
  var mainContent = document.getElementById("mainContent");
  var updateContent = document.getElementById("updateContent");

  if (mainContent.style.display === "none") {
    mainContent.style.display = "block";
    updateContent.style.display = "none";
  } else {
    mainContent.style.display = "none";
    updateContent.style.display = "block";
  }
}

var in1 = document.getElementById("input_bangCap");
var in2 = document.getElementById("input_chuyenKhoa");
var in3 = document.getElementById("input_linhVuc");

in1.addEventListener("input", function () {
  document.getElementById("bangCap").innerText = in1.value;
});

in2.addEventListener("input", function () {
  document.getElementById("chuyenKhoa").innerText = in2.value;
});

in3.addEventListener("input", function () {
  document.getElementById("linhVuc").innerText = in3.value;
});
