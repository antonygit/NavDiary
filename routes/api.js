var express=require('express');
const mongoose=require('mongoose');
var template=require('../model/Templates.js');
var router=express.Router();


router.post("/template/add",function(req,res){
  var myData = new template(req.body);
  myData.save()
  .then(item => {
  res.send("item saved to database");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });

});



router.get("/template",function(req,res){
template.find({}).sort( { template: 1 } ).exec(function(err,temp){
 if(err)
 res.send("error");
else {
   res.json(temp);
}

})

});

router.post("/template/UpdateInfo",function(req,res){
 template.update ({ template :req.body.template},
    { $set : { description:req.body.description } },
    function( err, result ) {
        if ( err ) throw err;
    }
);
});

router.post("/template/UpdateTechnical",function(req,res){
 template.update ({ template :req.body.template},
    { $set : { technical:req.body.technical } },
    function( err, result ) {
        if ( err ) throw err;
    }
);
});


router.post("/template/UpdateCustomer",function(req,res){
 template.update ({ template :req.body.template},
    { $set : { customer:req.body.customer } },
    function( err, result ) {
        if ( err ) throw err;
    }
);
});



router.post("/template/addQuestion",function(req,res){
  if(req.body.template!="" && req.body.question!="" &&  req.body.times!="")
    {
         template.update ({ template :req.body.template},
           {$addToSet: {Question:{faq:req.body.question,time:req.body.times}}},

            function( err, result )
                {
                    if ( err ) throw err;
                }
        );
            req.body.template="";
            req.body.question="";
            req.body.times="";
   }
});

router.post("/template/addReply",function(req,res){
 template.update ({"Question.time":req.body.time},
   {$push:{"Question.$.reply":{"ans":req.body.reply}}},
   { upsert: true },
    function( err, result ) {
        if ( err ) throw err;
    }
);
});




router.delete("/api/:num",function(req,res){
 res.send("Type:DELETE");

});

router.get("*",function(req,res){
 res.send("404 page not found");

});

module.exports=router;
