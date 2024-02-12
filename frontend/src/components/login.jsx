import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authentication";
import { setuser } from "../slices/UserSlice";
import { toast } from "react-toastify";

const Login = ({ visibility }) => {

  const dispatch = useDispatch();
  
  //error generator
  const [errors, setErrors] = useState({
    email : '',
    password : ''
  });


  //login user
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if(email == '' || password == ''){
      setErrors({
        email: email == '' ? 'Email is required !' : '',
        password: password == '' ? 'Password is Required !' : ''
      })
      
    }else{

      setErrors({
        email: '',
        password: ''
      });
      
      const datas = fetch(`${process.env.REACT_APP_API_URL}users/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json' 
                },
                body: JSON.stringify({email:email,password:password}), 
              })
                .then((response) => {
                  response.status == 401 ? setErrors({ email:'', password: 'Invalid Creditionals!'}) : setErrors({ email:'', password: ''});
                  if (!response.ok) {
                    throw new Error(response);
                  }
                  return response.json();
                })
                .then((data) => {
                  
                  dispatch(setuser(data));
                  dispatch(login(data));
                  toast.success("Login Successful!");
                  
                })
                .catch((error) => {
                  // Handle errors
                  console.error('Error:', error);
                })
    }
  } 
    return(
        <div className="md:w-1/3 max-w-sm">
        <form onSubmit={handleSubmit}>
          <h2 className="py-4 font-bold text-teal-500 text-2xl">Login</h2>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="email"
            name="email"
            placeholder="Email Address"
          />
          <p className="text-sm text-red-400">{ errors.email }</p>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            name="password"
            placeholder="Password"
          />
          <p className="text-sm text-red-400">{ errors.password }</p>
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-teal-500 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider float-left"
              name="submit"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-right">
          Don&apos;t have an account?{" "}
          <button
          onClick={ visibility }
            className="text-red-600 hover:underline hover:underline-offset-4"
          >
            Register
          </button>
        </div>
      </div>
    )
}

export default Login;