import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from "moment";
import Button from "@mui/material/Button";

export const PastTournamentCards = ({tourney}: any) => {
    return (
        <Card style={{width: '50%', marginLeft: 20, marginBottom: 20}} >
            <Box>
                <CardContent>
                    <Typography component="div" variant="h5">
                        {tourney.tournamentName}
                    </Typography>
                    <Typography component="div">
                        {tourney.tournamentType}
                    </Typography>
                    <Typography component="div">
                        Start Date: {moment(tourney.startDate).format('MMMM/DD/YYYY')}
                    </Typography>
                    <Typography component="div">
                        End Date: {moment(tourney.endDate).format('MMMM/DD/YYYY')}
                    </Typography>
                    {/*<Button color="primary" onClick={() => editTourney(tourney.id)}>*/}
                    {/*    Edit*/}
                    {/*</Button>*/}
                    {/*<Button color="primary" onClick={() => deleteTourney(tourney.id)}>*/}
                    {/*    Delete*/}
                    {/*</Button>*/}
                </CardContent>
            </Box>
        </Card>
    );
}