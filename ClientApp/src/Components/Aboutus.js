import React, { Component } from 'react';

class Aboutus extends Component
{
       
    render(){
        const img1 = require ('../Images/Flower1.jpg');
        const img2 = require ('../Images/Flower2.jpg');
        return (
            <React.Fragment>
                <div className="container bg-light text-primary p-2">
                    <div className="row align-items-center mb-3">
                        <div className="col-sm-6">
                            <p className="h2">About us</p>
                        </div>
                        <div className="col-sm-6">
                            
                            
                            
                        </div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <div className="col-sm-6 mt-3">
                            <img src={img1} alt="flowers" width="100%" className="rounded"></img>
                        </div>
                        <div className="col-sm-6 mt-3">
                            <p className="h2">Title below</p>
                            <p className="h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <a href="#" className="btn btn-primary" role="button">Semper</a>
                        </div>
                    </div>
                    <div className="row align-items-center mt-3">
                    <   div className="col-sm-6 mt-3">
                            <p className="h2">Title below</p>
                            <p className="h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <a href="#" className="btn btn-primary" role="button">Semper</a>
                        </div>
                        <div className="col-sm-6 mt-3">
                            <img src={img2} alt="flowers" width="100%" className="rounded"></img>
                        </div>
                        
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}

export default Aboutus;