import React from 'react';
import api from '../../api/api';

class UploadForm extends React.Component {
	constructor(props) {
		super(props);
		this.api = api;
		this.state = {
			file: null
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

			// Reload the page
			this.props.hideModal();
			this.props.reload();

		} catch (err) {
			console.error(err);
		}
	}

	render() {
		return(
			<>
			<h1 className="m-3 p-5 text-3xl text-white border-b-2 border-white">Upload file</h1>
				<form onSubmit={this.handleSubmit}>
				<div className="flex flex-col mb-4">
					<label className="mb-2 uppercase font-bold text-xl text-white">
						File to upload:
					</label>
					{/* <input
						type='file'
						name='name'
						onChange={this.handleChange} 
						className="py-2 px-3 relative w-96 m-auto text-lg border-b-2 border-purple-900 text-purple-900 font-bold"
						/> */}
					
					<label className="file">
						<input
							type="file"
							id="file"
							aria-label="File browser example"
							name="name"
							onChange={this.handleChange}
							className="py-2 px-3 relative w-96 m-auto text-lg border-b-2 border-purple-900 text-purple-900 font-bold"
							/>
						<span className="file-custom"></span>
					</label>

					<button type='submit'>Upload</button>
					<button type="reset">Reset</button>
				</div>
				</form>
			</>
		);
	};
}

export default UploadForm;