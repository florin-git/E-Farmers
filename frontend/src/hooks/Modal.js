import React , {useState,useEffect} from 'react';
import review from "../my_css/review.css";
import Box from '@mui/material/Box';
import Rating  from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axiosInstance from '../api/axiosUsers';
import useAuth from "../hooks/useAuth";
import reviewCSS from "../my_css/review.css";

let farmer_id=false;

const Modal = ({ open, onClose }) => {

  const { auth } = useAuth();
  const user_id = auth.userId;

  const [stars, setStars] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [comment,setComment] = useState("")

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  
/*
  function getFarmer_id(user_id){
    axiosInstance
      .get(`farmers/${user_id}/`)
      .then((res) => {
        farmer_id = res.data;
        console.log(farmer_id)
      })
  };
  
  if(!farmer_id)
    getFarmer_id(user_id)
*/
  const handleSubmit = async (event) => {
  /*
    console.log(stars);
    console.log(comment)
    console.log(user_id)
    console.log(farmer_id)
    event.preventDefault();
    axiosInstance
      .post(`users/farmers/${farmer_id}/`, {
        rating : stars,
        comment : comment,
        
      })
      .catch((error)=> {
        console.log(error.response);
      });*/
  };
  


  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Farmer_meme.jpg" alt='/' />
        <div className='modalRight'>
          <button className='btn btn-primary' onClick={onClose}>
            X
          </button>
          <div className='content'>
          
          <Box
            sx={{
              width: 450,
              display: 'flex',
              alignItems: 'center',
            }}
          >
          
            <Rating
                name="hover-feedback"
                value={stars}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newStars) => {
                  setStars(newStars);
                  
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {stars !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : stars]}</Box>
            )}
            </Box>
          
          <div>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Leave a small comment!"
              style={{ width: 400 }}
              value={comment}
              onChange= {event => setComment(event.target.value)}
            />
          </div>
          
            
          </div>
          <div className='btnContainer'>
            <button className="btn btn-primary m-1" 
            onClick = {handleSubmit}>
              
              <span className='bold'>Send Review!</span> 
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;