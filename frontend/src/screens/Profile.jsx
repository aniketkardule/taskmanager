import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setuser } from "../slices/UserSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {

  const dispatch = useDispatch();
  const { user } = useSelector( state => state.user);

  const [editingProfile, setEditingProfile ] = useState(true);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const enableUpdate = () => {
    setEditingProfile(false);
  }


  const updateProfile = (e) => {
    e.preventDefault();

    const datas = fetch(`${process.env.REACT_APP_API_URL}users`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify({name: name, email: email}), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .then((data) => {

        dispatch(setuser(data));
        toast.success("User data updated Successfully!");
        
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      })
  }

    return(

<div className="h-full lg:w-1/2 mx-auto sm:w-full my-10">
 
  <div className="border-b-2 block md:flex">

    <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
      <div className="flex justify-between">
        <span className="text-xl font-semibold block">My Profile</span>
        <span onClick={ enableUpdate } className="-mt-2 text-md font-bold text-white bg-teal-500 rounded-full px-5 py-2 hover:bg-teal-800">Edit</span>
      </div>

      <span className="text-gray-600">This information is secret</span>
      <div className="w-full p-8 mx-2 flex justify-center">
        <img id="showImage" className="max-w-xs w-32 items-center border" src="/userprofile.jpg" alt=""/>                          
      </div>
     <Link className="w-full bg-teal-400 rounded text-white mx-16 px-4 py-2" to="/">Go to tasks</Link>
    </div>
    
    <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
      <form onSubmit={ updateProfile }>
        <div className="rounded  shadow p-6">
          <div className="pb-6">
            <label for="name" className="font-semibold text-gray-700 block pb-1">Name</label>
            <div className="flex">
              <input value={ name } onChange={ e => setName(e.target.value)} name="name" className="border-1  rounded-r px-4 py-2 w-full" type="text" disabled={ editingProfile }/>
            </div>
          </div>
          <div className="pb-4">
            <label for="about" className="font-semibold text-gray-700 block pb-1">Email</label>
            <input value={ email } onChange={ e => setEmail(e.target.value)} name="email" className="border-1  rounded-r px-4 py-2 w-full" type="email" disabled={ editingProfile }/>
          </div>
          <div className="pb-4">
            <input name="submit" type="submit" className="text-white text-bold cursor-pointer border-1 bg-teal-400 w-full rounded py-2" disabled={ editingProfile }/>
          </div>
        </div>
      </form>
    </div>

  </div>
 
</div>
    )
}

export default Profile;