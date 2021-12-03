import React, {useState, ChangeEvent } from 'react';
import DashBoardNavBar from '../Components/DashBoardNavBar';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import {TournamentType} from '../Enums/enums'
import {ITournamentCreate} from "../Models/creationModels";
import TournamentService from "../Services/tournamentService";
import {Redirect} from "react-router";
import Cookies from "js-cookie";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@mui/material/Button';

export default function TourneyCreationPage(){
    // const [clicked, setClicked] = useState(false);
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
            width: '80px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
        },
    }));
    
    const classes = useStyles();
    const history = useHistory();
    
    const initialTournamentState: ITournamentCreate = {
        TournamentName: "",
        TournamentType: TournamentType.Breaking,
        StartDate: new Date(),
        EndDate: new Date(),
    };
    const err: any = []
    
    const [tourney, setTourney] = useState<ITournamentCreate>(initialTournamentState);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errors, setErrors] = useState(err);
    
    const handleError = (e: any) => {
        console.log(e);
        err.push(e)
        setErrors(err);
    }

    const saveTourney = (event: any) => {
        event.preventDefault();
        let data: ITournamentCreate = {
            TournamentName: tourney.TournamentName,
            TournamentType: tourney.TournamentType,
            StartDate: tourney.StartDate,
            EndDate: tourney.EndDate
        };

        try {
            TournamentService.create(data, Cookies.get('jwt'))
                .then((response: any) => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch((e: any) => {
                    console.log('Error', e);
                    handleError(e);
                    setError(true);
                    console.log(errors);
                });
        } catch (e) {
            console.log('Error', e);
            handleError(e);
            setError(true);
        }
    }

    if(submitted) {
        return <Redirect to='/Dashboard' />;
    }

    function goBack(){
        history.push('/Dashboard');
    }

    return(
        <div>
            <DashBoardNavBar />
            <form className={classes.tr} 
                  onSubmit={(event => saveTourney(event))}>
                <Stack spacing = {1} direction = "row">
                    <IconButton aria-label = "Go-Back" onClick={goBack} style={{float: 'left', fontSize: 20}}>
                        <ArrowBackIcon style={{float: 'left', height: 50, width: 50}}/>
                    </IconButton>
                    <Typography variant= "h5" style={{float: 'left', marginTop: 18}}>
                        Go Back
                    </Typography>
                </Stack>
                <h1>Name Your Tournament</h1>
                <div>
                    <input 
                        onChange={(e: any) => setTourney({ ...tourney, TournamentName: e.target.value }) } 
                        value={tourney.TournamentName} 
                        id="tournamentName" 
                        required
                        maxLength={50} 
                        style={{height: 40, fontSize: 17, textAlign: 'center', width: '65%'}}/>
                </div>
                <h1>Tournament Type</h1>
                <div>
                    <select style={{width: '50%', textAlign: 'center', height: 50, fontSize: 20}} onChange={(e: any) => setTourney({ ...tourney, TournamentType: e.target.value }) }
                            required>
                        <option style={{fontSize: 20, textAlign: 'center'}} value={TournamentType.Breaking}>Breaking</option>
                        <option style={{fontSize: 20, textAlign: 'center'}} value={TournamentType.Forms}>Forms</option>
                        <option style={{fontSize: 20, textAlign: 'center'}} value={TournamentType.Sparring}>Sparring</option>
                    </select>
                </div>
                <h1>Scheduled Date(s) of Tournament</h1>
                <div>
                    <h3>Start Date: </h3>
                    <input className={classes.inputWidth}
                           onChange={(e: any) => setTourney({ ...tourney, StartDate: e.target.value })}
                           type={"date"}
                           id="startDate"
                           required
                           style={{width: '42%', fontSize: 15}}/>
                    
                    <h3>End Date: </h3>
                    <input className={classes.inputWidth}
                           onChange={(e: any) => setTourney({ ...tourney, EndDate: e.target.value }) }
                           type={"date"}
                           id="endDate"
                           required
                           style={{width: '42%', fontSize: 15, marginBottom: 20}}/>
                </div>
                <div style={{textAlign: 'center'}}>
                    <Button color="primary" style={{backgroundColor: '#4aedc4', color: '#0e4686', marginBottom: 20}} type={"submit"} className="btn btn-success">
                        Create Tournament
                    </Button>
                </div>
                { error && <p style={{color: 'red', marginTop: 2}}>An error ocurred...</p>}
            </form>
        </div>
    );
}