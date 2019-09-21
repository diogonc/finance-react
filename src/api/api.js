import axios from 'axios';

class API {
    constructor(axios, token) {
        this.request = axios;
        this.baseUrl = 'http://localhost:3000/api/';
        this.token = token;
    }

    setToken(token) {
        this.token = token;
    }

    async login(username, password) {
        try {
            return await this.postRequest('account/login', {
                username,
                password
            });
        } catch (error) {
            throw (error);
        }
    }

    //group
    async loadGroup() {
        try {
            return await this.getRequest('groups/');
        } catch (error) {
            throw (error);
        }
    }

    async addGroup(group) {
        try {
            return await this.postRequest('groups/', group);
        } catch (error) {
            throw (error);
        }
    }

    async updateGroup(group) {
        try {
            return await this.putRequest(`groups/${group.id}`, group);
        } catch (error) {
            throw (error);
        }
    }

    async deleteGroup(id) {
        try {
            return await this.deleteRequest(`groups/${id}`);
        } catch (error) {
            throw (error);
        }
    }

    async postRequest(path, data) {
        try {
            const header = _getHeaderWithToken();
            const result = await this.request.post(this.baseUrl + path, data, header);
            return result.data;
        } catch (error) {
            if (!!error && !!error.response && !!error.response.data && !!error.response.data.message) {
                throw (error.response.data.message);
            }
            else throw (error);
        }
    }

    async putRequest(path, data) {
        try {
            const header = _getHeaderWithToken();
            const result = await this.request.put(this.baseUrl + path, data, header);
            return result.data;
        } catch (error) {
            if (!!error && !!error.response && !!error.response.data && !!error.response.data.message) {
                throw (error.response.data.message);
            }
            else throw (error);
        }
    }

    async deleteRequest(path, data) {
        try {
            const header = _getHeaderWithToken();
            const result = await this.request.delete(this.baseUrl + path, header);
            return result.data;
        } catch (error) {
            if (!!error && !!error.response && !!error.response.data && !!error.response.data.message) {
                throw (error.response.data.message);
            }
            else throw (error);
        }
    }

    async getRequest(path, data) {
        try {
            const header = _getHeaderWithToken();
            const result = await this.request.get(this.baseUrl + path, { ...header, ...data });
            return result.data;
        } catch (error) {
            if (!!error && !!error.response && !!error.response.data && !!error.response.data.message) {
                throw (error.response.data.message);
            }
            else throw (error);
        }
    }
}

export default new API(axios);

function _getHeaderWithToken() {
    const account = JSON.parse(localStorage.getItem('account'));
    if (!!account && !!account.token) {
        return { headers: { Authorization: `JWT  ${account.token}` } };
    }
    return null;
}
