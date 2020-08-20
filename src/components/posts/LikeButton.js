import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// MUI imports
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../redux/actions/dataActions'

function LikeButton(props) {

    const { authenticated } = props.user

    const likedPost = () => {
        return (props.user.likes && props.user.likes.find(like => like.postId === props.postId))
    }

    const likePost = () => {
        props.likePost(props.postId)
    }
    const unlikePost = () => {
        props.unlikePost(props.postId)
    }

    const displayLikes = authenticated ? (
        <Fragment>
            {likedPost() ? (
            <Fragment>
                <Tooltip title="Unlike">
                    <IconButton onClick={unlikePost}>
                        <FavoriteIcon color="primary"/>
                    </IconButton>
                </Tooltip>
            </Fragment>) : (
            <Fragment>
                <Tooltip title="Like">
                    <IconButton onClick={likePost}>
                        <FavoriteBorderIcon color="primary"/>
                    </IconButton>
                </Tooltip>
            </Fragment>)}
        </Fragment>) : (
        <Fragment>
            <Tooltip title="Login to Like">
                <IconButton>
                    <FavoriteBorderIcon color="primary"/>
                </IconButton>
            </Tooltip>
        </Fragment>)

    return displayLikes
}
LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    user: state.user
})
const mapActionsToProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
