const port = 3000;
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname , '../public');
const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils//users');
const UserContoller = require('./controllers/user.controller');
const bodyParser = require('body-parser');
var app = express();

app.set('view enging' , 'hbs');

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(bodyParser.json());

require('./middlerware/cross-origin.middleware')(app);
require('./routes/user.routes')(app);
require('./routes/group.routes')(app);
require('./routes/user-group.routes')(app);
require('./routes/message.routes')(app);
require('./routes/group-messages.routes')(app);

app.use(express.static(publicPath));

io.on('connection' , (socket) => { 
    console.log('New user connected');

    


    socket.on('createMessage' , (message , callback) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage' , generateMessage(user.name , message.text));
            return callback();
        }
        
       callback('please enter text message');
    });

    socket.on('join' , (params , callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id , params.name , params.room); 

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage' , generateMessage('Admin' , `${params.name} has joined`));

        callback();
    });


    socket.on('typing', (user , callback) => {
        socket.broadcast.emit('userTyping' , {user : user.user , isTyping : true});
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User was diconnected');
        var user = users.removeUser(socket.id);
        if (user) {
          io.to(user.room).emit('updateUserList', users.getUserList(user.room));
          io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
      });


});

// app.get('/users', (req , res) => {
//     UserContoller.findAll().then((users) => {
//         res.send(users);
//     }).catch(err =>{
//         res.status(500).send({message : err.message});
//     })
// });

// app.post('/users' , (req, res) => {
//     UserContoller.save(req.body).then((user) =>{
//         res.send(user);
//     }).catch((err) => {
//         res.status(500).send({message : err.message});
//     });
// });



server.listen(port , () => {
    console.log(`Server is up on port ${port}`);
});
