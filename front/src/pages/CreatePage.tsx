import './CreatePage.css'

import SidebarMenu from "../components/SidebarMenu"
import ItemsList from "../components/ItemsList"
import ComponentsList from '../components/ComponentsList'

export default function CreatePage(){

  const addComponent = () => {
    
  }

  return <div className="page">
    <SidebarMenu/>
    <div className="page-content create-page-content">
      <ModalMenu/>
      <ItemsList/>
    </div>
  </div>
}

function ModalMenu(){
  return <div className="modal-menu">
    <ComponentsList/>
  </div>
}