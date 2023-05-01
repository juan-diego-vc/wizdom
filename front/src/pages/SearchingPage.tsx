import ResultList from "../components/ResultList";
import BarMenu from "../components/BarMenu";
import SidebarMenu from "../components/SidebarMenu";
import Loader from "../components/Loader";
import Posts from "../models/Posts";
import { Post } from "../helpers/types";

import { useState } from "react";

export default function SearchingPage(){
    const [searching, setSearching] : [Boolean, Function] = useState(false)
    const [results, setResults] : [Post[],Function] = useState([])

    const search = (query : string) => {
        setSearching(true)
        Posts.getPosts(query).then((posts : Post[]) => {
            setResults(posts)
            setSearching(false)
        })
    }

    return <div className="page">
        <SidebarMenu/>
        <div className="page-content">
          <BarMenu search={search}/>
          { searching ? <Loader/> : <ResultList results={results}/> }
        </div>
    </div>
}