import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import title from '../assets/thankloop-title.svg'

const useStyles = makeStyles((theme) => ({
  root: {
  
    flexGrow: 1,
  },
  
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#dfe6e9"
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed"  style={{ background: '#70a1ff', boxShadow: 'none'}}>
            <Toolbar>
            <img src={title} alt="logo" className={classes.logo} />
          <IconButton edge="start" className={classes.menuButton} color="#dfe6e9" aria-label="menu">
          
          </IconButton>
          <Typography variant="h6" className={classes.title}>
         
          </Typography>
          <Button color="inherit">Submit someone</Button>
          <Button color="inherit">Benefits of thanking</Button>
     
        </Toolbar>
      </AppBar>
    </div>
  );
}