import React from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../state'
import { bindActionCreators } from 'redux'



const Item = () => {
    const dispatch=useDispatch();
    const {withdrawMoney,depositMoney}=bindActionCreators(actionCreators,dispatch);
  return (
    <>
  
    <div>
      <div className="card" style={{width: '18rem'}}>
  <img src="/images/download.jpeg" className="card-img-top" alt=""/>
  <div className="card-body">
    <h5 className="card-title">ADD Product</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button href="/" onClick={()=>{depositMoney(100)}} className="btn btn-primary">+</button>
    Product
    <button href="/" onClick={()=>{withdrawMoney(100)}} className="btn btn-primary">-</button>
    
  </div>
</div>

    </div>
  
    </>
  )
}

export default Item
