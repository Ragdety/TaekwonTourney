import React from 'react';
import NavBar from '../Components/NavBar';
import HomeCards from '../Components/HomeCards';
import { makeStyles } from '@mui/styles';
import Taekwondo from '../Images/Taekwondo.png';

function Home(){

    const useStyles = makeStyles((theme) => ({
        div:{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
        centerText: {
          marginTop: 70
        },
      }));

    const classes = useStyles();
    return(
        <>
            <NavBar />
                <div className={classes.div}>
                    <h1 className={classes.centerText}>WE PROVIDE EASY TOURNAMENT SETUP</h1>
                        <h1>FOR ALL OF YOUR TAEKWONDO NEEDS</h1>
                            <img src={Taekwondo} alt="Taekwondo" height="131px"/>
                </div>
            <HomeCards />
        </>
    )
}
export default Home;