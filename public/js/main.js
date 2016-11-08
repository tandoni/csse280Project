var images = [],
    x = -1;
images[0] = "images/1.jpg";
images[1] = "images/2.gif";
images[2] = "images/3.jpeg";

function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("mainpage_switch_img").src = images[x];
    return false;
}

function displayPreviousImage() {
    x = (x <= 0) ? images.length - 1 : x - 1;
    document.getElementById("mainpage_switch_img").src = images[x];
    return false;
}

function startTimer() {
    setInterval(displayNextImage, 5000);
}