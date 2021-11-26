import React, {useEffect, useState} from 'react';
import DashBoardNavBar from '../Components/DashBoardNavBar';
import {makeStyles} from '@mui/styles';
import {BeltLevel, BlackBeltLevel, TournamentType} from '../Enums/enums'
import {IParticipantsCreate} from "../Models/creationModels";
import TournamentService from "../Services/tournamentService";
import {Redirect, Route} from "react-router";
import {useParams} from "react-router-dom";
import ParticipantService from "../Services/participantService";
import {Card} from "@mui/material";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function TourneyEditPage(){
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
    
    const { tournamentId }: any = useParams();
    const initArrayState: any = []

    const [tournamentName, setTournamentName] = useState('');
    const [tournamentType, setTournamentType] = useState<TournamentType>(TournamentType.Breaking);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errors, setErrors] = useState(initArrayState);
    
    const [participants, setParticipants] = useState([]);
    const [participant, setParticipant] = useState<IParticipantsCreate>(initArrayState);
    const history = useHistory();

    function goBack(){
        history.push('/Dashboard');
    }
    
    const formatDate = (year: number, month: number, day: number) => {
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const fetchTournament = async() => {
            try {
                const res: any = await TournamentService.get(tournamentId);
                const sd = new Date(res.data.startDate)
                const ed = new Date(res.data.endDate)
                const tournamentStartDate = formatDate(sd.getUTCFullYear(), sd.getUTCMonth()+1, sd.getUTCDate());
                const tournamentEndDate = formatDate(ed.getUTCFullYear(), ed.getUTCMonth()+1, ed.getUTCDate());
                
                setTournamentName(res.data.tournamentName);
                setTournamentType(res.data.tournamentType);
                setStartDate(tournamentStartDate);
                setEndDate(tournamentEndDate);
            } catch (e) {
                console.error(e);
                setError(true);
            }
        }
        fetchTournament();
    }, [])
    
    useEffect(() => {
        const fetchParticipants = async() => {
            try {
                await ParticipantService.getAll(tournamentId)
                    .then((res: any) => {
                        const parts = res.data;
                        //console.log(parts)
                        setParticipants(parts);
                    })
                    .then(() => {
                        console.log(participants);
                    });
            } catch (e) {
                console.error(e);
                setError(true);
            }
        }
        fetchParticipants();
    }, []);

    const handleError = (e: any) => {
        console.log(e);
        setErrors([...errors, e]);
    }

    const editTourney = async (event: any) => {
        event.preventDefault();
        try {
            const sDate = new Date(startDate);
            const eDate = new Date(endDate);
            await TournamentService.update(tournamentId, {
                TournamentName: tournamentName,
                TournamentType: tournamentType,
                StartDate: sDate,
                EndDate: eDate,
            }).then(() => {
                setSubmitted(true);
            }).catch((error: any) => {
                setError(true);
            })
        } catch(e) {
            setError(true);
        }
    }
    
    const addParticipant = (event: any) => {
        //event.preventDefault();
        
        try {
            ParticipantService.create(tournamentId, participant)
                .then((res: any) => {
                    console.log(res);
                })
                .catch((error: any) => {
                    setError(true)
                });
        }
        catch(e) {
            setError(true)
        }
    }

    if(submitted) {
        return <Redirect to='/Dashboard' />;
    }

    return(
        <div>
            <DashBoardNavBar />
            <form className={classes.tr}
                  onSubmit={(event => editTourney(event))}>
                    <Stack spacing = {1} direction = "row">
                            <IconButton aria-label = "Go-Back" onClick={goBack} style={{float: 'left', fontSize: 20}}>
                                <ArrowBackIcon style={{float: 'left', height: 50, width: 50}}/>
                            </IconButton>
                            <Typography variant= "h5" style={{float: 'left', marginTop: 18}}>
                                Go Back
                            </Typography>
                    </Stack>
                    <h1>Name Your Tournament</h1>
                <input className={classes.inputWidth}
                       onChange={(e) => {setTournamentName(e.target.value)}}
                       value={tournamentName}
                       id="tournamentName"
                       required/>

                <h1>Tournament Type</h1>
                <select onChange={(e: any) => {setTournamentType(e.target.value)}}
                        value={tournamentType}
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
                           onChange={(e) => {setStartDate(e.target.value)}}
                           type={"date"}
                           id="startDate"
                           required 
                           value={startDate}/>

                    <h3>End Date: </h3>
                    <input className={classes.inputWidth}
                           onChange={(e) => {setEndDate(e.target.value)}}
                           type={"date"}
                           id="endDate"
                           required 
                           value={endDate}/>
                </div>
                {/*Will add this when user clicks edit tournament*/}
                {/*<Stack spacing={2} direction="row" className={classes.center}>*/}
                {/*    <h1>Add Participants: </h1>*/}
                {/*    <button className={classes.plusButton} onClick={handleClick}>Plus</button>*/}
                {/*</Stack>*/}
                <button type={"submit"} className="btn btn-success">
                    Update tournament
                </button>
                {/*For now this way of handling errors. TODO: Will fix this later*/}
                { error && <p style={{color: 'red', marginTop: 2}}>An error ocurred...</p>}
            </form>
            
            <div>
                <h1>Add Participant</h1>
                <form onSubmit={addParticipant}>
                    <input className={classes.inputWidth}
                           onChange={(e: any) => setParticipant({ ...participant, FirstName: e.target.value }) }
                           id="firstName"
                           placeholder={'First Name'}
                           required/>
                    <input className={classes.inputWidth}
                           onChange={(e: any) => setParticipant({ ...participant, LastName: e.target.value }) }
                           id="lastName"
                           placeholder={'Last Name'}
                           required/>
                    <input className={classes.inputWidth}
                           onChange={(e: any) => setParticipant({ ...participant, DateOfBirth: e.target.value }) }
                           id="dateOfBirth"
                           type={'date'}
                           required/>
                    <select onChange={(e: any) => setParticipant({ ...participant, BeltLevel: e.target.value }) }
                            required 
                            id="beltLevel">
                        <option value={BeltLevel.White}>White</option>
                        <option value={BeltLevel.Yellow}>Yellow</option>
                        <option value={BeltLevel.SeniorYellow}>SeniorYellow</option>
                        <option value={BeltLevel.Green}>Green</option>
                        <option value={BeltLevel.SeniorGreen}>SeniorGreen</option>
                        <option value={BeltLevel.Blue}>Blue</option>
                        <option value={BeltLevel.SeniorBlue}>SeniorBlue</option>
                        <option value={BeltLevel.Red}>Red</option>
                        <option value={BeltLevel.SeniorRed}>SeniorRed</option>
                        <option value={BeltLevel.BoDan}>BoDan</option>
                        <option value={BeltLevel.BlackBelt}>BlackBelt</option>
                    </select>
                    
                    <select onChange={(e: any) => setParticipant({ ...participant, BlackBeltLevel: e.target.value }) }
                            id="beltLevel">
                        <option value={''} selected></option>
                        <option value={BlackBeltLevel.FirstDan}>FirstDan</option>
                        <option value={BlackBeltLevel.SecondDan}>SecondDan</option>
                        <option value={BlackBeltLevel.ThirdDan}>ThirdDan</option>
                        <option value={BlackBeltLevel.FourthDan}>FourthDan</option>
                        <option value={BlackBeltLevel.FifthDan}>FifthDan</option>
                        <option value={BlackBeltLevel.SixthDan}>SixthDan</option>
                        <option value={BlackBeltLevel.SeventhDan}>SeventhDan</option>
                    </select>
                    <button type="submit">
                        Add Participant
                    </button>
                </form>
                <div style={{marginBottom: 2}}>
                    {/*<h1>Participants</h1>*/}
                    {participants && participants.map((p: any) => (
                        <Card key={p.id}
                              sx={{ display: 'block'}} style={{width: '70%', marginLeft: 20}} >
                            <p>{p.firstName}</p>
                            <p>{p.lastName}</p>
                            <p>{p.dateOfBirth}</p>
                            <p>{p.beltLevel}</p>
                            {p.isBlackBelt && <p>{p.blackBeltLevel}</p>}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}