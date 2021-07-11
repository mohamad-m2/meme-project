import {Navbar,Button} from 'react-bootstrap' ;
import { Link ,useRouteMatch} from 'react-router-dom' ;
import { useState } from 'react' ;
import {AiOutlineSmile,AiFillHome}from 'react-icons/ai';
import {MdAddBox}from 'react-icons/md'
import {IoIosAlbums}from 'react-icons/io'
import {FaUserCircle}from 'react-icons/fa'

import './Styles.css'


let Logo=(props)=>
{

    return(<div className="d-flex justify-content-center">
        <Navbar.Brand style={{marginRight:'0.5rem'}}>
        <AiOutlineSmile className='logo' ></AiOutlineSmile>
        </Navbar.Brand>
        <Navbar.Brand className=" logo_text" >
        MEMES
     </Navbar.Brand>
    </div>)
}

let Elements=(props)=>
{ let { url } = useRouteMatch();
    return(<div className="d-flex justify-content-center">
            <Link to={`${url}/mainPage`}> <Button variant="outline" className='mybtn mx-2'>Home 
            <AiFillHome className='icon '></AiFillHome>
            </Button></Link>
            { props.login?
            
            <Link to={`${url}/create`}><Button onClick={()=>{props.setmemecopy('')}} variant="outline" className='mybtn mx-2'>Create 
            <MdAddBox className='icon '></MdAddBox>
            </Button></Link>:<></>}
            { props.login?
            <Link to={`${url}/myMemes`}><Button variant="outline" className='mybtn mx-2'>My Memes 
            <IoIosAlbums className='icon '></IoIosAlbums>
            </Button></Link>:<></>}

            
            </div>
    )
}

let User_icon=(props)=>{
    const [showUserMenu, setShowUserMenu] = useState(false) ;
    let { url } = useRouteMatch();
    return (
        

        <div>
        { props.login?<Navbar.Brand className=" logo_text" >{props.username}</Navbar.Brand>:
       <Navbar.Brand ><Link to="/login"  ><Button variant='outline'className='mybtn '>{'login'}</Button></Link></Navbar.Brand>}
    
            <Navbar.Brand className="ml-sm-auto" id="navbarDropdown " onClick={()=>setShowUserMenu(oldState => !oldState)}>
            <FaUserCircle className='logo' ></FaUserCircle>
            </Navbar.Brand>
            <div className={`dropdown-content dropdown-menu ${showUserMenu&&props.login?"show":""} `} aria-labelledby="navbarDropdown">
            {props.login? <div onClick={props.logout} className="dropdown-item validity-error " style={{ textDecoration: 'none' }}>logout</div>:<></>}
            {props.login?<Link to={`${url}/account`} style={{ textDecoration: 'none' }}><div className="dropdown-item validity-error" onClick={()=>setShowUserMenu(false)}>account</div></Link>:<></>}
         
            </div>
            </div>
        )
    
}

let MemeNav=(props)=>{

    return (
        
        <Navbar className="color-nav d-flex justify-content-between" expand="sm" bg='dark' variant='light' sticky='top'>
            
            <Logo></Logo>
            
             <Elements setmemecopy={props.setmemecopy}login={props.login} ></Elements>
            <User_icon logout={props.logout} login={props.login} username={props.login.name}></User_icon>
            
        </Navbar>
     
    )
}

export {MemeNav}