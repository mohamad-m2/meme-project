import { useState, useEffect } from 'react';
import { CardDeck, Container, Card, Button } from 'react-bootstrap' ;
import { Link,Redirect } from 'react-router-dom';
import {IoLockClosed,IoLockOpen} from 'react-icons/io5'
import API from './API' ; 
import dayjs from 'dayjs' ;
import background from './1.jpg'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


var sectionStyle = {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight:'100vh',
    height:'100%',
    width: '100%',
 }

let HomePage=(props)=>{
    
    let [task,settask]=useState([])
    let [dirty,setdirty]=useState(true)
    let [switch1,setswitch1]=useState(false)

    let handleDelete=(id)=>{

        let deletefunc = async(id2)=>{
            let res=await API.DeleteMeme(id2)
            setdirty(true)
        }

        deletefunc(id)
    }

    useEffect(()=>{
        if(dirty)
        {

           let getthem=async()=>{ 
               let res=''
               if(!props.mymeme)
                res = await API.retrieveList()
                else
                res = await API.retrieveSelfList()
                settask(res)
                
            }
            getthem()
            setdirty(false)
        }
        
    },[dirty])

    
    
    if(!switch1)
    return(
        
            <Container  style={sectionStyle}>

            <CardDeck className=' d-flex justify-content-between' style={{flexWrap: 'wrap',padding:'8px'}}>
        {
            task.map(x=>{
        return(<Card key={x.id} style={{ width: '20rem',height:'auto'}} className='text-light side m-2'>
            <div className='d-flex justify-content-center'>
  <Card.Img variant="top" style={{height:'18rem',width:'19rem'}} src={x.image} />
  </div>
  <Card.Body className=' d-flex justify-content-between' style={{flexDirection: 'column'}}>
      <div className='mb-4'>
    <Card.Title>{ 'by '+ x.user}</Card.Title>
    <Card.Text>
      {x.title}
    </Card.Text>
    </div>
    <div className='d-flex justify-content-between'>
    <Link to={`/home/mainPage/`+x.id}><Button variant="primary">Check out</Button></Link>

    {props.user?  <Button onClick={()=>{
        let func=async (id)=>{
            let res = await API.GetMeme(id)
            props.setmemecopy(res)
            setswitch1(true)
            
        }
        func(x.id)
     
        
    }} variant="warning">Copy</Button>:<></>}
    {x.user===props.user? <Button variant="danger" onClick={()=>{handleDelete(x.id)}}>Delete</Button>:<></>}
    </div>
  </Card.Body>
  <Card.Footer>
  <div className='d-flex justify-content-between'>

      <small className="text-muted">{dayjs(x.date).fromNow()}</small>
      <div>
          {x.private?'Private':'Public'}
    {x.private?<IoLockClosed className='privacy-private'></IoLockClosed>:<IoLockOpen className='privacy-public'></IoLockOpen>}
    </div>
  </div>  
    </Card.Footer>
</Card>)}
 )}
</CardDeck>

</Container>
    )
    else
    return (<Redirect to='/home/create'></Redirect>)
}

export{HomePage}