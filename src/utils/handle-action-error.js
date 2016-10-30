import { SHOW_ERROR } from '../constants'

export default function handleActionError (dispatch, error, source) {
	console.error(error);
	console.error(source);

	let message = error.message;

	if (error.statusCode == 503 || error.statusCode == 504) {
		message = 'EVCACHE API Unavailable';
	}

  	dispatch({
	  type: 'GROWLER__SHOW',
	  growler: {
	    text: message,
	    type: 'growler--error'
	  }
	})
}
