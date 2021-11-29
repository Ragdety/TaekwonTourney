import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import ParticipantService from "../Services/participantService";
import RankingsService from "../Services/rankingsService";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Card} from "@mui/material";

const BreakingRankings = () => {
    const history = useHistory();
    const { tournamentId }: any = useParams();
    const [rankings, setRankings] = useState([]);
    const [redirectHome, setRedirectHome] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                RankingsService.getAll(tournamentId)
                    .then((res: any) => {
                        console.log(res.data.breakingMatches);
                        setRankings(res.data.breakingMatches);
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            } catch (e) {
                console.log('AUTH ERROR: ', e);
                setError(true);
                // alert("You've been logged out, you will be redirected to home page");
                // setError(true);
                // setRedirectHome(true);
            }
        }
        fetchRankings();
    }, [rankings]);
    
    return (
      <div>
          <Card style={{marginLeft: 20, marginTop: 10}}>
              <CardHeader
                  title="Live (not yet) Rankings"
                  style={{textAlign: 'center'}}
              />
              <CardContent>
                  {rankings && rankings.map((r: any) => (
                      <Typography style={{marginBottom: 10, fontSize: 20}}>
                          {r.participantFirstName} {r.participantLastName} - Broken: {r.participantScore}
                      </Typography>
                  ))}
              </CardContent>
          </Card>
          {error && <p style={{color: "red"}}>An error occurred...</p>}
      </div>  
    );
}

export default BreakingRankings;