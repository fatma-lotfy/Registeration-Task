import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import img2 from '../../Assets/photo2.jpeg'
import '../../Styles/form.css'

export default class Confirmation extends Component {
  render() {
    return (
      <div>
         <b>You're all set.Ready?</b>
         <Card className='card'>
          <CardContent>
            <img src={img2}/>
            <br/>
            <p><span className='redLine'>We will send a message for this e-mail</span>
              <br/>
              example@example.com
            </p>
          </CardContent>
          </Card>
      </div>
    );
  }
}
