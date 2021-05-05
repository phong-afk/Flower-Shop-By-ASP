import React, { Component } from 'react';
import ErrorMsgFlower from './ErrorMsgFlower';
import {Link, navigate} from '@reach/router';
import firebase from 'firebase';

class SignIn extends Component
{
    constructor(props){
        super (props);
        this.state={
            email:'',
            pass1:'',
            authError: ''
        }
 
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
        
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass1)
            .then(()=>{navigate('/')})
            .catch((error)=>{
                let errorCode = error.code;
                let errorMessage = error.message;
                this.setState({authError: errorCode + ': ' + errorMessage});
            });
    }
    
    handleChange(e)
    {

        this.setState({[e.target.name]:e.target.value});
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h5>Sign In</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 offset-3 ">
                        {this.state.authError!=='' && <ErrorMsgFlower message={this.state.authError}/>}
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={this.state.email} onChange={this.handleChange}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="pass1" value={this.state.pass1} onChange={this.handleChange}/>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Sign in</button>
                        </form>
                        <div className="form-group mt-3">
                            <Link to="/register" >New User?</Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SignIn;