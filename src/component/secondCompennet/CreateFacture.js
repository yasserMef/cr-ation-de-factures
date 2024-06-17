import React, { Component } from 'react'
import AjouterDetailsFacture from './CreateFacture/AjouterDetailsFacture.js'
import ArticleList from './CreateFacture/ArticleList.js'

export default class CreateFacture extends Component {
  render() {
    return (
      <div className='cont-AjouterDetailsFacture'>
        <AjouterDetailsFacture ajouteArticle ={this.props.ajouteArticle}/>
        <ArticleList articleItem={this.props.articleItem} deleteArticl={this.props.deleteArticl}  changeQuntite={this.props.changeQuntite} pourcentage={this.props.pourcentage}/>
      </div>
    )
  }
}
