import * as React from 'react';

import { Button } from './Button';
import { Socket } from './Socket';
import { NameForm } from './text';


export class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'numbers': [],
            'text' : [],
            'value' :[],
            'num_of_users':[]
        };
    }

    componentDidMount() {
        Socket.on('all numbers', (data) => {
            this.setState({
                'numbers': data['numbers']
            });
        })
        Socket.on('all test', (data) => {
            this.setState({
                'text':data['tesxt']
            });
        })
        Socket.on('messages',(data)=>{
            this.setState({
                'value':data['value']
            });
            
        })
    }

    render() {
         let numbers = this.state.numbers.map((n, index) =>
            <li key={index}>
            <img src={n.picture} />
            {n.name}: {n.number}
            </li>
 );

//        let numbers = this.state.numbers.map(
//            (n, index) => <li key={index}>{n}</li>
//        );
        let text = this.state.text.map(
            (n,index) => <li key ={index}>{n}</li>
            );
        let message = this.state.value.map((
            n,index) => <li key = {index}>
            {n}
            </li>
            );
        return (
            <div>
             <h1>Wellcome to the message board :-)</h1>
 <div
 className="fb-login-button"
 data-max-rows="1"
 data-size="medium"
 data-show-faces="false"
 data-auto-logout-link="true">
 </div>
                <h1>Messages so far!</h1>
                <ul>{numbers} {message}</ul>
                <Button />
                <NameForm />
                
                
            </div>
        );
    }
}
