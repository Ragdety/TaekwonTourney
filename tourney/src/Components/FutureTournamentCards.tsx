import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function FutureTournamentCards() {

  return (
      <Card sx={{ display: 'flex'}} style={{width: '70%', marginLeft: 20}} >
        <CardActionArea href="/Create">
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h6">
                  Tournament Held On Date
                </Typography>
              </CardContent>
          </Box>
        </CardActionArea>
      </Card>
  );
}