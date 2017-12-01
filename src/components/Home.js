import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import BooksList from './books-list';
import {
	addBook,
	restoreFromLocalStorage
} from '../actions';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			nameDescription: '',
			author: '',
			authorBiography: ''
		}

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleNameDescriptionChange = this.handleNameDescriptionChange.bind(this);
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleAuthorBiographyChange = this.handleAuthorBiographyChange.bind(this);
		this.onSubmitAdd = this.onSubmitAdd.bind(this);
	}

	componentWillMount() {
		const {
		restoreFromLocalStorage
		} = this.props;
		restoreFromLocalStorage();
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

	onSubmitAdd() {
		const {
			onClickAddButton,
		} = this.props;

		const {
			name,
			nameDescription,
			author,
			authorBiography
		} = this.state;

		onClickAddButton(name, nameDescription, author, authorBiography);

		this.setState({
			name: '',
			nameDescription: '',
			author: '',
			authorBiography: ''
		});
	}

	render() {
		const {
			books,
		} = this.props;

		return (
			<div className="page-home">
				<p>Введите название книги</p>
				<input type="text"  className="book-edit__input" value={this.state.name} onChange={this.handleNameChange}/>
				<p>Введите описание книги</p>
				<input type="text"  className="book-edit__input" value={this.state.nameDescription} onChange={this.handleNameDescriptionChange}/>
				<p>Введите имя автора книги</p>
				<input type="text"  className="book-edit__input" value={this.state.author} onChange={this.handleAuthorChange}/>
				<p>Расскажите об авторе</p>
				<input type="text"  className="book-edit__input" value={this.state.authorBiography} onChange={this.handleAuthorBiographyChange}/>
				<button onClick={this.onSubmitAdd}>Add Book!</button>
				<BooksList books={books}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		books: state.books
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addBook,
		restoreFromLocalStorage
	}, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	return {
		...stateProps,
		...ownProps,
		onClickAddButton: (name, nameDescription, author, authorBiography) => dispatchProps.addBook(name, nameDescription, author, authorBiography),
		restoreFromLocalStorage: () => dispatchProps.restoreFromLocalStorage()
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Home);