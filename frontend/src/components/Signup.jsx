import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authentication";
import { setuser } from "../slices/UserSlice";
import { toast } from "react-toastify";


const Signup = ({ visibility}) => {

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const handleSignup = (e) =>{

    e.preventDefault();

    const userName = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if(userName == '' || email == '' || password ==''  || confirmPassword == ''){

      setErrors({
        name: userName == '' ? 'User Name is needed to signup !' : '',
        email: email === '' ? 'Email is needed to signup !' : '',
        password: password == '' ? 'Password is needed to signup !' : '',
        confirmPassword: confirmPassword == '' ? 'Confirm Password is needed to signup !' : ''
      })

    }else{
      setErrors({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
      })
    

    const newErrors = {...errors};
    if(password == confirmPassword ){
      newErrors.confirmPassword = '';
      setErrors(newErrors);

      const datas = fetch(`${process.env.REACT_APP_API_URL}users/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:userName,email:email,password:password}), 
              })
                .then((response) => {
                  
                  response.status == 403 ? newErrors.email = 'User with email id already exists' : newErrors.email = '';
                  setErrors(newErrors);

                  if (!response.ok || response.status == 403) {
                    throw new Error('Network response was not ok');
                  }

                  return response.json();
                })
                .then((data) => {
                  dispatch(setuser(data));
                  dispatch(login(data));
                  toast.success("Signup Successful!");
                })
                .catch((error) => {
                  console.error('Error:', error);
                })

    }else{

      newErrors.confirmPassword = 'Password does not match !';
      setErrors(newErrors);
    }
    }
  }

    return(
        <div className="md:w-1/3 max-w-sm">
        <form onSubmit={ handleSignup }>
          <h2 className="py-4 font-bold text-teal-500 text-2xl">Signup</h2>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            name='username'
            placeholder="Name"
         />
          <p className="text-sm mb-5 text-red-400">{ errors.name }</p>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="email"
            name='email'
            placeholder="Email Address"
          />
          <p className="text-sm text-red-400">{ errors.email }</p>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            name='password'
            placeholder="Password"
          />
          <p className="text-sm text-red-400">{ errors.password }</p>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            name='confirmPassword'
            placeholder="Confirm Password"
          />
          <p className="text-sm text-red-400">{ errors.confirmPassword }</p>
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-teal-500 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider float-left"
              type="submit"
            >
              Signup
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-right">
          Alredy Registered ?
          <button
          onClick={ visibility }
            className="text-red-600 hover:underline hover:underline-offset-4"
          >
            Login
          </button>
        </div>
      </div>
    )
}

export default Signup;