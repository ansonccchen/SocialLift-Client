import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Post from '../components/posts/Post'
import StaticProfile from '../components/profile/StaticProfile'
import { getUserData } from '../redux/actions/dataActions'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'


function User(props) {
    const [userData, setUserData] = useState({
        profile: null,
        postIdParam: null
    })
    useEffect(() => {
        const handle = props.match.params.handle
        const postId = props.match.params.postId
        if (postId) setUserData(d => ({ ...d, postIdParam: postId }))
        props.getUserData(handle)
        axios.get(`/user/${handle}`)
            .then(res => {
                setUserData(d => ({
                    ...d,
                    profile: res.data.user
                }))
            })
            .catch(err => console.log(err))
    }, [])
    const { posts, loading } = props.data
    let PostsMarkup = loading ? (
        <p>Loading...</p>
    ) : posts.length === 0 || posts === null ? (
        <p>This user has no posts</p>
    ) : userData.postIdParam ? (
        posts.map(post => {
            if (post.postId !== userData.postIdParam) return <Post key={post.postId} post={post}/>
            else return <Post key={post.postId} post={post} openDialog={true} />
        })
    ) : (
        posts.map(post => <Post key={post.postId} post={post} />)
    )

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {PostsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                { userData.profile === null ? (<p>Loading...</p>) : (<StaticProfile profile={userData.profile} />) }
            </Grid>
        </Grid>
    )
}

User.propTypes = {
    data: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getUserData })(User)

