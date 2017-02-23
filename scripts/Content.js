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
            'user_num':[]
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
        Socket.on('num_users',(data)=>{
            this.setState({
                'user_num':data['num']
            });
        })
        
    }

// this line goes down in the render statement as soon at it is working
//             <BackgroundImg> img="https://www.omnycontent.com/d/clips/0914dce6-85b4-4825-bcf4-a513005d374d/07e9c90d-6021-4325-a9f3-a514001d92a6/c3277bc7-f587-464a-9933-a53a00c84b3c/image.jpg?t=1445851979&download=True&utm_source=OmnyFM&size=Large"

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
        let message = this.state.value.map(
            (n,index) => <li key = {index}>
            {n}
            </li>
            );
        let num = this.state.user_num.map(
                (n,index) => <li key = {index}>
                {n}
                </li>
            );
        return (
            <div>
            <Image> src="https://www.omnycontent.com/d/clips/0914dce6-85b4-4825-bcf4-a513005d374d/07e9c90d-6021-4325-a9f3-a514001d92a6/c3277bc7-f587-464a-9933-a53a00c84b3c/image.jpg?t=1445851979&download=True&utm_source=OmnyFM&size=Large"

            
             <h1>Wellcome to the message board :-)</h1>
                <div
                    className="fb-login-button"
                    data-max-rows="1"
                    data-size="medium"
                    data-show-faces="false"
                    data-auto-logout-link="true">
                </div>
                <h1>Number of users: {num}</h1>
                <h1>Messages so far!</h1>
                <ul>{numbers} {message}</ul>
                <Button />
                <NameForm />
                </Image>
            </div>
        );
    }
}
