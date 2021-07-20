import { Link } from 'react-router-dom';
import api from '../api/api';
import Modal from './forms/Modal';
import React, { useState } from 'react';
/*
* TODO: Style this crap
*/
const DirItem = (props) => {

	const download = async () => {
		let path = `${props.name}`;
		if (props.path) {
			path = `${props.path}--${props.name}`;
		}
		api.downloadFile(path)
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `${props.name}`);
				document.body.appendChild(link);
				link.click();
				link.remove();
				// console.log(`File ${props.name} read successfully`);
			})
			.catch(err => {
				console.error(err);
			});
	}

	// RENDERING FOR FILES
	if (!props.isDirectory) {
		return (
			<div onClick={download} className="cursor-pointer">

				<svg width="200" height="150" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 310V1H319V237.146H241.757V310H1Z" stroke="black"/>
				<path d="M319 237L241.5 310" stroke="black"/>
				<line x1="66" y1="65.5" x2="242" y2="65.5" stroke="black"/>
				<line x1="66" y1="129.5" x2="242" y2="129.5" stroke="black"/>
				<line x1="66" y1="161.5" x2="242" y2="161.5" stroke="black"/>
				<line x1="66" y1="98.5" x2="242" y2="98.5" stroke="black"/>
				</svg>

				
				<div className="bg-blue-100 p-3">
					<span className="font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
					{props.name}
					</span>
				</div>
			</div>
		);
	}
	// RENDERING FOR FOLDERS
	return (
		<div>
			
			<svg width="200" height="150" viewBox="0 0 395 305" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect y="25" width="395" height="280" rx="14" fill="#DF89ED"/>
			<path d="M29 1L45.4545 25H12.5455L29 1Z" fill="#A176E8"/>
			<path d="M113 1L129.454 25H96.5455L113 1Z" fill="#A176E8"/>
			<rect x="29" width="84" height="25" fill="#A176E8"/>
			</svg>



			<div className="cursor-pointer bg-blue-100 p-3">
				<span className="font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
					{props.name}
				</span>
			</div>
		</div>
	)
}

const DirLink = (props) => {

	if (!props.isDirectory) {
		return <>{props.children}</>
	}

	let link = `/content/${props.name}`;
	if (props.path) {
		link = `${props.path}--${props.name}`;
	}

	if (props.isParent) {
		link = link.split('--').slice(0, -2).join('--') || '/content/';
	}

	return (
		<Link to={link} >
			{props.children}
		</Link>
	)

}

const DelBtn = (props) => {
	
	
	const [show, setShow] = useState(false);
	
	if (props.isParent) {
		return <></>;
	}
	const delEl = async () => {
		const path = props.path ? `${props.path}--${props.name}` : `${props.name}`;
		const res = await api.delEl(path);
		window.location.reload();
		console.log(res.data.message);
	}

	return(
		<>
			<div className="m-0 p-2 text-white bg-red-600 w-auto h-auto font-bold cursor-pointer" onClick={() => setShow(true)}>Delete</div>
			<Modal show={show} handleClose={() => setShow(false)} >
				<h1>Are you sure you want to delete {props.name}?</h1>
				<button onClick={delEl}>Yes</button>
			</Modal>
		</>
	)
}

function DirEl(props) {

	if (!props.path && props.isParent) {
		return <></>;
	}
	return (
		<li className="w-52 rounded overflow-hidden shadow-lg m-4 p-0 bg-white">
			<DirLink {...props}>
				<DirItem {...props}>
				</DirItem>
			</DirLink>
			<DelBtn {...props} />
		</li>
	);
}

export default DirEl;