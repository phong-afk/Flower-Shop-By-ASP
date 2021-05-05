import React, { Component } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

class ProductUpdate extends Component
{
    constructor (props){
        super(props);

        this.state={
            productName:'', 
            productPrice:'',
            qty:0,
            uploadedFile:null,
            error:null,
            imageName:''
        }
    }

    handleSubmit = e =>
    {
        if (e.target.name==="cancel")
        {
            navigate('/products');
        }
        else
        {
            e.preventDefault();
            if (this.state.uploadedFile)
            {
            //let postData = new FormData();
            let postFile = new FormData();

            postFile.append('uFile', this.state.uploadedFile, this.state.uploadedFile.name);
            axios.post('https://localhost:5001/flower/savefile', postFile)
                .then(response=> {
                    
                    let url = 'https://localhost:5001/flower/updateflower/'+this.props.id+'?name='+this.state.productName+
                        '&qty='+this.state.qty+'&productprice='+this.state.productPrice+
                        '&imagename='+response.data;
                    
                    fetch(url, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      })
                    .then(response=>{
                        axios.delete('https://localhost:5001/flower/deletefile/'+this.state.imageName)
                        .then(resp=>{navigate('/products');})
                        .catch(err=>{this.setState({error: err})})
                        })
                        .catch((err)=>{this.setState({error: err})})
                    })
                    .catch(err=>{this.setState({error: err})});
                
            }
            else
            {
                let url = 'https://localhost:5001/flower/updateflower/'+this.props.id+'?name='+this.state.productName+
                        '&qty='+this.state.qty+'&productprice='+this.state.productPrice+
                        '&imagename='+this.state.imageName;
                    
                    fetch(url, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      })
                    .then(response=>{navigate('/products');});
            }
        }
    }
   

    handleFileChange = e => {
        //e.preventDefault();
        this.setState({uploadedFile: e.target.files[0]},()=>{console.log(this.state.uploadedFile.name);});
        
    }
    
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount()
    {
        let url = 'https://localhost:5001/flower/getbyid/' + this.props.id;
        axios.get(url)
            .then(response=>{this.setState
                ({
                    productName:response.data.name,
                    productPrice:response.data.unitPrice,
                    qty: response.data.qty,
                    imageName: response.data.imageName
                });
            })
    }

    render(){

        if (!this.props.admin)
            navigate('/');
        return (
            <div className="container">
                {this.state.error&&(
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="text-danger">{this.state.error}</h3>
                        </div>
                    </div >
                )}
                <div className="row">
                    <div className="col-md-6">
                        <h4>Edit Product - {this.state.productName}</h4>
                    </div>
                </div >
                <div className="row">
                    <div className="col-md-6">
                        <form encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Product Name</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Name" name="productName" onChange={this.handleChange} value={this.state.productName} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Unit Price</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="unit price in C$" name="productPrice" onChange={this.handleChange} value={this.state.productPrice}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Quantity</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter the quantity" name="qty" onChange={this.handleChange} value={this.state.qty} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">Upload product image</label>
                                <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={this.handleFileChange} name="fileUploadElement" accept="image/*"/>
                            </div>
                            <button type="submit" name="submit" className="btn btn-primary mr-2" onClick={this.handleSubmit}>Update</button>
                            <button type="button" name="cancel" className="btn btn-secondary" onClick={this.handleSubmit}>Cancel</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <img className="rounded" src={'https://localhost:5001/images/' + this.state.imageName} alt="Flower" width="400px" height="auto" />
                    </div>
                </div >
            </div>
        );
    }
}

export default ProductUpdate;