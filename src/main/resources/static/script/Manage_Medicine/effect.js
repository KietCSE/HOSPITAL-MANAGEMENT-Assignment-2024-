function toggleOpacity1() {
    var mecTitle1 = document.querySelector('.mec-title-1');
    var mecTitle2 = document.querySelector('.mec-title-2');

    if (mecTitle2.classList.contains('show')) {
        mecTitle2.classList.toggle('show');
    }
    mecTitle1.classList.toggle('show');
}
function toggleOpacity2() {
    var mecTitle1 = document.querySelector('.mec-title-1');
    var mecTitle2 = document.querySelector('.mec-title-2');
    if (mecTitle1.classList.contains('show')) {
        mecTitle1.classList.toggle('show');
    }
    mecTitle2.classList.toggle('show');
}