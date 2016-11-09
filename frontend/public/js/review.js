$(document).ready(function() {
    $('#addReview').on('click', function() {
       console.log('asdasd');
       var token = JSON.parse(localStorage.getItem('webToken'));
        if (token.expire < Date.now()) {
            $.ajax({
                url: 'http://localhost:3000/reviews/addreview/' + $('#beerName').val() + '/' + $('#breweryName').val() + '/' + $('#rating').val() + '/' + $('#review').val(),
                type: 'POST',
                data: token,
                success: function(data) {
                    console.log(data);
                },
                error: function(request, status, error) {
                    alert(error);
                }
            });
        } else {
            window.location.href = "./login.html";
            alert('Token expired. Please login again!');
        }
    });
});