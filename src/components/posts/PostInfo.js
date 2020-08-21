import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { getPost, clearErrors } from '../../redux/actions/dataActions'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

// MUI imports
import withStyles from "@material-ui/styles/withStyles"
import DescriptionIcon from '@material-ui/icons/Description'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'


const styles = theme => ({
    ...theme.spread,
    profileImage: {
      maxWidth: 200,
      height: 200,
      borderRadius: '50%',
      objectFit: 'cover'
    },
    dialogContent: {
      padding: 20
    },
    closeButton: {
      position: 'absolute',
      left: '90%'
    },
    expandButton: {
      position: 'absolute',
      left: '90%'
    },
    spinnerDiv: {
      textAlign: 'center',
      marginTop: 50,
      marginBottom: 50
    }
})


function PostInfo(props) {
    const [open, setOpen] = useState(false)
    const [paths, setPaths] = useState({
        oldPath: '',
        newPath: '',
    })
    useEffect(() => {
        if (props.openDialog) handleClickOpen()
    }, [])
    const handleClickOpen = () => {
        let oldPath = window.location.pathname
        const newPath = `/user/${props.userHandle}/post/${props.postId}`
        if (oldPath === newPath) oldPath = `/user/${props.userHandle}`
        window.history.pushState(null, null, newPath)
        setPaths({ oldPath, newPath })
        setOpen(true)
        props.getPost(props.postId)
    }
    const handleClose = () => {
        window.history.pushState(null, null, paths.oldPath)
        setOpen(false);
        props.clearErrors()
    }
    const {
        classes,
        UI: {loading}, 
        post: {
            postId,
            body, 
            createdAt,
            likes,
            comments,
            commentList,
            userImage,
            userHandle,
        } 
    } = props

    const infoMarkup = loading ? (
        <div className={classes.spinnerDiv}>
            <CircularProgress size={110} thickness={2}/>
        </div>
    ) : (
        <Grid container spacing={2}>
            <Grid item sm={5}>
                <img src={userImage} alt="Profile" className={classes.profileImage} />
            </Grid>
            <Grid item sm={7}>
                <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>
                    {`@${userHandle}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body1">{body}</Typography>
                <LikeButton postId={postId} /> 
                <span>{likes} Likes</span>
                <CommentButton />
                <span>{comments} Comments</span>
            </Grid>
            <hr className={classes.visibleSeparator} />
            <CommentForm postId={postId} />
            <CommentList commentList={commentList} />
        </Grid>
    )
    return (
        <Fragment>
            <Tooltip title="Expand">
                <IconButton onClick={handleClickOpen} className={classes.expandButton}>
                    <DescriptionIcon color="primary"/>
                </IconButton>
            </Tooltip>
            <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
                <Tooltip title="Close">
                    <IconButton onClick={handleClose} className={classes.closeButton}>
                        <CloseIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <DialogContent className={classes.dialogContent}>
                    {infoMarkup}
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

PostInfo.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  }

const mapStateToProps = state => ({
    post: state.data.post,
    UI: state.UI
})

const mapActionsToProps = {
    getPost,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostInfo))
