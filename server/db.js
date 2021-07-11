'use strict' ;

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('./memes.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
    if(err) throw err;
  });

// create tables only for the first time

/*db.run('create table users (email nvarchar(25) primary key , name nvarchar(25),hashpass text ) ',(err)=>{
    if(err)
    console.log('users is not created')
    else
    console.log('user done')
})

db.run('create table memes (id integer primary key autoincrement, title  text , private int , \
    user nvarchar(25) , date text , meme_layout int , text1 text,text2 text ,text3 text,font text,color text,size float,box int,likes int ,dislikes int)',(err)=>{
    if(err)
    console.log(err)
    else
    console.log('memes done')
})

db.run('create table layout (meme_layout integer primary key AUTOINCREMENT, image text ,align1 nvarchar(25),align2 nvarchar(25) ,align3 nvarchar(25)) ',(err)=>{
    if(err)
    console.log('layout is not created')
    else
    console.log('layout done')
})

db.run('create table likes (meme_id integer , user nvarchar(25),like_dislike int) ',(err)=>{
    if(err)
    console.log('likes is not created')
    else
    console.log('likes done')
})
*/
/*
db.run('CREATE TRIGGER  newlike2  AFTER INSERT ON likes \
BEGIN \
update memes set likes=likes+new.like_dislike , dislikes=dislikes+1-new.like_dislike;\
END;',(err)=>{
    if(err)
    console.log('likes is not created')
    else
    console.log('likes done')
})*/

/*
db.run('CREATE TRIGGER  newlike  AFTER DELETE ON likes \
BEGIN \
update memes set likes=likes-old.like_dislike , dislikes=dislikes-1+old.like_dislike;\
END;',(err)=>{
    if(err)
    console.log('likes is not created')
    else
    console.log('likes done')
})*/
module.exports = db ;