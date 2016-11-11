var searchString;

var ALL_QUOTES = [];

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
};


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


// Use this to store user's choice
var userChoice = 'all';

function displayBeer(container, quote) {
    var quoteElement = $('<div class="beer-token"><div class ="beer-pic-block"><img id = "beer-pic-' +
     quote._id + '" src ="' + quote.imageurl + '" style="width:300px;height:170px;"></div><div class = "beer-info"><div class="beer-name">' +
      quote.beer +
        '</div> <span class="beer-intro"> ' + '- ' +
                  quote.description + '</span> </div><div class="review-button-block"> <button class="deleteButton" id="' +
          quote._id + '" data-reviewid="'+ 
          quote._id+'">DELETE</button></div></div>');
    container.append(quoteElement);
    document.getElementById("beer-pic-" + quote._id).src = quote.imageurl;
    var selec = '#' + quote._id;
    $(selec).on('click', function(e) {
        var rev = e.target.getAttribute("data-reviewid");
        deleteCurrent(rev);
    });
}

function deleteCurrent(revId) {
    var token = JSON.parse(localStorage.getItem('webToken'));
    $.ajax({
          type: "DELETE",
          url: 'https://csse280-beerup-backend.herokuapp.com/beers/' + token.token,
            data: {id: revId},
          success: function(data) {
            if (data.message === false) {
                // window.location.href = "./search.html";
                alert(data.description);
            } else {
                window.location.href = "./search.html";
                displayAllQuotes();
            }
          },
          error: function(request, status, error) {
                    console.log(error);
                    console.log(status);
            },
          dataType: 'JSON',
    });
}

function validateImageURL(url) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var image = url.substring(url.length - 4);
    return regexp.test(url) && (image === '.png' || image === '.jpg' || image === '.gif' || image === 'jpeg');
}

function displayQuotes(quotes) {
    var quotesContainer = $('#reviews-container').empty();
    console.log(quotes);
    quotes.forEach(function(quote, index) {
        displayBeer(quotesContainer, quote);
    });
}

function search() {
    makeQuotesWhoseBeersNameStartWith(searchString);
}

function makeQuotesWhoseBeersNameStartWith(prefix) {
    var quotes = [];
    if (typeof prefix !== "undefined") {
        for (var i = 0; i < ALL_QUOTES.length; i++) {
            if (ALL_QUOTES[i].beer.startsWith(prefix)) {
                quotes.push(ALL_QUOTES[i]);
            }
        }
        displayQuotes(quotes);
    }
}

function setup() {
    displayAllQuotes();
}

function displayAllQuotes() {
    var token = JSON.parse(localStorage.getItem('webToken'));
    console.log(token);
    if (token != null) {
        $.ajax({
            url: 'https://csse280-beerup-backend.herokuapp.com/beers/' + token.token,
            type: 'GET',
            success: function(data) {
                ALL_QUOTES = data;
                displayQuotes(ALL_QUOTES);
            },
            error: function(request, status, error) {
                console.log(error);
                console.log(status);
            }
        });
    }
}

$(window).on('load', function() {
    //load in initial state
    detect();
    var token = JSON.parse(localStorage.getItem('webToken'));

    //When user click submit, add to db
    var addbeer = document.getElementById("addbeer");
    addbeer.addEventListener("click", function() {
        var beername = document.getElementById("beer").value;
        var description = document.getElementById("description").value;
        var imgURL = document.getElementById("imgURL").value;
        if (validateImageURL(imgURL) && beername !== '' && description != '') {
            $.ajax({
                url: 'https://csse280-beerup-backend.herokuapp.com/beers/addbeer/' + beername + '/' + description,
                type: 'POST',
                data: { token: token.token, imageurl: imgURL },
                success: function(data) {
                    console.log(data);
                     if (data.message === false) {
                        window.location.href = "./login.html";
                        alert('Token expired. Please login again!');
                        localStorage.clear();
                    } else {
                        window.location.href = "./search.html";
                        displayAllQuotes();
                    }
                },
                error: function(request, status, error) {
                    console.log(error);
                    console.log(status);
                }
            });
        } else {
            alert('Invalid URL or empty input!');
        }
    });

    setup();
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
            '<button onclick="logoff()" class="button">' +
            '<a class = "nounderline">' +
            '<span>LOG OUT</span>' +
            '</a>' +
            '</button>' +
            '<input type="text" id="search">' +
            '<button class="button">' +
            '<a class = "nounderline" href="./search.html">' +
            '<span>SEARCH</span>' +
            '</a>' +
            '</button>'
        );
        buttonContainer.append(buttonelement);
        document.getElementById('myBtn').style.visibility = 'visible';

    } else {
        var buttonContainer = $('#menu-container').empty();
        var buttonelement = $(
            '<button class="button">' +
            '<a class = "nounderline" href="../index.html">' +
            '<span >HOME</span>' +
            '</a>' +
            '<button class="button">' +
            '<a class = "nounderline" href="./login.html">' +
            '<span>LOG IN</span>' +
            '</a>' +
            '</button>' +
            '<button class="button">' +
            '<a class = "nounderline" href="./register.html">' +
            '<span>REGISTER</span>' +
            '</a>' +
            '</button>' +
            '<input type="text" id="search">' +
            '<button class="button">' +
            '<a class = "nounderline" href="./search.html">' +
            '<span >SEARCH</span>' +
            '</a>' +
            '</button>'
        );
        buttonContainer.append(buttonelement);
        document.getElementById('myBtn').style.visibility = 'hidden';
    }
    $('#search').on('input', function() {
        searchString = $(this).val();
        search();
    });
}

function logoff() {
    localStorage.clear();
    detect();
    window.location.href = '../index.html';
}