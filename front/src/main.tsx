import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './index.css'
import {IconContext} from "react-icons"

import SearchingPage from './pages/SearchingPage';
import CreatePage from './pages/CreatePage'
import PostsPage from './pages/PostsPage'

// import App from './test-components/DraggableDiv'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchingPage/>,
  },{
    path: "/create",
    element: <CreatePage/> 
  },{
    path: "/posts",
    element: <PostsPage/>
  },{
    path: "/tests",
    element: <CreatePage/> 
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <IconContext.Provider value={{ className: "icons"}}>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </IconContext.Provider>
  // </React.StrictMode>,
)
