import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus } from '@fortawesome/free-solid-svg-icons';

class Home extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            loading: true,
            flowers:[]
        }
        this.handleClick=this.handleClick.bind(this);
        
    }
    
    handleClick(key){

        if (this.props.user){
            
            axios.get('https://localhost:5001/flower/getbyid/'+key)
                        .then(response=>{ 
                            //qty of the item when is added to the basket is 1 ;-)
                            response.data.qty=1;
                            let ref = firebase.database().ref ('shoppingCart/' + this.props.user);
                            ref.push(response.data)
                                .then(axios.put('https://localhost:5001/flower/decqty/'+response.data.id))
                        });
            
            
        }
        else
            navigate("/signin");
    }

    componentDidMount()
    {
        
        axios.get('https://localhost:5001/flower/getall')
            .then(response => {this.setState({loading: false,
            flowers: response.data})});

        //firebase.database().ref('shoppingCart/'+this.props.user).on('value', snapshot => snapshot)

    }
    
    render(){
        let content;
        if (this.state.loading)
            content=(<div className='col'><span className="spinner-border text-success"></span><p className='h3'>Loading...</p></div>);
        else
            content=(this.state.flowers.map((item,index,array) => (<div className="col-sm-4 col-md-3 mb-3" key={index}>
                <div className="card ">
                    <img className="card-img-top" src={'https://localhost:5001/images/' + item.imageName} alt="Flower"/>
                    <div className="card-body">
                        <h4 className="card-title">{'C$' + item.unitPrice}</h4>
                        <h6 className="card-text" >{item.name}</h6>
                        <button className="btn btn-primary btn-lg btn-block" onClick={() => this.handleClick(item.id)}><FontAwesomeIcon icon = {faPlus} /> </button>
                    </div>
                </div>
            </div>)));
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>All Flowers</h4>
                        </div>
                    </div>
                    <div className="row">
                        {content}
                    </div>
                    
                </div>
           
            </Fragment>
        );
    }
}

export default Home;