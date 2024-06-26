import React, { Component } from 'react'

export default class DetailsFacture extends Component {
  render() {
    return (
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Détails Facture</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <table class="table table-hover  ">
      <thead>
      
          <tr>
          <th scope="col">Articl</th>
          <th scope="col">Quantité</th>
          <th scope="col">Prix</th>
          <th scope="col">Remise</th>
          <th scope="col">Montant</th>
         
          
        </tr>
       
      
  </thead>
  <tbody>
  {this.props.oneFact.detailsFacture ? this.props.oneFact.detailsFacture.map(item =>{
        return(
          <tr>
      <th scope="row">{item.article}</th>
      <td>{item.quantite}</td>
      <td>{item.prix}</td>
      <td>{item.pourcentage}</td>
      <td>{item.montant}</td>
    </tr>
        )
      }) : ""}
    </tbody>
</table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      
    )
  }
}
