import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { MENU } from "constants/menu";
import { getStorage, removeStorage } from "utils/storage.helper";
import { USER_STORAGE } from "constants/storage";
import { Person, Settings, Dashboard, LocationOn, Assessment, Store, PhoneAndroid,ExitToApp } from '@material-ui/icons'
import { isEmpty } from "lodash";
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 170;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export default function ApplicationBar(props) {
  
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const renderMenuUser = () => {
    return (
      <>
        <List>
            <ListItem
              button
              onClick={() => handleNavigation('DASHBOARD')}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary='DASHBOARD' />
            </ListItem>
          </List>
          
          <List>
            <ListItem
              button
              onClick={() => handleNavigation('REPORT')}
            >
              <ListItemIcon>
                <Assessment />
              </ListItemIcon>
              <ListItemText primary='REPORT' />
            </ListItem>
          </List>
        </>
    )
  }
  const renderMenuAdmin = () => {
    return (
      <>
      <List>
            <ListItem
              button
              onClick={() => handleNavigation('DASHBOARD')}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary='DASHBOARD' />
            </ListItem>
          </List>
          
          <List>
            <ListItem
              button
              onClick={() => handleNavigation('REPORT')}
            >
              <ListItemIcon>
                <Assessment />
              </ListItemIcon>
              <ListItemText primary='REPORT' />
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              onClick={() => handleNavigation('USER')}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary='USER' />
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              onClick={() => handleNavigation('LOKASI')}
            >
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText primary={'LOKASI'} />
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              onClick={() => handleNavigation('OUTLET')}
            >
              <ListItemIcon>
                <Store />
              </ListItemIcon>
              <ListItemText primary={'OUTLET'} />
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              onClick={() => handleNavigation('DEVICES')}
            >
              <ListItemIcon>
                <PhoneAndroid />
              </ListItemIcon>
              <ListItemText primary={'DEVICES'} />
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              onClick={() => handleNavigation('SETTING')}
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary='SETTING' />
            </ListItem>
          </List>
          </>
    )
  }
  const handleNavigation = (key) => {
    switch (key) {
      case `DASHBOARD`:
        props.navigateTo(MENU.DASHBOARD);
        break;
      case `USER`:
        props.navigateTo(MENU.USER);
        break;
      case `LOKASI`:
        props.navigateTo(MENU.LOKASI);
        break;
      case `OUTLET`:
        props.navigateTo(MENU.OUTLET);
        break;
      case `DEVICES`:
        props.navigateTo(MENU.DEVICES);
        break;
      case `SETTING`:
        props.navigateTo(MENU.SETTING);
        break;
      case `REPORT`:
        props.navigateTo(MENU.REPORT);
        break;
      case 'EXIT':
        console.log('Aku dipanggil')
        removeStorage(USER_STORAGE);
        props.logout()
        props.navigateTo(MENU.LOGIN); 
        break;
      default:
        break;
    }
  };
  let appBar = null;
  if (!isEmpty(props.user)) {
    getStorage(USER_STORAGE)
    
    appBar = (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color="primary"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" noWrap>
              {`Hallo ${props.user.userName}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                  <ChevronLeftIcon />
                )}
            </IconButton>
          </div>
          <Divider />
          
          {props.user.role === 'U' ? renderMenuUser() : renderMenuAdmin()}
          
          <List>
            <ListItem
              button
              onClick={() => handleNavigation('EXIT')}
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary='LOG OUT' />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
  return appBar;
}
