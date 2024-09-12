import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title, description, ImageUrl, newsUrl} =this.props;
    return (
      <div className='my-3'>
        <div className="card"style={{height :"26rem"}} >
        <img 
  src={!ImageUrl ? "https://www.qualitymag.com/ext/resources/Ed/thumb/Headlines.jpg?1540927970" : ImageUrl} 
  className="card-img-top" 
  alt="..." 
  style={{ width: "100%", height: "200px", objectFit: "cover" }} 
/>

        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} target='_blank' className="btn btn-dark" rel="noreferrer">Read more</a>
         </div>
</div>
      </div>
    )
  }
}

export default NewsItems
