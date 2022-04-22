import axios from "axios";
import React, { useContext, useState } from "react";
import SideBar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import "./settings.css";

export default function Settings() {
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {user, dispatch } = useContext(Context)
  const [success, setSuccess] = useState(false)
  const PF = 'http://localhost:5000/images/'

  const handleSubmit = async (e) => { 
    e.preventDefault();
    dispatch({
      type: "UPDATE_START"
    })
    const userUpdated = { 
      userId : user._id,
      username, 
      email,
      password
    }

    if(file) { 
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename)
      data.append("file", file)
      userUpdated.profilePic = filename
      try{
        await axios.post('/upload', data)
      }catch(err) {}
    }

    try{
       const res = await axios.put(`/users/${user._id}`, 
         userUpdated
       )

       setSuccess(true)
       dispatch({
        type: "UPDATE_SUCCESS", 
        payload: res.data
      })
    }catch(err) { 
      dispatch({
        type: "UPDATE_FAILURE", 
        
      })
    }

  }


  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={ file ? URL.createObjectURL(file): PF+ user.profilePic}
              alt=""
            />
            <label htmlFor="inputFile">
              <i className="settingsPPIcon bi bi-person-circle"></i>
            </label>
            <input type="file" id="inputFile" hidden={true} onChange={e=> (setFile(e.target.files[0]))} />
          </div>
          <label>Username</label>
          <input type="text" className="settingsPPInput"  placeholder={user.username} name="username" onChange={e=> (setUsername(e.target.value)) }/>
          <label>Email</label>
          <input type="text" className="settingsPPInput" placeholder={user.email} name="email"
          onChange={e=> (setEmail(e.target.value)) }/>
          <label>Password</label>
          <input type="password" className="settingsPPInput" placeholder="***" name="password"
          onChange={e=> (setPassword(e.target.value)) }/>
          <button type="submit" className="settingsSubmit">Update</button>
          {success && (
            <span style={{color: "green"}}>Profile has been updated...</span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
}
