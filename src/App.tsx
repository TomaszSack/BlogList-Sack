import { useEffect, useState } from 'react'
import './App.css'

type Post = {
  userId:number
  id: number
  title:string
  body:string
}

type Address = {
  street:string
  suite:string
  city:string
  zipcode:string
  geo:{
    lat:string
    lng:string
  }
}

type Author = {
  id:number
  name:string
  username:string
  email:string
  address:Address
  phone:string
  website:string
  company:{
    name:string
    catchPhrase:string
    bs:string
  }
}

function App() {
  const [posts, setPosts] = useState([])
  const [authors, setAuthors] = useState<Author[]>()
  const [value, setValue] = useState<string>()

  useEffect(()=>{
      fetch('https://jsonplaceholder.typicode.com/posts')
          .then(response => response.json())
          .then(json => setPosts(json))
      fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(json => setAuthors(json))
  },[])

  console.log(authors)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e:React.SyntheticEvent) =>{
    e.preventDefault()
    if (!authors) return

    const person = authors.filter((author) => author.name === value )
    
    fetch(`https://jsonplaceholder.typicode.com/posts${value && `?userId=${person[0].id}`}`)
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
