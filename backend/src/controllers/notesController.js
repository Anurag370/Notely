import Note from "../models/Note.js";

//To get my notes
export async function getAllNotes(req, res) {
    //res.status(200).send("You fetched the notes");
    try{
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)
    }catch(error){
        console.error("Error in getAllNotes controller ",error);
        res.status(500).json({message:"Internal server error"})
    }
}

//To get my particular notes by id
export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({message:"Note not found!!"})
        res.status(200).json(note)
    } catch (error) {
        console.error("Error in getNoteById controller ",error);
        res.status(500).json({message:"Internal server error"})
    }
    
}
//To post my notes
export async function createNote(req, res) {
    try {
        const {title,content} = req.body
        const note = new Note({title,content})

        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("Error in createNote controller ",error);
        res.status(500).json({message:"Internal server error"});
    }
}

//To update my notes
export async function updateNote(req, res) {
    try {
        const{title,content} = req.body
        const updateNote = await Note.findByIdAndUpdate(req.params.id,{title,content});
        if(!updateNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:"Note updates succesfully"});
    } catch (error) {
        console.error("Error in updateNote controller ",error);
        res.status(500).json({message:"Internal server error"});
    }
}

//To delete my notes
export async function deleteNote(req,res){
    try {
        const deleatedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deleatedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:"Note dealeted"});
    } catch (error) {
        console.error("Error in deleteNote controller ",error);
        res.status(500).json({message:"Internal server error"});
    }
}