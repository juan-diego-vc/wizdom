// import '../index.css'
import './SearchBar.css'
import { useRef, useEffect, useState } from 'react'
import { ChangeEvent } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import IconBox from './IconBox'

interface proptypes { search : Function }

export default function SearchBar({ search } : proptypes){
    const [searchString, setSearchString] : [string, Function] = useState('')
    const searchRef = useRef(searchString);

    const container = useRef<HTMLDivElement>(null)
    const input = useRef<HTMLInputElement>(null)

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const newValue : string = e.target.value
        // console.log(newValue)
        searchRef.current = newValue
        setSearchString(newValue)
    }

    const handleFocus = () => {
        document.addEventListener('keydown', (e : KeyboardEvent) => {
            if(e.key === 'Enter'){
                container.current?.classList.remove('focus')
                search()
            }
        })
        container.current?.classList.add('focus')
    }

    const handleBlur = () => {
        document.removeEventListener('keydown',() => {
            console.log('this is the callback')
        })
        container.current?.classList.remove('focus')
    }

    useEffect(() => {
        if(input.current !== null){
            input.current.addEventListener('focus', handleFocus)
            input.current.addEventListener('blur', handleBlur)
        }
    }, [])

    return <div className="search-bar" ref={container}>
        <input
            type="text"
            placeholder="Buscar..."
            spellCheck="false"
            ref={input}
            value={searchString}
            onChange={handleChange}
        />
        <IconBox>
            <AiOutlineSearch/>
        </IconBox>
    </div>
}