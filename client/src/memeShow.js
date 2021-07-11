import { useEffect, useState } from 'react'
import{Container,Tooltip,OverlayTrigger,Col,Figure,Button, Row,Image} from 'react-bootstrap'
import API from './API.js'
import { Link, Redirect } from 'react-router-dom';
import dayjs from 'dayjs' ;
import {AiFillLike,AiFillDislike} from 'react-icons/ai'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const renderTooltip = (props) => (
    <Tooltip   {...props} bsPrefix='h5 tooltip'>
            you need to login
    </Tooltip>
  );
let Meme=(props)=>{
    let[meme,setmeme]=useState({})
    let[like_dislike,setlike_dislike]=useState([false,false])
    let [switch2,setswitch2]=useState(false)
    let [dirty,setdirty]=useState(true)
    let[nblike,setnblike]=useState(0)
    let[nbdislike,setnbdislike]=useState(0)
    useEffect(()=>{
        let get=async(id)=>{
            let res=await API.GetMeme(id)
            let res2=0

            if(props.user)
            res2=await API.GetLikeDislike(id)
          


            setmeme(res)
            setnblike(res.likes)
            setnbdislike(res.dislikes)
            if(res2)
            {
                if(res2.like_dislike)
                setlike_dislike([true,false])
                else
                setlike_dislike([false,true])
            }
          
        }
        if(dirty)
        {
        get(props.id)
        setdirty(false)
        }
        

    },[dirty])
    
    let handleDelete=(id)=>{

        let deletefunc = async(id2)=>{
            let res=await API.DeleteMeme(id2)
            
        }

        deletefunc(id)

    }
    
if(meme.meme_layout)
{
    
    let coordinate=[]
    if(meme.meme_layout.align1)
    coordinate.push({txt:meme.text1,align:meme.meme_layout.align1})
    if(meme.meme_layout.align2)
    coordinate.push({txt:meme.text2,align:meme.meme_layout.align2})
    if(meme.meme_layout.align3)
    coordinate.push({txt:meme.text3,align:meme.meme_layout.align3})

    let Style={color:meme.color,
        fontFamily:meme.font,
        fontSize:(meme.size*6)+'px',
    
    }
    
if(!switch2)
return (
    
  
    
    <Container className='side vh-100 vw-100 d-flex justify-content-center' style={{flexDirection:'column'}}>
        
    <Row>
    <Col md={6} className='d-flex justify-content-end ' >
    <Figure className='position-relative'>
    <Image src={meme.meme_layout.image} className='show-meme'>
    </Image>

    <Figure.Caption >

            { 

                coordinate.map(x=>{ 

                        let layout=x.align.split('|')[0]
                        let size=x.align.split('|')[1]
                        let style1={...Style}
                       
                
                        style1.bottom= `calc(${parseInt(layout.split(',')[0])}% - ${parseInt(size.split(',')[1])/2}px)`
                        style1.left=`calc(${parseInt(layout.split(',')[1])}% - ${parseInt(size.split(',')[0])/2}px)`

                return (<pre key={x.align}  className={`text-figure2 ${meme.box?'text-figure':''}`} style={style1}>{x.txt}
               </pre>)
                    }
                )
            }

    </Figure.Caption>


    </Figure>
    </Col>
    <Col md={6} className='d-flex justify-content-between text-light py-5' style={{flexDirection:'column'}}>
    <Row className='title'> {'By ' + meme.user}</Row>
    <Row className='title'>{meme.title}</Row>
    
    <Row className='title '>
        <div className=' d-flex justify-content-between' style={{paddingRight:'60%'}}>
        <div>{nblike}
        {props.user? <AiFillLike  className={`mx-2 ${like_dislike[0]?'clicked':'not-clicked'}`} onClick={
            ()=>{
                let func =async ()=>
                {
                let z=like_dislike[0]?0:1
                let res= await API.Like(meme.id,z)
                setlike_dislike([z,false])
                setnblike(state=>{return state+(z?1:-1)})
                setdirty(true)
                
                }
                func()
            }
        } />:<OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
    
        overlay={renderTooltip}>
           <AiFillLike className={`mx-2 not-clicked`}></AiFillLike>
          </OverlayTrigger>}
        </div>
        <div>{nbdislike}
        {props.user? <AiFillDislike  className={`mx-2 ${like_dislike[1]?'clicked':'not-clicked'}`} onClick={
            ()=>{
                let func =async ()=>
                {
                let z=like_dislike[1]?0:1
                let res= await API.Dislike(meme.id,z)
                setlike_dislike([false,z])
                setnbdislike(state=>{return state+(z?1:-1)})
                setdirty(true)
                
                }
                func()
            }
        }/>:<OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
    
        overlay={renderTooltip}>
           <AiFillDislike className={`mx-2 not-clicked`}></AiFillDislike>
          </OverlayTrigger>}
        </div>
    </div>
    </Row>

    <Row className='title '>
        <div className=' d-flex justify-content-between' style={{paddingRight:'60%'}}>
        {props.user? <Button onClick={()=>{
        let x=async (id)=>{
            let res = await API.GetMeme(id)
            props.setmemecopy(res)
            setswitch2(true)
        }
        x(meme.id)
    }} variant="warning">Copy</Button>:<></>}
    {meme.user===props.user? <Button variant="danger" onClick={()=>{handleDelete(meme.id)}}><Link className='aa'  to='/home/mainPage'>Delete</Link></Button>:<></>}
    </div>
    </Row>




    <Row className='title' style={{color:'#8f8f8f'}}>{dayjs(meme.date).fromNow()}</Row>
    </Col></Row>
    
    </Container> 

    )
    return(<Redirect to='/home/create'/>)

}
    else 
    return( <Container className='side vh-100 vw-100 d-flex justify-content-center' style={{flexDirection:'column'}}> /</Container>)
    

}

export{Meme}