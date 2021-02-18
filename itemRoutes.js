const express = require('express');
const ExpressError = require('../expressError');
const { response } = require('../jsonApi');
const router = new express.Router();
const items = require('./fakeDb');

router.get('/', (req, res) => {
    res.json({items: items});
})

router.post('/', (req, res) => {
    let added = req.body;
    items.push(added);
    res.json({added});
})

router.get('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    res.json({item});
})

router.patch('/:name', (req, res) => {
    const updated = items.find(i => i.name === req.params.name )
    console.log(updated)
    if (updated === undefined){
        throw new ExpressError("Item not found", 404);
    }

    if (updated.name !== req.params.name || updated.price !== req.params.price  ){
        updated.name = req.body.name;
        updated.price = req.body.price;
    }
    res.json({updated});
})
 
router.delete('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (item === undefined){
        throw new ExpressError("Item not found", 404);
    }
    items.splice(items.findIndex(i => i.name === req.params.name), 1);
    res.json({message: "Deleted"});
})

module.exports = router;