import axios from 'axios';

class Api {
	constructor() {
		this.api = axios.create({
			baseURL: "http://localhost:8080"
		})
	}
	async getContent(path) {
		// path = path.replace('/', '--');
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

		return await this.api.post(`/dir/${path}`, { name: name_dir });
	}

	async downloadFile(path) {
		const url = `/download/${path}`;
		const method = 'GET';

		return this.api({
			url,
			method,
			responseType: 'blob'
		});
	}

	async delEl(path) {
		return await this.api.delete(`/content/delete/${path}`);
	}
}

const api = new Api();
export default api;