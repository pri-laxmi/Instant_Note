const express=require('express');
const {Router}=require('express');
const router=express.Router();
const Note=require('../models/thought-models');
/*router.post('/api/notes',async(req,res)=>{
    console.log(req.body);
    try{
        const thought=new Note(req.body);
        await thought.save();
        res.json(thought);
    }catch(err){
        res.status(500).json({error:'failed to save thought'});
    }
    }

);*/
//get all notes
router.get('/api/notes',async(req,res)=>{
    try{
        const thought=await Note.find({userId:"defaultUser"});
        res.json(thought);
    }catch(err){
        res.status(500).json({error:'failed to fetch notes'});
    }
});
//delete note
router.delete('/api/notes/:id',async(req,res)=>{
    try{
    await Note.findByIdAndDelete(req.params.id);
        res.json({message:'note deleted successfully'});
    }catch(err){
        res.status(500).json({error:'failed to delete note'});
    }
});
//edit notes
router.put('/api/notes/:id',async(req,res)=>{
    try{
        const updated=await Note.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    title:req.body.title,
                    tags:req.body.tags
                }
            },
            {new:true});
            res.json(updated);
    }catch(err){
        res.status(500).json({error:'failed to update note'});
    }
});
//edit thought
router.patch("/api/notes/:noteId/snippets/:snippetId", async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);

    const snippet = note.snippets.id(req.params.snippetId);

    if (req.body.selectedText !== undefined)
      snippet.selectedText = req.body.selectedText;

    await note.save();
    res.json(note);

  } catch (err) {
    res.status(500).json({ error: "Failed to update snippet" });
  }
});
router.patch('/api/notes/:id/star',async(req,res)=>{
    try{
        const thought =await Note.findById(req.params.id);
        thought.isStarred=!thought.isStarred;
        await thought.save();
        res.json(thought);
    }catch(err){
        res.status(500).json({error:'failed to star/unstar note'});
    }
});
//get starred notes
router.get('/api/thoughts/starred',async(req,res)=>{
    try{
        const starredThoughts=await Note.find({isStarred:true});
        res.json(starredThoughts);
    }catch(err){
        res.status(500).json({error:'failed to fetch starred thoughts'});
    }
});
//create new note 
router.post('/api/notes',async(req,res)=>{
    try{
        const {title,tags,selectedText,note,pageTitle,pageUrl}=req.body;
        const newNote=new Note({
            title,
            tags,
             userId:"defaultUser",
           Thought:[{
             selectedText,
            note,
            pageTitle,
            pageUrl
           }]
    
        });
        await newNote.save();
        res.json(newNote);
    }catch(err){
        res.status(500).json({error:'failed to create note'});
    }
});
//add to existing note
router.post('/api/note/',async(req,res)=>{
    try{
        const note=await Note.findById(req.params.noteid);
        note.Thought.push({
            selectedText:req.body.selectedText,
            note:req.body.note,
            pageTitle:req.body.pageTitle,
            pageUrl:req.body.pageUrl
        });
        await note.save();
        res.json(note);
    }catch(err){
        res.status(500).json({error:'failed to add thought to note'
        })
    }
});
// search notes by title
router.get("/api/notes",async(req,res)=>{
    try{
        const {search,tag}=req.query;
        let filter={userId:"defaultUser"};
        if(search){
            filter.title={$regex:search,$options:"i"};
        }
        if(tag){
            filter.tags=tag;
        }
        const notes=await Note.find(filter).sort({createdAt:-1});
        res.json(notes);
    }catch(err){
        res.status(500).json({error:'failed to search notes'}); 
    }   
});
module.exports=router;