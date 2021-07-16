import '../styles/App.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
	return (
		<div className="header">
			<div className="logo">
				<span>Header Logo</span>
			</div>

			<div className="navbar-bar">
				<ul className="navbar">
					<li>
						<Link to="/">
							<span>Home</span>
						</Link>
					</li>
					<li>
						<span>Upload file</span>
					</li>
					<li>
						<span>Create folder</span>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Navbar;