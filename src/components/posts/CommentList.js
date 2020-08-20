import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
    ...theme.spread,
    commentImage: {
      maxWidth: '100%',
      height: 100,
      objectFit: 'cover',
      borderRadius: '50%'
    },
    commentData: {
      marginLeft: 20
    }
})

function CommentList(props) {
    const { classes, commentList } = props

    return (
        <Grid container>
            {commentList && commentList.map((comment, index) => {
                const { body, createdAt, userImage, userHandle } = comment
                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={userImage} alt="Profile" className={classes.commentImage}/>
                                </Grid>
                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>
                                            {userHandle}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator} />
                                        <Typography variant="body1">{body}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {index !== commentList.length - 1 && (<hr className={classes.visibleSeparator} />)}
                    </Fragment>
                )
            })}
        </Grid>
    )
}

CommentList.propTypes = {
    commentList: PropTypes.array.isRequired
}


export default withStyles(styles)(CommentList)
