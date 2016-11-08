$('#signUp').on('click', function() {
    console.log('clicked222');
    $.ajax({
        url: 'https://csse280-beerup-backend.herokuapp.com/people/register/' + $('#firstName').val() + '/' + $('#lastName').val() + '/' + $('#username').val() + '/' + $('#password').val(),
        type: 'POST',
        success: function(data) {
            console.log(data);
        },
        error: function(request, status, error) {
            alert(error);
        }
    });
});