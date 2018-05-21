const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');

const app = express();
const db = mongojs('contactlist',['contactlist']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist',function(req,res){
    console.log('Get Request in server');
    db.contactlist.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist',function(req,res){
    console.log('From post request',req.body);
    db.contactlist.insert(req.body,function(err,doc){
        res.json(doc);
    });
});

app.delete('/contactlist/:id',function(req,res){
    console.log('Delete in server');
    let id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
    })
});

app.get('/contactlist/:id',function(req,res){
    console.log('Server : Get a specific record');
    let id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc) {
        res.json(doc);
    });
});

app.put('/contactlist/:id',function(req,res){
    let id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
        update:{$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new : true},function (err,doc){
            res.json(doc);
        });
});

app.listen(5000);
console.log('Server running on port 5000');