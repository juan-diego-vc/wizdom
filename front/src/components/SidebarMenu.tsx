import './SidebarMenu.css'
import { AiFillFileAdd, AiOutlineSearch } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { VscLibrary } from 'react-icons/vsc'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import WizdomLogo from './WizdomLogo'
import { CSSProperties, useRef, useState } from 'react'

const pages = [
    {
        icon : <AiFillFileAdd/>,
        title : 'Agrega nuevos articulos al repositorio',
        option : 'crear',
        route : '/create'
    },
    {
        icon : <AiOutlineSearch/>,
        title : 'Obten resultados entre todos los articulos existentes',
        option : 'buscar',
        route : '/'
    },
    {
        icon : <HiOutlineDocumentDuplicate/>,
        title : 'Accede al compilado de todos los articulos que has creado',
        option : 'posts',
        route : '/posts'
    },
    {
        icon : <VscLibrary/>,
        title : '',
        option : 'guardados',
        route : '/'
    },
    {
        icon : <IoSettingsOutline/>,
        title : '',
        option : 'ajustes',
        route : '/tests'
    },
]

export default function SidebarMenu() {
    const minArrowRef = useRef<HTMLSpanElement>(null)
    const maxArrowRef = useRef<HTMLSpanElement>(null)
    const [hidden, setHidden] : [Boolean, Function] = useState(false)

    const navigate = useNavigate();
    const handleRedirect = (route : string) => navigate(route)

    const minimize = () => setHidden(true)
    const maximize = () => setHidden(false)

    const styles : CSSProperties = { width : hidden ? 'min-content' : undefined }

    return <div className="sidebar-menu" style={styles}>
        {
            hidden ?
                <span className="arrow" onClick={maximize} ref={maxArrowRef}>
                    <BsArrowRight/>
                </span>
            :
                <span className="arrow" onClick={minimize} ref={minArrowRef}>
                    <BsArrowLeft/>
                </span>
            
        }
        { !hidden && <WizdomLogo/> }
        {pages.map((page, k) => {
            return <div
                className="item"
                title={page.title}
                key={k} onClick={() => handleRedirect(page.route)}
            >
                    <span className='icon'>{page.icon}</span>
                    {!hidden && <span className='text'>{ page.option }</span>}
            </div>
        })}
    </div>
}
