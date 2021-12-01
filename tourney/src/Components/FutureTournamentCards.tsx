import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from "moment";

export const FutureTournamentCards = ({tourney}: any) => {
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
              </CardContent>
          </Box>
      </Card>
  );
}