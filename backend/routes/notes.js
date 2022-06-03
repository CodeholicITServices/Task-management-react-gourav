const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

router.get('/getnotes', 
    fetchuser,
    async(req, res)=>{
        try {
            const notes = await Notes.find({user: req.user.id});
            res.json(notes)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error.")
            
        }
    }
)


router.post('/addnote', 
    fetchuser, 
    [
        body('title', 'Enter a valid title.').isLength({min: 3}),
        body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
    ], 
    async(req, res)=>{
        try {
            const {title, description, tag} = req.body

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(400).json({errors: errors.array()})
            }

            const notes = new Notes({title, description, tag, user: req.user.id})
            const saveNote = await notes.save()
            res.json(saveNote)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error")
        }
    }
)


router.put('/updatenote/:id',
    fetchuser,
    async(req, res)=>{
        const {title, description, tag} = req.body
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        let note = await Notes.findById(req.params.id)
        if(!note){ return res.status(404).send("Not found.")}
        
        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not allowed.")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json(note)
    }
)


router.delete('/deletenote/:id',
    fetchuser,
    async(req,res)=>{
        try {
            let note = await Notes.findById(req.params.id)
            if(!note){return res.status(400).send("Not found")}

            if(note.user.toString() != req.user.id){
                return res.status(401).send("Not allowed.")
            }

            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({"success": "Note has been deleted successfully.", note: note})
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internsl server error.")
        }
    }
)

module.exports = router