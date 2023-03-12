var db = require('../models/modelDB');

// Display HomePage.
exports.home = function(req, res) {
    
    let item_sql = "SELECT * FROM item ";
    let items;         

    // execute promise for sql query
    let p1 = db.execute(item_sql).then(
        result => items = result
    ).catch(
        error => error_handle(error)
    );

	// wait for all the promises and call next function
    Promise.all([p1]).then(
        result => res.render('index', {ejs_items: items})
    ).catch(
        error => error_handle(error)
    );
    
    // render to client
    //res.render('index', {ejs_items: items}); 
        //res.send("To implement ...");
    // handle errors from promises
    function error_handle(e){
        console.log(e.name + ": " + e.message);
    }

    

};