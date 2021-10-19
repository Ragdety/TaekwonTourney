import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import House from '../Images/house-163526.jpg';
import AboutUs from '../Images/imprint-418597.jpg';
import MeetTheTeam from '../Images/teamwork-3213924.jpg';
import { CardActionArea } from "@mui/material";

interface MyTheme {
    marginLeft: number;
    breakpoints: 'string';
}

export default function HomeCard() {
  const [click, setClick] = React.useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const useStyles = makeStyles((theme: MyTheme) => ({
    root: {
        marginLeft: 10,
        marginTop: 75,
      },
  }));
  const classes = useStyles();
  const [spacing] = React.useState(9);

  return (
    <>
      <Grid sx={{ flexGrow: 1 }} container spacing={12}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea href="/">
                  <CardHeader title="Home" />
                    <CardMedia
                        component="img"
                        height="194"
                        image={House}
                        alt="Home"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                          Click here to go to our home page.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
              </Card><br></br>
            </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea href="/About">
                <CardHeader title="About Us" />
                  <CardMedia
                        component="img"
                        height="194"
                        image={AboutUs}
                        alt="About Us"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Click here to go to learn about us.
                    </Typography>
                  </CardContent>
                </CardActionArea>
            </Card><br></br>
          </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea href="/Login">
                <CardHeader title="Meet The Team" />
                  <CardMedia
                      component="img"
                      height="194"
                      image={MeetTheTeam}
                      alt="Paella dish"
                    />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                      Click here to meet the team.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}