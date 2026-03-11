const mongoose=require('mongoose');
const {Schema}=require('mongoose');
const ThoughtSchema=new Schema({
   
    selectedText:{
        type:String
    },
    note:{
        type:String
    },
    pageTitle: { type: String },
    pageUrl: { type: String },  
  },
   { timestamps: true }
);
ThoughtSchema.index({
    selectedText:'text',
    note:'text'
});
const noteSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    tags:{
        type:Array
    },
    isStarred:{type:Boolean,default:false},
    userId: { type: String, default:"defaultUser" },
    Thought:[ThoughtSchema]

});
const Note=mongoose.model('Note',noteSchema);
module.exports=Note;