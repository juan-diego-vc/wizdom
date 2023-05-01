import './ResultList.css'
import SearchResult from './SearchResult'
import { Post } from '../helpers/types'

interface proptypes { results : Post[] }

export default function ResultList({ results } : proptypes){
    
    const count = results.length
    const end = 'Fin de los resultados'
    const noResults = 'No hubo resultados para su busqueda'
    const endMessage = count > 0 ? end : noResults
    const initialMessage = `Se ha obtenido un total de ${count} resultados`

    return <div className="result-list">
        <div className='legend'>{ initialMessage }</div>
        { results.map((reg : Post, i : number) => {
            return <SearchResult
                title={reg.title}
                date={reg.date}
                description={reg.description.trim()}
                tags={reg.tags}
                user={reg.user}
                type={reg.type}
                key={i}
            />
        }) }
        <div className="end">{ endMessage }</div>
    </div>
}