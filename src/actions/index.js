import jsonPlaceholder from '../apis/jsonPlaceholder'
import _ from 'lodash';


export const fetchPostsAndUser = ()=> async (dispatch, getState) => {
	await dispatch(fetchPosts())

	//Alternative
	_.chain(getState().posts)
	 .map('userId')
	  .uniq()
	   .forEach( id => dispatch(fetchUser(id)))
	    .value()

	// One way
	// const userIds = _.uniq(_.map(getState().posts, 'userId'))
	// userIds.forEach( id=> dispatch(fetchUser(id)))
}

export const fetchPosts = ()=> async dispatch => {
	const response = await jsonPlaceholder.get('/posts');

	dispatch({type: "FETCH_POSTS", payload: response.data})
}

export const fetchUser = (id) =>async dispatch =>{
	const response = await jsonPlaceholder.get(`/users/${id}`);

	dispatch({type: 'FETCH_USER', payload: response.data})
}


// Using lodahs's memoize to ensure unique requests

// const _fetchUser = _.memoize(async (id, dispatch) =>{
// 	const response = await jsonPlaceholder.get(`/users/${id}`);

// 	dispatch({type: 'FETCH_USER', payload: response.data})
// });