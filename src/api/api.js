import axios from 'axios';

class API {
    constructor(axios) {
        this.request = axios;
        this.baseUrl = 'http://localhost:3000/api/';
    }

    setToken(token) {
        this.token = token;
    }

    async postRequest(path, data){
        try {
            const result = await this.request.post(this.baseUrl + path, data);
            return result.data;
        } catch (error) {
            if(!!error && !!error.response && !!error.response.data && !!error.response.data.message){
                throw(error.response.data.message);
            }
            else throw(error);
        }
    }

    async login(username, password) {
        try {
            return await this.postRequest('account/login', {
                username,
                password
            });
        } catch (error) {
            throw(error);
        }
    }
}

export default new API(axios);