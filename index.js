const express= require('express');
const path =require('path');
const port=8000;

const db =require('./config/mongoose');

const Contact =require('./models/contact.js');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));



let contactList=[
    {
        name:'Darpan',
        phone:'980210'
    },
    {
        name:'Nameless',
        phone:'13455'
    },
    {
        name :'Proooo',
        phone :12456
    }
]

app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetchin contacts from db');
            return ;
        }
        return res.render('home',{
            title:'Contact list',
            contact_list : contacts
            });
        })
    })


app.get('/practice',function(req,res){
    return res.render('practice',{
        title: 'lets play'
    });
});
app.post('/create-contact',function(req,res){
    // contactList.push(req.body);
    // return res.redirect('back');
    Contact.create({
        name: req.body.name,
        phone : req.body.phone
    },function(err,newContact){
      if(err){
          console.log('Error in creating a contact');
          return ;
      }  
      console.log('****',newContact);
      return res.redirect('back');
    })

})
app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    let id =req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting a object from dbs');
            return ;
        }
        return res.redirect('back');
    })
})


app.listen(port,function(err){
    if(err){
        console.log('Error in server ',err);
        return ;
    }
    console.log('express server is up on port :', port);
})
