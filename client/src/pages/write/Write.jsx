import axios from "axios";
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import './write.css'
export default function Write() {
const [title, setTitle] = useState('')
const [desc, setDesc] = useState('')
const [file, setFile] = useState(null)
const {user} = useContext(Context)

const handleSubmit = async (e)=> { 
  e.preventDefault()

  const newPost = {
    username: user.username,
    title, 
    desc, 
  }

  if(file){
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name", filename)
    data.append("file", file)
    newPost.photo = filename
    try{
       await axios.post('/upload', data)
     
    } catch(err){}
  }

  try{
    const res = await axios.post('posts', newPost)
    window.location.replace(`/post/${res.data._id}`)
  }catch(err) { 

  }

}


  return (
    <div className="write">
      <div className="writeWrapper">
        {file && (

        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
        />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup1">
            <label htmlFor="inputFile">
              <i class="writeIcon bi bi-plus-circle"></i>
            </label>
            <input type="file" className="writeInput" id="inputFile" hidden={true} onChange={e=> (setFile(e.target.files[0]))} />
            <input type="text" className="writeInput writeInputTitle" placeholder="Title" autoFocus={true} onChange={e=> (setTitle(e.target.value))} />
          </div>
          <div className="writeFormGroup2">
            <textarea type="text" className="writeInput writeText" placeholder="Tell us your story..." onChange={e=> (setDesc(e.target.value))} />
               
          </div>
          <button className="writeSubmit " type="submit">Publish</button>
        </form>
      </div>
    </div>
  );
}
