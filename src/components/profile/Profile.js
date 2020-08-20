import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { uploadImage, logoutUser } from '../../redux/actions/userActions'
import EditProfile from './EditProfile'
import { connect } from 'react-redux'

// MUI imports
import withStyles from "@material-ui/styles/withStyles"
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MUILink from '@material-ui/core/Link' 
import Typography from '@material-ui/core/Typography'
// MUI icon imports
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
    paper: { padding: 20 },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& .logout-button': {
                position: 'absolute',
                top: '-2.3%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
        },
        '& .pic-align': {
            textAlign: 'center'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': { 
                color: theme.palette.primary.main 
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        },
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
})
const Profile = (props) => {
    const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, authenticated, loading } } = props
    const handleImageChange = event => {
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        props.uploadImage(formData)
    }
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }
    const handleLogout = () => {
        props.logoutUser()
    }

    let profileMarkup = !loading ? ( authenticated ? (
        <Paper className={classes.paper}>
        <div className={classes.profile}>
            <div className="image-wrapper">
                <Tooltip title="Change" placement="top">
                    <IconButton onClick={handleEditPicture} >
                        <img src={imageUrl} alt="profile" className="profile-image" />
                        <input type="file" id="imageInput" hidden="hidden" accept="image/x-png, image/jpeg" onChange={handleImageChange} />
                    </IconButton>
                </Tooltip>
                <EditProfile />
                <Tooltip title="Logout" placement="top">
                    <IconButton onClick={handleLogout} className="logout-button">
                        <ExitToAppIcon color="primary"/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className="profile-details">
                <MUILink component={Link} to={`/user/${handle}`}>
                    {handle}
                </MUILink>
                <hr/>
                {bio && <Typography variant="body2">{bio}</Typography>}
                <hr/>
                {location && (                        
                    <Fragment>
                        <LocationOn color="primary" />
                        <span>{location}</span>
                        <hr/>
                    </Fragment>
                )}
                {website && (
                    <Fragment>
                        <LinkIcon color="primary"/>
                        <a href={website} target="_blank" rel="noopener noreferrer">{' '}{website}</a>
                        <hr/>
                    </Fragment>
                )}
                <CalendarToday color="primary"/>{' '}
                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </div>
        </div>
    </Paper>
    ) : ( <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
            No profile found, please login
        </Typography>
        <div className={classes.buttons}>
            <Button variant="contained" color="primary" component={Link} to="/login">
                Login
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/signup">
                Signup
            </Button>
        </div>
    </Paper>
    )) : (<p>Loading...</p>)
    return profileMarkup
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = { uploadImage, logoutUser }

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))