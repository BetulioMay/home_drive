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

	async uploadForm(path, file) {
		const formData = new FormData();
		formData.append('file', file);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return await this.api.post(`/upload/${path}`, formData, config);
	}
}

const api = new Api();
export default api;