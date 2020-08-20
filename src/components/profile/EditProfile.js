import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
// Redux imports
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'
// MUI imports
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/ToolTip'
import IconButton from '@material-ui/core/IconButton'
// MUI Icon imports
import EditIcon from '@material-ui/icons/Edit'

const styles = theme => ({
    ...theme.spread,
    editbtn: {
        position: 'absolute',
        top: '80%',
        left: '70%'
    },
})

function EditProfile(props) {

    const { classes, credentials, editUserDetails } = props
    const [open, setOpen] = useState(false)
    const [profileData, setProfileData] = useState({
        bio: '',
        location: '',
        website: '',
    })

    const handleClickOpen = () => {
        mapDetailsToState(credentials)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSubmit = () => {
        const profileDetails = {
            bio: profileData.bio,
            location: profileData.location,
            website: profileData.website
        }
        editUserDetails(profileDetails)
        handleClose()
    }
    const handleChange = event => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
        })
    }

    const mapDetailsToState = profileDetails => {
        setProfileData({
            bio: profileDetails.bio ? profileDetails.bio : '',
            location: profileDetails.location ? profileDetails.location : '',
            website: profileDetails.website ? profileDetails.website : ''
        })
    }

    return (
        <Fragment>
            <Tooltip title="Edit" placement="top">
                <IconButton onClick={handleClickOpen} className={classes.editbtn}>
                    <EditIcon color="primary" />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Details</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Bio"
                        type="text"
                        name="bio"
                        multiline
                        rows="3"
                        variant="outlined"
                        className={classes.textField}
                        value={profileData.bio}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Location"
                        type="text"
                        name="location"
                        className={classes.textField}
                        value={profileData.location}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Website"
                        type="text"
                        name="website"
                        className={classes.textField}
                        value={profileData.website}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

EditProfile.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditProfile))