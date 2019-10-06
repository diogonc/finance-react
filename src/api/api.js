import axios from 'axios';
import qs from 'qs';

import { removeEmptyProperties } from '../shared/utils';

class API {
    constructor(axios, qs, token) {
        this.request = axios;
        this.qs = qs;
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
    async loadGroup(filters) {
        try {
            if (!!filters && !!filters.type && filters.type === 'all') {
                delete filters.type;
            }
            return await this.getRequest('groups/', filters);
        } catch (error) {
            throw (error);
        }
    }

    async addGroup(item) {
        try {
            return await this.postRequest('groups/', item);
        } catch (error) {
            throw (error);
        }
    }

    async updateGroup(item) {
        try {
            return await this.putRequest(`groups/${item.id}`, item);
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

    //account
    async loadAccount(filters) {
        try {
            if (!!filters && !!filters.userId && filters.userId === 'all') {
                delete filters.userId;
            }

            return await this.getRequest('accounts/', filters);
        } catch (error) {
            throw (error);
        }
    }

    async addAccount(item) {
        try {
            return await this.postRequest('accounts/', item);
        } catch (error) {
            throw (error);
        }
    }

    async updateAccount(item) {
        try {
            return await this.putRequest(`accounts/${item.id}`, item);
        } catch (error) {
            throw (error);
        }
    }

    async deleteAccount(id) {
        try {
            return await this.deleteRequest(`accounts/${id}`);
        } catch (error) {
            throw (error);
        }
    }

    //category
    async loadCategory(filters) {
        try {
            if (!!filters && !!filters.userId && filters.userId === 'all') {
                delete filters.userId;
            }

            return await this.getRequest('categories/', filters);
        } catch (error) {
            throw (error);
        }
    }

    async addCategory(item) {
        try {
            return await this.postRequest('categories/', item);
        } catch (error) {
            throw (error);
        }
    }

    async updateCategory(item) {
        try {
            return await this.putRequest(`categories/${item.id}`, item);
        } catch (error) {
            throw (error);
        }
    }

    async deleteCategory(id) {
        try {
            return await this.deleteRequest(`categories/${id}`);
        } catch (error) {
            throw (error);
        }
    }

    //users
    async loadUsers() {
        try {
            return await this.getRequest('users/');
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
            const queryString = this.qs.stringify(removeEmptyProperties(data));
            const result = await this.request.get(this.baseUrl + path + '?' + queryString, { ...header });
            return result.data;
        } catch (error) {
            if (!!error && !!error.response && !!error.response.data && !!error.response.data.message) {
                throw (error.response.data.message);
            }
            else throw (error);
        }
    }
}

export default new API(axios, qs);

function _getHeaderWithToken() {
    const account = JSON.parse(localStorage.getItem('account'));
    if (!!account && !!account.token) {
        return { headers: { Authorization: `JWT  ${account.token}` } };
    }
    return null;
}
