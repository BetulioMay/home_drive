import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import api from '../../api/api';

class MkdirForm extends React.Component {
	constructor(props) {
		super(props);
		this.api = api;
		this.state = {
			value: '',
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.sendDir(this.state.value);
	}

	handleChange = e => {
		this.setState({value: e.target.value});
	}

	sendDir = async (name) => {
		try {
			const path = this.props.path ? this.props.path : '';
			const res = await this.api.mkDir(path, name);
			console.log(res.data.message);

			// Reload the page
			this.props.hideModal();
			this.props.reload();
		} catch (err) {
			console.log(err);
		}
	}

	render() {

		return(
			<form onSubmit={this.handleSubmit}>
				<label>
					Folder name:
					<input type='text' name='name' onChange={this.handleChange} />
				</label>
				<button type='submit'>Create</button>
			</form>
		);
	};
}

export default withRouter(MkdirForm);