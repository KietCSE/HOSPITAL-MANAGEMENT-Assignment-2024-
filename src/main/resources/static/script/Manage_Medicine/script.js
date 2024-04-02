let newProductDiv = document.querySelector('.New_Product');

function DOOM(checkbox) {
    if (checkbox.checked === true) {
        newProductDiv.style.opacity = "1";
        newProductDiv.style.pointerEvents = "auto";
    } else {
        newProductDiv.style.opacity = "0.5";
        newProductDiv.style.pointerEvents = "none";
    }
}