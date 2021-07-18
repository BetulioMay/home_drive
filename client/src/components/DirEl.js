import { Link } from 'react-router-dom';
import api from '../api/api';
/*
* TODO: Style this crap
*/
const DirItem = (props) => {

	const download = async () => {
		let path = `${props.name}`;
		if (props.path) {
			path = `${props.path}-${props.name}`;
		}
		api.downloadFile(path)
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'file.zip');
				document.body.appendChild(link);
				link.click();
				link.remove();
				console.log(response.data.message);
			});
	}


	if (!props.isDirectory) {
		return (
			<button onClick={download}>
				<div className="Item">
					<span>
						{props.name}
					</span>
				</div>
			</button>
		);
	}
	return (
		<button>
			<div className="Item">
				<span>
					{props.name}
				</span>
			</div>
		</button>
	)
}

const DirLink = (props) => {

	if (!props.isDirectory) {
		return <>{props.children}</>
	}

	let link = `/content/${props.name}`;
	if (props.path) {
		link = `${props.path}-${props.name}`;
	}

	if (props.isParent) {
		link = link.split('-').slice(0, -2).join('-') || '/content/';
	}

	return (
		<Link to={link} >
			{props.children}
		</Link>
	)

}

function DirEl(props) {

	if (!props.path && props.isParent) {
		return <></>;
	}
	return (
		<li>
			<DirLink {...props}>
				<DirItem {...props}>
				</DirItem>
			</DirLink>
		</li>
	);
}

export default DirEl;