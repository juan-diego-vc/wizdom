import './CreatePage.css'

import SidebarMenu from "../components/SidebarMenu"
import ItemsList from "../components/ItemsList"

export default function CreatePage(){

  return <div className="page">
    <SidebarMenu/>
    <div className="page-content create-page-content">
      <ItemsList/>
    </div>
  </div>
}