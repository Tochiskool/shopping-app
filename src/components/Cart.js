import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      address:"",
      showCheckout:false
    }
  }
  handleInput = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems
    }
    this.props.createOrder(order);
    console.log(order)
  }
   render() {
     const { cartItems } = this.props;
    return (
      <div>
         <div>
        {cartItems.length === 0 ? <div className="cart cart-header">Cart is Empty</div>
          : <div className="cart cart-header">You have {cartItems.length} in your cart</div>}
      </div>
        <div className="cart">
          <Fade left cascade>
          <ul className="cart-items">
            {cartItems.map((item) => {
              return <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title}/>
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="cartRemove-btn-right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button className="button-primary" onClick={() => { this.props.removeFromCart(item) }}>
                    Remove
                    </button>
                  </div>
                  
                </div>
              </li>
            })}
            </ul>
            </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div className="cart">
          <div className="total">
            <div> Total:{" "}
              {formatCurrency(
                 cartItems.reduce((a, c) => a + c.price * c.count, 0)
              )}
            </div>
              <button onClick={() => {
                this.setState({
                  showCheckout:true
                })
            }} className=" button button-primary">Proceed</button>
            </div>
            <div>
              <Fade right cascade>
            {this.state.showCheckout && (
                <div className="cart">
                  <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                      <li>
                          <label htmlFor="name">Name</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label htmlFor="email">Email</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label htmlFor="address">Address</label>
                          <input
                            id="address"
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className="button button-primary" type="submit">
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>              
         </div>
                )}
                </Fade>
        </div>
          </div>
        )}
     </div>
    )
  }
}
export default Cart