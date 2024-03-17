import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,content,imageUrl,newsUrl}=this.props; 
    return (
      <div className='my-4'>
        <div className="card" style={{width: "18rem"}}>
            <img src={imageUrl} className="card-img-top" alt="..." style={{width:"280px",height:"180px",objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{title.slice(0,45)}...</h5>
                    <p className="card-text">{content}</p>
                    <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
