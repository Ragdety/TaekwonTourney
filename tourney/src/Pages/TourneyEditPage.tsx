import React, {useEffect, useState} from 'react';
import DashBoardNavBar from '../Components/DashBoardNavBar';
import {makeStyles} from '@mui/styles';
import {BeltLevel, BlackBeltLevel, TournamentType} from '../Enums/enums'
import {IParticipantsCreate} from "../Models/creationModels";
import TournamentService from "../Services/tournamentService";
import {Redirect} from "react-router";
import {useParams} from "react-router-dom";
import ParticipantService from "../Services/participantService";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import moment from 'moment';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from '@mui/material/Grid';
import Cookies from 'js-cookie';

export default function TourneyEditPage(){
    const useStyles = makeStyles((theme) => ({
        content: {
            float: 'right',
        },
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

    const [expanded, setExpanded] = React.useState<boolean>(false);

    function handleChange() {
        setExpanded(!expanded);
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
                await ParticipantService.getAll(tournamentId, Cookies.get('jwt'))
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
        console.log(e.response.data)
        setErrors(e.response.data);
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
                console.log(error);
                console.log(error.response.data);
                setErrors(error.response.data);
            })
        } catch(e) {
            console.log(e);
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
                    setError(true);
                    console.log(error);
                    console.log(error.response.data);
                    setErrors( error.response.data);
                });
        }
        catch(e) {
            console.log(e);
            setError(true);
        }
    }
    
    const deleteParticipant = (participantId: number) => {
        try {
            ParticipantService.remove(tournamentId, participantId)
                .then((res: any) => {
                    console.log(res);
                })
                .catch((error: any) => {
                    setError(true);
                    console.log(error);
                    console.log(error.response.data);
                    setErrors(error.response.data);
                });
        }
        catch(e) {
            console.log(e);
            setError(true);
        }
    }

    if(submitted) {
        return <Redirect to='/Dashboard' />;
    }

    const stringedErrors =  JSON.stringify(errors);
    const parsed = JSON.parse(stringedErrors);
    let values = Object.values(parsed);

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
                    <div>
                        <input
                        onChange={(e) => {setTournamentName(e.target.value)}}
                        value={tournamentName}
                        id="tournamentName"
                        required
                        maxLength={50} 
                        style={{height: 40, fontSize: 17, textAlign: 'center', width: '65%'}}/>
                    </div>
                <h1>Tournament Type</h1>
                <div>
                <select style={{width: '50%', textAlign: 'center', height: 50, fontSize: 20}} onChange={(e: any) => {setTournamentType(e.target.value)}}
                        value={tournamentType}
                        required>
                    <option style={{fontSize: 20, textAlign: 'center'}}value={TournamentType.Breaking}>Breaking</option>
                    <option style={{fontSize: 20, textAlign: 'center'}}value={TournamentType.Forms}>Forms</option>
                    <option style={{fontSize: 20, textAlign: 'center'}}value={TournamentType.Sparring}>Sparring</option>
                </select>
                </div>
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
                           value={startDate}
                           style={{width: '42%', fontSize: 15}}/>

                    <h3>End Date: </h3>
                    <input className={classes.inputWidth}
                           onChange={(e) => {setEndDate(e.target.value)}}
                           type={"date"}
                           id="endDate"
                           required 
                           value={endDate}
                           style={{width: '42%', fontSize: 15, marginBottom: 20}}/>
                </div>
                <div style={{textAlign: 'center'}}>
                    <Button color="primary" style={{backgroundColor: '#4aedc4', color: '#0e4686'}} type={"submit"} className="btn btn-success">
                        Update tournament
                    </Button>
                </div>
                {/*For now this way of handling errors. TODO: Will fix this later*/}
                { error && <p style={{color: 'red', marginTop: 2}}>{values}</p>}
            </form>
            <div>
                <h1 style={{textAlign: 'center'}}>Add Participant</h1>
                <form onSubmit={addParticipant}>
                    <h3 style={{textAlign: 'center'}}>First Name</h3>
                    <input className={classes.inputWidth}
                           onChange={(e: any) => setParticipant({ ...participant, FirstName: e.target.value }) }
                           id="firstName"
                           placeholder={'First Name'}
                           required
                           maxLength={15}
                           style={{width: '45%', marginBottom: 20}}
                           />
                    <h3 style={{textAlign: 'center'}}>Last Name</h3>
                    <input className={classes.inputWidth}
                           onChange={(e: any) => setParticipant({ ...participant, LastName: e.target.value }) }
                           id="lastName"
                           placeholder={'Last Name'}
                           required
                           maxLength={20}
                           style={{width: '45%', marginBottom: 20}}/>
                    <h3 style={{textAlign: 'center'}}>Date Of Birth</h3>
                    <input className={classes.inputWidth}
                           onChange={(e: any) => setParticipant({ ...participant, DateOfBirth: e.target.value }) }
                           id="dateOfBirth"
                           type={'date'}
                           required
                           style={{width: '42%', fontSize: 15, marginBottom: 20}}/>
                    <h3 style={{textAlign: 'center'}}>Belt Level</h3>
                    <div style={{textAlign: 'center', display: 'grid'}}>
                            <select onChange={(e: any) => setParticipant({ ...participant, BeltLevel: e.target.value }) }
                                    required 
                                    id="beltLevel"
                                    style={{fontSize: 20, marginLeft: 10, width: '50%', margin: '0 auto', textAlign: 'center'}}>
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
                            <br></br>
                            <select onChange={(e: any) => setParticipant({ ...participant, BlackBeltLevel: e.target.value }) }
                                    id="beltLevel" style={{fontSize: 20, marginBottom: 20, width: '50%', margin: '0 auto', textAlign: 'center'}}>
                                <option value={''} selected></option>
                                <option value={BlackBeltLevel.FirstDan}>FirstDan</option>
                                <option value={BlackBeltLevel.SecondDan}>SecondDan</option>
                                <option value={BlackBeltLevel.ThirdDan}>ThirdDan</option>
                                <option value={BlackBeltLevel.FourthDan}>FourthDan</option>
                                <option value={BlackBeltLevel.FifthDan}>FifthDan</option>
                                <option value={BlackBeltLevel.SixthDan}>SixthDan</option>
                                <option value={BlackBeltLevel.SeventhDan}>SeventhDan</option>
                            </select>
                            <br></br>
                            <Button color="primary" style={{backgroundColor: '#4aedc4', color: '#0e4686', marginLeft: 10, marginTop: -10, width: 150, margin: '0 auto', marginBottom: 10}} type={"submit"} className="btn btn-success">
                                Add Participant
                            </Button>
                    </div>
                </form>
                <div style={{marginBottom: 2}}>
                    <Grid textOverflow="hidden">
                        <Grid item container direction="column" justifyContent="end" alignSelf="end" alignContent="end" alignItems="end" textAlign="center" style={{marginLeft: -5}}>
                            {participants && participants.map((p: any) => (
                                <>
                                        <Accordion
                                            onChange={handleChange}
                                            key={p.id}
                                            className={classes.content}
                                            style={{ width: '50%',  marginTop: 10, marginBottom: 10}}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel4bh-content"
                                                id="panel4bh-header"
                                            >
                                                <Typography sx={{ width: '300%' }}>{p.firstName}  {p.lastName}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Stack spacing={1} direction="row">
                                                <p>Date Of Birth:</p>
                                                <p style={{ marginTop: 16 }}>{moment(p.dateOfBirth).format('MMMM-DD-YYYY')}</p>
                                            </Stack>
                                            <Stack spacing={0.5} direction="row">
                                                <p>Belt Level:</p>
                                                <p style={{ marginTop: 16 }}>{p.beltLevel}</p>
                                            </Stack>
                                            <Button style={{float: 'left', color:"red", fontSize: 10}} 
                                                    onClick={() => deleteParticipant(p.id)}>
                                                Delete Participant
                                            </Button>
                                        </AccordionDetails>
                                    </Accordion>
                                </>
                            ))}
                        </Grid>
                    </Grid> 
                </div>
            </div>
        </div>
    );
}