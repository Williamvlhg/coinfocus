import React from "react"
import './card.css'

function Card({article}){
     console.log(article)
    return(
    <div className="card">
       <div className="content">
            <h2>{article.title}</h2>
       </div>
       <div className="content_img">
          <img src={article.img} alt={article.title} />
       </div>
       <div className="content">
            <p className="text">
                {article.content}
            </p>
       </div>
       <div className="content">
          <p>
            <a target="_blank" href={article.link}>voir +</a>
          </p>
       </div>
    </div>
    )
}

export default Card;