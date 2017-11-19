//Creating express app
const express = require('express');
const app = express();
//Getting body-parser to parse the request body
const bodyparser = require('body-parser');
//Getting path to point to index and static files
const path = require('path');
//Getting mongoose default connection
const dbConnect = require('./server/db/mongoconnect');
//Getting route function 
const route = require('./server/routes/route');

//Express middlewares
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname+'/client')));

//Passing express app as argument to route function to handle routing
route(app);



//Hosting index html page for every request incoming at this server
app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname+ '/client/index.html'));
});



//displaying error in console if any during default database connection
dbConnect.on('error',function(err) {
    console.log(`MongoDB default connection error ${err}`);
});

//On successful database connection starting server
dbConnect.on('connected', function() {
    console.log('Connected to DataBase');
    
    app.listen(process.env.PORT || 3000, function() {
    console.log('Listening to 3000 port');
    });

});





