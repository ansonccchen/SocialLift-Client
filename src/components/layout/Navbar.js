import React, { Fragment } from 'react'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import PostButton from '../posts/PostButton'
import Notifications from "./Notifications"
import AppIcon from '../../images/navIcon.png' // Icon made by Freepik from www.flaticon.com
import { connect } from 'react-redux'

// MUI imports
import withStyles from '@material-ui/styles/withStyles'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from '@material-ui/core/ToolTip'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'

const styles = {
    linkIcon: {
        position: "relative",
        right: "75%"
    },
    brandText: {
        color: "#fff",
        fontSize: "32px",
        fontWeight: "200"
    },
    linkText: {
        position: "relative",
        right: "73%",
    },

}

function Navbar(props) {
    const { authenticated, handle, classes } = props
    return (
        <Fragment>
            <AppBar>
                <Toolbar className="nav-container">
                    {/* <Link to="/" className={classes.linkIcon} >
                        <img src={AppIcon} alt="SocialLift" />
                    </Link>
                    <Link to="/" >
                        <Typography variant="h6" align="left"className={classes.brandText}>SocialLift</Typography>
                    </Link> */}
                    {authenticated ? (
                        <Fragment>
                            <PostButton displayName={handle} />
                            <Tooltip title="Home">
                                <Link to="/">
                                    <IconButton>
                                        <HomeIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                            <Notifications />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/signup">Signup</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
}
const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    handle: state.user.credentials.handle
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar))
