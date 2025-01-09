import { useContext, useState } from 'react'
import './App.css'
import { BlogContext } from './context/BlogContext'
import Card from './Components/card/Card'

function App() {
 
  const articles = useContext(BlogContext);

  console.log(articles)
  return (
    <div className='container'>
     
     <div className='line'>
      <h1>Mordus d'informatique</h1>
     </div>
     <div className='card_container'>
        {articles.map((article,index)=>(<Card key={index} article={article} />))}
     </div>
    </div>
  )
}

export default App
