import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { MENU } from "constants/menu";
import { getStorage } from "utils/storage.helper";
import { isNull } from "lodash";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Project Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = Yup.object().shape({
  userName: Yup.string(),
  password: Yup.string()
});
export default function Login(props) {
  
  const _handleSubmit = (value) => {    
    props.login(value);
  }; 
  useEffect(() => {
    const {isLoading,token,navigateTo} = props
    console.log('render change props',props)
    console.log('render change props',!isNull(token))
    if(token !== null){
      console.log('AKU JALAN TOT')
      navigateTo(MENU.DASHBOARD)
    }
  
  })
  const classes = useStyles();
  console.log('LOGIN PROPS',props)
  return (
    <Grid container component="main" className={classes.root}>
    
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            // onSubmit={handlingSubmit}
          >
            {(props) => (
              <form className={classes.form} noValidate>
                <TextField
                  onChange={props.handleChange('username')}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                />
                <TextField
                  onChange={props.handleChange('password')}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => _handleSubmit(props.values)}
                >
                  Sign In
                </Button>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}
Login.prototype = {
  isLoading:PropTypes.bool,
  token:PropTypes.string
};
Login.defaultProps = {
  token:null,
  isLoading:false
}