import * as React from 'react';
import { Socket } from './Socket';

export class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    FB.getLoginStatus((response) => {
        if (response.status == 'connected') {
            Socket.emit('message', {
                    'facebook_user_token':
              response.authResponse.accessToken,
              'value': this.state.value
            });
      }
    });
//    Socket.emit('text', {
//            'value': this.state.value
//        })
    
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}