import React, {createRef, Component } from 'react'
import AjouterClient from '../AjouterClient.js';
import { v4 as uuidv4 } from "uuid"

export default class AjouterDetailsFacture extends Component {
      inputRef = createRef();
      
     constructor(){
      super();
      this.state = {
        id:0,
          id_facture:"",
          date_facture:"",
          client:"",
          Montant_HT:0,
          Montant_TTC:0,
          TVA:0,
          detailsFacture: [],
        facture :{},
        showModal: false,
        isDisabled : true,
        getClients:[]
      }
     }


  validateForm = () => {
    const { id_facture, date_facture, client } = this.state;
    const isValid = id_facture && date_facture && client;
    this.setState({ isDisabled: !isValid });
  }
     
  
  changeNameClient=(e)=>{
      if(e.target.value == "add-clt"){
       this.setState({showModal: true});
      
      }else{
        this.setState({client :e.target.value},this.validateForm)
      }
    }
    
  
    closeModal = () => {
      this.setState({ showModal: false });
    };
  
    changeDate=(e)=>{
      this.setState({date_facture :e.target.value},this.validateForm)
    }
    
    changeId =(e)=>{
      e.target.value = uuidv4()
      this.setState({id_facture :e.target.value},this.validateForm)
    }
    
    changeType =()=>{
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();

     if (dd < 10) {
     dd = '0' + dd;
     }

     if (mm < 10) {
      mm = '0' + mm;
     } 
    
   today = yyyy + '-' + mm + '-' + dd;
      this.inputRef.current.type = "date"
      this.inputRef.current.max =today
    }
    
    changeTypeText =()=>{
      this.inputRef.current.type = "text"
    }
     
    addFacture=async(e)=>{
      const getItem = await JSON.parse(localStorage.getItem("articlesItemes"))
      if(getItem == null){
        return
      }else if(getItem.length==0){
        return
      }
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
     
     componentDidMount(){
      this.setState({getClients:JSON.parse(localStorage.getItem("clients"))})
     }
  render() {
    
    return (
      <div className='d-flex justify-content-center  pt-5 mt-3'  >
      <div className='w-75 '>
      <form className="form-inline row w-100 ">
         <div className="form-group mx-sm-3 mb-2 col">
        <label for="id-facture" class="sr-only">id facture</label>
        <input type="text"  class="form-control" id="id-facture" onFocus={this.changeId} />
      </div>
      <div className="form-group mx-sm-3 mb-2 col">
        <label for="Date-Facture" class="sr-only">Date Facture</label>
        <input type="text" onBlur={this.changeTypeText} class="form-control" onFocus={this.changeType} ref={this.inputRef} id="Date-Facture" onChange={this.changeDate} />
      </div>
      <div className="form-group mx-sm-3 mb-2 col">
        <label class="sr-only">Facture à</label>
        <select class="form-select" onChange={this.changeNameClient}>
        <option value="1" disabled selected>Clients</option>
        {
          this.state.getClients?this.state.getClients.map(item=>{
          return  <option value={item.nom}>{item.nom}</option>
          }) : ""
        }
        <option  value="add-clt">Ajouter un client</option>
       </select>
      </div>
      {this.state.showModal && <AjouterClient closeModal={this.closeModal} />}
      <div className='col mt-4'>
      <button type="submit" class="btn btn-secondary mb-2" onClick={this.addFacture} disabled={this.state.isDisabled}>Ajouté Facture</button>
      </div>
    </form>
    <div className='mt-4 d-flex justify-content-end' style={{marginRight:"50px"}}>
    <button type="button" class="btn btn-primary " onClick={this.props.ajouteArticle} >+ Ajouté Article</button>
    </div >
    </div>
       
    </div>
    )
  }
}
