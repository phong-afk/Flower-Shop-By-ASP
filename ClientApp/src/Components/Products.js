import React, { Component, Fragment} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

class Products extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
            {
                data:[],
                loading: true
            };
        this.handleClick=this.handleClick.bind(this);
        
    }

    handleClick(e, id, imageName)
    {
        if(e.target.name==='edit')
        {
            navigate('/updateproduct/'+id);
        }
        else
        {
            axios.delete('https://localhost:5001/flower/deleteflower/'+id)
                .then(res => {
                    axios.delete('https://localhost:5001/flower/deletefile/'+imageName)
                    .then(response=>{
                        axios.get('https://localhost:5001/flower/getall')
                        .then(resp=>{this.setState({data: resp.data})})
                    })
                })
        }
    }
    componentDidMount()
    {
        
        
        axios.get('https://localhost:5001/flower/getall')
            .then(response => {this.setState({data: response.data, loading:false})})
    }
    render()
    {
        if (!this.props.admin)
            navigate('/');
        let content;
        if(!this.state.loading)
        {
            content = (
                <Fragment>
                    <div className="row">
                        <div className="col">
                            <Link to="/newproduct"><FontAwesomeIcon icon={faPlusSquare} size="3x" /></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Unit Price</th>
                                        <th>Qty</th>
                                        
                                        <th className="text-right "></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map(item=>(
                                        <tr key={item.id}>
                                            <td>
                                                <img className="rounded" width="150px" height="150px" src={'https://localhost:5001/images/'+item.imageName} alt="flower" ></img>
                                                
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.unitPrice}</td>
                                            <td>{item.qty}</td>
                                            
                                            <td className="text-right">
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-secondary" name="edit" onClick={(e)=>this.handleClick(e, item.id)}>Edit</button>
                                                    <button type="button" className="btn btn-secondary" name="delete" onClick={(e)=>this.handleClick(e, item.id, item.imageName)}>Delete</button>
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Fragment>
            );
        }
        else
         content = (<p className='h3'>Loading...</p>)
         
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h4>Manage Products</h4>
                    </div>
                </div>
                {content}
            </div>
        );
    }
}

export default Products;