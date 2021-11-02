import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function FutureTournamentCards() {

  return (
    <Card sx={{ display: 'flex'}} style={{width: 'auto', marginLeft: 20}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            Tournament Held On Date
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}