import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import  Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from 'axios';
import Joi from 'joi-browser';

import Alert from '@mui/material/Alert';
//import noValidate from 
const ariaLabel = { 'aria-label': 'description' };



//functional component
//export const Login=()=>{
    const Login=(props)=>{
        const [user,setUser]= useState({
            email:"",
            password:"",
            role:""
        }) ;

    const[errors, setErrors]= useState({
      email:"",
            password:"",
            role:""
    });

    const[errMsg, setErrMsg]=useState("");

  //schema step1:define schema object
  const schema={
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().min(3).required(),
    role : Joi.string().required(),
  }
 
  //step2:validate with user details
  const validate=() => {
    const error ={};
    const result = Joi.validate(user, schema, {abortEarly: false});
    
    
    console.log(result);

    if(result.error!=null)
      for(let item of result.error.details)
      {
        error[item.path[0]]=item.message;

      }
      return Object.keys(errors).length ===0? null : errors;
  };

        // Capture user input and update state object
  const handleChange = (event) => {
    console.log("HandleChange");
    const usr = { ...user };
    usr[event.target.name] = event.target.value;
    //this.setState({ user: user });
    setUser(usr);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle submit");
    //const errors = validate();
    //console.log(errors);
    setErrors(validate());
    console.log(errors);
    if(errors) return;
    axios
      .post("http://localhost:8082/login", user)
      .then((res) => props.history.push("/home"))
      .catch((err)=>{console.log(err.response.data.message);
        setErrMsg(err.response.data.message);
      });

  };

    return(
        <div>
         <Typography variant="h3">Login Page</Typography>
         <Grid container >
             <Grid item xs={4} style={{marginLeft:"auto",marginRight:"auto"}} >
               {errMsg && <Alert severity="error">{errMsg}</Alert>}
         <form onSubmit={handleSubmit} 
         
         style={{border:"1px solid blue", padding:"20px", marginTop:"5px"}}>
             <Box mb={3}>
         <TextField 
          inputProps={ariaLabel}
          type="email" 
          variant="outlined"
           label="Email"
           value={user.email}
           name="email"
           onChange={handleChange}
            fullWidth
            />
          {errors && <Typography variant="caption">{errors.email}</Typography>}
          </Box>
         <Box mb={3}>
         <TextField  
         inputProps={ariaLabel} 
         type="password" 
         variant="outlined" 
         label="Password"
         value={user.password}
         name="password"
         onChange={handleChange}
          fullWidth/>
          {errors && <Typography variant="caption">{errors.password}</Typography>}
          </Box>
         <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleChange}
                name="role"
                value={user.role}
                label="Role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
            </FormControl>
            {errors && <Typography variant="caption">{errors.role}</Typography>}
         <Box mb={3}>
         <Button variant="conained" type="submit" fullWidth>
             Login
         </Button></Box>
        </form>
        </Grid>
        </Grid>
            </div>
    );
}
export default Login;