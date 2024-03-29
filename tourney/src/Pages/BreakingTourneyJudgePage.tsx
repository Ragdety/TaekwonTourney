﻿import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import ParticipantService from "../Services/participantService";
import MatchesService from "../Services/matchesService";
import {Redirect} from "react-router";
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import moment from 'moment';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from '@mui/material/Grid';
import {IBreakingMatchesCreate} from "../Models/creationModels";
import {IBreakingMatchesUpdate} from "../Models/updateModels";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Cookies from 'js-cookie';

const BreakingTourneyJudgePage = () => {
    const { tournamentId }: any = useParams();
    const history = useHistory();
    const [participants, setParticipants] = useState([]);
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);
    const [points, setPoints] = useState(0);

    const useStyles = makeStyles((theme) => ({
        content: {
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
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

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                ParticipantService.getAll(tournamentId, Cookies.get('jwt'))
                    .then((res: any) => {
                        const orderedParticipantsById =
                            [].concat(res.data)
                                .sort((a: any, b: any) => a.id < b.id ? 1 : -1);
                        setParticipants(orderedParticipantsById);
                    })
                    .catch((error: any) => {
                        console.log(error);
                    })
            } catch (e) {
                console.log('AUTH ERROR: ', e);
                alert("You've been logged out, you will be redirected to home page");
                setError(true);
                setRedirectHome(true);
            }
        }
        fetchParticipants();
    }, [participants]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                MatchesService.getAll(tournamentId)
                    .then((res: any) => {
                        const orderedMatchesByParticipant = 
                            [].concat(res.data)
                                .sort((a: any, b: any) => a.participantId < b.participantId ? 1 : -1);
                        setMatches(orderedMatchesByParticipant);
                    })
                    .catch((error: any) => {
                        console.log(error);
                        setError(true);
                    })
            } catch (e) {
                console.log('AUTH ERROR: ', e);
                alert("You've been logged out, you will be redirected to home page");
                setError(true);
                setRedirectHome(true);
            }
        }
        fetchMatches();
    }, [matches]);
    
    const handlePoints = (participantId: number) => {
        try {
            //Will need to redesign this strategy for other types of tournaments
            
            ParticipantService.get(tournamentId, participantId, Cookies.get('jwt'))
                .then((res: any) => {
                    const match: IBreakingMatchesCreate = {
                        participantScore: points,
                        participantId: participantId
                    }
                    const updatedMatch: IBreakingMatchesUpdate = {
                        participantScore: points
                    }
                    console.log('MATCH: ', match);
                    MatchesService.create(tournamentId, match, Cookies.get('jwt'))
                        .then((res: any) => {
                            console.log('MATCH API RESULT:', res.data);
                            setPoints(0);
                        })
                        .catch((error: any) => {
                            console.log('MATCH API ERROR', error);
                            const message = error.response.data.message;
                            let update = window.confirm(message + '. Do you want to update their points?');
                            if(update) {
                                const match: any = matches.find((m: any) => m.participantId == participantId);
                                MatchesService.update(tournamentId, match.id, updatedMatch, Cookies.get('jwt'))
                                    .then((res: any) => {
                                        
                                    })
                                    .catch((error: any) => {
                                        console.log(error);
                                        setError(true);
                                    });
                            }
                            else {
                                setPoints(0);
                            }
                            setPoints(0);
                        });
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }
        catch (e) {
            console.log('AUTH ERROR: ', e);
            alert("You've been logged out, you will be redirected to home page");
            setError(true);
            setRedirectHome(true);
        }
    }
    
    const handleGoBack = () => {
        history.push('/Dashboard');
    }

    if(redirectHome) {
        return <Redirect to='/'/>;
    }
    
    return(
        <div>
            <Stack spacing = {1} direction = "row">
                <IconButton aria-label = "Go-Back" onClick={handleGoBack} style={{float: 'left', fontSize: 20}}>
                    <ArrowBackIcon style={{float: 'left', height: 50, width: 50}}/>
                </IconButton>
                <Typography variant= "h5" style={{float: 'left', marginTop: 18}}>
                    Go Back
                </Typography>
            </Stack>
            <h1>Breaking Tournament Judge Page</h1>
            {participants.length > 0 ? participants.map((p: any) => (
                <>
                    <Grid textOverflow="hidden">
                        <Grid item direction="column" alignItems="center" justifyContent="center" alignSelf="center" alignContent="center" xs={12}>
                            <Accordion
                                key={p.id}
                                className={classes.content}
                                style={{marginTop: 20, marginBottom: 20, width: '50%', marginLeft: 10 }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4bh-content"
                                    id="panel4bh-header"
                                >
                                    <Typography sx={{ overflow: 'hidden' }}>{p.firstName}  {p.lastName} {p.id}</Typography>
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
                                    <Stack spacing={0.5} direction="row">
                                        <p>Enter points:</p> 
                                        <input type={"number"} 
                                            onChange={(e: any) => setPoints(e.target.value)}
                                            style={{width: '50%', height: 20, marginTop: 15}}/>
                                    </Stack>
                                    <Button color="primary" style={{backgroundColor: '#4aedc4', color: '#0e4686', width: 100, textAlign: 'center', marginTop: 10}} onClick={() => handlePoints(p.id)} className="btn btn-success">
                                        Enter
                                    </Button>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </>
            )): <div>No Participants Yet...</div>}
        </div>
    );
}

export default BreakingTourneyJudgePage;