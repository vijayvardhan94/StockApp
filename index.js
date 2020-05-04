const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

const path = require('path');
const request = require('request');

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;



app.use(bodyParser.urlencoded({extended: false}));
//setting  handlebars middlewares
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//pk_006571212bc24cdb88293f158f2954ca

//cal api function

function callAPI(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_006571212bc24cdb88293f158f2954ca', { json: true  }, (err, res, body) =>{
    if(err){
        return console.log(err) 
    }
    console.log(body)
    if(res.statusCode === 200){
        //console.log(body)
        finishedAPI(body)
    }
})
}

//set handle bars routes 
app.get('/', function(req, res){
    callAPI(function (doneAPI){
    res.render('home', {
        stock: doneAPI
        })
    }, "fb")
})




//post route
app.post('/', function(req, res){
    callAPI(function (doneAPI){
        //posted_data = req.body.stock_ticker;
        res.render('home', {
        stock: doneAPI,
       // posted_data: posted_data
        });

    }, req.body.stock_ticker);
});





app.get('/about.html', function(req, res){
        res.render('about')
});
    

//the below line is for enabling static resources
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
})