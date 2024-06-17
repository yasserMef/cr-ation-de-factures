import React, { Component } from "react";
import CreateFacture from "./secondCompennet/CreateFacture.js";
import FactureList from "./secondCompennet/FactureList.js";




class App extends Component{
    constructor(){
        super();
        this.state={
            articleList :[],
            getArticleList :[],
            count:0
            
        }
        this.ajouteArticle = this.ajouteArticle.bind(this);
        this.suprimerArticl = this.suprimerArticl.bind(this);
    
    }
     ajouteArticle (){
       this.setState({count:this.state.count+1})
        if(this.state.articleList.length ===0){
           this.setState({articleList :this.state.articleList.push({
               id:this.state.count,
               
           })}) 
        }
         
        if(JSON.parse(localStorage.getItem("articlesItemes")) == null){
            localStorage.setItem("articlesItemes" ,JSON.stringify(this.state.articleList))
        }else if(JSON.parse(localStorage.getItem("articlesItemes")).length == 0){
            console.log("hello")
            localStorage.setItem("articlesItemes" ,JSON.stringify(this.state.articleList))
        }else{
            console.log("hello")
            localStorage.setItem("articlesItemes" ,JSON.stringify([...JSON.parse(localStorage.getItem("articlesItemes")),{
                id:JSON.parse(localStorage.getItem("articlesItemes"))[JSON.parse(localStorage.getItem("articlesItemes")).length-1].id+1,
               
            }]))
        }
        this.setState({getArticleList :JSON.parse(localStorage.getItem("articlesItemes"))})
}
   suprimerArticl(id){
    const newArticleList= this.state.getArticleList.filter(item=>item.id != id)
    localStorage.setItem("articlesItemes" , JSON.stringify(newArticleList))
    this.setState({getArticleList :JSON.parse(localStorage.getItem("articlesItemes"))})
}

componentDidMount(){
    this.setState({getArticleList :JSON.parse(localStorage.getItem("articlesItemes"))})
    
}
render(){   
        return (
            <div className="container">
                <CreateFacture articleItem ={this.state.getArticleList} ajouteArticle={this.ajouteArticle} deleteArticl ={this.suprimerArticl}  changeQuntite={this.changeQuntite} pourcentage={this.state.pourcentage}/>
                <FactureList />
            </div>
            );
            }
}
export default App