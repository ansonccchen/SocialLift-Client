import {SET_POSTS, SET_POST, LIKE_POST, UNLIKE_POST, DELETE_POST, CREATE_POST, SUBMIT_COMMENT, LOADING_DATA } from '../types'

const initialState = {
    posts: [],
    post: {},
    loading: false,
}

export default function(state=initialState, action) {
    switch(action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case SET_POST:
            console.log(action.payload)
            return {
                ...state,
                post: action.payload
                
            }
        case LIKE_POST:
        case UNLIKE_POST:
            var index = state.posts.findIndex(post => post.postId === action.payload.postId)
            state.posts[index] = action.payload
            if (state.post.postId === action.payload.postId) state.post = {...state.post, ...action.payload}
            return {
                ...state               
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.postId !== action.payload)
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments + 1,
                    commentList: [action.payload, ...state.post.commentList]
                }
            }
        default:
            return state
    }
}