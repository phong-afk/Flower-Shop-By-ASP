import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhone, faMapMarked} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { navigate } from '@reach/router';

class Contactus extends Component
{
    constructor (props){
        super(props);

        //bind the handle submit and handle change methods
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

        this.state={
            firstName:'',
            lastName:'',
            message:'',
            phone:'',
            email:'',
            //province: 'Choose...',

            checked: false
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // let contact = {
        //     fname: this.state.firstName,
        //     lname: this.state.lastName,
        //     email: this.state.email,
        //     phone: this.state.phone,
        //     message: this.state.message
        // }

        
        let url = 'http://localhost/phpapi/product/createcontact.php?fname='+this.state.firstName+'&lname='+this.state.lastName+'&email='+this.state.email+'&phone='+this.state.phone+'&message='+this.state.message;
        
        axios.get (url)
        .then (resp=>{alert(resp.data.Message);
            navigate("/");})
        .catch(err=>console.log(err));
    }

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.name==="checked"? e.target.checked: e.target.value
          })

    }
    
    render(){

        
        return (
            <div className="container">
                <div className="row mt-3 text-center">
                    <p className="col h1">
                        Contact us
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-6 bg-light rounded"> 
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" className="form-control" id="firstname" value={this.state.firstName} name="firstName" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" className="form-control" id="lastname" value={this.state.lastName} name="lastName" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="lastname">Phone</label>
                                    <input type="tel" className="form-control" id="phone" value={this.state.phone} name="phone" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="lastname">Email</label>
                                    <input type="email" className="form-control" id="email" value={this.state.email} name="email" onChange={this.handleChange}/>
                                </div>
                            </div>
                                {/* <div className="form-group">
                                    <label htmlFor="inputState">Province</label>
                                    <select id="inputState" className="form-control" value={this.state.province} name="province" onChange={this.handleChange}>
                                        <option>Choose...</option>
                                        <option>ON</option>
                                        <option>BC</option>
                                        <option>AB</option>
                                    </select>
                                </div> */}
                                <div className="form-group">
                                    <label htmlFor="comments">Comments</label>
                                    <textarea className="form-control" id="message" value={this.state.message} name="message" onChange={this.handleChange} />
                                </div>
                                                       
                            {/* <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" name="checked" checked={this.state.checked===true?"checked":""} onChange={this.handleChange} />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        subscribe to newsletter
                                    </label>
                                </div>
                            </div> */}
                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Send</button>
                        </form>
                    </div>
                    <div className="col-md-6 d-flex align-items-center  
                    ">
                        <iframe title="Map" src="https://www.google.com/maps/place/285+%C4%90%E1%BB%99i+C%E1%BA%A5n,+V%C4%A9nh+Ph%C3%BA,+Ba+%C4%90%C3%ACnh,+H%C3%A0+N%E1%BB%99i+100000,+Vietnam/@21.0357106,105.8168351,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab145bf89bd7:0xd94a869b494c04b6!8m2!3d21.0357106!4d105.8190292" height="500" frameBorder="0" style={{border:2}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                    </div>
                </div>
                <div className="row mt-3 mb-3">
                   
                    <div className="col rounded text-center text-primary">
                        <p className="h3 mt-1">Working hours</p>
                        <p className="h5">Mon. - Fri.</p>
                        <p className="h6">8:30 am - 11:00 pm</p>
                        <p className="h5">Sat. and Sun.</p>
                        <p className="h6">11:30 am - 12:00 am</p>
                        <p className="h3 mt-3"> <FontAwesomeIcon icon={faPhone} size="1x" /></p>
                        <p className="h6">123-456-7890</p>
                        <p className="h3 mt-3"> <FontAwesomeIcon icon={faMapMarked} size = "1x"/></p>
                        <p className="h6">285 Đội Cấn.</p>
                        <p className="h6">Ba Đình, Hà Nội, VietNam.</p>
                    </div>

                </div>
            </div>
        );
    }
}

export default Contactus;