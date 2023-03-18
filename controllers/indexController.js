var db = require('../models/modelDB');

// Display HomePage.
exports.home = function(req, res) {
    
    let item_sql = "SELECT * FROM item ";
    let local_gov_sql = "SELECT * FROM local_government";
    let centres_sql = "SELECT * FROM collection_centre cc, local_government lg WHERE " +
                        " cc.council_id = lg.council_id";
    let performance_sql = "SELECT * FROM local_government_performance";
    let items_list; 
    let local_govs; 
    let trends; 
    let centres;     

    // execute promise for sql query
    let p1 = db.execute(item_sql).then(
        result => items_list = result
    ).catch(
        error => error_handle(error)
    );

    // execute promise for sql query
    let p2 = db.execute(local_gov_sql).then(
        result => local_govs = result
    ).catch(
        error => error_handle(error)
    );

    // execute promise for sql query
    let p3 = db.execute(performance_sql).then(
        result => trends = result
    ).catch(
        error => error_handle(error)
    );

    // execute promise for sql query
    let p4 = db.execute(centres_sql).then(
        result => centres = result
    ).catch(
        error => error_handle(error)
    );

	// wait for all the promises and call next function
    Promise.all([p1, p2, p3]).then(
        result => res.render('index', {ejs_items: items_list,
                                        ejs_govs: local_govs,
                                        ejs_trends: trends,
                                        ejs_centres: centres})
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