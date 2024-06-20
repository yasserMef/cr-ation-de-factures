import React, { Component } from 'react';
import Articles from "../../data/ArticlData.js"

export default class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArticleId: 0,
      prix: 0,
      quantite:0,
      pourcentage:0,
      montant :0,
      articles :[]
    };
  }

  componentDidMount(){
    this.setState({articles:Articles})
    
  }
 

  getPrix = (e) => {
    const selectedArticleId = e.target.value;
    this.setState({ selectedArticleId });
    
    const selectedArticle = this.state.articles.find(item => item.id === parseInt(selectedArticleId));
   
    if (selectedArticle) {
      this.setState({ prix: selectedArticle.prix });
      this.setState({montant:(this.state.quantite*selectedArticle.prix)*(100-this.state.pourcentage)/100})
    } else {
      this.setState({ prix: '' });
    }
    const getItem = JSON.parse(localStorage.getItem("articlesItemes"))
    
    getItem.map(item=> {
      if(item.id == this.props.itemArticle.id ){
        item.article=selectedArticle.name
        item.prix = selectedArticle.prix
        item.montant = (this.state.quantite*selectedArticle.prix)*(100-this.state.pourcentage)/100
        item.quantite = this.state.quantite
        return item
      }
    })
    localStorage.setItem("articlesItemes",JSON.stringify(getItem))
  };
  
  changeQuntite = (e) => {
    const quantite = parseInt(e.target.value, 10);
    let pourcentage = 0;
    let montant =0;
  if(quantite > 0){
    if (quantite >= 1 && quantite <= 50) {
      pourcentage = 10;
    } else if (quantite >= 51 && quantite <= 100) {
      pourcentage = 15;
    } else {
      pourcentage = 25;
    }
  }else{
    pourcentage =0
  }
  this.setState({montant:quantite>0?(this.state.prix*quantite)*((100-pourcentage)/100):0})
  
  const getItem = JSON.parse(localStorage.getItem("articlesItemes"))
  getItem.map(item=> {
    if(item.id == this.props.itemArticle.id ){
      item.montant = (this.state.prix*quantite)*((100-pourcentage)/100)
      item.pourcentage = pourcentage
      item.quantite = quantite
      item.prix = this.state.prix
      return item
    }
  })
  localStorage.setItem("articlesItemes",JSON.stringify(getItem))
  this.setState({
      quantite,
      pourcentage,
    });
    
    
  };


  render() {
    return (
      <form className="form-inline row w-75 " id={`form-articlItem-${this.props.id}`}>
        <div className="form-group mx-sm-3 col">
          <label className="sr-only">Article</label>
          <select className="form-select" onChange={this.getPrix}>
            <option value="0" disabled selected>Produit</option>
            {this.state.articles.map((article, index) => (
              <option value={article.id} key={index}>{article.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group mx-sm-3 mb-2 col">
          <label htmlFor={`Quantité-${this.props.id}`} className="sr-only">Quantité</label>
          <input type="number"  value={this.state.quantite} className="form-control" onChange={this.changeQuntite} id={`Quantité-${this.props.id}`} />
        </div>
        <div className="form-group mx-sm-3 mb-2 col">
          <label htmlFor={`Prix-${this.props.id}`} className="sr-only">Prix</label>
          <input type="text" className="form-control"  value={this.state.prix}  disabled/>
        </div>
        <div className="form-group mx-sm-3 mb-2 col">
          <label htmlFor={`Remise-${this.props.id}`} className="sr-only">Remise</label>
          <input type="text" value={this.state.pourcentage} className="form-control" id={`Remise-${this.props.id}`} disabled/>
        </div>
        <div className="form-group mx-sm-3 mb-2 col">
          <label htmlFor={`Montant-${this.props.id}`} className="sr-only">Montant</label>
          <input type="text" value={this.state.montant} className="form-control" id={`Montant-${this.props.id}`} disabled/>
        </div>
        <div className="form-group mx-sm-3 mb-2 col">
          <label htmlFor={`Suprimé-${this.props.id}`} className="sr-only">Suprimé</label>
          <button
            type="button"
            className="btn btn-danger mb-2"
            onClick={(e) =>{ 
             
            return  this.props.deleteArticl(this.props.itemArticle.id)
            }}
          >
            Suprimé
          </button>
        </div>
      </form>
    );
  }
}