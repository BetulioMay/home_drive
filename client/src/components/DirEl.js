import { Link } from 'react-router-dom';
import api from '../api/api';
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

	const delEl = async () => {
		const path = props.path ? `${props.path}--${props.name}` : `${props.name}`;
		const res = await api.delEl(path);
		window.location.reload();
		console.log(res.data.message);
	}

	if (props.isParent) {
		return <></>;
	}

	return(
		<button onClick={delEl} >Del</button>
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
			<DelBtn {...props} />
		</li>
	);
}

export default DirEl;