import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import img2 from '../../Assets/photo2.jpeg'
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import '../../Styles/form.css'

export default class EndPage extends Component {
  render() {
    return (
        <div>
        <Card className='mt5 card'>
         <CardContent>
           <img src={img2}/>
           <br/>
           <Typography>Congratz you successfully created your account
               <br/>
             we just sent you a confirmation email
             <br/>
             Please check your email
           </Typography>
           <Typography className='mt-40'>
               Didn't recieve it ?
               <br/>
               Check your span folder or <Link className='redLine'>Resend Email</Link>
           </Typography>
         </CardContent>
         </Card>
     </div>
    );
  }
}
