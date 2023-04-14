import React , {useState,useEffect} from 'react';
import review from "../my_css/review.css";
import Box from '@mui/material/Box';
import Rating  from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

let farmer_id=false;

const Modal = ({ farmer , open, onClose }) => {

  

  const { auth } = useAuth();
  const user_id = auth.userId;
  const axiosPrivate = useAxiosPrivate();

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
    axiosPrivate
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
    event.preventDefault();
    axiosPrivate
      .post(`review/${user_id}/`, {
        rating : stars,
        comment : comment,
        farmer_user : farmer,
        
      })
      .catch((error)=> {
        console.log(error.response);
      });
      onClose()
  };
  


  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay' style={{"zIndex": '100'}}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Pennello Cinghiale"
            ></img>
        <div className='modalRight'>
          
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