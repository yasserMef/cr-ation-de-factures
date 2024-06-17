import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default class AjouterDetailsFacture extends Component {
     constructor(){
      super();
      this.state = {
        facture :{
          id:0,
          id_facture:"",
          date_facture:"",
          client:"",
          Montant_HT:0,
          Montant_TTC:0,
          TVA:0,
          detailsFacture: []
        },
        
      }
     }
     changeNameClient=(e)=>{
      this.setState({client :e.target.value})
    }
    changeDate=(e)=>{
      this.setState({date_facture :e.target.value})
    }
    changeId =(e)=>{
      this.setState({id_facture :e.target.value})
    }
     addFacture=async()=>{
      const getItem = await JSON.parse(localStorage.getItem("articlesItemes"))
      let Montant_HT =0
      if(getItem){
        getItem.map(item => Montant_HT += item.montant)
      }
      const TVA = (Montant_HT * 10)/100
      const Montant_TTC = Montant_HT + TVA
      
      const facture = this.state.facture
      facture.id = Math.floor(Math.random() * 1000000000)
      facture.detailsFacture = getItem
      facture.TVA = TVA
      facture.Montant_HT = Montant_HT
      facture.Montant_TTC = Montant_TTC
      facture.date_facture = this.state.date_facture
      facture.client= this.state.client
      facture.id_facture = this.state.id_facture
      this.setState({facture})
      
      if(JSON.parse(localStorage.getItem("facture"))==null){
      localStorage.setItem("facture" , JSON.stringify([this.state.facture]))
    }else{
      
      localStorage.setItem("facture" , JSON.stringify([...JSON.parse(localStorage.getItem("facture")),this.state.facture]))
    }
     
    localStorage.removeItem("articlesItemes")
     }
  render() {
    return (
      <div className=' d-flex justify-content-center' >
      <div className='w-75 '>
      <form className="form-inline row w-100 ">
         <div className="form-group mx-sm-3 mb-2 col">
        <label for="id-facture" class="sr-only">id facture</label>
        <input type="text" class="form-control" id="id-facture" onChange={this.changeId} />
      </div>
      <div className="form-group mx-sm-3 mb-2 col">
        <label for="Date-Facture" class="sr-only">Date Facture</label>
        <input type="date" class="form-control" id="Date-Facture" onChange={this.changeDate} />
      </div>
      <div className="form-group mx-sm-3 mb-2 col">
        <label class="sr-only">Facture à</label>
        <select class="form-select" onChange={this.changeNameClient}>
        <option disabled selected>Open this select menu</option>
        <option value="one">One</option>
        <option value="two">Two</option>
        <option value="three">Three</option>
       </select>
      </div>
      <div className='col mt-4'>
      <button type="submit" class="btn btn-secondary mb-2" onClick={this.addFacture} >Ajouté Facture</button>
      </div>
    </form>
    <div className='mt-4 d-flex justify-content-end' style={{marginRight:"100px"}}>
    <button type="button"   class="btn btn-primary mb-2" onClick={this.props.ajouteArticle} >+ Ajouté Article</button>
    </div >
    </div>
    </div>
    )
  }
}
