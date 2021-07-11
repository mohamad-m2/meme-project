
import 'bootstrap/dist/css/bootstrap.min.css' 

import { useEffect, useState } from 'react';
import {  Row } from 'react-bootstrap' ;
import API from './API.js'
import {MemeNav} from './navbar.js'
import { BrowserRouter as Router, Redirect, Route, Switch,useRouteMatch } from 'react-router-dom' ;
import {LoginPage} from './LoginPage.js'
import  {CreateUserForm} from './signUp.js'
import {CreatePage} from './createMeme.js'
import {HomePage} from './homePage.js'
import {Meme} from './memeShow.js'

function Home(props){
  let { path,url } = useRouteMatch();

  return (
    
      <Switch>
        
      <Route exact path= {`/home/mainPage`} render={()=>{
       return (<HomePage key='1' mymeme={false} setmemecopy={props.setmemecopy} user={props.loggedin.email}></HomePage>)
      }}/>
      <Route path={`${path}/mainPage/:id`} render={
        ({match})=>{
          
          return(<Meme  setmemecopy={props.setmemecopy} user={props.loggedin.email} id={match.params.id}/>)
        }
      }>

      </Route>

      <Route path={`${path}/create`} render={()=>{
        return props.loggedin? <CreatePage user={props.loggedin.email} memecopy={props.memecopy} />:<Redirect to={`${url}/mainPage`}></Redirect>
        
      }}/>
      <Route path={`${path}/myMemes`} render={()=>{
        return props.loggedin?<HomePage key='2'  mymeme={true} setmemecopy={props.setmemecopy} user={props.loggedin.email} ></HomePage>:<Redirect to={`${url}/mainPage`}></Redirect>
      }}/>
      <Route path={`${path}/account`} render={()=>{
        props.loggedin?<></>:<Redirect to={`${url}/mainPage`}></Redirect>
      }}/>
      <Route path= {`${path}/`}>
      <Redirect to={`${url}/mainPage`}></Redirect>
      </Route>
      </Switch>
     
  )

}

function App() {
  let [loggedin,setloggedin]=useState(false)


  useEffect(()=>{
    let check=async ()=>{
        let res=await API.checkLoggedin()
        setloggedin(res)
    }
    check();
  },[])
  let [memecopy,setmemecopy]=useState('')
 
  
  return (
    <div className="App">
     
        <Router>
        <Switch>
          <Route exact path='/' >
            <Redirect to='/home/mainPage'></Redirect>
          </Route>

        <Route  path='/home'
            render={() =>
              {
             return( <>
             <Row>
          <MemeNav setmemecopy={setmemecopy} logout={async ()=>{API.Logout()
            let res=await API.checkLoggedin()
            setloggedin(res)
            window.location.replace('/')
          
          }} login={loggedin} /></Row>
         <Row><Home memecopy={memecopy}  setmemecopy={setmemecopy} loggedin={loggedin}></Home></Row>
          </>)}
            } />
        
         
            <Route path='/login' render={ ()=><LoginPage setlogin={setloggedin} login={API.LoggeIn}></LoginPage>
            }/>
             
             <Route path='/user' render={()=><CreateUserForm ></CreateUserForm>
            }/>
             </Switch>
        </Router>

    </div>
  );
}

export default App;
