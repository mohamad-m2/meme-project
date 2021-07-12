'use strict';

const express = require('express');
const morgan = require('morgan');
const passport = require('passport') ;
const passportLocal = require('passport-local') ;
const session = require('express-session') ; 
const db_op = require('./db_operation.js') ;
const dayjs = require('dayjs');
const db = require('./db.js');
const e = require('express');



passport.use(new passportLocal.Strategy((username, password, done) => {
  // verification callback for authentication
  db_op.AuthenticateUser(username, password).then(user => {
    if (user)
      done(null, user);
    else
      done(null, false, { message: 'Wrong E-mail or Password!' });
  }).catch(err => {
    // db error
    done(err);
  });
}));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.email);
});

// Deserialize user
passport.deserializeUser((email, done) => {
  db_op.GetUser(email)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// init express
const app = new express();
const port = 3001;

// activate the server
app.use(morgan('dev')) ;
app.use(express.json()) ;

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'Not authenticated' });
} ;

app.use(session({
  secret: 'this and that and me mohamad', //TODO: change this secret?
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



//api for memes
app.get('/api/memes',async (req,res)=>{
  try{
  if(req.isAuthenticated()){
    let result= await db_op.GetAllMemes(1)
    res.json(result)
  }
  else{ 
    let result= await db_op.GetAllMemes(0)
    res.json(result)
  }
}catch(error)
{
  res.status(500).json(error) ;
}
})
app.get('/api/SelfMemes',isLoggedIn,async (req,res)=>{
  try{
    let result=await db_op.GetAllSelf(req.user.email)
    res.json(result)
    }catch(error)
    {
    res.status(500).json(error) ;
    }
  })

app.get('/api/memes/:id',async (req,res)=>{
  const id = req.params.id ;
  try{
    let result= await db_op.GetMeme(id)
    let layout =await db_op.GetLayoutByID(result.meme_layout)
    result.meme_layout=layout
  if(req.isAuthenticated()){
    res.json(result)
  }
  else{
    if(result.private)
      res.status(400).json("meme protected you are not eligible to see it")
    else
      res.json(result)
  }
}catch(error)
{
  res.status(500).json(error) ;
}
})

app.post('/api/memes',isLoggedIn,async (req,res)=>{
  let meme={}
  meme.title=req.body.title
  meme.private=req.body.private
  meme.user=req.user.email
  meme.date=dayjs(req.body.date).format('YYYY-MM-DD h:mm A')
  meme.text1=req.body.text1
  meme.text2=req.body.text2||''
  meme.text3=req.body.text3||''
  meme.font=req.body.font
  meme.color=req.body.color
  meme.size=req.body.size
  meme.box=req.body.box
  let layout={}
  layout.image=req.body.image
  layout.align1=req.body.align1||''
  layout.align2=req.body.align2||''
  layout.align3=req.body.align3||''
  try {
  
    let result= await db_op.GetLayout(layout)

    if(result==undefined)
    {
   
      result =await db_op.CreateLayout(layout)
      result= await db_op.GetLayout(layout)
    
    }
    meme.layout=result.meme_layout

    let final=await db_op.AddMeme(meme)
    res.json(final)

  }catch(error){
    
    res.status(500).json(error)
  }
})

app.delete('/api/memes/:id',isLoggedIn,async (req,res)=>{
  let id=req.params.id
  let user=req.user.email
  try{
    let meme=await db_op.GetMeme(id)
    if(user != meme.user)
    res.status(444).json(' you are not eligible to delete this meme')
    else{
      let res2= await db_op.Count(meme.meme_layout)

      if(res2.nb<2)
       {
         res2= await db_op.deleteLayout(meme.meme_layout)
       }
       res2= await db_op.DeleteAll(id)
      let result = await db_op.DeleteMeme(id)
      
      res.json(result)
    }}catch(error)
    {

      res.status(500).json(error)
    }
  
})

app.delete('/api/like/:id',isLoggedIn,async (req,res)=>{
  let id=req.params.id
  let user=req.user.email

  try{
    let result=await db_op.DeleteLike_dislike(id,user)

    res.json(result)
    }catch(error)
    {

      res.status(500).json(error)
    }
  
})
app.post('/api/like/:id',isLoggedIn,async (req,res)=>{
  let id=req.params.id
  let user=req.user.email

  try{
    
    let t= await db_op.Get_likedislike(id,user)
    
    if(t)
    {
      if(t.like_dislike==0)
      {
        let x=await db_op.DeleteLike_dislike(id,user)

        
      }
      else{
        res.status(500).json(error)
      }
    }

    let result=await db_op.AddLike_dislike(id,user,1)

    res.json(result)
    
    }catch(error)
    {

      res.status(500).json(error)
    }
  
})

app.delete('/api/dislike/:id',isLoggedIn,async (req,res)=>{
  let id=req.params.id
  let user=req.user.email

  try{

    let result=await db_op.DeleteLike_dislike(id,user)

    res.json(result)
  
    }catch(error)
    {

      res.status(500).json(error)
    }
  
})
app.post('/api/dislike/:id',isLoggedIn,async (req,res)=>{
  let id=req.params.id
  let user=req.user.email

  try{
    let t= await db_op.Get_likedislike(id,user)
    if(t)
    {
      if(t.like_dislike==1)
      {
        let x=await db_op.DeleteLike_dislike(id,user)

      }
      else{
        res.status(500).json(error)
      }
    }

    let result=await db_op.AddLike_dislike(id,user,0)

    res.json(result)
    }catch(error)
    {

      res.status(500).json(error)
    }
  
})

app.get('/api/like_dislike/:id',isLoggedIn,async (req,res)=>{

  let id=req.params.id
  let user=req.user.email

  try{
    let result=await db_op.Get_likedislike(id,user) 
   
    if(result===undefined)
    res.json(0)
    else
    res.json(result)
    }catch(error)
    {

      res.status(500).json(error)
    }
}
)




app.post('/api/createUser',
    async (req, res) => {
    
    let name = req.body.name ;
    let email = req.body.email ;
    let password = req.body.password ;
    try{
      let result=await db_op.GetUser(email)
      if(result==undefined)
      {
        result=await db_op.AddUser(email,name,password)
        res.json(result)
      }
      else
      res.status(401).json('user already exists')

    } catch(error) {
        res.status(500).json(error) ;
    }
 }) 
 app.delete('/api/users/:email',isLoggedIn,async (req,res)=>{
   let email=req.params.email
   try
  {
    if(email===req.user.email)
    {
      let result=await db_op.DeleteUser(email)
      req.logout();
      res.json(result)
    }
    else{
      res.status(402).json('you can not delete other user account')
    }
  }catch(error){
    res.status(500).json(error) ;
  }
 })

 app.put('/api/users/:email',isLoggedIn,async (req,res)=>{
  let email=req.params.email
  let name=req.body.name
  let password=req.body.password
  try
 {
   if(email===req.user.email)
   {
     let result=await db_op.ModifyUser(email,name,password)
     res.json(result)
   }
   else{
     res.status(402).json('you can not modify other user account')
   }
 }catch(error){
   res.status(500).json(error) ;
 }
})

// Function for Login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        
        return res.json(req.user);
      });
  })(req, res, next);
});
 
// Function for Logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json({email:req.user.email,name:req.user.name});}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});