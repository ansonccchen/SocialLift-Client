import React, { Fragment, useState, useEffect } from 'react'
import { createPost, clearErrors } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import withStyles from '@material-ui/styles/withStyles'

// MUI imports
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'



const styles = theme => ({
    ...theme.spread,
    postBtn: {
        position: "relative",
        left: '77.6%',
        marginTop: '17px'
    },
    cancelBtn: {
        position: "relative",
        left: "76%",
        marginTop: '17px'

    }

})

function PostButton(props) {
    const { classes, UI: { loading } } = props
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        body: '',
        errors: {}
    })

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        props.clearErrors()
        setData({
            ...data,
            errors: {}
        })
        setOpen(false);
    }
    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = event => {
        event.preventDefault()
        props.createPost({ body: data.body })
    }
    
    useEffect(() => {
        if (props.UI.errors) {
            setData(d => ({
                ...d,
                errors: props.UI.errors
            }))
        }
        if (!props.UI.loading && !props.UI.errors) {
            setData(d => ({
                ...d,
                body: '',
                errors: {}
            }))
            setOpen(false)
        }
    }, [props])

    return (
        <Fragment>
            <Tooltip title="Create">
                <IconButton onClick={handleClickOpen}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Create Post</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            multiline
                            rows="5"
                            label={`What's on your mind, ${props.displayName}?`}
                            type="text"
                            name="body"
                            error={data.errors.body ? true : false}
                            helperText={data.errors.body}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button onClick={handleClose} className={classes.cancelBtn} color="primary">Cancel</Button>
                        <Button onClick={handleSubmit} className={classes.postBtn} type="submit" disabled={loading} color="primary"> 
                            {loading ? (<CircularProgress size={27}/>) : "Post"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
PostButton.propTypes = {
    createPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI
})

export default connect(mapStateToProps, { createPost, clearErrors })(withStyles(styles)(PostButton))
