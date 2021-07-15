import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

/*
*
* TODO: Create an Api class to use axios HTTP client wherever
*
*/

class DirList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			files: [],
			directories: []
		}
	}

	componentDidMount(props) {
		let path = (this.props.match.params.path) ? '/'+this.props.match.params.path : '/';
		let url = "http://localhost:8080/content" + path;
		this.loadDirectory(url);
	}

	async loadDirectory(url) {
		axios.get(url)
			.then(response => this.fillEntries(response.data))
			.catch(err => {
				console.error(err);
			});
	}

	fillEntries(data) {
		let content = data.content; // {path, files, dirs}
		let newState = {files: content.files, directories: content.directories};
		this.setState(newState);
	}

	render() {
		let directories = this.state.directories;
		let files = this.state.files;
		let path = (this.props.match.params.path) ? '/'+this.props.match.params.path : '/';
		return (
			<div className="Dir">

				<h2>Folder: {path}</h2>

				<ul className="DirList">
					{
						directories.map((el, index) => {
							return <li key={path+'-'+el}>{el}</li>;
						})
					}
					{
						files.map((el, index) => {
							return <li key={path+'-'+el}>{el}</li>;
						})
					}
				</ul>

			</div>
		);
	}
}

export default withRouter(DirList);