$('#login').on('click', function() {
    console.log('clicked');
    $.ajax({
        url: 'https://csse280-beerup-backend.herokuapp.com/people/login/' + $('#username').val() + '/' + $('#password').val(),
        type: 'POST',
        success: function(data) {

            var expire = new Date().getTime() + 86400
            var forLocal = { token: data.token, expire: expire };
            var username = $('#username').val();
            localStorage.setItem("username", username);
            localStorage.setItem("webToken", JSON.stringify(forLocal));
            console.log(data);
            window.location = "../index.html";
        },
        error: function(request, status, error) {
            alert(error);
        }
    });
});

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
            '<button class="button">' +
            '<a class = "nounderline" href="../index.html">' +
            '<span>HOME</span>' +
            '</a>' +
            '</button>' +
            '<button class="button">' +
            '<a class = "nounderline" href="./mylist.html">' +
            '<span >MY LIST</span>' +
            '</a>' +
            '</button>' +
            '<button class="button">' +
            '<a class = "nounderline" href="./review.html">' +
            '<span >REVIEW</span>' +
            '</a>' +
            '</button>' +
            '<button onclick="logoff()" class="button" >' +
            '<a class = "nounderline">' +
            '<span >LOG OUT</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" >' +
            '<a class = "nounderline" href="./search.html">' +
            '<span >SEARCH</span>' +
            '</a>' +
            '</button>'
        );
        buttonContainer.append(buttonelement);

    } else {
        var buttonContainer = $('#menu-container').empty();
        var buttonelement = $(
            '<button class="button" >' +
            '<a class = "nounderline" href="../index.html">' +
            '<span >HOME</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" >' +
            '<a class = "nounderline" href="./register.html">' +
            '<span>REGISTER</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" >' +
            '<a class = "nounderline" href="./search.html">' +
            '<span >SEARCH</span>' +
            '</a>' +
            '</button>'
        );
        buttonContainer.append(buttonelement);
    }
}

function logoff() {
    localStorage.clear();
    detect();
    window.location.href = '../index.html'
}