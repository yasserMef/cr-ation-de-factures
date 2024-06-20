import React, { Component } from 'react'

export default class AjouterClient extends Component {
  constructor(){
    super();
    this.state = {
      nom: '',
      adress:'',
      tele:'',
      email:'',
      client:{},
      getClients :[]
      }
  }
  changeNom=(e)=>{
    this.setState({nom : e.target.value})
  }
  changeAdresse=(e)=>{
    this.setState({adress : e.target.value})
  }
  changePhone=(e)=>{
    this.setState({tele : e.target.value})
  }
  changeEmail=(e)=>{
    this.setState({email : e.target.value})
  }

  addClient=async(e)=>{
    e.preventDefault();
    if(this.state.nom=="" || this.state.adress=="" || this.state.tele=="" || this.state.email==""){
      alert("remplir tous les champs")
      return
    }
    const getClientsFil = JSON.parse(localStorage.getItem("clients"))
    let getClientsValid
    if(getClientsFil){
    getClientsValid=  getClientsFil.find(item => item.email == this.state.email || item.nom == this.state.nom )
    }
    if(getClientsValid){
      
      alert("Client déjà existant")
      return
    }
    const client ={}
    client.nom = this.state.nom
    client.adress = this.state.adress
    client.tele = this.state.tele
    client.email = this.state.email
    await this.setState({client})
    if(JSON.parse(localStorage.getItem("clients"))==null ){
      localStorage.setItem("clients" , JSON.stringify([this.state.client]))
      window.location.reload()
    }else if(JSON.parse(localStorage.getItem("clients")).length ==0){
      localStorage.setItem("clients" , JSON.stringify([this.state.client]))
      window.location.reload()
    }else{
      localStorage.setItem("clients" , JSON.stringify([...JSON.parse(localStorage.getItem("clients")),this.state.client]))
      window.location.reload()
    }
    
  }
  render() {
    console.log(this.state.nom)
    console.log(this.state.client)
    
    return (
      <div
      className="modal fade show"
      style={{ display: "block" }}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Ajouter un client
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={this.props.closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="clientName" className="form-label">
                Nom
              </label>
              <input
                type="text"
                className="form-control"
                id="clientName"
                placeholder="Nom du Client"
                onChange={this.changeNom}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientAdress" className="form-label">
                Adresse
              </label>
              <input
                type="text"
                className="form-control"
                id="clientAdress"
                placeholder="L'adresse du Client"
                onChange={this.changeAdresse}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientPhone" className="form-label">
                Telephone
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                id="clientPhone"
                placeholder="0661748520"
                onChange={this.changePhone}
              />
            </div>
            <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="clientEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="clientEmail"
                  placeholder="client.email@gmail.com"
                  onChange={this.changeEmail}
                  />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.closeModal}
            >
              Fermer
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="ajouterClient"
              onClick={this.addClient}
            >
              Ajouter Le Client
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
