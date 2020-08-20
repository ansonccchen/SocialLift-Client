import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/styles/withStyles"
import { deletePost } from '../../redux/actions/dataActions'
import { connect } from 'react-redux'

// MUI imports
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'


const styles = {
    deleteBtn: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
}

function DeleteButton(props) {
    const { classes } = props
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
      setOpen(true)
    }
    const handleClose = () => {
      setOpen(false)
    }
    const deletePost = () => {
        props.deletePost(props.postId)
        handleClose()
    }
  
    return (
        <Fragment>
            <Tooltip title="Delete Post">
                <IconButton onClick={handleClickOpen} className={classes.deleteBtn}>
                    <DeleteOutlineIcon color="secondary"/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={deletePost} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

DeleteButton.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

export default connect(null, { deletePost })(withStyles(styles)(DeleteButton))
