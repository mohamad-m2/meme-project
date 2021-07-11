'use strict'
const db=require('./db.js')
const bcrypt=require('bcrypt')


exports.AddUser=(email,name,password)=>{
    return new Promise((resolve, reject)=>{
        let query='insert into users values(?,?,?)'

        bcrypt.hash(password,10).then(hash=>{
            db.run(query,[email,name,hash],(err)=>{
                if(err)
                reject(err)
                else
                resolve(name)
        })
        
      
        })
    })
}

exports.GetUser=(email)=>{
    return new Promise((resolve, reject)=>{
        let query='select * from users where email = ?'
        db.get(query,[email],(err,row)=>{
            if(err)
            reject(err)
            else
            resolve(row)
        })
    })
}
exports.AuthenticateUser=(email,password)=>{
    return new Promise((resolve, reject)=>{
        let query='select * from users where email = ?'
        db.get(query,[email],(err,row)=>{
            if(err)
            reject(err)
            else
            if(row===undefined)
            resolve(false); // user not foun
            else{
                bcrypt.compare(password, row.hashpass).then(result => {
                    if (result) // password matches
                        resolve({ email: row.email, name:row.name});
                    else
                        resolve(false); // password not matching
                })
            }
        })
    })
}

exports.DeleteUser=(email)=>{
    return new Promise((resolve, reject)=>{

        let query='delete from users where email = ?'
        db.run(query,[email],(err)=>{
            if(err)
            reject(err)
            else
            resolve('deleted')
        })
    })
}

exports.ModifyUser =(email,name,password=undefined)=>{
    return new Promise((resolve, reject)=>{
        let query='update users set name = ? '
        if(password!=undefined)
        {
            hash=bcrypt.hash(password,10)
            query+=', hash= "'+hash+'" '
        }

        query+='where email = ?'
        db.run(query,[name,email],(err)=>{
            if(err)
            reject(err)
            else
            resolve('updated')
        })
    })
}

exports.AddMeme =(meme)=>{
    return new Promise((resolve, reject)=>{

        let query='insert into memes(title,private,user,date,meme_layout,text1,text2,text3,font,color,size,box,likes,dislikes) values(?,?,?,?,?,?,?,?,?,?,?,?,0,0)'
        db.run(query,[meme.title,meme.private,meme.user,meme.date,meme.layout,meme.text1,meme.text2,meme.text3,meme.font,meme.color,meme.size,meme.box]
            ,(err)=>{
            if(err)
           { 
            reject(err)}
            else
            resolve('meme added')
        })
    })
}
exports.GetMeme=(id)=>{
        return new Promise((resolve, reject)=>{
           let query='select * from memes where id=?'
            db.get(query,[id],(err,row)=>{
                if(err)
                reject(err)
                else
                resolve(row)
            })
        })
}

exports.GetAllMemes=(even_pivate)=>{
    return new Promise((resolve, reject)=>{
        let query
        if(even_pivate)
        query='select id,title,private,user,date,image from memes INNER JOIN layout ON  memes.meme_layout=layout.meme_layout'
        else
        query='select id,title,private,user,date,image from memes INNER JOIN layout ON  memes.meme_layout=layout.meme_layout where private=0'
        db.all(query,(err,data)=>{
            if(err)
            reject(err)
            else
            resolve(data)
        })
    })
}
exports.GetAllSelf=(user)=>{
    return new Promise((resolve, reject)=>{
        let query
        
        query='select id,title,private,user,date,image from memes INNER JOIN layout ON  memes.meme_layout=layout.meme_layout where user=?'
        
        db.all(query,[user],(err,data)=>{
            if(err)
            reject(err)
            else
            resolve(data)
        })
    })
}

exports.DeleteMeme=(id)=>{
    return new Promise((resolve, reject)=>{
        let query='delete from memes where id=?'
        db.run(query,[id],(err)=>{
            if(err)
            reject(err)
            else
            resolve("meme dalated")
        })
    })
}

exports.GetLayout=(layout)=>{
    return new Promise((resolve, reject)=>{
        let query='select * from layout where image=? and align1=? and align2=? and align3=?'
        db.get(query,[layout.image,layout.align1,layout.align2,layout.align3],(err,row)=>{
            if(err)
            reject(err)
            else
            resolve(row)
        })
    })
}

exports.GetLayoutByID=(id)=>{
    return new Promise((resolve, reject)=>{
        let query='select * from layout where meme_layout=?'
        db.get(query,[id],(err,row)=>{
            if(err)
            reject(err)
            else
            resolve(row)
        })
    })
}


exports.CreateLayout=(layout)=>{
    return new Promise((resolve, reject)=>{
        let query='insert into layout(image,align1,align2,align3) values(?,?,?,?)'
        db.run(query,[layout.image,layout.align1,layout.align2,layout.align3],(err)=>{
            if(err)
            reject(err)
            else
            resolve("layout added")
        })
    })
}
exports.deleteLayout=(id)=>{
    return new Promise((resolve, reject)=>{
        let query='delete from layout where meme_layout=?'
        db.run(query,[id],(err)=>{
            if(err)
            reject(err)
            else
            resolve('deleted')
        })
    })
}
exports.Count=(id)=>{
    return new Promise((resolve, reject)=>{
        let query='select COUNT(*) as nb from memes where meme_layout=?'
        db.get(query,[id],(err, row)=>{
            if(err)
            reject(err)
            else
            resolve(row)
        })
    })
}


exports.UpdateMeme=(id,like_or_dislike,quantity)=>{
    return new Promise((resolve, reject)=>{

        let query='update memes '

        if(like_or_dislike==1)
        query+='set likes=likes+? '
        else
        query+='set dislikes=dislikes+? '

        query+='where id=?'
        db.run(query,[quantity,id],(err)=>{
            if(err)
            reject(err)
            else
            resolve('updated')
        })
    })
}
exports.Get_likedislike=(meme,user)=>{
    return new Promise((resolve, reject)=>{
        let query='select * from likes where meme_id=? and user=?'
        db.get(query,[meme,user],(err,row)=>{
            if(err)
            reject(err)
            else
            resolve(row)
        })
    })
}
exports.AddLike_dislike=(meme,user,likeDislike)=>{
    return new Promise((resolve, reject)=>{
        let query='insert into likes values(?,?,?)'
        db.run(query,[meme,user,likeDislike],(err)=>{
            if(err)
            reject(err)
            else
            resolve(1)
        })
    })
}
exports.DeleteLike_dislike=(meme,user)=>{
    return new Promise((resolve, reject)=>{
        let query='delete from likes where user=? and meme_id=?'
        db.run(query,[user,meme],(err)=>{
            if(err)
            {
            
            reject(err)
            }
            else
            resolve(1)
        })
    })
}

exports.DeleteAll=(meme)=>{
    return new Promise((resolve, reject)=>{
        let query='delete from likes where meme_id=?'
        db.run(query,[meme],(err)=>{
            if(err)
            reject(err)
            else
            resolve('deleted')
        })
    })
}