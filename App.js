//import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import NavBar from "./components/navbar";
import Login from './components/login';
import Posts from "./components/posts"
import Register from "./components/register";
import PageNotFound from './components/pagenotfound';
import Student from './components/student';
import AddStudent from './components/addstudent';
import UpdateStudent from './components/updateStudent';

import BankAccount from './components/bankaccount';


import { Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import AddAccount from './components/addaccount';
import UpdateAccount from './components/updateaccount';
import ViewAccount from './components/viewaccount';
import Logout from './components/logout';

function App() {
  return (
    
    <div className="App">
      
      <NavBar/>
      <Switch>
        <Route path="/posts" component={Posts} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout}/>
        <Route path="/student" component={Student}/>
        <Route path="/students/add" component={AddStudent}/>
        <Route path="/students/update/:rollNo" component={UpdateStudent}/>
        
        <Route path="/addaccount/add" component={AddAccount}/>
        <Route path="/bankaccount/viewaccount/:accountNo" component={ViewAccount}/>
        <Route path="/bankaccount/updateaccount" component={UpdateAccount}/>
        <Route path="/bankaccount" component={BankAccount}/>
        
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Redirect from="/home" to="/" />
        <Route component={PageNotFound} />
      </Switch>
      </div>
    
  );
}

export default App;
