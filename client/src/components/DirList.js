import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
			directories: [],
			success: true
		};
		this.reload = this.reload.bind(this);
	}

	
	componentDidMount() {
		let path = (this.props.match.params.path) ? this.props.match.params.path : '';
		this.loadDirectory(path);
	}
	
	reload() {
		let path = (this.props.match.params.path) ? this.props.match.params.path : '';
		this.loadDirectory(path);
	}
	async loadDirectory(path) {
		try {
			const res = await api.getContent(path);
			this.fillEntries(res.data);
		} catch (err) {
			console.log(err);
			this.setState({success: false});
		}
	}

	fillEntries(data) {
		const content = data.content;
		this.setState({files: content.files, directories: content.directories});
	}


	render() {
		// TODO: path separator in l.53 better arrows or slashes (OK)
		const path = this.props.match.params.path;
		const directories = this.state.directories;
		const files = this.state.files;
		const success = this.state.success;
		/*
		* IDEA: path is the key of the elements, could be in slash format instead of kebab? (NO -> Has to be sync with api request format)
		*		Elements could (and should) be function components (OK -> DirEl)
		*/

		return (
			<div className="dir-space">
				<Navbar path={path} reload={this.reload}/>
				<h2 className="text-4xl font-bold text-white" >Folder: {path ? path : '/'}</h2>

				{/* In case of bad content request */}
				{
					success ? 
					<ul className="flex justify-start items-center flex-wrap">
						<DirEl key="parent" name="<-Back" path={path} isDirectory isParent />
						{
							directories.map((dir, index) => {
							return <DirEl key={dir} name={dir} path={path} reload={this.reload} isDirectory />
						})
						}
						{
							files.map((file, index) => {
								return <DirEl key={file} name={file} path={path} reload={this.reload} />
							})
						}
					</ul>
					:
					<div className="flex justify-center items-center m-20">
						<div>
							<h1 className="text-center font-bold text-white text-2xl">This page does not exist</h1>
							<Link exact to="/content/" >
								<div className="mt-3" >
									<span className="font-bold text-lg text-center text-purple-500" >Return to home</span>
								</div>
							</Link>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default DirList;