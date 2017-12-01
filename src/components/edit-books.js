import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { editBook, hideEditor } from '../actions';


class EditWindow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			name: '',
			nameDescription: '',
			author: '',
			authorBiography: ''
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleNameDescriptionChange = this.handleNameDescriptionChange.bind(this);
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleAuthorBiographyChange = this.handleAuthorBiographyChange.bind(this);
		this.onSubmitEdit = this.onSubmitEdit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const {
			books,
			editor
		} = nextProps;

		const book = books.filter(book => book.id === editor.id)[0];
		if (editor.visible === false) {
			this.setState({
				visible: false
			})} else {
		this.setState({
			id: book.id,
			name: book.name,
			nameDescription: book.nameDescription,
			author: book.author,
			authorBiography: book.authorBiography
		});
	}
}

	handleNameChange(e) {
		return this.setState({
			name: e.target.value
		});
	}

	handleNameDescriptionChange(e) {
		return this.setState({
			nameDescription: e.target.value
		});
	}

	handleAuthorChange(e) {
		return this.setState({
			author: e.target.value
		});
	}

	handleAuthorBiographyChange(e) {
		return this.setState({
			authorBiography: e.target.value
		});
	}

	onSubmitEdit() {
		const {
			onClickSubmit
		} = this.props;

		const {
			id,
			name,
			nameDescription,
			author,
			authorBiography
		} = this.state;

		onClickSubmit(id, name, nameDescription, author, authorBiography);

		this.setState({
			id: null,
			name: '',
			nameDescription: '',
			author: '',
			authorBiography: ''
		});
	}


	render() {
	  	const {
	  		editor,
	  		onClickCloseEditor
	  	} = this.props;

	    if (!editor.visible) {
	        return null;
	    }

	    return (
	      <div className="editor-container">
	        <div className="editor">
	        	<div className="close_editor"
	        	onClick={onClickCloseEditor}/>
		        <input type="text"  className="editor-input" value={this.state.name} onChange={this.handleNameChange}/>
				<input type="text"  className="editor-input" value={this.state.nameDescription} onChange={this.handleNameDescriptionChange}/>
				<input type="text"  className="editor-input" value={this.state.author} onChange={this.handleAuthorChange}/>
				<input type="text"  className="editor-input" value={this.state.authorBiography} onChange={this.handleAuthorBiographyChange}/>
				<button onClick={this.onSubmitEdit}>Edit Book!</button>
		    </div>
	      </div>
    	);
 	}
}

function mapStateToProps(state) {
	console.log(state);
	return {
		editor: state.editor,
		books: state.books
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		editBook,
		hideEditor
	}, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	return {
		...stateProps,
		...ownProps,
		onClickSubmit: (id, name, nameDescription, author, authorBiography) => {
			dispatchProps.editBook(id, name, nameDescription, author, authorBiography);
			dispatchProps.hideEditor();
		},
		onClickCloseEditor: () => {
			dispatchProps.hideEditor();
		}
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditWindow);