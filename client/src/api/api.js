import axios from 'axios';

class Api {
	constructor() {
		this.api = axios.create({
			baseURL: "http://localhost:8080"
		})
	}
	async getContent(path) {
		return await this.api.get(`/content/${path}`);
	}

	async uploadFile(path, file) {
		const formData = new FormData();
		formData.append('name', file);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return await this.api.post(`/upload/${path}`, formData, config);
	}

	async mkDir(path, name) {
		const name_dir = name;

		return await this.api.post(`/dir/${path}`, {name: name_dir});
	}
}

const api = new Api();
export default api;