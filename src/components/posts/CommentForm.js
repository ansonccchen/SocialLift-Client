import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

// Redux stuff
import { connect } from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions'

const styles = theme => ({
    ...theme.spread,
    formPosition: {
        position: "relative",
        top: "-7.6%"
    }
})

function CommentForm(props) {
    const [commentData, setCommentData] = useState({
        body: '',
        errors: {}
    })
    useEffect(() => {
        if (props.UI.errors) {
            setCommentData(data => ({
                ...data,
                errors: props.UI.errors
            }))
        }
        if (!props.UI.errors && !props.UI.loading) {
            setCommentData({
                body: '',
                errors: {}
            })
        }
    }, [props])

    const handleChange = event => {
        setCommentData({
            ...commentData,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = event => {
        event.preventDefault()
        props.submitComment(props.postId, { body: commentData.body })
    }

    const { authenticated, classes } = props
    const displayCommentForm = authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }} >
            <form onSubmit={handleSubmit} className={classes.formPosition}>
                <TextField
                    multiline
                    rows="4"
                    variant="outlined"
                    error={commentData.errors.comment ? true : false}
                    helperText={commentData.errors.comment}
                    label="Write a comment..."
                    name="body"
                    type="text"
                    value={commentData.body}
                    onChange={handleChange}
                    className={classes.textField}
                    fullWidth
                    />
                <Button type="submit" color="primary" variant="contained" fullWidth>
                    Submit
                </Button>
            </form>
            <hr className={classes.visibleSeparator} />
        </Grid>) : null
    return displayCommentForm
}

CommentForm.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    submitComment: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    UI: state.UI
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm))

