$('#register-form').on('submit' , function(e){
    e.preventDefault();
    register();
});

function register(){

    var firstNameTextBox = $('[name=firstname]');
    var lastNameTextBox = $('[name=lastname]');
    var emailTextBox = $('[name=email]');
    var passwordTextBox = $('[name=password]');
    

    var user = {
        firstname : firstNameTextBox.val(),
        lastname : lastNameTextBox.val(),
        email : emailTextBox.val(),
        password : passwordTextBox.val(),
    }
    
    $.ajax({
        type : 'POST' ,
        contentType : 'application/json',
        url : "http://localhost:3000/users",
        data : JSON.stringify(user),
        dataType : 'json',
        success : function(user){
            console.log(user);
        },
        error : function(e){
            console.log(e);
        }
    });
}