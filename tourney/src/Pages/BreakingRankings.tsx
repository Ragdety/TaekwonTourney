import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import ParticipantService from "../Services/participantService";
import RankingsService from "../Services/rankingsService";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Card} from "@mui/material";
import * as signalR from "@microsoft/signalr";
import MatchesService from "../Services/matchesService";
import {HubConnection} from "@microsoft/signalr";

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

    // useEffect(() => {
    //     const fetchRankings = async () => {
    //         try {
    //             RankingsService.getAll(tournamentId)
    //                 .then((res: any) => {
    //                     console.log(res.data.breakingMatches);  
    //                     setRankings(res.data.breakingMatches);
    //                 })
    //                 .catch((error: any) => {
    //                     console.log(error);
    //                 });
    //         } catch (e) {
    //             console.log('AUTH ERROR: ', e);
    //             setError(true);
    //             // alert("You've been logged out, you will be redirected to home page");
    //             // setError(true);
    //             // setRedirectHome(true);
    //         }
    //     }
    //     fetchRankings();
    // }, [rankings]);
    
    const goBack = () => {
        history.push('/Dashboard');
    }
    
    return (
      <div>
          <button onClick={goBack}>Go Back</button>
          <Card style={{marginLeft: 20, marginTop: 10}}>
              <CardHeader
                  title="Live (not yet) Rankings"
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
          {error && <p style={{color: "red"}}>An error occurred...</p>}
      </div>  
    );
}

export default BreakingRankings;