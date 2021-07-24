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
			<>
			<h1 className="m-3 p-5 text-3xl text-white border-b-2 border-white">Create a folder</h1>
				<form onSubmit={this.handleSubmit}>
				<div className="flex flex-col mb-4">
					<label className="mb-2 uppercase font-bold text-xl text-white">
						Folder name:
					</label>
						<input 
							type='text'
							name='name'
							autoFocus
							onFocus={e => e.currentTarget.select()}
							placeholder="Type a name"
							onChange={this.handleChange}
							className="py-2 px-3 relative w-96 m-auto text-lg border-b-2 border-purple-900 text-white font-bold"
							/>
					<button type='submit' >Create</button>
					<button type="reset" >Reset</button>
				</div>
				</form>
			</>
		);
	};
}

export default MkdirForm;