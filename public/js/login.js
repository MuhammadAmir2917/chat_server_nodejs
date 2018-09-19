$('#login-form').on('submit' , function(e){
    e.preventDefault();
    var emailTextBox = $('[name=email]');
    var passwordTextBox = $('[name=password]');
    var errMessageP = $('#err-message');
    errMessageP.text("");

    var user = {
        email : emailTextBox.val(),
        password : passwordTextBox.val()
    }

    $.ajax({
        type : 'POST' ,
        contentType : 'application/json',
        url : "http://localhost:3000/users/login",
        data : JSON.stringify(user),
        dataType : 'json',
        success : function(res){
            if(res.result){
                localStorage.setItem('x-auth-token' , res.token);
                localStorage.setItem('user' , JSON.stringify(res.user));
                window.location.href="/dashboard.html";
            }else {
                $('#err-message').text("Invalid email/password");
            }
            
            //localStorage.setItem('x-auth-token' , res.result.token);
        },
        error : function(e){
            console.log(e);
        }
    });
});