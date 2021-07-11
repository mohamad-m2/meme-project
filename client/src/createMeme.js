import {ListGroup,Image,Figure,Col,Button,Collapse,Form } from 'react-bootstrap'
import {ListMeme} from './memes/index.js'
import { useEffect, useState } from 'react'
import defaultImage from './defaultImage.jpg'
import { SketchPicker } from 'react-color'
import NumericInput from 'react-numeric-input';
import React from'react'
import {IoLockClosed,IoLockOpen} from 'react-icons/io5'
import {IoMdAddCircleOutline} from 'react-icons/io'
import API from './API.js'



let Modal=(props)=>{
    
    
    
    return(<Collapse in={props.open} ><SketchPicker className='color-fluid'   color={props.color} onChange={(color, event)=>{
        props.setcolor(color.hex)
    }} /></Collapse>)
}

let Fields=(props)=>{
    let [open,setOpen]=useState(false)

   
    const handleSave=()=>{

        let texts=[props.text1,props.text2,props.text3]
        let image_validity=true
        let title_validity=true
        let text_validity=0
        if(props.title==='')
        {
            title_validity=false
            props.settitlevalidity(false)
        }
        if(!props.image)
        {
            image_validity=false
            props.setimagechoosen(false)

        }
        
        for (let i=0;i<props.nbtext;i++)
        {
            if(texts[i]!=='')
            text_validity++
        }
        if(text_validity===0)
        props.settextfilled(false)

        if(text_validity>0 && title_validity &&image_validity)
        {
            console.log(props.image)
            let meme={title:props.title,image:props.image.image,private:props.private*1,
            font:props.Font,size:props.size,color:props.color,box:props.box}
            let j=1
            for (let i=0;i<props.image.coordinate.length;i++)
            {
                
                    meme['text'+j]=props.image.coordinate[i][2].txt
                    meme['align'+j]=props.image.coordinate[i][0]+','
                    +props.image.coordinate[i][1]+'|'+props.image.coordinate[i][2].size[0]
                    +','+props.image.coordinate[i][2].size[1]
                    j++;


                
            }
          
            API.AddMeme(meme)
            window.location.replace('/')
            
        }

        
    }
    

    return (
    <Form  className='input-side text-light p-4'  style={{ position: "relative"}} >
        <Form.Row>
        <Form.Group  className='p-2' as={Col} controlId="formGridEmail">
         <Form.Label>Title</Form.Label>
         <Form.Control type='text' placeholder='title'value={props.title} onChange={(event)=>{
             props.settitlevalidity(true)
             props.settitle(event.target.value)
         }} className={props.titlevalidity?'':'text-field-warning'}></Form.Control>
          {props.titlevalidity?'':<Form.Label className='field-text-warning'>No title is specified !! </Form.Label>}
         </Form.Group>
         </Form.Row>

            <Form.Row  className='p-2 d-flex  input-side ' >
            <Form.Group as={Col} >
            Text Color
        <Form.Control type ='button' className='color-button '  onClick={() => setOpen(!open)}
        
        aria-expanded={open}
        style={{backgroundColor:props.color }}></Form.Control>
        <Modal open={open} color={props.color} setcolor={props.setcolor} setOpen={setOpen}></Modal>
        </Form.Group>

        <Form.Group as={Col} className='font-button'>
                Text font
        <Form.Control value={props.Font} onChange={(event)=>
            props.setfont(event.target.value)} as="select"  >
        
        <option >Times New Roman </option>
        <option >Monospace </option>
        <option >cursive </option>
  
        </Form.Control>
        </Form.Group>
        </Form.Row>

        <Form.Row>
        <Form.Group  className='p-2' as={Col} controlId="formGridEmail">
         <Form.Label>text1</Form.Label>
        <Form.Control  as="textarea" onChange={(event)=>
         {props.settext1(event.target.value)
         props.settextfilled(true)}
        } 
        value={props.text1} className={props.textfilled?'':'text-field-warning'} />
        {props.textfilled?'':<Form.Label className='field-text-warning'>No text field is filled !! 
        you need to fill at least one</Form.Label>}
        </Form.Group>
        </Form.Row>

        {props.nbtext>1?
        <Form.Row>
        <Form.Group className='p-2' as={Col} controlId="formGridEmail">
         <Form.Label>text2</Form.Label>
        <Form.Control as="textarea" onChange={(event)=>
         {props.settext2(event.target.value)
         props.settextfilled(true)}
        } 
         value={props.text2} />
        </Form.Group>
        </Form.Row>:<></>
      
          }
          {props.nbtext>2?
        <Form.Row>
        <Form.Group className='p-2' as={Col} controlId="formGridEmail">
         <Form.Label>text3</Form.Label>
        <Form.Control as="textarea" onChange={(event)=>{
        props.settext3(event.target.value)
        props.settextfilled(true)
        
        }} 
         value={props.text3} />
        </Form.Group>
        </Form.Row>:<></>
         }
        <Form.Row>
        <Form.Group className='p-2' as={Col} controlId="formGridEmail">
         <Form.Label>size</Form.Label>
        <NumericInput  className="form-control" value={props.size} onChange={valueAsNumber=>{
        if(valueAsNumber>8)
        valueAsNumber=8 
        if(valueAsNumber<2)
        valueAsNumber=2
        props.setsize(valueAsNumber)}}
         min={2} max={8}  />
        </Form.Group>
        
        </Form.Row>
      
        <Form.Row className='py-2 d-flex justify-content-between align-items-center '>
        <Form.Group className='p-2'   >

        <Form.Label>{props.private?'Private':'Public'}</Form.Label>
        {props.private?
            <IoLockClosed className={props.initialuser&&(props.user!==props.initialuser)&&props.initialy_private?'privateDisable privacy-input':`privacy-input privacy-input-private`} 
            onClick={()=>{
                if(!(props.initialuser&&(props.user!==props.initialuser)&&props.initialy_private))
               { 
                   return props.setprivate(state=>!state)
               }

                }} >
            </IoLockClosed>:
            <IoLockOpen className={`privacy-input privacy-input-public`} onClick={()=>props.setprivate(state=>!state)}>
            </IoLockOpen>
        }
           
           </Form.Group>
            <Form.Group className='p-2'>
            <Form.Label>Box</Form.Label>
            <Button variant={props.box?'danger':'success'} className=' mx-2' onClick={()=>{
                    props.setbox(state=>!state)
                }}>{props.box?'Disabel':'Enabel'}
            </Button>
            </Form.Group>    
    

            
            <Form.Group className='p-2'   >
            <Button variant="outline" className='mybtn mx-2' onClick={handleSave}>Save 
            <IoMdAddCircleOutline className='icon '></IoMdAddCircleOutline>
            </Button>
            </Form.Group>
            
           
        </Form.Row>
    </Form >)
    
}

let ImageList =(props)=>{

    
if(props.copy)
return (<></>)
else
    return ( 
    <ListGroup className='side list-group px-2'  >
   { ListMeme.map(x=><ListGroup.Item  key={x.image+'.jpg'} className='side px-3 p-1'><div className={`side p-2 ${props.active.image===x.image?'active2':''}`}><Image  src={`${x.image}`} className='image-list'
    onClick={()=>{
        props.setimagechoosen(true)
        props.setactive(x)}}></Image></div></ListGroup.Item>)}
    </ListGroup>)

}

let Centered=(props)=>{
 let Style={color:props.color,
    fontFamily:props.Font,
    fontSize:(props.size*6)+'px',

}
    let texts=[props.text1,props.text2,props.text3]
    if(props.active)
    for (let i =0;i<props.active.coordinate.length;i++)
    {
        if(props.active.coordinate[i].length===2)
        {
            props.active.coordinate[i].push(texts[i])
        props.active.coordinate[i].push(props.textref[i])
    }
        else
        props.active.coordinate[i][2]=texts[i]
    }
    

    return(
       
      <div className='mw-100'>
          <Figure className='position-relative'>
            <Image src={props.active?`${props.active.image}`:`${defaultImage}`} className={`image-fluid ${!props.imagechoosen?'centered-image-warning':''}`}>
            </Image>
            <Figure.Caption >
                {!props.imagechoosen?<div className='centered-image-text-warning'>No image is choosen !!</div>:''}

            {
               props.active? props.active.coordinate.map(x=>{ 
                        let style1={...Style}
                        style1.bottom= `calc(${x[0]}% - ${x[2].size[1]/2}px)`
                        style1.left=`calc(${x[1]}% - ${x[2].size[0]/2}px)`
                        

                return (<pre key={x[0]} ref={x[3]}  className={`text-figure2 ${+props.box?'text-figure':''}`} style={style1}>{x[2].txt}
               </pre>)
                    }
                ):<></>
            }

            </Figure.Caption>
            </Figure>
       </div>
    )
}
let textref=[React.createRef(),React.createRef(),React.createRef()]
let CreatePage=(props)=>{
   
    
    let [active,setactive]=useState('')
    let [title,settitle]=useState('')
    let [text1,settext1]=useState('text1')
    let [size1,setsize1]=useState([48,36])
    let [size2,setsize2]=useState([48,36])
    let [size3,setsize3]=useState([48,36])
    let [text2,settext2]=useState('text2')
    let [text3,settext3]=useState('text3')
    let [color,setcolor]=useState('#ffff')
    let [Font,setfont]=useState('Times New Roman')
    let [size,setsize]=useState(4)
    let [box,setbox]=useState(true)
    let [Private,setprivate]=useState(false)
    let [imagechoosen,setimagechoosen]=useState(true)
    let [textfilled,settextfilled]=useState(true)
    let [titlevalidity,settitlevalidity]=useState(true)
    
    useEffect(()=>{
    if(props.memecopy!=='')
    {
        settitle(props.memecopy.title)
        settext1(props.memecopy.text1)
        settext2(props.memecopy.text2)
        settext3(props.memecopy.text3)
        setcolor(props.memecopy.color)
        setfont(props.memecopy.font)
        setsize(props.memecopy.size)
        setprivate(props.memecopy.private)
        setbox(props.memecopy.box)

    let act={image:props.memecopy.meme_layout.image,coordinate:[]}
    if(props.memecopy.meme_layout.align1 !=='')
    {
    let x=props.memecopy.meme_layout.align1.split('|')
    let cood=x[0].split(',')
    let sz=x[1].split(',')
    act.coordinate.push([parseInt(cood[0]),parseInt(cood[1])])
    setsize1([parseInt(sz[0]),parseInt(sz[1])])
    }
    if(props.memecopy.meme_layout.align2 !=='')
    {
    let x=props.memecopy.meme_layout.align2.split('|')
    let cood=x[0].split(',')
    let sz=x[1].split(',')
    act.coordinate.push([parseInt(cood[0]),parseInt(cood[1])])
    setsize2([parseInt(sz[0]),parseInt(sz[1])])
    }
    else{
        setsize2([0,0])
    }
    if(props.memecopy.meme_layout.align3 !=='')
    {
    let x=props.memecopy.meme_layout.align3.split('|')
    let cood=x[0].split(',')
    let sz=x[1].split(',')
    act.coordinate.push([parseInt(cood[0]),parseInt(cood[1])])
    setsize3([parseInt(sz[0]),parseInt(sz[1])])
    }
    else{
        setsize3([0,0])
    }

    setactive(act)
    }},[props.memecopy])




    useEffect(()=>{
        
        if(textref[2].current)
        {
        
            setsize3([textref[2].current.clientWidth,textref[2].current.clientHeight])

        }
},[text3,size,Font])

useEffect(()=>{
    if(textref[1].current)
    {
        setsize2([textref[1].current.clientWidth,textref[1].current.clientHeight])


    }
},[text2,size,Font])
  
useEffect(()=>{
    if(textref[0].current)
    {
    setsize1([textref[0].current.clientWidth,textref[0].current.clientHeight])
  }
},[text1,size,Font])

    return(
        <>
    <Col xs={3} md={2} className='side' >
        <div style={{height:'90vh'}}>
        <ImageList copy={props.memecopy!==''} setimagechoosen={setimagechoosen} active={active} setactive={setactive}></ImageList>
        </div>
        </Col>
        <Col xs={6} md={6} className='d-flex align-items-center justify-content-center image-creation'>
        <Centered box={box} imagechoosen={imagechoosen} textref={textref} text1={{txt:text1,size:size1}} text2={{txt:text2,size:size2}} text3={{txt:text3,size:size3}} color={color} size={size} Font={Font} active={active}></Centered>
        </Col>
        <Col className='input-side'>
            <Fields text3={text3} text2={text2} text1={text1} nbtext={active?active.coordinate.length:1} 
            Font={Font} size={size} setsize={setsize} setfont={setfont} color={color} 
            settext1={settext1} settext2={settext2} settext3={settext3} setcolor={setcolor} 
            private={Private} setprivate={setprivate} image={active}  textfilled={textfilled}
            setimagechoosen={setimagechoosen} settextfilled={settextfilled} title={title} 
            settitle={settitle} titlevalidity={titlevalidity} settitlevalidity={settitlevalidity}
            user={props.user} initialuser={props.memecopy===''?false:props.memecopy.user}
            initialy_private={props.memecopy===''?false:props.memecopy.private} box={box}
            setbox={setbox}
            >
               
            </Fields>
        </Col>
        </>
    )
}
export {CreatePage}