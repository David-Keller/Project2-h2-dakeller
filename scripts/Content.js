import * as React from 'react';

import { Button } from './Button';
import { Socket } from './Socket';
import { NameForm } from './text';


export class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'numbers': [],
            'text' : []
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
    }

    render() {
        let numbers = this.state.numbers.map(
            (n, index) => <li key={index}>{n}</li>
        );
        let text = this.state.text.map(
            (n,index) => <li key ={index}>{n}</li>
            );
        return (
            <div>
                <h1>Randomvdds so far!</h1>
                <ul>{numbers} {text}</ul>
                <Button />
                <NameForm />
                
                
            </div>
        );
    }
}
