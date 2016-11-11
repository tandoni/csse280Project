var images = [],
    x = -1;
images[0] = "images/1.jpg";
images[1] = "images/2.gif";
images[2] = "images/3.jpeg";


function detect() {
    var date = new Date();
    var greeting = "";
    if (date.getHours() > 0 && date.getHours() < 6) {
        greeting = "Have some beer before you sleep?";
    } else if (date.getHours() >= 6 && date.getHours() <= 11) {
        greeting = "Greetings! A new day always begins with a glass of beer!";
    } else if (date.getHours() > 11 && date.getHours() <= 14) {
        greeting = "Want to have some beer during the lunch time?";
    } else if (date.getHours() > 14 && date.getHours() <= 17) {
        greeting = "Hope you don't feel thirsty without having a beer in the afternoon.";
    } else if (date.getHours() > 17 && date.getHours() <= 19) {
        greeting = "We can't have dinner without beer, can we?";
    } else {
        greeting = "Have some beer with your friends in the evening?";
    }

    if ((localStorage.getItem("username") != null && localStorage.getItem("username").length > 0)) {
        var buttonContainer = $('#menu-container').empty();
        var buttonelement = $(
            '<div class = "welcome">' +
            greeting +
            '&nbsp<span id="loggedInUser">Welcome, ' + 
            localStorage.getItem("username") +
            '!</span>' +
            '</div>' +
            '<button class="button" >' +
            '<a class = "nounderline" href="./templates/mylist.html">' +
            '<span >MY LIST</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" >' +
            '<a class = "nounderline" href="./templates/review.html">' +
            '<span >REVIEW</span>' +
            '</a>' +
            '</button>' +
            '<button onclick="logoff()" class="button" >' +
            '<a class = "nounderline">' +
            '<span >LOG OUT</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" >' +
            '<a class = "nounderline" href="./templates/search.html">' +
            '<span >SEARCH</span>' +
            '</a>' +
            '</button>'
        );
        buttonContainer.append(buttonelement);

    } else {
        var buttonContainer = $('#menu-container').empty();
        var buttonelement = $(
            '<button class="button" >' +
            '<a class = "nounderline" href="./templates/login.html">' +
            '<span>LOG IN</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" >' +
            '<a class = "nounderline" href="./templates/register.html">' +
            '<span>REGISTER</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" >' +
            '<a class = "nounderline" href="./templates/search.html">' +
            '<span >SEARCH</span>' +
            '</a>' +
            '</button>'
        );
        buttonContainer.append(buttonelement);
    }
}


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
    detect();
}

function logoff() {
    localStorage.clear();
    detect();    
    window.location.href = '../index.html';
}