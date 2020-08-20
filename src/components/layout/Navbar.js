import React, { Fragment } from 'react'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import PostButton from '../posts/PostButton'
// MUI imports
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from '@material-ui/core/ToolTip'
// MUI Icon imports
import NotificationsIcon from '@material-ui/icons/Notifications'
import HomeIcon from '@material-ui/icons/Home'
// Redux imports
import { connect } from 'react-redux'


function Navbar(props) {
    const { authenticated, handle } = props
    return (
        <Fragment>
            <AppBar>
                <Toolbar className="nav-container">
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
                            <Tooltip title="Notifications">
                                <Link to="/">
                                    <IconButton>
                                        <NotificationsIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>
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

export default connect(mapStateToProps)(Navbar)
