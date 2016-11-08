$('#signUp').on('click', function() {
    console.log('clicked222');
    $.ajax({
        url: 'http://127.0.0.1:3000/people/register/' + $('#firstName').val() + '/' + $('#lastName').val() + '/' + $('#username').val() + '/' + $('#password').val(),
        type: 'POST',
        success: function(data) {
            console.log(data);
        },
        error: function(request, status, error) {
            alert(error);
        }
    });
});