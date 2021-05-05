import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Components/Home';
import {Router, navigate} from '@reach/router'
import Contactus from './Components/Contactus';
import Abouttus from './Components/Aboutus';
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import Products from './Components/Products';
import Register from './Components/Register';
import firebase from 'firebase';
import Product from './Components/Product';
import ProductUpdate from './Components/ProductUpdate';
import ShoppingCart from './Components/ShoppingCart';
import Contacts from './Components/Contacts';
import axios from 'axios';


class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      userId: null,
      shoppingCareItemsCount:0,
      admin: true,
      shoppingCartItems:[]
    };
  }


  componentDidMount()
  {
    this.setListener();
    
  }
  
  setListener () 
  {
    firebase.auth().onAuthStateChanged((FBuser)=>{
      if (FBuser)
      {
        if (FBuser.email ==='admin@abc.com')
        {
          this.setState({admin: true, userId: FBuser.uid}, ()=>{navigate('/products')});
        }
        else
        {
          
          this.setState
            (
              {userId: FBuser.uid}, () => 
              {
                firebase.database().ref("shoppingCart/"+this.state.userId).on
                  ('value', snapshot =>
                    {
                      let itemsArray = [];
                      snapshot.forEach
                        (
                          item => 
                          {
                            let shoppingItem = {key: item.key, data: item.val()}
                            itemsArray.push(shoppingItem);
                          }
                        )
                      this.setState
                        (
                          {
                            shoppingCareItemsCount: snapshot.numChildren(),
                            shoppingCartItems: itemsArray
                          }
                        )
                    }
                  );
              }
            );
          }
      }
      else
      {
        this.setState({userId: null, shoppingCareItemsCount:0, admin:false, shoppingCartItems:[]}, ()=>{navigate('/')});
      }
    });
  }
   
  setUser = UserID => {
    this.setState({userId: UserID});
  }

  logoutUser = e =>  {
    
    firebase.auth().signOut();
  }

  // setShoppingCartItems = items => {
  //   this.setState({shoppingCartItems: items});
  // }

  handleShoppingCartClicks = (btn, key)=>
  {
    //get the current qty and product id of the product in the shopping cart. this is needed for the plus and minus clicks
    let currentQty = 0;
    let productId = 0
    firebase.database().ref('shoppingCart/'+this.state.userId+'/'+key).once('value', snapshot => {
      currentQty = snapshot.val().qty;
      productId=snapshot.val().id;
      });

    switch(btn)
    {
      
      case 'plus':
        {
          firebase.database().ref('shoppingCart/'+this.state.userId+'/'+key).update({qty: ++currentQty});
          axios.put ('https://localhost:5001/flower/decqty/'+productId);
          break;
        }
      case 'minus':
        {
          if (currentQty!==1)
          {
            firebase.database().ref('shoppingCart/'+this.state.userId+'/'+key).update({qty: --currentQty});
            axios.put('https://localhost:5001/flower/incqty/'+productId);
          }
          break;
        }
      case 'del':
        {
          firebase.database().ref('shoppingCart/'+this.state.userId+'/'+key).remove();
          axios.put('https://localhost:5001/flower/setqty/'+productId+'?deltaQty='+currentQty);
          break;
        }
        default:
          break;
    }

  }


  render()
  {
    return (
      <div>
        <Navbar user={this.state.userId} logout={this.logoutUser} count={this.state.shoppingCareItemsCount} isAdmin={this.state.admin} />
        <Router>
          <Home path="/" user={this.state.userId} setItemsCount={this.shoppingCartBadge}/>
          <Contactus path="/contact" />
          <Abouttus path="/about" />
          <SignIn path="/signin" />
          <Products path="/products" admin={this.state.admin}/>
          <Register path="/register" setUser={this.setNewUserId}/>
          <Product path="/newproduct" admin={this.state.admin}/>
          <ProductUpdate path="/updateproduct/:id" admin={this.state.admin} />
          <ShoppingCart path="/shopcart" uid={this.state.userId} shoppingItems={this.state.shoppingCartItems} handleShoppingCartClicks = {this.handleShoppingCartClicks} />
          <Contacts path="/contacts" admin={this.state.admin} />
        </Router>
      </div>
    );
  }
}

export default App;