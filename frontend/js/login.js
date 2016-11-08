$('#login').on('click', function() {
    console.log('clicked');
    $.ajax({
        url: 'https://csse280-beerup-backend.herokuapp.com/people/login/' + $('#username').val() + '/' + $('#password').val(),
        type: 'POST',
        success: function(data) {
            var expire = new Date().getTime() + 86400
            var forLocal = {token: data.token, expire: expire};
            localStorage.setItem("webToken", JSON.stringify(forLocal));
            console.log(data);
        },
        error: function(request, status, error) {
            alert(error);
        }
    });
});