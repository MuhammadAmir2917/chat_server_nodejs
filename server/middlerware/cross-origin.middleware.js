module.exports = function(app){
    app.use((req , res , next) => {
        res.append('Access-Control-Allow-Origin' , 'http://localhost:4200');
        res.append('Access-Control-Allow-Methods' , 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers' 
            , 'Origin , Accept,Access-Control-Allow-Headers , Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        res.append('Access-Control-Allow-Credentials' , true);
        next();

    })

   
};