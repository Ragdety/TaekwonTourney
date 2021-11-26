import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

interface MyTheme {
  background: string;
  boxShadow: string;
}

export default function NavBar() {

  const useStyles = makeStyles((theme: MyTheme) => ({
    tr: {
      marignLeft: -20,
    },
    mobile: {
      marginTop: 30, marginLeft: 10, maxWidth: 130,
    }
  }));

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  /*
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  */

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      className={classes.mobile}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem style={{marginLeft: -20}}>
          <IconButton size="large" aria-label="Home" color="inherit">
              <HomeIcon />
          </IconButton>
          <p>Home</p>
      </MenuItem>
      <MenuItem style={{marginLeft: -20}}>
          <IconButton
            size="large"
            aria-label="About"
            color="inherit"
          >
              <InfoIcon />
          </IconButton>
          <p>About</p>
      </MenuItem>
      <MenuItem style={{marginLeft: -20}} /*onClick= *handleProfileMenuOpen*/>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
              <AccountCircle />
          </IconButton>
          <p>Login</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{textDecoration:'none', color:'white'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              TaekwonTourney
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Link to="/" style={{textDecoration:'none', color:'white'}}>
            <Button size="large" aria-label="Home Page" style={{marginRight: '50px'}} color="inherit">
                  Home
            </Button>
          </Link>
          <Link to="/Dashboard" style={{textDecoration:'none', color:'white'}}>
              <Button size="large" aria-label="Home Page" style={{marginRight: '50px'}} color="inherit">
                  Dashboard
              </Button>
          </Link>
          <Link to="/About" style={{textDecoration:'none', color:'white'}}>
              <Button
                size="large"
                aria-label="show 17 new notifications"
                style={{marginRight: '50px'}}
                color="inherit"
              >
                  About
              </Button>
          </Link>
          <Link to="/Login" style={{textDecoration:'none', color:'white'}}>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                /*onClick= *handleProfileMenuOpen*/
                style={{marginRight: '50px'}}
                color="inherit"
              >
                  Login
              </Button>
          </Link>
          <Link to="/Register" style={{textDecoration:'none', color:'white'}}>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                /*onClick= *handleProfileMenuOpen*/
                color="inherit"
              >
                  Register
              </Button>
          </Link>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

