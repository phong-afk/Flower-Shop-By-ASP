import React, {Component} from 'react';
import ShoppingItem from './ShoppingItem';

class ShoppingCart extends Component
{
    // constructor(props)
    // {
    //     super(props);
        
    // }

    componentDidMount()
    {

    }

    handlePlus = (key)=>{
        this.props.handleShoppingCartClicks('plus', key)

    }

    handleMinus = (key)=>{
        this.props.handleShoppingCartClicks('minus', key)

    }

    handleDel = (key)=>{

        this.props.handleShoppingCartClicks('del', key)

    }

    render()
    {
        if (this.props.shoppingItems.length>0){
            let totalPrice = 0;
            for (let index=0; index < this.props.shoppingItems.length; index++)
                {
                    totalPrice += this.props.shoppingItems[index].data.qty*this.props.shoppingItems[index].data.unitPrice;
                }
                
            return(
                <div className="container">
                    <div className="row">
                        <div className="col text-center text-success">
                            <h4 className="mb-3">Shopping Cart</h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-9 mb-3">
                            <ul className="list-group">
                                {
                                    this.props.shoppingItems.map
                                        (
                                            item => 
                                            <ShoppingItem imageName={item.data.imageName} productName={item.data.name} productPrice={item.data.unitPrice} qty={item.data.qty} plus={this.handlePlus} minus ={this.handleMinus} del={this.handleDel} key={item.key} itemkey={item.key} />
                                        )
                                }
                            </ul>
                        </div>
                        <div className="col-sm-3 bg-light text-center">
                            <p className="h4">Total price: ${totalPrice.toFixed(2)} </p>
                            <button type="button" className="text-success btn btn-lg btn-block">Check Out</button>
                        </div>
                    </div>
                    
                </div>
            )
        }
        else
        {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col text-center text-success">
                            <h4>Empty</h4>
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

export default ShoppingCart;