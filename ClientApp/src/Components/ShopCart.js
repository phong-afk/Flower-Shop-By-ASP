import React, {Component} from 'react';
import firebase from 'firebase';

class ShopCart extends Component
{
    constructor(props)
    {
        super(props);
        this.state={items:[]}
    }

    componentDidMount()
    {
        let itemsArray = [];
        firebase.database().ref("shoppingCart/"+this.props.uid).on ('value', snapshot => 
                {
                snapshot.forEach(item => {
                
                let shoppingItem = {
                    key: item.key,
                    data: item.val()
                }
                itemsArray.push(shoppingItem);
                
            })});
            console.log(itemsArray);
            
        this.setState({items: itemsArray});
    }

    render()
    {
        return (<h3></h3>);
              
    }
}

export default ShopCart;
