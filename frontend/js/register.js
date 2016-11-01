$('#login').on('click', function() {
    console.log('clicked');
    $.ajax({
        url: 'http://127.0.0.1:3000/people/register/' + $('#username').val() + '/' + $('#password').val(),
        type: 'POST',
        success: function(data) {
            alert(data);
        },
        error: function(request, status, error) {
            alert(error);
        }
    });
});