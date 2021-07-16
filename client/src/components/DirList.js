import React, { Component } from 'react';
import axios from 'axios';
import DirEl from './DirEl';

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
		};
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
		const content = data.content;
		this.setState({files: content.files, directories: content.directories});
	}


	render() {
		const path = this.props.match.params.path;
		const directories = this.state.directories;
		const files = this.state.files;
		/*
		* IDEA: path is the key of the elements, could be in slash format instead of kebab?
		*		Elements could (and should) be function components
		*/

		return (
			<div className="Dir">

				<h2>Folder: {path}</h2>

				<ul className="DirList">
					<DirEl key="parent" name="../" path={path} isDirectory isParent />
					{
						directories.map((dir, index) => {
						return <DirEl key={dir} name={dir} path={path} isDirectory />
					})
					}
					{
						files.map((file, index) => {
							return <DirEl key={file} name={file} path={path} />
						})
					}
				</ul>

			</div>
		);
	}
}

export default DirList;