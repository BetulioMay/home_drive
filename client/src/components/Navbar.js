import '../styles/App.css';
import React, { Component } from 'react';

function Navbar(props) {
	return (
		<div className="header">
			<div className="logo">
				<span>Header Logo</span>
			</div>

			<div className="navbar-bar">
				<ul className="navbar">
					<li>
						<span>Home</span>
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