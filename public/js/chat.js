

var socket = io();

function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
  
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
}

socket.on('connect' , function(){
     console.log('Connected to server');
     var params= $.deparam(window.location.search);
     socket.emit('join' , params , function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('No error');
        }
     });


});

socket.on('updateUserList' , function(users) {
   var ol = $('<ol></ol>');

   users.forEach(function(user){
    ol.append($('<li></li>').text(user));
   });

   $('#users').html(ol);

});


socket.on('disconnect', function () {
    console.log('Disconnected from server');
  });

socket.on('newMessage' , function(message) {
    var formattedTime  = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var templateMe = $('#message-template-me').html();
    var me = $.deparam(window.location.search).name;


    if(message.from!== me){
        var html = Mustache.render(template, {
            text : message.text,
            from : message.from,
            createdAt : formattedTime
        });

        $('#messages').append(html);
    }else{
        var html = Mustache.render(templateMe, {
            text : message.text,
            from : message.from,
            createdAt : formattedTime
        });

        $('#messages').append(html);
    }
    scrollToBottom();
  
});

socket.on('userTyping' , function(user){
    if(user.isTyping){
        console.log(`${user.user} is typing....`);
    }
});


$('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextBox = $('[name=message]');
    var userNameTextBox = $('[name=name]');
    
        socket.emit('createMessage' , {
            //from : userNameTextBox.val(),
            text : messageTextBox.val()
        }, function(data){
            if(data){
                console.log(data);
            }
            messageTextBox.val('');
        });
    
});

$('[name=message]').on('focus' , function(){
    var messageTextBox = $('[name=message]');
    var userNameTextBox = $('[name=name]');
    socket.emit('typing' , {
        user : userNameTextBox.val()
    }, function(){

    });
});

$('[name=message]').on('blur' , function(){
    var messageTextBox = $('[name=message]');
    console.log('not');
});