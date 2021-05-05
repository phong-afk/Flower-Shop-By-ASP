import React, { Component } from 'react';
import ErrorMsgFlower from './ErrorMsgFlower';
import firebase from 'firebase';
import {navigate} from '@reach/router';


class Register extends Component
{
    constructor(props){
        super (props);
        this.state={
            email:'',
            pass1:'',
            pass2:'',
            passMatch:true,
            authError:''
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    handleChange(e) {

        this.setState({[e.target.name]:e.target.value}, () => {
            if(this.state.pass1 === this.state.pass2)
                this.setState({passMatch:true});
            else
                this.setState({passMatch:false});
            });
    }


    handleSubmit(e)
    {
        e.preventDefault();
        if (this.state.passMatch)
            {
                let logininfo = 
                {
                    email: this.state.email,
                    password: this.state.pass1
                }

                firebase.auth().createUserWithEmailAndPassword(logininfo.email, logininfo.password)
                    .then(()=>
                    {
                        navigate('/');
                    }
                    ).catch(error =>
                        {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            this.setState({authError: errorCode + ': ' + errorMessage});
                        });
            }

    }
    
    
    render(){
        //let authErr = this.state.authError!==''? <ErrorMsgFlower message={this.state.authError} />:'';
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h5>Register</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 offset-3 ">
                        {this.state.authError && (<ErrorMsgFlower message={this.state.authError} />)}
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
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Repeat Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="pass2" value={this.state.pass2} onChange={this.handleChange}/>
                                {!this.state.passMatch && <ErrorMsgFlower message='Passwords are not matching'/>}
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Register</button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default Register;