import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import ParticipantService from "../Services/participantService";
import RankingsService from "../Services/rankingsService";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Card, IconButton, Stack} from "@mui/material";
import * as signalR from "@microsoft/signalr";
import MatchesService from "../Services/matchesService";
import {HubConnection} from "@microsoft/signalr";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BreakingRankings = () => {
    const history = useHistory();
    const { tournamentId }: any = useParams();
    const [rankings, setRankings] = useState([]);
    const [matches, setMatches] = useState([]);
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [redirectHome, setRedirectHome] = useState(false);
    const [error, setError] = useState(false);
    
    const loadMatches = (tournamentId: number) => {
        MatchesService.getAll(tournamentId)
            .then((res: any) => {
                setMatches(res.data);
                setError(false);
            })
            .catch((err: any) => {
                console.log(err);
                alert('An error occured updating rankings');
                setError(true);
            });
    }

    useEffect(() => {
        const connection =
            new signalR.HubConnectionBuilder()
                .withUrl("https://localhost:5001/matchesHub", {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
                .withAutomaticReconnect()
                .build();

        setConnection(connection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then((result: any) => {
                    console.log('Connected!');
                    loadMatches(tournamentId);
                    connection.on("RefreshMatch",  (match) => {
                        loadMatches(tournamentId);
                    });
                })
                .catch((e: any) => console.log('Connection failed: ', e));
        }
    }, [connection]);
    
    const goBack = () => {
        history.push('/Dashboard');
    }
    
    return (
      <div>
            <Stack spacing = {1} direction = "row">
                <IconButton aria-label = "Go-Back" onClick={goBack} style={{float: 'left', fontSize: 20}}>
                    <ArrowBackIcon style={{float: 'left', height: 50, width: 50}}/>
                </IconButton>
                <Typography variant= "h5" style={{float: 'left', marginTop: 18}}>
                    Go Back
                </Typography>
            </Stack>
            <Grid>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                    <Card style={{marginLeft: 20, marginTop: 10, width: '50%', textAlign: 'center'}}>
                        <CardHeader
                            title="Live Rankings"
                            style={{textAlign: 'center'}}
                        />
                        <CardContent>
                            {matches.length > 0 ? matches.map((m: any) => (
                                <Typography style={{marginBottom: 10, fontSize: 20}}>
                                    {m.participantFirstName} {m.participantLastName} - Broken: {m.participantScore}
                                </Typography>
                            )): <div>No rankings yet...</div>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
          {error && <p style={{color: "red"}}>An error occurred...</p>}
      </div>  
    );
}

export default BreakingRankings;