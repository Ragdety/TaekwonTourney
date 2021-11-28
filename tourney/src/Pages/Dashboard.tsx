import React, {useEffect, useState} from 'react';
import {Card, CardContent, Grid, Typography} from '@mui/material';
import user from "../APICalls/user";
import DashBoardNavBar from '../Components/DashBoardNavBar';
import {makeStyles} from '@mui/styles';
import {PastTournamentCards} from '../Components/PastTournamentCards';
import {Redirect} from "react-router";
import TournamentService from "../Services/tournamentService";
import {useHistory} from 'react-router-dom';
import Box from "@mui/material/Box";
import {TourneyTime} from "../Enums/enums";
import api from "../Api/api";
import apiRoutes from "../Contracts/apiRoutes";
import Cookies from "js-cookie";
import Button from '@mui/material/Button';
import moment from 'moment';
import {FutureTournamentCards} from "../Components/FutureTournamentCards";

export default function Dashboard(){
    const initArr: any[] = [];
    const [userName, setUserName] = useState('');
    const [redirectHome, setRedirectHome] = useState(false);
    const [allTournaments, setAllTournaments] = useState([]);
    const [pastTourneys, setPastTourneys] = useState(initArr);
    const [currentTourneys, setCurrentTourneys] = useState(initArr);
    const [futureTourneys, setFutureTourneys] = useState(initArr);
    const [error, setError] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const history = useHistory();
    
    const useStyles = makeStyles((theme) => ({
        tr: {
          float: 'right',
          marginTop: -90,
          marginRight: -22,
          backgroundColor: '#4aedc4',
            '&: hover':{
            boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
            backgroundColor: '#14a37f',
            },
            fontSize: '18px',
            color: 'white',
            height: '35px',
            width: '168px',
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

      function refreshPage() {
        window.location.reload();
      }
      
      const deleteTourney = async (tourneyId: number) => {
          try {
              await TournamentService.remove(tourneyId)
                  .then(() => {
                      
                  })
                  .catch((e:any) => {
                      setError(true)
              })
          } catch (e) {
              setError(true)
          }
      }
      
      const classes = useStyles();

    useEffect(() => {
        (
            async () => {
                try {
                    await api.get(apiRoutes.Users.getMe, {
                        headers: {
                            Authorization: `Bearer ${ Cookies.get('jwt') }`
                        }
                    })
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
                            setError(true);
                            //setRedirectHome(true)
                        });
                }
                catch(e) {
                    setError(true);
                }
                
                try {
                    await TournamentService.getAll()
                        .then((res: any) => {
                            const tourneys = res.data;
                            setAllTournaments(tourneys);
                        })
                        .catch((error: any) => {
                            console.log(error)
                            setError(true);
                        });
                }
                catch (e) {
                    setError(true);
                }
            }
        )();
    }, [allTournaments]);


    useEffect(() => {
        (
            async () => {
                try {
                    await TournamentService.getByDateEnum(TourneyTime.Past)
                        .then((res: any) => {
                            const tourneys = res.data;
                            setPastTourneys(tourneys);
                        })
                        .catch((error: any) => {
                            console.log('API LEVEL ERROR', error);
                            setError(true);
                        });
                }
                catch (e) {
                    console.log('AUTH ERROR: ', e);
                    alert("You've been logged out, you will be redirected to home page");
                    setError(true);
                    setRedirectHome(true);
                }
            }
        )();
    }, [pastTourneys]);

    useEffect(() => {
        (
            async () => {
                try {
                    await TournamentService.getByDateEnum(TourneyTime.Current)
                        .then((res: any) => {
                            const tourneys = res.data;
                            setCurrentTourneys(tourneys);
                        })
                        .catch((error: any) => {
                            console.log(error);
                            setError(true);
                        });
                }
                catch (e) {
                    console.log('AUTH ERROR: ', e);
                    alert("You've been logged out, you will be redirected to home page");
                    setError(true);
                    setRedirectHome(true);
                }
            }
        )();
    }, [currentTourneys]);

    useEffect(() => {
        (
            async () => {
                try {
                    await TournamentService.getByDateEnum(TourneyTime.Future)
                        .then((res: any) => {
                            const tourneys = res.data;
                            setFutureTourneys(tourneys);
                        })
                        .catch((error: any) => {
                            console.log(error);
                            setError(true);
                        });
                }
                catch (e) {
                    console.log('AUTH ERROR: ', e);
                    alert("You've been logged out, you will be redirected to home page");
                    setError(true);
                    setRedirectHome(true);
                }
            }
        )();
    }, [futureTourneys]);
    
    
    if(redirectHome) {
        return <Redirect to='/'/>;
    }
    else if(refresh) {
        return <Redirect to='/Dashboard'/>;
    }

    return(
        <>
            <DashBoardNavBar />
            <h2 style={{fontSize: 28}}>Dashboard</h2>
                <Typography variant="h5">
                    Hello {userName}!
                </Typography>
                <Grid>
                    <Grid item xs={11}>
                        <button className={classes.tr} onClick={createTournament}>Create Tournament</button>
                    </Grid>
                </Grid>
            <div>
                <h2>Past Tournaments</h2>
                {pastTourneys.length > 0 ? (
                    pastTourneys.map((tourney: any) => (
                        <PastTournamentCards tourney={tourney}/>
                    ))
                ): <div>No past tournaments</div>}

                <h2>Current Tournaments</h2>
                {currentTourneys.length > 0 ? (
                    currentTourneys.map((tourney: any) => (
                        <Card sx={{ display: 'flex'}} style={{width: '20%', marginLeft: 20, marginBottom: 20}} >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {tourney.tournamentName}
                                    </Typography>
                                    <Typography component="div">
                                        {tourney.tournamentType}
                                    </Typography>
                                    <Typography component="div">
                                        Start Date: {moment(tourney.startDate).format('MMMM/DD/YYYY')}
                                    </Typography>
                                    <Typography component="div">
                                        End Date: {moment(tourney.endDate).format('MMMM/DD/YYYY')}
                                    </Typography>
                                    <Button color="primary" onClick={() => editTourney(tourney.id)}>
                                        Edit
                                    </Button>
                                    <Button color="primary" onClick={() => deleteTourney(tourney.id)}>
                                        Delete
                                    </Button>
                                </CardContent>
                            </Box>
                        </Card>
                    ))
                ): <div>No current tournaments</div>}

                <h2>Future Tournaments</h2>
                {futureTourneys.length > 0 ? (
                    futureTourneys.map((tourney: any) => (
                        <FutureTournamentCards tourney={tourney}/>
                    ))
                ): <div>No future tournaments</div>}

                {error && <p style={{color: 'red', marginTop: 5}}>An error ocurred...</p>}
            </div>
        </>
    )
}