import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../../Styles/form.css';

export default class UserInformation extends Component {
  constructor(props){
    super(props);
    this.state={
      isPasswordShown:false,
      country:'',
      user_full_name:'',
      user_email:'',
      user_phone:'',
      user_nationality:'',
      user_password:'',
      user_password_confirmation:'',
      isPasswordShownConfirm:false,
    }
  }
  togglePasswordVisibility=()=>{
    this.setState({isPasswordShown:!this.state.isPasswordShown})
  }
  handleClick=(e)=>{
    this.setState({country:e.target.textContent,
    })
  }
  handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
  }
  componentWillUnmount(){
    const userInfo={
      user_full_name:this.state.user_full_name,
      user_email:this.state.user_email,
      user_phone:this.state.user_phone,
      user_nationality:this.state.country=='Egypt'?'20':'1',
      user_password:this.state.user_password,
      user_password_confirmation:this.state.user_password_confirmation,
    }
    this.props.getUserInfo(userInfo)
  }
  render() {
    const {isPasswordShown,country,isPasswordShownConfirm}=this.state
    return (
      <div> 
        <b>Tell us more about you</b> 
        <Card className='card'>
        <CardContent>
        <form noValidate autoComplete="off">
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name='user_full_name'
            type="text"
            placeholder="Enter your full name"
            variant="outlined"
            label="FULL NAME"
            fullWidth
            onChange={(e)=>this.handleChange(e)}
            />
        </Grid>
        <Grid item xs={12}>
        <TextField
            name='user_email'
            type="text"
            placeholder="Enter your business email"
            variant="outlined"
            label="BUSINESS EMAIL"
            fullWidth
            onChange={(e)=>this.handleChange(e)}
            />
        </Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="COUNTRY"
          placeholder="Choose Country"
        >
          <MenuItem value={'Egypt'} onClick={(e)=>this.handleClick(e)}>Egypt</MenuItem>
          <MenuItem value={'United States'} onClick={(e)=>this.handleClick(e)}>United States</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={6}>
        <TextField
            type="text"
            variant="outlined"
            disabled={true}
            value={country=='United States'?'+'+ 1:'+'+ 20}
            className='width20'
            />
        <TextField
            name='user_phone'
            type="number"
            placeholder="Enter your Phone number"
            variant="outlined"
            label="PHONE NUMBER"
            className='width80'
            onChange={(e)=>this.handleChange(e)}
            />
        </Grid>
        <Grid item xs={12}>
        <TextField
            type={!isPasswordShown?"password":"text"}
            name='user_password'
            placeholder="Choose a Password"
            variant="outlined"
            label="PASSWORD"
            fullWidth
            onChange={(e)=>this.handleChange(e)}
          />
          {(isPasswordShown)
                ?<Button className='visibilityBtn'> <VisibilityOffIcon className='visibilityIcon' onClick={()=>this.setState({isPasswordShown:!this.state.isPasswordShown})}/> </Button>
                :<Button className='visibilityBtn'> <VisibilityIcon className='visibilityIcon' onClick={()=>this.setState({isPasswordShown:!this.state.isPasswordShown})}/></Button>
          }
        </Grid>
        <Grid item xs={12}>
        <TextField
           type={!isPasswordShownConfirm?"password":"text"}
            name='user_password_confirmation'
            placeholder="Repeat your password"
            variant="outlined"
            label="REPEAT PASSWORD"
            fullWidth
            onChange={(e)=>this.handleChange(e)}
            />
            {(isPasswordShownConfirm)
                ?<Button className='visibilityBtn'>
                   <VisibilityOffIcon className='visibilityIcon' onClick={()=>this.setState({isPasswordShownConfirm:!this.state.isPasswordShownConfirm})}/> </Button>
                :<Button className='visibilityBtn'>
                   <VisibilityIcon className='visibilityIcon' onClick={()=>this.setState({isPasswordShownConfirm:!this.state.isPasswordShownConfirm})}/></Button>
            }
        </Grid>
        </Grid>
        </form>
        </CardContent>
        </Card>
      </div>
    );
  }
}
