import React, { Component } from 'react'
import ArticleItem from './ArticleItem.js'


export default class ArticleList extends Component {
 
   
  render() {
    return (
      <div className='d-flex  mt-3 flex-column align-items-center' id='articlList'>
         {
        this.props.articleItem? this.props.articleItem.map(item=><ArticleItem key={item.id}   deleteArticl={this.props.deleteArticl}  itemArticle={item} />):""
         }
      </div>
    )
  }
}
