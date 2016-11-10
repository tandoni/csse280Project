var searchString;

var ALL_QUOTES = [];

// Use this to store user's choice
var userChoice = 'all';

// Use this to update the search string
var searchString;
var currQuote = '';

function displayBeer(container, quote) {
    var quoteElement = $('<div class="my-review-token"><div class="my-review"><span class="beer-intro">Beer Name: ' +
      quote.beerName + '</span><br /><span class="beer-intro">Rating: ' + quote.rating +
       ' </span> <br /><span class="beer-intro">Review: ' + quote.review +
       ' </span><br /> <span class="beer-intro-user">-  ' + quote.firstName + ' ' + quote.lastName +
        ' </span> </div><div class="review-button-block"> <button onclick="updateCurrent("' + 
      quote._id + '")" id="updateButton">UPDATE</button> <button onclick="deleteCurrent()" id="deleteButton">DELETE</button></div></div>');
    container.append(quoteElement);
    currQuote = quote;
}

function displayQuotes(quotes) {
    var quotesContainer = $('#reviews-container').empty();
    quotes.forEach(function(quote, index) {
        displayBeer(quotesContainer, quote);
    });
}

function deleteCurrent() {
    var realIndex = -1;
    for (i = 0; i < ALL_QUOTES.length; i++) {
        if (ALL_QUOTES[i]._id == currQuote._id) {
            realIndex = i;
        }
    }
    var token = JSON.parse(localStorage.getItem('webToken'));
    $.ajax({
          type: "DELETE",
          url: 'https://csse280-beerup-backend.herokuapp.com/reviews/' + token,
          data: {id: ALL_QUOTES[realIndex]._id },
          success: function(data) {
            console.log('review deleted');
            displayAllQuotes();
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
            '<a class = "nounderline" href="./review.html">' +
            '<span >REVIEW</span>' +
            '</a>' +
            '</button>' +
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