import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png' // Icon made by Freepik from www.flaticon.com
import { Link } from "react-router-dom"

// Redux
import { connect } from 'react-redux'
import { loginUser } from "../redux/actions/userActions"
// MUI Imports
import withStyles from '@material-ui/core/styles/withStyles'
import { Grid } from '@material-ui/core'
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from '@material-ui/core/CircularProgress'


const styles = theme => ({
    ...theme.spread
})

function Login(props) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        errors: {}
    })
    useEffect(() => {
        if (props.UI.errors) {
            setCredentials(c => ({
                ...c,
                errors: props.UI.errors
            }))
        }
    }, [props.UI.errors])
    const handleSubmit = event => {
        event.preventDefault()
        const userData = {
            email: credentials.email,
            password: credentials.password
        }
        props.loginUser(userData, props.history)
    }
    const handleChange = event => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }
    const  { classes, UI: { loading } } = props
    const { errors } = credentials
    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img src={AppIcon} alt="dumbbell" className ={classes.image}/>
                <Typography variant="h4" className={classes.pageTitle}>Login</Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField id="email" name="email" label="Email" type="email" className={classes.textField}
                        helperText={errors.email}
                        error = {errors.email ? true : false}
                        value={credentials.email} 
                        onChange={handleChange}
                        fullWidth/>
                    <TextField id="password" name="password" label="Password" type="password" className={classes.textField} 
                        helperText={errors.password}
                        error = {errors.password ? true : false}
                        value={credentials.password} 
                        onChange={handleChange}
                        fullWidth/>
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                    )}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        disabled={loading} 
                        className={classes.button}>
                        {loading ? (<CircularProgress size={27}/>) : "Login"}
                    </Button>
                    <br/>
                    <small className={classes.toSignup}>Don't have an account? Sign up <Link to="/signup">here</Link></small>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login))
