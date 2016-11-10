$(document).ready(function() {
    var name = $('#beerName').val();
    var brewery = $('#breweryName').val();
    var review = $('#review').val();
     
        $('#addReview').on('click', function() {
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
            // } else {
            //     window.location.href = "./login.html";
            //     alert('Token expired. Please login again!');
            //     localStorage.clear();
            // }
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
            '&nbsp' +
            localStorage.getItem("username") +
            '.' +
            '</div>' +
            '<button class="button" style="display: inline-block">' +
            '<a class = "nounderline" href="../index.html">' +
            '<span >MAIN</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" style="display: inline-block">' +
            '<a class = "nounderline" href="./mylist.html">' +
            '<span >MY LIST</span>' +
            '</a>' +
            '<button onclick="logoff()" class="button" style="display: inline-block">' +
            '<a class = "nounderline">' +
            '<span >LOG OFF</span>' +
            '</a>' +
            '</button>' +
            '<input type="text" name="search">' +
            '<button class="button" style="display: inline-block">' +
            '<a class = "nounderline" href="./search.html">' +
            '<span >SEARCH</span>' +
            '</a>' +
            '</button>'
        );
        buttonContainer.append(buttonelement);

    } else {
        var buttonContainer = $('#menu-container').empty();
        var buttonelement = $(
            '<button class="button" style="display: inline-block">' +
            '<a class = "nounderline" href="../index.html">' +
            '<span >MAIN</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" style="display: inline-block">' +
            '<a class = "nounderline" href="./login.html">' +
            '<span>LOG IN</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" style="display: inline-block">' +
            '<a class = "nounderline" href="./register.html">' +
            '<span>REGISTER</span>' +
            '</a>' +
            '</button>' +
            '<input type="text" name="search">' +
            '<button class="button" style="display: inline-block">' +
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