import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Confirmation from './Components/Confirmation'
import UserInformation from './Components/UserInformation'
import CompanyInformation from './Components/CompanyInformation'
import PhotoUploading from './Components/PhotoUploading'
import EndingPage from './Components/EndingPage'
import axios from 'axios';
import '../Styles/stepper.css'


const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
      'linear-gradient( 136deg, rgb(48, 42, 249) 0%, rgb(48,42,249) 50%, rgb(48,42,249) 100%)',
        
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
         'linear-gradient( 95deg,rgb(48, 42, 249) 0%,rgb(48,42,249) 50%,rgb(48,42,249) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( rgb(224, 15, 15) 0%,rgb(224, 15, 15) 50%,rgb(224, 15, 15) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
     'linear-gradient( 136deg, rgb(48, 42, 249) 0%, rgb(48,42,249) 50%, rgb(48,42,249) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonIcon />,
    2: <ApartmentIcon />,
    3: <PhotoLibraryIcon />,
    4: <VerifiedUserIcon/>,
  };

  return (
    <div
       className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor:'#f4f4f4'
  },
  saveButton: {
    marginRight: theme.spacing(1),
    marginLeft:'37%',width:'300px',padding:'8px',marginTop:'10px'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['User Info', 'Company Info','Photo Uploading','Confirmation'];
}


export default function RegisterForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [endPg, setEndPg] = useState(false);
  const [userInfo,setUserInfo]=useState({})
  const [companyInfo,setCompanyInfo]=useState({})
  const steps = getSteps();

  const getUserInfo=(userInfo)=>{
    setUserInfo(userInfo)
  }
  const getCompanyInfo=(companyInfo)=>{
    setCompanyInfo(companyInfo)
  }
  const getStepContent=(step)=> {
    switch (step) {
      case 0:
        return (
           <UserInformation getUserInfo={getUserInfo}/>
        );
      case 1:
          return (
            <CompanyInformation getCompanyInfo={getCompanyInfo}/>
           );
      case 2:
          return (
              <PhotoUploading/>
           );
        case 3:
          return (
              <Confirmation/>
           );
      default:
        return 'Unknown step';
    }
  }


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep==steps.length-1){
      setEndPg(true)
    }
    if(activeStep==2){
      let myObject ={...userInfo, ...companyInfo}
      let bodyFormData = new FormData();
      Object.keys(myObject).map(function(key) {
        return bodyFormData.append(`${key}`, `${myObject[key]}`);
      });
      axios({
        method: 'post',
        url: 'https://id.safav2.io.safavisa.com/register',
        headers: {
          'Content-Type': 'multipart/form-data' 
        },
        data: {bodyFormData}
    })
      .then(function (response) {
        console.log(response);
      })
    }
  };


  const handleBack = () => {
    if(activeStep!=0){
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <div className={classes.root}>
      {endPg==false?
      <div>
      <Stepper className='stepper' alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel  StepIconComponent={ColorlibStepIcon}></StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button onClick={handleBack} className={classes.button}>
                back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.saveButton}
              >
                {activeStep === steps.length - 1 ? 'Confirm' : activeStep==2 ?'Submit':'Next'}
              </Button>
            </div>
          </div>
      </div>
      </div>
      :
      <EndingPage/>
}
    </div>
  );
}
