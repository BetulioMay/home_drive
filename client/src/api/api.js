import axios from 'axios';

class Api {
	constructor() {
		this.api = axios.create({
			baseURL: "http://localhost:8000"
		})
	}
	async getContent(path) {
		// path = path.replace('/', '--');
		try {
			return await this.api.get(`/content/${path}`);
		} catch (err) {
			console.error(err);
			return err;
		}
	}

	async uploadFile(path, file) {
		const formData = new FormData();
		formData.append('name', file);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		try {
			return await this.api.post(`/upload/${path}`, formData, config);
		} catch (err) {
			return err.response.data;
		}
	}

	async mkDir(path, name) {
		const name_dir = name;
		try {
			return await this.api.post(`/dir/${path}`, { name: name_dir });
		} catch (err) {
			return err;
		}
	}

	async downloadFile(path) {
		const url = `/download/${path}`;
		const method = 'GET';
		try {
			return this.api({
				url,
				method,
				responseType: 'blob'
			});
		} catch (err) {
			return err.response.data;
		}
	}

	async delEl(path) {
		return await this.api.delete(`/content/delete/${path}`);
	}
}

const api = new Api();
export default api;