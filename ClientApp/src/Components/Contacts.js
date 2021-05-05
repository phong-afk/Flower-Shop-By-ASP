import React, { Component , Fragment} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

class Contacts extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            contacts:[],
            searchWord:''
            
        }

    }

    componentDidMount()
    {
        axios.get('http://localhost/phpapi/product/readcontact.php')
        .then(resp=>{
            
            this.setState({contacts:resp.data});
        });
    }

    handleChange = (e) => {
        this.setState({searchWord:e.target.value});
    }

    handleClick = (e) => {
        this.setState({searchWord:e.target.value});
    }

    render()
    {
        let filteredContacts = [];
        if (!this.props.admin)
            navigate('/'); 
        let content;
        if(this.state.contacts!==null)
        {
            if (this.state.searchWord.length>0)
            {
                filteredContacts=this.state.contacts.filter ((item)=>item.FNAME.toLowerCase().search(this.state.searchWord.toLocaleLowerCase())!==-1||item.LNAME.toLowerCase().search(this.state.searchWord.toLocaleLowerCase())!==-1);
            }
            else filteredContacts=this.state.contacts;
            content=(
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>
                                First Name
                            </td>
                            <td>
                                Last Name
                            </td>
                            <td>
                                Phone
                            </td>
                            <td>
                                email
                            </td>
                            <td>
                                Message
                            </td>
                            <td>
                                Contact Date
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                {filteredContacts.map((item,index,array) => (
                <tr key={index}>
                    <td>
                        {item.FNAME}
                    </td>
                    <td>
                        {item.LNAME}
                    </td>
                    <td>
                        {item.PHONE}
                    </td>
                    <td>
                        <a href ={'mailto:' + item.EMAIL}>{item.EMAIL}</a>
                    </td>
                    <td>
                        {item.MESSAGE}
                    </td>
                    <td>
                        {item.CONTACT_DATE}
                    </td>
                </tr>
            ))}
            </tbody> </table>);
        }
        else
        content=(<div className='col'>
                    <span className="spinner-border text-success">
                        <p className='h3'>Loading...</p>
                    </span>
                </div>);

        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="text-secondary h3">Contacts</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <form class="form-inline">
                                {/* <div className="form-group mx-sm-3 mb-2"> */}
                                    <label htmlFor="nameSearch" className="sr-only">Find</label>
                                    <input type="text" className="form-control" id="nameSearch" placeholder="Search by name" value={this.state.searchWord} onChange={this.handleChange} />
                                {/* </div> */}
                            </form>
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

export default Contacts;
