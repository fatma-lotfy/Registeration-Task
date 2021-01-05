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
import '../../Styles/form.css'

////////dummy data////////////
let data={
  countries:[
  {
    name:'Egypt',
    id:'20',
    cities:[
      {
        name:'Cairo',
        id:'2'
      },
      {
        name:'Aswan',
        id:'97'
      },
      {
        name:'Alexanderia',
        id:'3'
      }
    ]
  },
  {
    name:'United States',
    Id:'1',
    cities:[
      {
        name:'New York',
        id:'4'
      },
      {
        name:'San Fransico',
        id:'6'
      },
      {
        name:'Los Angeles',
        id:'7'
      }
    ]
  },
  ]
}

export default class CompanyInformation extends Component {
  constructor(props){
    super(props);
    this.state={
      country:'',
      company_name:'',
      company_address:'',
      company_phone:'',
      company_business_email:'',
      company_country_id:'',
      company_city_id:'',
      company_extra_data:'',
      lang:'en'
    }
  }
  handelClick=(e)=>{
    this.setState({country:e.target.textContent})
  }
  handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  componentWillUnmount(){
    const companyInfo={
      company_name:this.state.company_name,
      company_address:this.state.company_address,
      company_phone:this.state.company_phone,
      company_business_email:this.state.company_business_email,
      company_country_id:this.state.country=='Egypt'?'20':'1',
      company_city_id:this.state.company_city_id,
      company_extra_data:this.state.company_extra_data,
      lang:this.state.lang
    }
    this.props.getCompanyInfo(companyInfo)
  }
  render() {
    const {country}=this.state
    return (
      <div> 
      <b>Verfiy your Company</b> 
      <Card className='card'>
      <CardContent>
       <span>Entering this information correctly will facilitate the company verfication process</span>
      <form noValidate autoComplete="off">
      <Grid container spacing={3} className='mt-5'>
      <Grid item xs={12}>
        <TextField
          type="text"
          name='company_name'
          placeholder="Enter your company name"
          variant="outlined"
          label="COMPANY NAME"
         className='width80'
          onChange={(e)=>this.handleChange(e)}
          />
        <FormControl variant="outlined" className='width20'>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          defaultValue={'en'}
        >
          <MenuItem value={'en'} onClick={()=>this.setState({lang:'en'})}>English</MenuItem>
          <MenuItem value={'ar'} onClick={()=>this.setState({lang:'ar'})}>Arabic</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="text"
          name='company_address'
          placeholder="Enter your company address"
          variant="outlined"
          label="ADDRESS"
          fullWidth
          onChange={(e)=>this.handleChange(e)}
          />
       </Grid>
       <Grid item xs={12}>
        <TextField
          type="text"
          name='company_business_email'
          placeholder="Enter business email"
          variant="outlined"
          label="BUSINESS EMAIL"
          fullWidth
          onChange={(e)=>this.handleChange(e)}
          />
       </Grid>
       <Grid item xs={6}>
       <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">COUNTRY</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="COUNTRY"
          placeholder="Choose Country"
        >
          <MenuItem value={'Egypt'} onClick={(e)=>this.handelClick(e)}>Egypt</MenuItem>
          <MenuItem value={'United States'} onClick={(e)=>this.handelClick(e)}>United States</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={6}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">CITY</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="CITY"
          placeholder="Choose city"
        >
          {country==''?
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          :
          data.countries.map((item)=>
            country==item.name&&
            item.cities.map((city,index)=>
            <MenuItem key={index} value={city.name} onClick={()=>this.setState({company_city_id:city.id})}>{city.name}</MenuItem>
            ))    
    }
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
            type="number"
            name='company_phone'
            placeholder="Enter your company Phone number"
            variant="outlined"
            label="COMPANY PHONE NUMBER"
            className='width80'
            onChange={(e)=>this.handleChange(e)}
            />
        </Grid>
        <Grid item xs={6}>
        <TextField
            type="text"
            name='company_phone'
            variant="outlined"
            disabled={true}
            value={country=='United States'?'+'+ 1:'+'+ 20}
            className='width20'
            onChange={(e)=>this.handleChange(e)}
            />
        <TextField
            type="number"
            name='company_extra_data'
            placeholder="Enter your company Phone number"
            variant="outlined"
            label="COMPANY PHONE NUMBER"
            className='width80'
            onChange={(e)=>this.handleChange(e)}
            />
        </Grid>
      </Grid>
      </form>
      </CardContent>
      </Card>
      </div>
    );
  }
}
