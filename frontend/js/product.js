var ALL_QUOTES = [{
        quote: "Welcome every morning with a smile. Look on the new day as another special gift from your Creator, another golden opportunity.",
        author: "Og Mandino",
        score: 4
    },
    {
        quote: "Happiness cannot be traveled to, owned, earned, or worn.It is the spiritual experience of living every minute with love, grace & gratitude.",
        author: "Denis Waitley",
        score: 5
    },
    {
        quote: "Though no one can go back and make a brand new start, anyone can start from now and make a brand new ending",
        author: "Carl Bard",
        score: 5
    },
    {
        quote: "Accept responsibility for your life.Know that it is you who will get you where you want to go, no one else.",
        author: "Les Brown",
        score: 5
    },
    {
        quote: "Surround yourself with only people who are going to lift you higher.",
        author: "Oprah Winfrey",
        score: 5
    },
    {
        quote: "Nobody ever wrote down a plan to be broke, fat, lazy, or stupid.Those things are what happen when you don’t have a plan.",
        author: "Larry Winget",
        score: 5
    }
];

// Use this to store user's choice
var userChoice = 'all';

// Use this to update the search string
var searchString;

function displayQuote(container, quote) {
    var quoteElement = $('<div class="author-quote"> <q>' + quote.quote +
        '</q> <span class="quote-author-name"> ' + quote.score + '/5  -' + quote.author + '</span> </div>');
    container.append(quoteElement);
}

function displayQuotes(quotes) {
    var quotesContainer = $('#reviews-container').empty();
    quotes.forEach(function(quote, index) {
        displayQuote(quotesContainer, quote);
    });
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

$('#submit').on('click', function() {
    q = $('#text-area').val();
    a = "you";
    s = $('[name="score"] option:selected').val();
    object = { quote: q, author: a, score: s };
    ALL_QUOTES.push(object);
    displayQuotes(ALL_QUOTES);
});