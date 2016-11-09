var searchString;

var ALL_QUOTES = [{
        index: "0",
        image: "../images/1.jpg",
        introduction: "Welcome every morning with a smile. Look on the new day as another special gift from your Creator, another golden opportunity.",
        beer: "Og Mandino",
    },
    {
        index: "1",
        image: "../images/2.gif",
        introduction: "Happiness cannot be traveled to, owned, earned, or worn.It is the spiritual experience of living every minute with love, grace & gratitude.",
        beer: "Denis Waitley",
    },
    {
        index: "2",
        image: "../images/3.jpeg",
        introduction: "Though no one can go back and make a brand new start, anyone can start from now and make a brand new ending",
        beer: "Carl Bard",
    },
    {
        index: "3",
        image: "../images/4.jpg",
        introduction: "Accept responsibility for your life.Know that it is you who will get you where you want to go, no one else.",
        beer: "Les Brown",
    },
    {
        index: "4",
        image: "../images/5.jpg",
        introduction: "Surround yourself with only people who are going to lift you higher.",
        beer: "German",
    },
    {
        index: "5",
        image: "../images/craft-beer.jpg",
        introduction: "Nobody ever wrote down a plan to be broke, fat, lazy, or stupid.Those things are what happen when you don’t have a plan.",
        beer: "Larry Winget",
    }
];

//popup modal
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Use this to store user's choice
var userChoice = 'all';

// Use this to update the search string
var searchString;

function displayBeer(container, quote) {
    var quoteElement = $('<div class="beer-token"><div class ="beer-pic-block"><img id = "beer-pic-' + quote.index + '" src = "" style="width:300px;height:170px;"></div><div class = "beer-info"><div class="beer-name">' + quote.beer +
        '</div> <span class="beer-intro"> ' + '-' + quote.introduction + '</span> </div></div>');
    container.append(quoteElement);
    document.getElementById("beer-pic-" + quote.index).src = quote.image;
}

function displayQuotes(quotes) {
    var quotesContainer = $('#reviews-container').empty();
    quotes.forEach(function(quote, index) {
        displayBeer(quotesContainer, quote);
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