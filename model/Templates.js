const mongoose=require('mongoose');
var Schema=mongoose.Schema;


 //creating schema & model for template
var TemplatesSchema=  new Schema({
 template:{
    type:String

 },
 description:{
    type:String

 },
 technical:{
    type:String

 },
 customer:{
    type:String

 },

 Question:[{
    faq :
    {
      type: String,
      default: ""
    },
    time:{
      type:String,
      default: ""
    },

    reply:[
        {
        ans:{
         type:String
       }

     }

  ]


}]



});

module.exports=mongoose.model('template',TemplatesSchema);
