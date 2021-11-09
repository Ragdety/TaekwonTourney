import React, {useState} from 'react';
import DashBoardNavBar from '../Components/DashBoardNavBar';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import EventCard from '../Components/EventCard';

export default function TourneyCreationPage(){
    const [clicked, setClicked] = useState(false);
    const useStyles = makeStyles((theme) => ({
        tr: {
          display: 'grid',
          textAlign: 'center',
        },
        center:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputWidth: {
            width: '65%',
            height: 30,
            margin: 'auto',
            display: 'block',
        },
        plusButton: {
            backgroundColor: '#4aedc4',
              '&: hover':{
              boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
              backgroundColor: '#14a37f',
              },
              fontSize: '18px',
              color: 'white',
              height: '31px',
              width: '180px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
          },
      }));
    
      const classes = useStyles();

      function handleClick(){
          setClicked(true);
      }
    return(
        <div>
            <DashBoardNavBar />
            <div className={classes.tr}>
                <h1>Name Your Tournament</h1>
                <input className={classes.inputWidth}/>
                <h3>Tournament Name: </h3>
                <Stack spacing={2} direction="row" className={classes.center}>
                    <h1>Add Participants: </h1>
                    <button className={classes.plusButton} onClick={handleClick}>Plus</button>
                </Stack>
                {clicked ? <EventCard /> : null}
                <h1>Scheduled Date(s) of Tournament</h1>
                <input className={classes.inputWidth}/>
                <h3>Date of Tournament: </h3>
            </div>
        </div>
    );
}