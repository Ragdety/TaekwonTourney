import React, {useState, ChangeEvent } from 'react';
import DashBoardNavBar from '../Components/DashBoardNavBar';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import {TournamentType} from '../Enums/enums'
import {ITournamentCreate} from "../Models/creationModels";
import TournamentService from "../Services/tournamentService";
import {Redirect} from "react-router";
import Cookies from "js-cookie";

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

    return(
        <div>
            <DashBoardNavBar />
            <form className={classes.tr} 
                  onSubmit={(event => saveTourney(event))}>
                <h1>Name Your Tournament</h1>
                <input className={classes.inputWidth} 
                       onChange={(e: any) => setTourney({ ...tourney, TournamentName: e.target.value }) } 
                       value={tourney.TournamentName} 
                       id="tournamentName" 
                       required/>
                
                <h1>Tournament Type</h1>
                <select onChange={(e: any) => setTourney({ ...tourney, TournamentType: e.target.value }) }
                        required>
                    <option value={TournamentType.Breaking}>Breaking</option>
                    <option value={TournamentType.Forms}>Forms</option>
                    <option value={TournamentType.Sparring}>Sparring</option>
                </select>
                {/*<h3>Tournament Name: </h3>*/}
                {/*{clicked ? <EventCard /> : null}*/}
                
                <h1>Scheduled Date(s) of Tournament</h1>
                <div>
                    {/*We want these side by side please, remove this comment after*/}
                    <h3>Start Date: </h3>
                    <input className={classes.inputWidth}
                           onChange={(e: any) => setTourney({ ...tourney, StartDate: e.target.value })}
                           type={"date"}
                           id="startDate"
                           required/>
                    
                    <h3>End Date: </h3>
                    <input className={classes.inputWidth}
                           onChange={(e: any) => setTourney({ ...tourney, EndDate: e.target.value }) }
                           type={"date"}
                           id="endDate"
                           required/>
                </div>
                {/*Will add this when user clicks edit tournament*/}
                {/*<Stack spacing={2} direction="row" className={classes.center}>*/}
                {/*    <h1>Add Participants: </h1>*/}
                {/*    <button className={classes.plusButton} onClick={handleClick}>Plus</button>*/}
                {/*</Stack>*/}
                <button /*onClick={saveTourney}*/ type={"submit"} className="btn btn-success">
                    Create tournament
                </button>
                {/*For now this way of handling errors. TODO: Will fix this later*/}
                { error && <p style={{color: 'red', marginTop: 2}}>An error ocurred...</p>}
            </form>
        </div>
    );
}