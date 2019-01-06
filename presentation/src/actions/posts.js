import api from 'src/lib/api'
import { setTimeout } from 'timers';

export const FETCH_POSTS = 'FETCH_POSTS'
export const VOTE_POST_LIST = 'VOTE_POST_LIST'
export const FETCH_POST_COMMENTS_LIST = 'FETCH_POST_COMMENTS_LIST'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const SORT_POSTS = 'SORT_POSTS'

export function sortPosts(sortBy) {
    return { type: SORT_POSTS, sortBy }
}

function fetchPosts(data) {
    return { type: FETCH_POSTS, data }
}

function fetchCategoryPosts(category, data) {
    return { type: FETCH_CATEGORY_POSTS, data }
}

function fetchPostCommentsList(data) {
    return { type: FETCH_POST_COMMENTS_LIST, data }
}


export function fetchPostsAsync() {
    return dispatch =>
        api
            .get(`/posts`)
            .then(response => response.data.map((post) => {
                api.get(`/posts/${post.id}/comments`).then(response => localStorage[post.id] = response.data.length)
                return post
            }))
            .then(data => setTimeout(function () { dispatch(fetchPosts(data)) }, 1500), error => console.error(error))
}

export function votePostListAsync({ postId, vote, category }) {
    api.post(`/posts/${postId}`, { option: vote })
    var showAllCategories = localStorage['currCategory'] === '/' || localStorage['currCategory'] === undefined

    if (showAllCategories)
        return dispatch => api.get(`/posts`)
            .then(response => response.data)
            .then(data => dispatch(fetchPosts(data)), error => console.error(error))
    else
        return dispatch => api.get(`/${category}/posts`)
            .then(response => response.data)
            .then(data => dispatch(fetchCategoryPosts(category, data)), error => console.error(error))
}

export function fetchCategoryPostsAsync(category) {
    return dispatch =>
        api
            .get(`/${category}/posts`)
            .then(response => response.data.map((post) => {
                api.get(`/posts/${post.id}/comments`).then(response => localStorage[post.id] = response.data.length)
                return post
            }))
            .then(
            data => setTimeout(function () { dispatch(fetchCategoryPosts(category, data)) }, 1500),
                error => console.error(error)
            )
}

export function fetchPostCommentsListAsync(postId) {
    return dispatch =>
        api
            .get(`/posts/${postId}/comments`)
            .then(response => response.data)
            .then(
            data => dispatch(fetchPostCommentsList(data)),
                error => console.error(error)
            )
}


