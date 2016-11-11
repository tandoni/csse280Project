var searchString;

var ALL_QUOTES = [];

// Use this to store user's choice
var userChoice = 'all';

// Use this to update the search string
var searchString;

 function displayBeer(container, quote) {
     var quoteElement = $('<div class="my-review-token"><div class="my-review"><span class="beer-intro">Beer Name: ' +
       quote.beerName + '</span><br /><span class="beer-intro">Rating: ' + quote.rating +
        ' </span> <br /><span class="beer-intro">Review: ' + quote.review +
        ' </span><br /> <span class="beer-intro-user">-  ' + quote.firstName + ' ' + quote.lastName +
        ' </span> </div><div class="review-button-block"> <button class="deleteButton" id="' + quote._id + '" data-reviewid="'+ quote._id+'">DELETE</button></div></div>');
    container.append(quoteElement);
    var selec = '#' + quote._id;
    $(selec).on('click', function(e) {
        var rev = e.target.getAttribute("data-reviewid");
        deleteCurrent(rev);
    });
 }


function displayQuotes(quotes) {
    var quotesContainer = $('#reviews-container').empty();
    quotes.forEach(function(quote, index) {
        displayBeer(quotesContainer, quote);
    });
}

// function updateCurrent(revId) {
//     var token = JSON.parse(localStorage.getItem('webToken'));
//     $.ajax({
//           type: "DELETE",
//           url: 'https://csse280-beerup-backend.herokuapp.com/reviews/' + token,
//           data: {id: revId},
//           success: function(data) {
//             console.log('review deleted');
//             displayAllQuotes();
//           },
//           dataType: 'JSON',
//     });
// }

function deleteCurrent(revId) {
    var token = JSON.parse(localStorage.getItem('webToken'));
    $.ajax({
          type: "DELETE",
          url: 'https://csse280-beerup-backend.herokuapp.com/reviews/' + token,
            data: {id: revId},
          success: function(data) {
            if (data.message === false) {
                alert(data.description);
            } else {
                window.location.href = "./mylist.html";
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

function search() {
    var contentFunction = makeQuotesWhoseBeersNameStartWith(searchString);
    displayQuotes(contentFunction());
    return;
}

function makeQuotesWhoseBeersNameStartWith(prefix) {
    var quotes = [];
    return function() {
        ALL_QUOTES.forEach(function(object, index) {
            if (object.beer[0] == prefix || prefix == "") {
                quotes.push(object);
            }
        })
        return quotes;
    };
}

function setup() {
    displayAllQuotes();
}

function displayAllQuotes() {
    var token = JSON.parse(localStorage.getItem('webToken'));
    $.ajax({
        url: 'https://csse280-beerup-backend.herokuapp.com/reviews/' + token.token,
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

$(window).on('load', function() {
    //load in initial state
    setup();
});

$('#search').on('input', function() {
    searchString = $(this).val();
    search();
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
            '<button class="button" >' +
            '<a class = "nounderline" href="../index.html">' +
            '<span >HOME</span>' +
            '</a>' +
            '</button>' +
            '<button class="button" >' +
            '<a class = "nounderline" href="./review.html">' +
            '<span >REVIEW</span>' +
            '</a>' +
            '</button>' +
            '<button onclick="logoff()" class="button" >' +
            '<a class = "nounderline">' +
            '<span >LOG OFF</span>' +
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