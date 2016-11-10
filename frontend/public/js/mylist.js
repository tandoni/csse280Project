var searchString;

var ALL_QUOTES = [{
        index: "0",
        review: "Welcome every morning with a smile. Look on the new day as another special gift from your Creator, another golden opportunity.",
    },
    {
        index: "1",
        review: "Happiness cannot be traveled to, owned, earned, or worn.It is the spiritual experience of living every minute with love, grace & gratitude.",
    },
    {
        index: "2",
        review: "Though no one can go back and make a brand new start, anyone can start from now and make a brand new ending",
    },
    {
        index: "3",
        review: "Accept responsibility for your life.Know that it is you who will get you where you want to go, no one else.",
    },
    {
        index: "4",
        review: "Surround yourself with only people who are going to lift you higher.",
    },
    {
        index: "5",
        review: "Nobody ever wrote down a plan to be broke, fat, lazy, or stupid.Those things are what happen when you don’t have a plan.",
    }
];

// Use this to store user's choice
var userChoice = 'all';

// Use this to update the search string
var searchString;

function displayBeer(container, quote) {
    var quoteElement = $('<div id = "my-review-' + quote.index + '" class="my-review-token"><div class = "my-review"><span class="beer-intro">' + quote.review + '</span> </div><div class ="review-button-block"> <button onclick = "deleteCurrent(' + quote.index + ')" class = "button" id = "review-button-' +
        quote.index + '><a class = "nounderline"><span>DELETE</span></a></button></div></div>');
    container.append(quoteElement);
}

function displayQuotes(quotes) {
    var quotesContainer = $('#reviews-container').empty();
    quotes.forEach(function(quote, index) {
        displayBeer(quotesContainer, quote);
    });
}

function deleteCurrent(index) {
    var realIndex = -1;
    for (i = 0; i < ALL_QUOTES.length; i++) {
        if (ALL_QUOTES[i].index == index) {
            realIndex = i;
        }
    }

    ALL_QUOTES.splice(realIndex, 1);
    displayQuotes(ALL_QUOTES);
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
    displayQuotes(ALL_QUOTES);
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