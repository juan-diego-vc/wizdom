import { Post } from "../helpers/types"

export default class Posts{
    static async getPosts(search : string) : Promise<Post[]>{
        // console.log(search)
        let url = 'http://localhost:3030/posts'
        try{
            let res : Response = await fetch(url)
            let posts : Post[] = await res.json()
            console.log(posts)
            return posts.map(post => {
                return {
                    ...post,
                    date : new Date(post.date)
                }
            })
        }catch(err){
            console.error(err)
            return []
        }
    }
}