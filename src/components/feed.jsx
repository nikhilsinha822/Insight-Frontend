import Post from './Post/postCard'
const Feed = ({posts}) => {
    return <>
        {posts.map((post)=> (
            <Post key={post._id} post={post}/>
        ))}
    </>
}

export default Feed;