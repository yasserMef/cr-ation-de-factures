import React, { Component } from 'react' 
import DetailsFacture from "./DetailsFacture.js"

export default class FactureList extends Component {
  constructor(){
    super();
    this.state = {
      factures: [],
      oneFact:{}
      }
  }
  componentDidMount(){
    this.setState({factures:JSON.parse(localStorage.getItem("facture"))})
  }
  detailFact=(id)=>{
    const allFactures = JSON.parse(localStorage.getItem("facture"))
    const oneFact =allFactures.find(item => item.id == id)
    this.setState({oneFact})
  }
  
  render() {
    
    return (
      <div className='cont-AjouterDetailsFacture  mt-5 w-100' style={{paddingBlock:"20px"}}>
      <table class="table table-hover  ">
      <thead>
      
          <tr>
          <th scope="col">id_facture</th>
          <th scope="col">client</th>
          <th scope="col">Montant HT</th>
          <th scope="col">TVA</th>
          <th scope="col">Montant TTC</th>
          <th scope="col">Details</th>
          
        </tr>
       
      
  </thead>
  <tbody>
  {this.state.factures ? this.state.factures.map(item =>{
        return(
          <tr>
      <th scope="row">{item.id_facture}</th>
      <td>{item.client}</td>
      <td>{item.Montant_HT}</td>
      <td>{item.TVA}</td>
      <td>{item.Montant_TTC}</td>
      <td data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={()=>this.detailFact(item.id)} >view</td>
         </tr>
        )
      }) : ""}
    </tbody>
</table>

<DetailsFacture oneFact ={this.state.oneFact} />
</div>
    )
  }
}
