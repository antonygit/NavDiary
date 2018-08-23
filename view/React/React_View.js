
 var BuckysComponent = React.createClass({

   getInitialState : function()
    {
      return{
         Navigation:[],
         Sample:[],
         template:""


      }




    },

   filter:function()
   {

     var input, filter, table,tr, a, i;
     input = document.getElementById("myInput");
     filter = input.value.toUpperCase();
     table = document.getElementById("templateList");
     tr = table.getElementsByTagName("tr");
     for (i = 0; i < tr.length; i++) {
        a = tr[i].getElementsByTagName("font")[0];
             if (a.innerHTML.toUpperCase().indexOf(filter) > -1)
             {
                 tr[i].style.display = "";
             }
           else
           {
               tr[i].style.display = "none";
           }
      }


   },


 componentDidMount:function()
 {

fetch("/profile/template",{method:"GET",headers:{  'Content-Type': 'application/json',
        'Accept': 'application/json'}}).then(function(response){
 return response.json();
}).then(json=>{
 this.setState({Navigation:json});
 document.getElementById("homepara").innerText=this.state.Navigation[0].description;
 document.getElementById("techpara").innerText=this.state.Navigation[0].technical;
 document.getElementById("customerpara").innerText=this.state.Navigation[0].customer;
  templateName=this.state.Navigation[0].template;
 this.setState({template:templateName});
});

 },
 insert:function()
 {
   var temp = document.getElementById('addTemplateName').value;
   if(temp!="" && this.hasThisTemplate(temp) )
  {

    fetch("/profile/template/add",
      {
      method:"POST",
      headers:{  'Content-Type': 'application/json',
            'Accept': 'application/json'},
            body: JSON.stringify({template:temp, description:temp})
          });
          $("#myModal").modal('hide');
          $('.modal-backdrop').remove();


          this.componentDidMount();
}

 },

  edit:function()
  {
  var bodyText = $("#homepara").html();    // get text of span
  bodyText=bodyText.replace(/<br\s*[\/]?>/gi, "\n");
  bodyText= this.htmlDecode(bodyText);

  var textArea = $("<textarea style='width:1000px; height:560px;background-color:#f0f0f1' id='textarea' />");   // create new text area
  textArea.val(bodyText);  // add value to text area
  $("#homepara").replaceWith(textArea); // replace span with textarea
  textArea.focus();
  document.getElementById('saveInfo').style.visibility="visible";
  var temp = document.getElementById('addTemplateName').value;


  },


   save:function()
   {
   var textArea = $("#textarea").val();    // get text of span
   textArea=textArea.replace(/\n/g, "<br />");

   var bodyText = $("<p id='homepara'></p>");   // create new text area
   bodyText.html(textArea);  // add value to text area
   $("#textarea").replaceWith(bodyText); // replace span with textarea
    document.getElementById('saveInfo').style.visibility="hidden";
    textArea=textArea.replace(/<br\s*[\/]?>/gi, "\n");


    fetch("profile/template/UpdateInfo",
      {
      method:"POST",
      headers:{  'Content-Type': 'application/json',
            'Accept': 'application/json'},
            body: JSON.stringify({template:templateName, description:textArea })
          });

          this.retrieve();
           $("#onChangesSavedMessage").modal('show');

           setTimeout(function(){
               $("#onChangesSavedMessage").modal('hide');
           }, 1000);
   },


   htmlDecode:function(htmlText)
   {
    return $('<div/>').html(htmlText).text()
   },

   editTechnical:function()
   {
   var bodyText = $("#techpara").html();    // get text of span
   bodyText=bodyText.replace(/<br\s*[\/]?>/gi, "\n");
   bodyText= this.htmlDecode(bodyText);
   var textArea = $("<textarea style='width:1000px; height:560px;background-color:#f0f0f1' id='Technicaltextarea' />");   // create new text area
   textArea.val(bodyText);  // add value to text area
   $("#techpara").replaceWith(textArea); // replace span with textarea
   textArea.focus();
   document.getElementById('saveTechnical').style.visibility="visible";
   var temp = document.getElementById('addTemplateName').value;


   },


    saveTechnical:function()
    {
    var textArea = $("#Technicaltextarea").val();    // get text of span
    textArea=textArea.replace(/\n/g, "<br />");
    var bodyText = $("<p id='techpara'></p>");   // create new text area
    bodyText.html(textArea);  // add value to text area
    $("#Technicaltextarea").replaceWith(bodyText); // replace span with textarea
     document.getElementById('saveTechnical').style.visibility="hidden";
     textArea=textArea.replace(/<br\s*[\/]?>/gi, "\n");

     fetch("profile/template/UpdateTechnical",
       {
       method:"POST",
       headers:{  'Content-Type': 'application/json',
             'Accept': 'application/json'},
             body: JSON.stringify({template:templateName, technical:textArea })
           });

           this.retrieve();
            $("#onChangesSavedMessage").modal('show');

            setTimeout(function(){
                $("#onChangesSavedMessage").modal('hide');
            }, 1000);
    },



    editCustomer:function()
    {
    var bodyText = $("#customerpara").html();    // get text of span
    bodyText=bodyText.replace(/<br\s*[\/]?>/gi, "\n");
    bodyText= this.htmlDecode(bodyText);
    var textArea = $("<textarea style='width:1000px; height:560px;background-color:#f0f0f1' id='Customertextarea' />");   // create new text area
    textArea.val(bodyText);  // add value to text area
    $("#customerpara").replaceWith(textArea); // replace span with textarea
    textArea.focus();
    document.getElementById('saveCustomer').style.visibility="visible";
    var temp = document.getElementById('addTemplateName').value;


    },


     saveCustomer:function()
     {
     var textArea = $("#Customertextarea").val();    // get text of span
     textArea=textArea.replace(/\n/g, "<br />");

     var bodyText = $("<p id='customerpara'></p>");   // create new text area
     bodyText.html(textArea);  // add value to text area
     $("#Customertextarea").replaceWith(bodyText); // replace span with textarea
      document.getElementById('saveCustomer').style.visibility="hidden";
      textArea=textArea.replace(/<br\s*[\/]?>/gi, "\n");


      fetch("profile/template/UpdateCustomer",
        {
        method:"POST",
        headers:{  'Content-Type': 'application/json',
              'Accept': 'application/json'},
              body: JSON.stringify({template:templateName, customer:textArea })
            });

            this.retrieve();


            $("#onChangesSavedMessage").modal('show');

             setTimeout(function(){
                 $("#onChangesSavedMessage").modal('hide');
             }, 1000);


     },

  addQuestion:function(event)
  {

    if(event.key == 'Enter')
     {
      var faqQuestion=document.getElementById("faqTextbox").value;
         var date = new Date();
         document.getElementById("faqTextbox").value="";
         var height=document.getElementById("faqContent").scrollHeight;
         $('#faqContent').animate({
             scrollTop:height},
             'slow');
      if(faqQuestion!="" && this.hasThisQuestion(faqQuestion) )
     {
        console.log(this.state.Sample);
     fetch("/profile/template/addQuestion",
       {
       method:"POST",
       body: JSON.stringify({template:templateName, question:faqQuestion,times:date }),
       headers:{
             'Content-Type': 'application/json',
             'Accept': 'application/json'
           },
        });
         faqQuestion="";
        this.retrieve();
     }

     }

  },

  hasThisQuestion:function(que)
  {
    for(var i of this.state.Navigation)
    {
      if(i.template==templateName)
      for(var f of i.Question)
      {
          if(f.faq==que)
          {
            $("#onSameQuestionError").modal('show');

             setTimeout(function(){
                 $("#onSameQuestionError").modal('hide');
             }, 1000);

            return false;
          }
        }

    }
    return true;


  },
  hasThisTemplate:function(template)
  {
    for(var i of this.state.Navigation)
    {
      if(i.template==template)
       return false;

    }
    return true;


  },





  reply :function(event,t){
    if(event.key == 'Enter')
     {

        var replyQuestion=document.getElementById(t).value;
          fetch("/profile/template/addReply",
          {
          method:"POST",
          headers:{  'Content-Type': 'application/json',
                'Accept': 'application/json'},
                body: JSON.stringify({template:templateName,reply:replyQuestion,time:t })
           });
           document.getElementById(t).value='';
           replyQuestion="";
           this.retrieve();

     }
  },

  retrieve:function()
  {
     fetch("/profile/template",{method:"GET",headers:{  'Content-Type': 'application/json',
             'Accept': 'application/json'}}).then(function(response){
      return response.json();
     }).then(json=>{
       this.setState({Navigation:json});


 });
 },




  show:function(obj)
  {
   // alert(obj.description);



   var isVisibleSaveInfo= document.getElementById("saveInfo").style.visibility == "visible";
   var isVisibleSaveCustomer = document.getElementById("saveCustomer").style.visibility == "visible";
   var isVisibleSaveTechnical = document.getElementById("saveTechnical").style.visibility == "visible";

   if(isVisibleSaveInfo|isVisibleSaveCustomer|isVisibleSaveTechnical)
   {
     $("#onEditError").modal('show');

      setTimeout(function(){
          $("#onEditError").modal('hide');
      }, 1000);

   }
   else {

        var $storeClick = $('.list_of_template').click(function(e) {
        e.preventDefault();
        $thumbs.removeClass('highlight');
        $(this).addClass('highlight');
        });
     document.getElementById("homepara").innerText=obj.description;
     document.getElementById("techpara").innerText=obj.technical;
     document.getElementById("customerpara").innerText=obj.customer;
     templateName=obj.template;
     this.setState({template:templateName});


   }


  },










    render: function() {


      var visible = {
        visibility:'hidden'

       };

       var width = {
         width:'730px'

        };


         return (
                  <div>
                <div id="Left-Pannel">
                <div className="col-xs-10" id="templateInputSearch" >
                  <input className="form-control" type="text" placeholder="Search" id="myInput" onKeyUp={this.filter}/>
               </div>

               </div>


               {/* Template Add Modal starts */}

                <div className="modal fade" id="myModal" role="dialog">
                   <div className="modal-dialog modal-sm">
                     <div className="modal-content">
                       <div className="modal-header">
                         <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                       <div className="modal-body">

                       <div className="col-xs-10"  >
                         <input className="form-control" type="text" placeholder="Enter template name" id="addTemplateName"   />
                      </div>

                        </div>
                       <div className="modal-footer">
                         <button type="button" className="btn btn-default" onClick={this.insert} >add</button>
                       </div>
                     </div>
                   </div>
                 </div>


                 {/* Error Message Modal starts */}

                  <div className="modal fade" id="onEditError" role="dialog">
                     <div className="modal-dialog modal-sm">

                       <div className="alert alert-danger">
                        <img src="./images/error.png" width="30px" height="30px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='3'>Please save the changes.</font>
                        </div>
                     </div>
                   </div>


                   {/* Error Message Question present Modal starts */}

                    <div className="modal fade" id="onSameQuestionError" role="dialog">
                       <div className="modal-dialog modal-sm">

                         <div className="alert alert-danger">
                          <img src="./images/error.png" width="40px" height="40px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='3'>Same question</font>
                          </div>
                       </div>
                     </div>




                   {/* changes saved */}

                    <div className="modal fade" id="onChangesSavedMessage" role="dialog">
                       <div className="modal-dialog modal-sm">

                         <div className="alert alert-success">
                          <img src="./images/save.png" width="30px" height="30px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='3'>Changes saved...</font>
                          </div>
                       </div>
                     </div>



                <img src="./images/add.png" width="30px" height="30px" id="addTemplateButton"  data-toggle="modal" data-target="#myModal"/>
              <table id="templateList">
               {
              this.state.Navigation.map((item)=>
               <tr>
              <td onClick={() => this.show(item)} className="list_of_template"><img src="./images/template.png" width="30" height="30"/>&nbsp;<font id="template_list" >{item.template}</font></td>
              </tr>
                 )
               }
           </table>
           <div>


           <div className="container" id="Information">
           <ul className="nav nav-tabs"  id="NavTab">
             <li className="active" id="infoId" ><a data-toggle="tab" href="#infoTab" ><img src="./images/info1.png" width="45px" height="45px"/>&nbsp;Information</a></li>
             <li id="techId"><a data-toggle="tab" href="#technicalTab" ><img src="./images/technical.png" width="45px" height="45px"/>&nbsp;Technical </a></li>
             <li id="cusId"><a data-toggle="tab" href="#customerTab" ><img src="./images/customer.png" width="48px" height="48px"/>&nbsp;Customer</a></li>
             <li id="FAQId"><a data-toggle="tab" href="#faqTab" ><img src="./images/FAQ.png" width="45px" height="45px"/>&nbsp;FAQ</a></li>
           </ul>
         <div className="tab-content">

          <div id="infoTab" className="tab-pane fade in active">
          <img src="./images/edit.png" width="30px" height="30px" id="edit" onClick={this.edit}  data-toggle="tooltip" title="edit" data-placement="right"/>
          <img src="./images/save.png" width="30px" height="30px" id="saveInfo" style={visible} onClick={this.save}  data-toggle="tooltip" title="save"  data-placement="right"/>
                 <div id="infoContent">
                   <p id="homepara">
                   </p>
                 </div>
              </div>

             <div id="technicalTab" className="tab-pane fade">
             <img src="./images/edit.png" width="30px" height="30px" id="edit" onClick={this.editTechnical}  data-toggle="tooltip" title="edit" data-placement="right"/>
             <img src="./images/save.png" width="30px" height="30px" id="saveTechnical" style={visible} onClick={this.saveTechnical}  data-toggle="tooltip" title="save"  data-placement="right"/>
               <div id="technicalContent">
                 <p id="techpara">
                 technical
                 </p>
               </div>
             </div>


             <div id="customerTab" className="tab-pane fade">
             <img src="./images/edit.png" width="30px" height="30px" id="edit" onClick={this.editCustomer}  data-toggle="tooltip" title="edit" data-placement="right"/>
             <img src="./images/save.png" width="30px" height="30px" id="saveCustomer" style={visible} onClick={this.saveCustomer}  data-toggle="tooltip" title="save"  data-placement="right"/>
               <div id="customerContent">
                 <p id="customerpara">
                 customer
                 </p>
               </div>
             </div>

             <div id="faqTab" className="tab-pane fade">
             <input className="form-control input-lg" id="faqTextbox" placeholder="Post your question.." type="text" onKeyPress={()=>this.addQuestion(event)} />
              <div id="faqContent">
               <p id="faqpara">
               <table id="faqTable">
                {
               this.state.Navigation.map(item=>
                    {
                      if(item.template==this.state.template)
                     {
                       return(
                       item.Question.map(i=>
                      <tr id="faqTableTr">
                      <td id="faqTableTd">
                      <div className="w3-container">

                      <div className="w3-card-4" style={width} >
                      <header className="w3-container w3-light-white">
                      <img src="./images/user.png" width="50px" height="50  px" id="user" />

                      </header>

                      <header className="w3-container w3-light-white">

                      <span id="time">
                      {i.time.substr(0,10).replace(/-/g,'/')}
                      </span>
                       </header>


                     <header className="w3-container w3-light-grey">
                       <h3>{i.faq}</h3>


                     </header>

                      <div className="w3-container">
                       <div className="col-xs-14" >
                       <br>
                       </br>
                      <input className="form-control" placeholder="Comment on this question" id={i.time} type="text" onKeyPress={()=>this.reply(event,i.time)}/>
                     </div>
                       <br>
                       </br>
                         {
                          i.reply.map(m=>
                            <div id="comment">
                            <img src="./images/user.png" width="45px" height="45px"/>
                          <p id="answer">{m.ans}</p>
                           </div>

                          )

                         }

                           </div>
                          </div>
                         </div>
                          </td>
                          </tr>
                    )
                  )
                     }
                    }


                  )
                }
            </table>
               </p>
             </div>
             </div>


           </div>
         </div>



         </div>












           </div>
          );
    }

});


React.render(<BuckysComponent />, document.getElementById('Main-Container'));
