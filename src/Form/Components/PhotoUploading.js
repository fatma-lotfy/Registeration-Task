import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import img from '../../Assets/photo.jpeg'
import '../../Styles/form.css'

export default class PhotoUploading extends Component {
  render() {
    return (
      <div> 
        <b>Upload Company Logo</b>
        <Card className='card'>
        <CardContent>
          <img src={img}/>
          <br/>
          <span>Only images with a size lower than 500 KB are allowed</span>
        </CardContent>
        </Card>
       </div>
    );
  }
}
