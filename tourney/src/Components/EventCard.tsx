import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';

export default function EventCards() {

  return (
    <Grid container textAlign="center" alignItems="center" justifyContent="center">
        <Card 
            sx={{ display: 'flex' }} style={{width: '40%'}}>
            <CardActionArea href="/EventCreationPage">
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h6">
                    Event: Name of Event
                  </Typography>
                </CardContent>
              </Box>
            </CardActionArea>
          </Card>
    </Grid>
  );
}