import React from 'react';
import{ListGroup} from "reactstrap";
import CartItem from './CartItem.jsx';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'next/link';
// import './Carts.module.css';

// to close the list and add products
import { useDispatch, useSelector } from 'react-redux';
import { cartUiActions } from '../../../store/wish-list/cartUISlice.js';

const Carts = () => {

// to close the list
const dispatch = useDispatch()
const toggleCart =()=>{
  dispatch(cartUiActions.toggle());
}
// add products
const cartProducts = useSelector(state=>state.cart.cartItems)

const totalAmount=useSelector(state=>state.cart.totalAmount)


  return <div className="cart_container">
    <ListGroup className='cart'>
        <div className="cart_close">
            <span onClick={toggleCart}><CloseIcon /></span>
        </div>
        <div className="cart_item-list">
        {
              cartProducts.length === 0 ? <h6 className='text-center mt-5'>No item added to the wish list</h6>: cartProducts.map((item,index)=>(
                <CartItem item={item} key={index}/>
              ))
        }
            
        </div>

        <div className="cart_bottom d-flex align-items-center justify-content-between">
            <h6>Subtotal: <span>${totalAmount}</span></h6> 
            {/* <h6>Subtotal: <span>$20</span></h6> */}
            <button><Link href='/wishlist'>Wish List</Link></button>
        </div>
    </ListGroup>
    <style jsx>{`.cart_container{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgb(19, 41, 82); */
    /* opacity: 70%; */
    z-index: 99999;
}
.cart{
    position: absolute;
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    background-color: white;
    z-index: 99999;
}
.cart_close{
    width: 100%;
    height: 50px;
    /* position: fixed;
    top: 0;
    left: 0; */
    padding: 10px 20px;
    margin-bottom: 10px;
}
.cart_close span{
    font-size: 1.1rem;
    background: orange;
    padding: 5px;
    border-radius: 50%;
    color: white;
    cursor: pointer;
}

.cart_item-list{
    height: calc(100vh-700px);
    /* 有bug */
    overflow-y: scroll;
}

.cart_bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 5px 20px;
    width: 100%;
    height: 70px;
    background-color: rgb(207, 230, 238);
}

.cart_bottom h6 span{
    font-size: 1.3rem;
    font-weight: 400;
    color: rgb(252, 104, 50);
}

.cart_bottom button{
    border: none;
    padding: 4px 20px;
    border-radius: 5px;
    background: white;

}
.cart_bottom button a{
    text-decoration: none;
    color: rgb(87, 135, 226);
    font-weight: 600;
}`}</style>
  </div>
}

export default Carts
