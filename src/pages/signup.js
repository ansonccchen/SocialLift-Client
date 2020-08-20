import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png' // Icon made by Freepik from www.flaticon.com
import { Link } from "react-router-dom"

// Redux imports
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'
// MUI imports
import withStyles from '@material-ui/core/styles/withStyles'
import { Grid } from '@material-ui/core'
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    ...theme.spread
})


function Signup(props) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
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
            password: credentials.password,
            confirmPassword: credentials.confirmPassword,
            handle: credentials.handle
        }
        props.signupUser(userData, props.history)
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
                <Typography variant="h4" className={classes.pageTitle}>Signup</Typography>
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
                    <TextField id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" className={classes.textField} 
                        helperText={errors.confirmPassword}
                        error = {errors.confirmPassword ? true : false}
                        value={credentials.confirmPassword} 
                        onChange={handleChange}
                        fullWidth/>
                    <TextField id="handle" name="handle" label="Handle" type="handle" className={classes.textField} 
                        helperText={errors.handle}
                        error = {errors.handle ? true : false}
                        value={credentials.handle} 
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
                        {loading ? (<CircularProgress size={27}/>) : "Signup"}
                    </Button>
                    <br/>
                    <small className={classes.toSignup}>Already have an account? Login <Link to="/login">here</Link></small>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})


export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup))
