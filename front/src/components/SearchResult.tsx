import './SearchResult.css'
import { capitalize } from '../helpers/helpers'
import { AiFillQuestionCircle, AiOutlineFileText } from 'react-icons/ai'
import { CSSProperties, ReactElement } from 'react'

interface proptypes {
    title: string,
    description: string,
    tags: string[],
    user: string,
    date: Date,
    type: string
}

export default function SearchResult({ title, description, tags, user, date, type }: proptypes) {
    const tagList = tags.map((tag, i) => {
        return <div className="tag" key={i}>{tag}</div>
    })
    const formatedDate = ` ${date.toLocaleString().replace(',', ' ')}`

    return <div className="search-result">
        <h4 className='title'>
            {/* <TypeIcon type={type}/> */}
            <span title='Ir al sitio de este artículo'>{capitalize(title)}</span>
        </h4>
        <div className='description'>{capitalize(description)}</div>
        <div className='tags'>{tagList}</div>
        <div className='reference'>
            <span className='username' style={{ color: 'skyblue' }}>{user}</span>{formatedDate}
        </div>
    </div>
}

interface Types { [key: string]: ReactElement; }

interface typeIconPropTypes{ type : string }

function TypeIcon({ type }: typeIconPropTypes) {
    const types : Types = {
        question: <AiFillQuestionCircle />,
        solution: <AiOutlineFileText />
    }
    const styles : CSSProperties = {
        position: 'relative',
        display:'inline',
        color: 'white',
        transform:'translate(30px,50px)',
        backgroundColor : 'red'
    }
    return <div style={styles}>{types[type]}</div>
}