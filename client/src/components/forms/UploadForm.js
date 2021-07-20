import React from 'react';
import api from '../../api/api';

class UploadForm extends React.Component {
	constructor(props) {
		super(props);
		this.api = api;
		this.state = {
			file: null,
			redirect: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.fileUpload = this.fileUpload.bind(this);
	}

	handleSubmit = e => {
		e.preventDefault();
		this.fileUpload(this.state.file);
	}

	handleChange = e => {
		this.setState({file: e.target.files[0]});
	}

	fileUpload = async (file) => {
		let path = this.props.path ? this.props.path : '';
		try {
			let res = await this.api.uploadFile(path, file);
			console.log(res.data.message);
			this.setState({redirect: true});
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<label>
					File to upload:
					<input type='file' name='name' onChange={this.handleChange} />
				</label>
				<button type='submit'>Upload</button>
			</form>
		);
	};
}

export default UploadForm;