import React, {Component} from 'react';

class ErrorMsgFlower extends Component
{

    render(){
        return (
            <div className="text-danger border border-danger rounded">
                <p className="h4">Error:</p>
                <p className="h6">{this.props.message}</p>
            </div>
        );
    }
}
export default ErrorMsgFlower;