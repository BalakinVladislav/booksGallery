export const addBook = (name, nameDescription, author, authorBiography) => {
	return {
		type: 'BOOKS_ADD',
		name,
		nameDescription,
		author,
		authorBiography
	}
}

export const removeBook = id => {
	return {
		type: 'BOOKS_REMOVE',
		book_id: id
	}
}

export const restoreFromLocalStorage = () => {
	return {
		type: 'BOOKS_RESTORE_FROM_LOCALSTORAGE'
	}
}

export const editBook = book => {
	return {
		type: 'BOOKS_EDIT',
		book
	}
}

export const showEditor = book => {
	return {
		type: 'SHOW_EDITOR',
		book
	}
}

export const hideEditor = () => {
	return {
		type: 'HIDE_EDITOR'
	}
}