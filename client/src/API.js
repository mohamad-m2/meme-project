import dayjs from 'dayjs' ;

async function retrieveList(){
    let responce=await fetch('/api/memes')
    let res=await responce.json()
    return(res)
}

async function retrieveSelfList(){
  let responce=await fetch('/api/SelfMemes')
  let res=await responce.json()
  return(res)
}
async function GetMeme(id){
  let responce=await fetch('/api/memes/'+id)
  let res=await responce.json()
  return(res)
}
async function GetLikeDislike(id){
  let responce=await fetch('/api/like_dislike/'+id)
  let res=await responce.json()

  return(res)
}
async function AddMeme(meme){
    let responce = await fetch('/api/memes' ,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        "title": meme.title, 
        "private": meme.private, 
        "date": dayjs().format('YYYY-MM-DD h:mm A'),
        "image":meme.image,
        "align1":meme.align1,
        "text1":meme.text1,
        "align2":meme.align2,
        "text2":meme.text2,
        "align3":meme.align3,
        "text3":meme.text3,
        "font":meme.font,
        "color":meme.color,
        "size":meme.size,
        "box":meme.box
      } )
    })

    let res=await responce.json()
    if(responce.ok){
        return({ok:1,message:res})
    }
    else
    {
        return({ok:0,message:res})
    }

}

async function checkLoggedin(){
    let response=await fetch('/api/sessions/current')
    if(response.ok)
    {
        let user=await response.json()
        return user
    }
    else 
    return false
}
async function Logout(){
  let response=await fetch('/api/sessions/current',{
    method: 'DELETE',
  })
  if(response.ok)
  {
      let user=await response.json()
      return user
  }
  else 
  return false
}
async function DeleteMeme(id){

  let response = await fetch('/api/memes/'+id ,{
    method: 'DELETE',
    
})
if(response.ok) {
  const user = await response.json();
  
  return user;
 
}
else {
  
  try {
    const errDetail = await response.json();
    throw errDetail.message;
    
  }
  catch(err) {
    throw err;
  }
}
}


async function LoggeIn(credentials){
   
    let response=await fetch('/api/sessions',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username":credentials.username,"password":credentials.password} )
    })
    if(response.ok) {
        const user = await response.json();
        
        return user;
       
      }
      else {
        
        try {
          const errDetail = await response.json();
          throw errDetail.message;
          
        }
        catch(err) {
          throw err;
        }
      }
}
async function createUser(name,email,password){

    const response = await fetch('/api/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
      "name":name , 
      "email":email, 
      "password":password, 
    } )
  });
  if (response.ok) {
    return null;
  } else {
    return { 'err': 'POST error' };
  }

}


async function Like(id,add_remove){
  let response=''
  if(add_remove===0)
    response = await fetch('/api/like/'+id , {
    method: 'Delete'
  } )
  else
  
    response = await fetch('/api/like/'+id, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  } )

if (response.ok) {
  return null;
} else {
  return { 'err': 'POST error' };
}

}

async function Dislike(id,add_remove){
  let response=''
  if(add_remove===0)
    response = await fetch('/api/dislike/'+id , {
    method: 'Delete'
  } )
  else
    response = await fetch('/api/dislike/'+id, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  } )

if (response.ok) {
  return null;
} else {
  return { 'err': 'POST error' };
}

}

let API={Logout,createUser,LoggeIn,checkLoggedin,AddMeme,retrieveList,DeleteMeme,GetMeme,retrieveSelfList,GetLikeDislike,Like,Dislike}
export default API;