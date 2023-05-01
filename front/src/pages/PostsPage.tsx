import SidebarMenu from "../components/SidebarMenu";
import React, { useRef, useState, MouseEvent, CSSProperties } from 'react'


export default function PostsPage(){
    return <div className="page">
        <SidebarMenu/>
        <div className="page-content">
            <h1>Welcome to the posts page</h1>
        </div>
    </div>   
}