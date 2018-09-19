//localStorage.setItem('x-auth-token', 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmEwZDE0NWY3OWRlZDM4OTg5OWZlYWUiLCJpYXQiOjE1MzcyNjk3NzB9.YfnCQqHXY8oga2MdFqqOOF3Y2J631uZuna17uRhsiJk');
var xAuthToken = localStorage.getItem('x-auth-token');
var user = JSON.parse(localStorage.getItem('user'));

$('#username').text(`${user.firstname} ${user.lastname}`);

$.ajax({
    type : 'GET' ,
    contentType : 'application/json',
    headers : {
        'x-auth-token' : xAuthToken
    },
    url : "http://localhost:3000/users/verify/token",
    dataType : 'json',
    success : function(res){
    },
    error : function(e){
        console.log(e);
        window.location.href='/login.html'
    }
});