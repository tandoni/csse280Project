$(document).ready(function() {
    $('#addReview').on('click', function() {
       console.log('asdasd');
        $.ajax({
            url: 'http://127.0.0.1:3000/reviews/addreview/webtoken/' + $('#beerName').val() + '/' + $('#breweryName').val() + '/' + $('#rating').val() + '/' + $('#review').val(),
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