import React, { Component } from 'react';
import api from '../api/api';
import DirEl from './DirEl';
import Navbar from './Navbar';

/*
*
* TODO: Create an Api class to use axios HTTP client wherever
*
*/

class DirList extends Component {

	constructor(props) {
		super(props);
		this.api = api;
		this.state = {
			files: [],
			directories: []
		};
	}

	componentDidMount(props) {
		let path = (this.props.match.params.path) ? this.props.match.params.path : '';
		this.loadDirectory(path);
	}

	async loadDirectory(path) {
		try {
			const res = await api.getContent(path);
			this.fillEntries(res.data);
		} catch (err) {
			console.log(err);
		}
	}

	fillEntries(data) {
		const content = data.content;
		this.setState({files: content.files, directories: content.directories});
	}


	render() {
		// TODO: path separator in l.53 better arrows or slashes
		const path = this.props.match.params.path;
		const directories = this.state.directories;
		const files = this.state.files;
		/*
		* IDEA: path is the key of the elements, could be in slash format instead of kebab? (NO -> Has to be sync with api request format)
		*		Elements could (and should) be function components (OK -> DirEl)
		*/

		return (
			<div className="dir-space">
				<Navbar path={path} />
				<h2 className="text-4xl font-bold text-white" >Folder: {path}</h2>
				<div className="dir">

					<ul className="DirList flex justify-start items-center flex-wrap">
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
			</div>
		);
	}
}

export default DirList;