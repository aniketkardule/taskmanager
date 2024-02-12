// src/Components/Login.js
import React, { useState } from "react";
import Login from "../components/login";
import Signup from "../components/Signup";
import TaskScreen from "./TaskScreen";
import { useSelector } from "react-redux";

const imgStyle = {
            backgroundImage:
                "url(/bgimg.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        };
const HomeScreen = () => {

  //check user logged in
  const { userInfo } = useSelector(state => state.auth);

  const [signin, setSignin] = useState(true);

  const updateSignin = () => {
    signin ? setSignin(false) : setSignin(true);
  }
  return (
    
    userInfo ? 

     <TaskScreen /> :
    
    (
    <>
    <section  className="h-screen" style={ imgStyle }>
      <h1 className="mx-auto text-teal-800 p-20 py-14 text-4xl font-bold w-fit">Welcome to TaskManager Application</h1>
      <div className="bg-grey flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0">
          <div className="md:w-1/3 max-w-sm">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample image"
            />
          </div>
          { signin ? <Login visibility={updateSignin} /> : <Signup visibility={ updateSignin } />}
        </div>
    </section>
    </>) 

    
    
  );
};

export default HomeScreen;