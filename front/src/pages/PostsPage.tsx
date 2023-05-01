import SidebarMenu from "../components/SidebarMenu";
import React, { useRef, useState, MouseEvent, CSSProperties } from 'react'

import ComponentsList from "../components/ComponentsList";


export default function PostsPage(){
    return <div className="page">
        <SidebarMenu/>
        <div className="page-content" style={{ justifyContent: 'space-around' }}>
            <h1>Posts page</h1>
            <ComponentsList/>
        </div>
    </div>   
}