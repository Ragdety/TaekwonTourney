import React, { useEffect, useState } from "react";
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

const BreakingTourneyJudgePage = () => {
    const { tournamentId }: any = useParams();
    const history = useHistory();
    const [participants, setParticipants] = useState([]);
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
                ParticipantService.getAll(tournamentId)
                    .then((res: any) => {
                        setParticipants(res.data);
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
    }, [participants])
    
    const handlePoints = (participantId: number) => {
        try {
            ParticipantService.get(tournamentId, participantId)
                .then((res: any) => {
                    const participant = res.data;
                    const match: IBreakingMatchesCreate = {
                        participantScore: points,
                        participantId: participantId
                    }
                    console.log('MATCH: ', match);
                    MatchesService.create(tournamentId, match)
                        .then((res: any) => {
                            console.log('MATCH API RESULT:', res.data);
                            setPoints(0);
                        })
                        .catch((error: any) => {
                            console.log('MATCH API ERROR', error);
                            const message = error.response.data.message;
                            alert(message);
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
            <button onClick={handleGoBack}>Go Back</button>
            <h1>Breaking Tournament Judge Page</h1>
            {participants.length > 0 ? participants.map((p: any) => (
                <>
                    <Grid item direction="column" xs={8}>
                        <Accordion
                            key={p.id}
                            className={classes.content}
                            style={{marginTop: 20, marginBottom: 20 }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography sx={{ flexShrink: 0, overflow: 'hidden' }}>{p.firstName}  {p.lastName}</Typography>
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
                                           onChange={(e: any) => setPoints(e.target.value)}/>
                                    <button onClick={() => handlePoints(p.id)}>Enter</button>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </>
            )): <div>No Participants Yet...</div>}
        </div>
    );
}

export default BreakingTourneyJudgePage;