import React, {useEffect, useState} from 'react';
import {Card, CardContent, Grid, Typography} from '@mui/material';
import user from "../APICalls/user";
import DashBoardNavBar from '../Components/DashBoardNavBar';
import {makeStyles} from '@mui/styles';
import PreviousTournamentCards from '../Components/PreviousTournamentCards';
import CurrentTournamentCards from '../Components/CurrentTournamentCards';
import {Redirect} from "react-router";
import TournamentService from "../Services/tournamentService";
import {useHistory} from 'react-router-dom';
import Box from "@mui/material/Box";
import {TourneyDate} from "../Enums/enums";

export default function Dashboard(){

    const initArr: any[] = [];
    const [userName, setUserName] = useState('');
    //const [token, setToken] = useCookies(['jwt']);
    const [clicked, setClicked] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);
    const [allTournaments, setAllTournaments] = useState([]);
    const [previousTourneys, setPreviousTourneys] = useState(initArr);
    const [currentTourneys, setCurrentTourneys] = useState(initArr);
    const [futureTourneys, setFutureTourneys] = useState(initArr);

    const history = useHistory();
    
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

      function createTournament(){
          history.push('/Create')
      }
      
      const editTourney = (tourneyId: number) => {
          history.push(`/EditTournament/${tourneyId}`)
      }
      
      const deleteTourney = (tourneyId: number) => {
          history.push(`/DeleteTournament/${tourneyId}`)
      }
      
      const handleTourneyDate = (tourney: any) => {
          const now = new Date();
          const tourneyStartDate = new Date(tourney.startDate)
          const tourneyEndDate = new Date(tourney.endDate)
          
          if(tourneyEndDate < now) {
              return TourneyDate.Previous;
          }
          else if(now > tourneyStartDate && now < tourneyEndDate) {
              return TourneyDate.Current;
          }
          else {
              return TourneyDate.Future;
          }
      }
      
      const classes = useStyles();
      
      useEffect(() => {
        (
            async () => {
                await user.get('/me')
                    .then((res:any) => {
                        const content = res.data
                        //console.log('Response', res.data)
                        //console.log(content);
                        setUserName(content.userName);
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                        }
                        setRedirectHome(true)
                    });
            })();
      });

    useEffect(() => {
        (
            async () => {
                await TournamentService.getAll()
                    .then((res: any) => {
                        const tourneys = res.data;
                        setAllTournaments(tourneys);
                    })
                    .catch((error: any) => {
                        console.log(error)
                    });
            }
        )();
    }, []);
    
    if(redirectHome) {
        return <Redirect to='/'/>;
    }

    return(
        <>
            <DashBoardNavBar />
            <h1>Dashboard</h1>
                <Typography variant="h6">
                    Hello {userName}!
                </Typography>
                <Grid>
                    <Grid item xs={11}>
                        <button className={classes.tr} onClick={createTournament}>Create Tournament</button>
                    </Grid>
                </Grid>
            <div>
                {allTournaments && (
                    allTournaments.map((tourney: any) => (
                        <Card sx={{ display: 'flex'}} style={{width: '70%', marginLeft: 20}} >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h4">
                                        {tourney.tournamentName}
                                    </Typography>
                                    <Typography component="div">
                                        {tourney.tournamentType}
                                    </Typography>
                                    <Typography component="div">
                                        Start Date: {tourney.startDate}
                                    </Typography>
                                    <Typography component="div">
                                        End Date: {tourney.endDate}
                                    </Typography>
                                    <button onClick={() => editTourney(tourney.id)}>
                                        Edit
                                    </button>
                                    <button onClick={() => deleteTourney(tourney.id)}>
                                        Delete
                                    </button>
                                </CardContent>
                            </Box>
                        </Card>
                    ))
                )}
                
                {/*<Typography >Previous Tournaments</Typography>*/}
                {/*{previousTourneys && previousTourneys.map((tourney: any) => (*/}
                {/*    <PreviousTournamentCards/>*/}
                {/*))}*/}
                {/*{currentTourneys && currentTourneys.map((tourney: any) => (*/}
                {/*    <CurrentTournamentCards/>*/}
                {/*))}*/}
                {/*{futureTourneys && futureTourneys.map((tourney: any) => (*/}
                {/*    <Card sx={{ display: 'flex'}} style={{width: '70%', marginLeft: 20}} >*/}
                {/*        <Box sx={{ display: 'flex', flexDirection: 'column' }}>*/}
                {/*            <CardContent sx={{ flex: '1 0 auto' }}>*/}
                {/*                <Typography component="div" variant="h4">*/}
                {/*                    {tourney.tournamentName}*/}
                {/*                </Typography>*/}
                {/*                <Typography component="div">*/}
                {/*                    {tourney.tournamentType}*/}
                {/*                </Typography>*/}
                {/*                <Typography component="div">*/}
                {/*                    Start Date: {tourney.startDate}*/}
                {/*                </Typography>*/}
                {/*                <Typography component="div">*/}
                {/*                    End Date: {tourney.endDate}*/}
                {/*                </Typography>*/}
                {/*                <button onClick={() => editTourney(tourney.id)}>*/}
                {/*                    Edit*/}
                {/*                </button>*/}
                {/*                <button onClick={() => deleteTourney(tourney.id)}>*/}
                {/*                    Delete*/}
                {/*                </button>*/}
                {/*            </CardContent>*/}
                {/*        </Box>*/}
                {/*    </Card>*/}
                {/*))}*/}
            </div>
        </>
    )
}