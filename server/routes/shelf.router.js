const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = 'SELECT * FROM "item" WHERE user_id = $1 ORDER BY id;';
    pool.query(queryText, [req.user.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error selectin * from item', error);
        res.sendStatus(500);
    });
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log( 'Adding to databse', req.body.description, req.body.url  )
    let queryText = `INSERT INTO "item" ("description", "image_url", "user_id" )
                        VALUES ($1, $2, $3);`;
    pool.query(queryText, [ req.body.description, req.body.url, req.user.id ])
    .then(result => {
        res.sendStatus( 200 );
    })
    .catch(error => {
        console.log('error posting to item', error);
        res.sendStatus(500);
    });
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated,  (req, res) => {
    console.log('in delete', req.params);
    const queryText = 'DELETE FROM "item" WHERE id=$1';
    pool.query(queryText, [req.params.id])
        .then(() => {res.sendStatus(200);})
        .catch((err) => {
            console.log('Error in DELETE', err);
            res.sendStatus(500);
        })
    });


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;