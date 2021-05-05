import React, { Component } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import ErrorMsgFlower from './ErrorMsgFlower';

class Product extends Component
{
    constructor (props){
        super(props);

        this.state={productName:'', productPrice:'', qty:0, uploadedFile:null, error:null}
    }

    handleSubmit = e =>
    {
        e.preventDefault();
        if (this.state.uploadedFile)
        {
            //let postData = new FormData();
            let postFile = new FormData();

            postFile.append('uFile', this.state.uploadedFile, this.state.uploadedFile.name);
            axios.post('https://localhost:5001/flower/savefile', postFile)
                .then(response=> {
                    
                    let url = 'https://localhost:5001/flower/addflower?name='+this.state.productName+
                        '&qty='+this.state.qty+'&productprice='+this.state.productPrice+
                        '&imagename='+response.data;
                    
                    let response2 = fetch(url, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      })
                        .then(response=>{navigate('/products');})
                        .catch((err)=>{console.log(err)})
                    })
                    .catch(err=>{this.setState({error: err})});
                
        }
        else
        this.setState({error: 'File was not selected!'});
    }
   

    handleFileChange = e => {
        //e.preventDefault();
        this.setState({uploadedFile: e.target.files[0]},()=>{console.log(this.state.uploadedFile.name);});
        
    }
    
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){

        
        return (
            <div className="container">
                {this.state.error&&(
                    <div className="row">
                        <div className="col-md-6">
                            <ErrorMsgFlower message = {this.state.error} />
                        </div>
                    </div >
                )}
                <div className="row">
                    <div className="col-md-6">
                        <h4>New Product</h4>
                    </div>
                </div >
                <div className="row">
                    <div className="col-md-6">
                    <form encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Product Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Name" name="productName" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Unit Price</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="unit price in C$" name="productPrice" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Quantity</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter the quantity" name="qty" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlFile1">Upload product image</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={this.handleFileChange} name="fileUploadElement" accept="image/*"/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                    </form>
                    </div>
                    <div className="col-md-6">
                        
                    </div>
                </div >
            </div>
        );
    }
}

export default Product;