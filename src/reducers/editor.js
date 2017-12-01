export default function editor(state = {visible: false}, action) {
	switch (action.type) {
		case 'SHOW_EDITOR': {
			const {
				id,
				name,
				nameDescription,
				author,
				authorBiography
			} = action.book;

		    return {
		    	visible: true,
		    	id,
				name,
				nameDescription,
				author,
				authorBiography
		    };
    	}

	    case 'HIDE_EDITOR': {
	        return {visible: false};
		}

		default: 
		    return state
	}
}