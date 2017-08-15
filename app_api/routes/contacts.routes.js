/**
 * Created by deanroberts on 8/9/17.
 */
const express = require("express");
const router = express.Router();
const Contact = require("../Schema/contacts.schema");

router.post("/api/contacts", (req,res) => {
    const contact = new Contact();
    contact.name = req.body.name;
    contact.number = req.body.number;

    contact.save()
    .then(resp => {
        res.json(resp);
    })
    .catch(err => {
        res.send(err)
    });
});
router.get("/api/contacts", (req, res) => {
    Contact.find({})
    .then(resp => {
        console.log(resp);
        res.json(resp);
    })
    .catch(err => {
        res.send(err);
    });
});
router.put("/api/contacts/:id", (req, res) => {
    contacts[req.params.id] = req.body.contact;
    res.json(contacts);
});
module.exports = router;