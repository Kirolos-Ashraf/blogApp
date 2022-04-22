import React from 'react'
import './single.css'
import SinglePost from '../../components/singlePost/SinglePost'
import SideBar from '../../components/sidebar/Sidebar'


export default function Single() {

  return (
    <div className='single'>
         <SinglePost />
         <SideBar />
    </div>
  )
}
