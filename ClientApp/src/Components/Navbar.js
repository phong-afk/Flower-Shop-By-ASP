import React, { Component } from 'react';

//importing font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserPlus, faShoppingBasket, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

//importing Router
import {Link} from '@reach/router';

class Navbar extends Component
{
    logout = e =>{
      e.preventDefault();
      this.props.logout(e);
    }
    render()
    {
      let user=this.props.user;
      let isAdmin=this.props.isAdmin;
      return (
          <nav className="navbar navbar-expand-md navbar-light bg-light">
          <Link to = "/" className="navbar-brand" >Flowers Shop</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              
              <li className="nav-item active">
                <Link to="/about" className="nav-link">About us</Link>
              </li>
              
              <li className="nav-item active">
                <Link to="/contact" className="nav-link">Contact us</Link>
              </li>
              {isAdmin && (
                <li className="nav-item active">
                  <Link to="/products" className="nav-link">Products</Link>
                </li>)}
              {isAdmin && (
              <li className="nav-item active">
                <Link to="/contacts" className="nav-link">Contacts</Link>
              </li>
              )}
            </ul>
            
            {!user && (<div className= "mr-2"><Link to="/register" data-toggle="tooltip" data-placement="bottom" title="Register"><FontAwesomeIcon icon={faUserPlus} size="2x" className="text-primary"/></Link></div>)}
            {!user && (<div className= "mr-2"><Link to="/signin" data-toggle="tooltip" data-placement="bottom" title="Sign In"><FontAwesomeIcon icon={faSignInAlt} size="2x" className="text-primary"/></Link></div>)}
            {user && (<div className= "mr-2"><Link to="/home" data-toggle="tooltip" data-placement="bottom" title="Sign out" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} size="2x" className="text-primary"  /></Link></div>)}
            <div className= "mr-2">
              <Link to="/shopcart" data-toggle="tooltip" data-placement="bottom" title="Shopping Cart">
                
                    <FontAwesomeIcon icon={faShoppingBasket} size="2x" className={this.props.user?"text-primary":"text-secondary"}/>
                      <span className="badge badge-secondary" style={{marginLeft:-7+'px'}}>{this.props.count===0? '': this.props.count}</span>
                
              </Link>
            </div>
          </div>
        </nav>
      );
    }
}

export default Navbar;