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
        greeting = "Having some beer before you sleep or keeping fit?";
    } else if (date.getHours() >= 6 && date.getHours() <= 11) {
        greeting = "Greeting! A new day always begins with a cup of beer!";
    } else if (date.getHours() > 11 && date.getHours() <= 14) {
        greeting = "Want to have some beer during the lunch time?";
    } else if (date.getHours() > 14 && date.getHours() <= 17) {
        greeting = "Hope you don't feel thirsty without having beer in the afternoon.";
    } else if (date.getHours() > 17 && date.getHours() <= 19) {
        greeting = "We can't have dinner without beer, don't we?";
    } else {
        greeting = "Have some beer with you friends in the evening?";
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
            '<span >MAIN</span>' +
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
<<<<<<< HEAD
            '<input type="text" name="search">' +
            '<button class="button" >' +
=======
            '<button class="button" style="display: inline-block">' +
>>>>>>> cd2792defdd6a30623c46922addfdd41f3ca9fb1
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
            '<span >MAIN</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" >' +
            '<a class = "nounderline" href="./register.html">' +
            '<span>REGISTER</span>' +
            '</a>' +
            '</button>' +
<<<<<<< HEAD
            '<input type="text" name="search">' +
            '<button class="button" >' +
=======
            '<button class="button" style="display: inline-block">' +
>>>>>>> cd2792defdd6a30623c46922addfdd41f3ca9fb1
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