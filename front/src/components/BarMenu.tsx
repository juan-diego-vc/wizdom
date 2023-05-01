import './BarMenu.css'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import Xiraicon from './Xiraicon'
import IconBox from './IconBox'
import SearchBar from './SearchBar'
import { rand } from '../helpers/helpers'

function randLetter() : string {
    let ind = rand(97, 123)
    return String.fromCharCode(ind)
}

interface proptypes{
    search : Function
}

export default function BarMenu({ search } : proptypes){
    return <div className="barmenu">
        <SearchBar search={search}/>
        <span>
            <div className="profile">{randLetter()}</div>
        </span>
    </div>
}