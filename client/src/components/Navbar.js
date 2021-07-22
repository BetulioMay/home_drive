import '../styles/App.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from './forms/Modal';
import UploadForm from './forms/UploadForm';
import MkdirForm from './forms/MkdirForm';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			isUpload: false
		}
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	showUpload = () => {
		this.setState({isUpload: true});
		this.showModal();
	}
	showMkdir = () => {
		this.setState({isUpload: false});
		this.showModal();
	}

	showModal = () => {
		this.setState({showModal: true});
	}
	hideModal = () => {
		this.setState({showModal: false});
	}


	render() {
		let { isUpload } = this.state;
		let path = this.props.path;
		
		// TODO: Create Upload & Mkdir forms to render here.
		const displayForm = () => {
			if (isUpload) {
				return <UploadForm path={path} reload={() => this.props.reload()} hideModal={() => this.hideModal()} />
			} else {
				return <MkdirForm path={path} focus={this.state.showModal} reload={() => this.props.reload()} hideModal={() => this.hideModal()} />
			}
		}

		return (
			<>
			<div className="opt-space">
				<div className="header">
					<div className="logo">
						<Link to='/'>
							<span className="text-4xl"><strong><i>CAMS</i></strong> Home Drive</span>
						</Link>
					</div>

					<div className="navbar-bar">
						<ul className="navbar">
							<li>
								<Link to="/">
									<span>Home</span>
								</Link>
							</li>
							<li>
								<span onClick={this.showUpload}>Upload file</span>
							</li>
							<li>
								<span onClick={this.showMkdir} >Create folder</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<Modal show={this.state.showModal} handleClose={this.hideModal}>
				{displayForm()}
			</Modal>
			</>
		);
	}
}

export default Navbar;