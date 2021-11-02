import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import identity from "../APICalls/identity";
import DashBoardNavBar from '../Components/DashBoardNavBar';
import { makeStyles } from '@mui/styles';
import PreviousTournamentCards from '../Components/PreviousTournamentCards';
import CurrentTournamentCards from '../Components/CurrentTournamentCards';
import FutureTournamentCards from '../Components/FutureTournamentCards';
import { Link } from 'react-router-dom';

export default function Dashboard(){

    const [userName, setUserName] = useState('');
    const useStyles = makeStyles((theme) => ({
        tr: {
          float: 'right',
          marginTop: -80,
          marginRight: -22,
          backgroundColor: '#4aedc4',
            '&: hover':{
            boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
            backgroundColor: '#14a37f',
            },
            fontSize: '18px',
            color: 'white',
            height: '35px',
            width: '180px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
        },
      }));
    
      const classes = useStyles();
    
    useEffect(() => {
        (
            async () => {
                    const res = await identity.post('/user', {
                      Username: userName,
                      UserRole: "Student",
                      //Need to add dropdown to support UserRoles: 
                      //["Organizer", "Student", "Instructor", "FamilyMember"]
                    });
                const content = await res.config.data.toString();
                console.log(content);
                setUserName(content.Username);
                console.log(content.Username);
            }
        )();
    });

    return(
        <>
            <DashBoardNavBar />
            <h1>Dashboard</h1>
                <Typography variant="h6">
                    Hello {userName}!
                </Typography>
                <Grid>
                    <Grid item xs={1}>
                        <h2 style={{marginLeft: 10}}>Previous Tournaments</h2>
                    </Grid>
                    <Grid item xs={11}>
                        <Link to="/Create">
                            <button className={classes.tr}>Create Tournament</button>
                        </Link>
                    </Grid>
                </Grid>
            <div>
                {/*<PreviousTournamentCards /> */}
                <Typography variant="h6" style={{marginLeft: 20}}>
                    N/A
                </Typography>
            </div>
            <h2 style={{marginLeft: 10}}>Current Tournaments</h2>
            <div>
                {/*CurrentTournamentCards />*/}
                <Typography variant="h6" style={{marginLeft: 20}}>
                    N/A
                </Typography>
            </div>
            <h2 style={{marginLeft: 10}}>Future Tournaments</h2>
            <div>
                {/*<FutureTournamentCards />*/}
                <Typography variant="h6" style={{marginLeft: 20}}>
                    N/A
                </Typography>
            </div>
        </>
    )
}