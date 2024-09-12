import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    country:'in',
    category:'general',
  }
  static propTypes={
    country: PropTypes.string,
    category:PropTypes.string,
  }
  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
    constructor(props){
        super(props);        
        this.state={
            articles: [],
            loading: false,
            page:1
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)}-InsightToday`;
    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=393ab18ff4e24d27b919904bc8c7ca28&page=1&pageSize=21`;
        this.setState({loading:true})
        let data =await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults, loading:false})
        
    }


    handleNextClick= async ()=>{
        if(!(this.state.page + 1>Math.ceil(this.state.totalResults/21))){

       
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=393ab18ff4e24d27b919904bc8c7ca28&page=${this.state.page +1}&pageSize=21`;
            this.setState({loading: true})
            let data =await fetch(url);
            let parsedData=await data.json();
            this.setState({
                page: this.state.page +1,
                articles:parsedData.articles,
                loading: false
            })
        
    
    }
}

    handlePrevClick= async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=393ab18ff4e24d27b919904bc8c7ca28&page=${this.state.page-1}&pageSize=21`;
        this.setState({loading: true})
        let data =await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page-1,
            articles:parsedData.articles,
            loading:false
        })
    }



    render() {
        return (
          <div className='container my-3'>
            <h1 className="text-center">Insight Today - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h1>
            {this.state.loading && <Spinner />}
            
            <div className="row">
            {!this.state.loading && this.state.articles && this.state.articles.length > 0 ? (
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 35) : ""}
                      description={element.description ? element.description.slice(0, 80) : ""}
                      ImageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })
            ) : (
              !this.state.loading && <h2>No articles found.</h2>  // Handle case where no articles are returned
            )}
            </div>
            
            {!this.state.loading && (
              <div className="container d-flex justify-content-between">
                <button
                  disabled={this.state.page <= 1}
                  type="button"
                  className="btn btn-dark"
                  onClick={this.handlePrevClick}
                >
                  &larr; Previous
                </button>
                <button
                  // disabled={this.state.page >1}
                  type="button"
                  className="btn btn-dark"
                  onClick={this.handleNextClick}
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </div>
        );
    }
    
}

export default News
