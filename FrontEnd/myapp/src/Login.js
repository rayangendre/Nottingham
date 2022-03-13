import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import React from 'react';
import {useState, useEffect} from 'react'


function LogIn(props) {

    const [userData, setUserData] = useState([])
  
    useEffect(() => {
      fetch("http://localhost:4000/users").then(res => res.json()).then(data => {
        setUserData(data.users_list)
        //console.log(data)
      })
    }, [])
  
    async function HandleSubmit(e){
      const login = e.target.login.value
      //console.log(login)
      e.preventDefault()
      let newId
      if (newId = userExists(login)) {
        console.log("User exists")
        console.log(newId)
      } else {
        console.log("User does not exist...Creating user...")
        newId = await createUser(login)
        console.log("New user made... ID:".concat(newId))
      }
      props.setUserId(newId)
    }
  
    async function createUser(username){
      const result = await axios.post("http://localhost:4000/users", {"name": username})
      return result.data._id
    }
  
     function userExists(user) {
      //console.log(userData)
      for (let i = 0; i < userData.length; i++) {
        //console.log(userData[i])
        if (userData[i].name === user) {
          return userData[i]._id
        }
      }
      return null
    }
  
    return (
      <>
        <main>
          <h2>Log In</h2>
          <p>
            Log in to access your personalized portfolio, and buy/sell stocks
          </p>
          <form onSubmit={HandleSubmit}>
            <div class="mb-3">
              <label class="form-label">Log In to your account</label>
              <input name="login" type="text" class="form-control" placeholder="Enter your name..."/>
              <button type="submit" class="btn btn-outline-primary" >Log In</button>
            </div>
          </form>
        </main>
        <nav>
          <Link to="/">
            <button type="button" class="btn btn-outline-primary">
              Home
            </button>
          </Link>
        </nav>
      </>
    );
  }

  export {LogIn};