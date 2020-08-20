import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// MUI imports
import ChatIcon from '@material-ui/icons/Chat'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import { connect } from 'react-redux'

function CommentButton(props) {
    const { authenticated } = props.user
    const displayComments = authenticated ? (
        <Fragment>
            <Tooltip title="Comment">
                <IconButton>
                    <ChatIcon color="primary"/>
                </IconButton>
            </Tooltip>
        </Fragment>) : (
        <Fragment>
            <Tooltip title="Login to Comment">
                <IconButton>
                    <ChatIcon color="primary"/>
                </IconButton>
            </Tooltip>
        </Fragment>)

    return displayComments
}

CommentButton.propTypes = {
    user: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(CommentButton)
