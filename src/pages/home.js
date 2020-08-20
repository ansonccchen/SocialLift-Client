import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'


import Post from '../components/posts/Post'
import Profile from '../components/profile/Profile'

import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/dataActions'


function Home(props) {
    const { posts, loading } = props.data
    useEffect(() => {
        props.getPosts()
    }, [])
    let recentPostsMarkup = loading ? (<p>Loading...</p>) : (
        posts.map(post => <Post key={post.postId} post={post}/>)
    )

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {recentPostsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    )
}
Home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getPosts })(Home)
