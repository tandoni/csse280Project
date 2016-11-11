$(document).ready(function() {
    $('#addReview').on('click', function() {
        var name = $('#beerName').val();
        var brewery = $('#breweryName').val();
        var review = $('#review').val();
        if (name == '' || brewery == '' || review == '') {
            alert('Please enter all inputs');
        } else {
        // console.log('asdasd');
            var token = JSON.parse(localStorage.getItem('webToken'));
            // if (token.expire > Date.now()) {
            $.ajax({
                url: 'https://csse280-beerup-backend.herokuapp.com/reviews/addreview/' + name + '/' + brewery + '/' + $('#rating').val() + '/' + review,
                type: 'POST',
                data: token,
                success: function(data) {
                    console.log(data);
                    if (data.message === false) {
                        window.location.href = "./login.html";
                        alert('Token expired. Please login again!');
                        localStorage.clear();
                    } else {
                        window.location.href = "./mylist.html";
                    }
                },
                error: function(request, status, error) {
                    alert(error);
                }
            });
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
            '<span >HOME</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" >' +
            '<a class = "nounderline" href="./mylist.html">' +
            '<span >MY LIST</span>' +
            '</a>' +
            '<button onclick="logoff()" class="button" >' +
            '<a class = "nounderline">' +
            '<span>LOG OUT</span>' +
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
            '<a class = "nounderline" href="./login.html">' +
            '<span>LOG IN</span>' +
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
    window.location = "../index.html";
}