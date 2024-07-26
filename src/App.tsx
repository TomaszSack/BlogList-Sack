import { useEffect, useState } from 'react'
import './App.css'
import BlogAsset from './assets/blogAsset.png'
import { Author, Post } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [posts, setPosts] = useState<Post[]>()
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
    
    fetch(`https://jsonplaceholder.typicode.com/posts${value && person.length>0 && `?userId=${person[0].id}`}`)
    .then(response => response.json())
    .then(json => setPosts(json.length>0 ? json.sort(() => 0.5 - Math.random()): json))
  }

  if (!authors || !posts) return <div>Ooops... something went wrong</div>

  return (
    <div className='flex flex-col items-center p-6'>
      <div className='max-w-[1440px]'>
        <h1 className='text-5xl text-center '>TOMASZ SACK <span className='text-main-pink'>BLOG</span></h1>
        <form className='text-center py-10' onSubmit={handleSubmit}>
          <input className='text-xl border-2 border-main-pink rounded-xl px-2' value={value} onChange={handleChange}></input>
          <button className='relative left-[-28px]' type='submit'>
            <FontAwesomeIcon className='text-main-pink' size='lg' icon={faMagnifyingGlass} />
          </button>
        </form>
        <div className='flex flex-wrap justify-around'>
        {
          Array.isArray(posts) ? posts.map((post:Post)=>{
            const person = authors?.filter((author) => author.id===post.userId)
            return(
            <div key={post.id} className='w-[400px] h-[400px] flex flex-col m-6 shadow-lg'>
              <img src={BlogAsset} alt="" className='object-cover' />
              <div className='p-4'>
                <p><span className='text-main-pink'>created by </span>{person[0].name}</p>
                <h2 className='font-bold text-lg line-clamp-1 my-2'>{post.title.charAt(0).toUpperCase()+post.title.slice(1)}</h2>
                <div className='text-sm line-clamp-3'>
                  {post.body.charAt(0).toUpperCase()+post.body.slice(1)}
                </div>
                <a className='pt-auto text-sm text-main-pink cursor-pointer'>Read more<FontAwesomeIcon className='pl-1' icon={faArrowRight} /></a>
              </div>
            </div>
          )}) : <p>No available articles of this author. Try again.</p>
        }
        </div>
      </div>
    </div>
  )
}

export default App
