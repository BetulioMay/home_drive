import { Link } from 'react-router-dom';

/*
* TODO: Style this crap
*/
const DirItem = (props) => {
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