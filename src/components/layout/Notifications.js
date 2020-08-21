import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { markNotificationsRead } from '../../redux/actions/userActions'
import { connect } from 'react-redux'

// MUI imports
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
// MUI Icon Imports
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

function Notifications(props) {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = event => {
        setAnchorEl(event.target)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const onNotifsOpen = () => {
        let unreadNotifIds = props.notifications
            .filter(notRead => !notRead.read)
            .map(notRead => notRead.notificationId)
        props.markNotificationsRead(unreadNotifIds)
    }

    const { notifications } = props
    dayjs.extend(relativeTime)
    let notificationButton = (notifications && notifications.length > 0) ? (
        notifications.filter(notRead => notRead.read === false).length > 0 ? (
            <Badge badgeContent={notifications.filter(notRead => notRead.read === false).length} color="secondary">
                <NotificationsIcon />
            </Badge>
        ) : (
            <NotificationsIcon />
        )
    ) : (
        <NotificationsIcon />
    )
    let notificationsMarkup = (notifications && notifications.length > 0) ? (
        notifications.map(notif => {
            const type = notif.type === "like" ? "liked" : "commented on"
            const time = dayjs(notif.createdAt).fromNow()
            const iconColor = notif.read ? 'secondary' : 'error'
            const iconType = notif.type === "like" ? <FavoriteIcon color={iconColor} style={{marginRight: 10}} /> : <ChatIcon color={iconColor} style={{marginRight: 10}}/>
            return (
                <MenuItem key={notif.createdAt} onClick={handleClose}>
                    {iconType}
                    <Typography 
                        color="primary" 
                        variant="body1" 
                        component={Link} 
                        to={`/user/${notif.recipient}/post/${notif.postId}`}
                    >
                        {notif.sender} {type} your post {time}
                    </Typography>
                </MenuItem>
            )
        })
    ) : (
        <MenuItem onClick={handleClose}>
            You have no notifications
        </MenuItem>
    )

    return (
        <Fragment>
            <Tooltip title="Notifications">
                <IconButton 
                    aria-owns={anchorEl ? 'simple-menu' : undefined} 
                    aria-haspopup="true" 
                    onClick={handleClick}
                >
                    {notificationButton}
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onEntered={onNotifsOpen}
            >
                {notificationsMarkup}
            </Menu>
        </Fragment>
    )
}

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired,
    markNotificationsRead: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications)
