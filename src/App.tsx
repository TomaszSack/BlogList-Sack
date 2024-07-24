import { useEffect, useState } from 'react'
import './App.css'
import BlogAsset from './assets/blogAsset.png'

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
          .then(json => setPosts(json.sort(() => 0.5 - Math.random())))
      fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(json => setAuthors(json))
  },[])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e:React.SyntheticEvent) =>{
    e.preventDefault()
    if (!authors) return

    const person = authors.filter((author) => author.name === value )

    if (person.length===0) return
    
    fetch(`https://jsonplaceholder.typicode.com/posts${value && person.length>0 && `?userId=${person[0].id}`}`)
    .then(response => response.json())
    .then(json => setPosts(json))
  }

  if (!authors) return

  return (
    <div className='flex flex-col items-center p-6 bg-[#fafafa] text-[#121212]'>
      <h1 className='text-5xl'>TOMASZ SACK <span className='text-[#f9423b]'>BLOG</span></h1>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleChange}></input>
        <button type='submit'>Submit</button>
      </form>
      <div className='flex flex-wrap justify-around'>
      {
        posts.map((post:Post)=>{
          const person = authors?.filter((author) => author.id===post.userId)
          return(
          <div key={post.id} className='w-[350px] h-[400px] flex flex-col m-6 shadow-lg'>
            <img src={BlogAsset} alt="" className='object-cover' />
            <div className='p-4'>
              <p><span className='text-[#f9423b]'>created by </span>{person[0].name}</p>
              <h2 className='font-bold text-xl'>{post.title.charAt(0).toUpperCase()+post.title.slice(1)}</h2>
          </div>
          </div>
        )})
      }
      </div>
    </div>
  )
}

export default App
