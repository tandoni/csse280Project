$( ".input" ).focusin(function() {
  $( this ).find( "span" ).animate({"opacity":"0"}, 200);
});

$( ".input" ).focusout(function() {
  $( this ).find( "span" ).animate({"opacity":"1"}, 300);
});

$(".login").submit(function(){
  $(this).find(".submit i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
  $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
  $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
  $("input").css({"border-color":"#2ecc71"});
  return false;
});

$('#login').on('click', function() {
  console.log('clicked');
  $.ajax({
    url: 'http://127.0.0.1:3000/people/login/'+$('#username').val()+'/'+$('#password').val(),
    type: 'POST',
    success: function(data) {
        alert(data);
    },
    error: function(request, status, error) {
        alert(error);
    }
  });
});