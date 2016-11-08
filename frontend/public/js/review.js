$(document).ready(function() {
    $('#addReview').on('click', function() {
       console.log('asdasd');
        $.ajax({
            url: 'https://csse280-beerup-backend.herokuapp.com/reviews/addreview/webtoken/' + $('#beerName').val() + '/' + $('#breweryName').val() + '/' + $('#rating').val() + '/' + $('#review').val(),
            type: 'POST',
            success: function(data) {
                console.log(data);
            },
            error: function(request, status, error) {
                alert(error);
            }
        });
    });
});