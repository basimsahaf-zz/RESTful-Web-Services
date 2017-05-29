//note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,db) {
    //When the app receives the post request to the '/notes' path, it will
    //execute the code inside the callback-passing in a request object
    // which contains the parameters or JSON of the request and a response
    // object. 
    
    //defining get request
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err,item)=> {
            if(err){
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    
    //defining delete request
    app.delete('/notes/:id', (req,res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').remove(details, (err,item) => {
            if(err){
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted');
            }
        });
    });
    
    //defining get request to get everything in the database
    app.get('/notes', (req,res) => {
        db.collection('notes').find().toArray(function(err,results){
            var arrToSend = []
            for(var i=0; i<results.length;i++){
                arrToSend.push(results[i]);
            }
            res.send(arrToSend);  
        });
    });
          
    
    //defining put request
    app.put('/notes/:id', (req,res) => {
        const id = req.params.id;
        const note = { text: req.body.body, title: req.body.title };
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').update(details, note, (err, result) => {
            if(err){
                res.send({'error': 'An error has occured!'})
            } else {
                res.send(note);
            }
        })
            })
    //defining post request
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title} ;
        db.collection('notes').insert(note, (err, result) => {
            if(err){
                res.send({ 'error': 'An error has occured, please try again'});
            } else {
                res.send(result.ops[0]);
                console.log(result.ops[0]);
            }
        });
    });
};

