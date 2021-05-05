import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


class ShoppingItem extends Component
{
    constructor(props)
    {
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(e)
    {
        
        switch(e)
        {
            case 'plus':
                this.props.plus(this.props.itemkey)
                            
                break;
            case 'minus':
                this.props.minus(this.props.itemkey)
                break;
            case 'del':
                this.props.del(this.props.itemkey)
                break;
            default:
                break;
        }

    }
    componentDidMount()
    {

    }

    render()
    {
        return(
            <li className="list-group-item">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            
                            <img className="rounded" width = "100px" height = "100px" src={'https://localhost:5001/images/' + this.props.imageName} alt={this.props.productName} />
                                    
                        </div>
                        <div className="col text-center">
                            
                            <h4>{this.props.productName}</h4>
                            <h5>${this.props.productPrice}</h5>
                            <h6>Sub-total: {(this.props.productPrice * this.props.qty).toFixed(2)}</h6>
                                    
                        </div>
                        <div className="col d-flex align-items-center">
                            
                            <label className="h6 mr-3">Qty: {this.props.qty}</label>
                            
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm"  onClick={()=>{this.handleClick('plus')}}><FontAwesomeIcon icon={faPlus} size="1x" className="text-primary"/></button>
                                <button type="button" className="btn btn-sm"  onClick={()=>this.handleClick('minus')}><FontAwesomeIcon icon={faMinus} size="1x" className="text-primary"/></button>
                                <button type="button" className="btn btn-sm"  onClick={()=>this.handleClick('del')}><FontAwesomeIcon icon={faTrashAlt} size="1x" className="text-danger"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}
export default ShoppingItem;