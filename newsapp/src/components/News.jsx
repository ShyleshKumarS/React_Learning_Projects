import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Alert from './Alerts.jsx';

class News extends Component {
    constructor() {
        super();
        this.state = {
            totalResults:0,
            articles: [],
            showAlert: false,
            page:1
        };
    }
    
    async componentDidMount() {
        if (!navigator.onLine) {
            this.setState({ showAlert: true });
        } else {
            let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=52bc605538774e20aa44c96c1f4f9873&page=1&pageSize=20";
            let data = await fetch(url);
            let parsedData = await data.json(); 
            this.setState({ articles: parsedData.articles });
            this.setState({totalResults:parsedData.totalResults});
        }
    }
  
    handleCloseAlert = () => {
        this.setState({ showAlert: false });
    };

    handleNext=async()=>{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=52bc605538774e20aa44c96c1f4f9873&page=${this.state.page+1}&pageSize=${this.state.totalResults-20}`;
      this.setState({page:this.state.page+1})
      let data = await fetch(url);
      let parsedData = await data.json(); 
      this.setState({ articles: parsedData.articles });
      this.setState({totalResults:this.state.totalResults-20});
    }

    handlePrev=async()=>{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=52bc605538774e20aa44c96c1f4f9873&page=${this.state.page-1}&pageSize=${this.state.totalResults+20}`;
      this.setState({page:this.state.page-1})
      let data = await fetch(url);
      let parsedData = await data.json(); 
      this.setState({ articles: parsedData.articles });
      this.setState({totalResults:this.state.totalResults+20});
    }

    render() {
        const { articles, showAlert } = this.state;

        return (
            <div className="container my-4">
                <h2>News Headlines</h2>
                
                {showAlert && (
                    <Alert
                        title={"Alert"}
                        content={"Check Internet"}
                        onClose={this.handleCloseAlert}
                    />
                )}

                <div className="row my-4">
                    {articles.map((element) => (
                        <div className="col-md-4" key={element.url}>
                            <NewsItem
                                title={element.title ? element.title : ""}
                                content={element.description ? element.description : "Click the below button to read"}
                                imageUrl={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/id/1152189152/vector/red-alert-icon.jpg?s=612x612&w=0&k=20&c=Kw_-i314F4cxgn2hmakp-88-O45FSx62c6r-OzKYMw4="}
                                newsUrl={element.url ? element.url : ""}
                            />
                        </div>
                    ))}
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page===1?true:false} type="button" className="btn btn-sm btn-primary" onClick={this.handlePrev}>&larr; Previous </button>
                <button disabled={this.state.totalResults<=0} type="button" className="btn btn-sm btn-primary" onClick={this.handleNext}> Next&rarr;</button>
                </div>
            </div>
        );
    }
}

export default News;
