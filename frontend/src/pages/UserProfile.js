import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

// Change Account GUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import FormForFarmer from "../components/FormForFarmer";
import FormForRider from "../components/FormForRider";


// Variable for spawning the advanced Farmer/Rider info 
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));
  
function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
        ) : null}
        </DialogTitle>
    );
}

function UserProfile(props) {
    /**
     ** VARIABLES
    */

    // Authentication data from context storage
    const { auth } = useAuth();
    const userId = auth.userId;
    // axios function with JWT tokens
    const axiosPrivate = useAxiosPrivate();
    // User information
    const [userInfo, setUserInfo] = useState([]);
    const [extraInfo, setExtraInfo] = useState([]);
    // Navigation variable
    const navigate = useNavigate();
    const location = useLocation();

    // Display change account settings
    const [accountType, setaccountType] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        //Retrieve the user info
        axiosPrivate
            .get(`users/${userId}/`)
            .then((res) => {
                /**
                 * The result is a list:
                 *  the first JSON record contains user's info
                 *  the second, IF EXISTS, contains extra info about rider/farmer
                 */
                setUserInfo(res.data[0]);
                setaccountType(res.data[0].account_type);
                if (accountType === 1 || accountType === 2){
                    console.log("Account Type : ",res.data[0].account_type);
                    setExtraInfo(res.data[1]);    
                }
            })
            .catch((error) => {
              console.log(error.response);
            });
        
    }, [userId, axiosPrivate, location, navigate, ]);

    // Function for spawning farmer or rider info for form
    const handleClickOpen = (selectedValue) => {
        if(selectedValue !== 0)
            setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-5 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"></img>
                        <span className="font-weight-bold">{userInfo.name}</span>
                        <span className="text-black-50">{userInfo.email}</span>
                    </div>
                    <div className="row d-flex justify-content-center align-items-center"> 
                        <Link className="btn btn-primary m-1" to={"orders/"} id="orders" >
                        Orders
                        </Link>
                    </div>
                    <div className="row d-flex justify-content-center align-items-center"> 
                        <Link className="btn btn-primary m-1 " to={"/"} >
                        Cards
                        </Link>   
                    </div>
                    <div className="row d-flex justify-content-center align-items-center"> 
                        <Link className="btn btn-primary m-1 " to={"/"} >
                        Utils
                        </Link>
                    </div>   
                </div>
                <div className="col-md-7 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Account Information </h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels"><h6>Name : {userInfo.name}</h6></label></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels"><h6>Email : {userInfo.email}</h6></label></div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-6"><label className="labels"><h6>Mobile Number : {userInfo.phone}</h6></label></div>
                            <div className="col-md-6"><label className="labels"><h6>Shipping Address : {userInfo.saddress}</h6></label></div>
                            <div className="col-md-6"><label className="labels"><h6>Billing Address : {userInfo.baddress}</h6></label></div> 
                        </div> 
                        <div className="row mt-5">
                            <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user"></i>
                            <div className="form-group flex-fill mb-0">
                                <Box sx={{ minWidth: 240 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">AccountType</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={accountType}
                                    label="TypeOfAccount"
                                    onChange={(event) => {
                                        setaccountType(event.target.value);
                                        handleClickOpen(event.target.value);
                                    }}
                                    >
                                    <MenuItem value={0}>Customer</MenuItem>
                                    <MenuItem value={1}>Farmer</MenuItem>
                                    <MenuItem value={2}>Rider</MenuItem>
                                    </Select>
                                </FormControl>
                                </Box>
                            </div>
                            </div>
                        </div>

                        <div>
                          <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                          >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                              Addional Information Required
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                              <Typography gutterBottom>
                                <p className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">  
                                  You must compile this part for your desired specific account. 
                                  </p>
                              </Typography>
                              <Typography gutterBottom>
                                { accountType === 1 && <FormForFarmer /> }
                                { accountType === 2 && <FormForRider /> }
                              </Typography>
                            </DialogContent>
                            <DialogActions>
                              <Button autoFocus onClick={handleClose}>
                                Save changes
                              </Button>
                            </DialogActions>
                          </BootstrapDialog>
                        </div>

                        {accountType === 1 &&
                        <div> 
                            <div className="row mt-6">
                                <div className="col-md-6"><label className="labels"><h6>Farmer Location : {extraInfo.farm_location}</h6></label></div>
                            </div>
                            <div className="row mt-7">
                                <div className="col-md-6"><label className="labels"><h6>Biografy : {extraInfo.bio} </h6></label></div>
                            </div>
                            <div className="mt-5 text-center">
                                <Link className="btn btn-warning" to={`/farmer/profile/${userId}`} replace >
                                    Personal Farmer Page
                                </Link>
                            </div>
                        </div>
                        }
                        {accountType === 2 &&
                          <div> 
                          <div className="row mt-6">
                              <div className="col-md-6"><label className="labels"><h6>Avalaible : </h6></label></div>
                          </div>
                          <div className="row mt-7">
                              <div className="col-md-6"><label className="labels"><h6>Biografy : {extraInfo.bio} </h6></label></div>
                          </div>
                          <div className="mt-5 text-center">
                              <Link className="btn btn-warning" to={`/rider/profile/${userId}`} replace >
                                  Personal Rider Page
                              </Link>
                          </div>
                      </div>
                        }
                    </div>
                </div>
            </div>
        </div>
      );
}
    
export default UserProfile;
    