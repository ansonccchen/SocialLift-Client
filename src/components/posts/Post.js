import React from 'react'
import withStyles from "@material-ui/styles/withStyles"
import { Link } from "react-router-dom"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import DeleteButton from './DeleteButton'
import PostInfo from './PostInfo'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'

// MUI imports
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../redux/actions/dataActions'

const styles = theme => ({
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }

})

function Post(props) {
    const { 
        classes, 
        post : { body, createdAt, userImage, userHandle, postId, likes, comments },
        user: { authenticated, credentials: { handle } } 
    } = props

    const displayDeleteButton = authenticated && userHandle === handle ? (
        <DeleteButton postId={postId} />
    ) : null
    dayjs.extend(relativeTime)
    return (
        <Card className={classes.card}>
            <CardMedia image={userImage} title="Profile Image" className={classes.image}/>
            <CardContent className={classes.content}>
                <Typography 
                    variant="h5" 
                    component={Link} 
                    to={`/user/${userHandle}`} 
                    color="primary">
                    {userHandle}
                </Typography>
                {displayDeleteButton}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
                <LikeButton postId={postId} />
                <span>{likes} Likes</span>
                <CommentButton />
                <span>{comments} Comments</span>
                <PostInfo postId={postId} userHandle={userHandle} openDialog={props.openDialog} />
            </CardContent>
        </Card>
    )
}

Post.propTypes = {
    user: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})
const mapActionsToProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post))
