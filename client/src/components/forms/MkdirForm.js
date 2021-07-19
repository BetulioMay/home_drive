import React from 'react';
import api from '../../api/api';

class MkdirForm extends React.Component {
	constructor(props) {
		super(props);
		this.api = api;
		this.state = {
			value: ''
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
		const path = this.props.path ? this.props.path : '';
		const res = await this.api.mkDir(path, name);
		window.location.reload();
		console.log(res.data.message);
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

export default MkdirForm;