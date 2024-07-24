import { useEffect, useState } from 'react'
import './App.css'

type Post = {
  userId:number
  id: number
  title:string
  body:string
}

function App() {
  const [posts, setPosts] = useState([])
  const [value, setValue] = useState<string>()

  useEffect(()=>{
      fetch('https://jsonplaceholder.typicode.com/posts')
          .then(response => response.json())
          .then(json => setPosts(json))
  },[])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e:React.SyntheticEvent) =>{
    e.preventDefault()
    if (!value) return
    
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${value}`)
    .then(response => response.json())
    .then(json => setPosts(json))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleChange}></input>
        <button type='submit'>Submit</button>
      </form>
      <div className='bg-[#fafafa] text-black'>
      {
        posts.map((post:Post)=>(
          <p key={post.id}>{post.title}</p>
        ))
      }
      </div>
    </div>
  )
}

export default App
