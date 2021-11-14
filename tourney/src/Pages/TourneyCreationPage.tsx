import React, {useState, ChangeEvent } from 'react';
import DashBoardNavBar from '../Components/DashBoardNavBar';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import {TournamentType} from '../Enums/enums'
import {ITournamentCreate} from "../Models/creationModels";
import TournamentService from "../Services/tournamentService";
import {ITournament} from "../Models/retrivalModels";

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
    
    const initialTournamentState = {
        Id: 0,
        TournamentName: "",
        TournamentType: TournamentType.Breaking,
        StartDate: new Date(),
        EndDate: new Date(),
        OrganizerId: 1,
        Organizer: null,
        Participants: null
    };
    const [tourney, setTourney] = useState<ITournament>(initialTournamentState);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTourney({ ...tourney, [name]: value });
    };

    const saveTourney = () => {
        let data: ITournamentCreate = {
            Name: tourney.TournamentName,
            TournamentType: tourney.TournamentType,
            StartDate: tourney.StartDate,
            EndDate: tourney.EndDate
        };

        try {
            TournamentService.create(data)
                .then((response: any) => {
                    setTourney({
                        Id: response.data.Id,
                        TournamentName: response.data.TournamentName,
                        TournamentType: response.data.TournamentType,
                        StartDate: response.data.StartDate,
                        EndDate: response.data.EndDate,
                        OrganizerId: response.data.OrganizerId
                    }); 
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
            //Will set error states here
        }
    };
    
    return(
        <div>
            <DashBoardNavBar />
            <div className={classes.tr}>
                <h1>Name Your Tournament</h1>
                <input className={classes.inputWidth}/>
                <h1>Tournament Type</h1>
                {/*<select value={tourneyType} onChange={handleChange}>*/}
                {/*    {TourneyTypes.map((type:any) => (*/}
                {/*        <option value={type}>*/}
                {/*            {type}*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</select>*/}
                {/*<h3>Tournament Name: </h3>*/}
                {/*{clicked ? <EventCard /> : null}*/}
                <h1>Scheduled Date(s) of Tournament</h1>
                <div>
                    {/*We want these side by side please, remove this comment after*/}
                    <h3>Start Date: </h3>
                    <input className={classes.inputWidth}/>
                    <h3>End Date: </h3>
                    <input className={classes.inputWidth}/>
                </div>
                <Stack spacing={2} direction="row" className={classes.center}>
                    <h1>Add Participants: </h1>
                    <button className={classes.plusButton} /*onClick={handleClick}*/>Plus</button>
                </Stack>
            </div>
        </div>
    );
}