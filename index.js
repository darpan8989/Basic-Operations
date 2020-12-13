const express= require('express');
const path =require('path');
const port=8000;

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));



let contactList=[
    {
        name:'Darpan',
        phone:'980210'
    },
    {
        name:'Sahil',
        phone:'13455'
    },
    {
        name :'Lodu',
        phone :12456
    }
]

app.get('/',function(req,res){
    return res.render('home',
    {title:'I fly "do you ?',
    contact_list : contactList
    });
});
app.get('/practice',function(req,res){
    return res.render('practice',{
        title: 'lets play'
    });
});
app.post('/create-contact',function(req,res){
    return res.redirect('practice');
})

app.listen(port,function(err){
    if(err){
        console.log('Error in server ',err);
        return ;
    }
    console.log('express server is up on port :', port);
})