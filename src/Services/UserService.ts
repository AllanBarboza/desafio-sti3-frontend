
import axios from 'axios';
import { RegisterUser } from '../Types/Usuario/RegisterUser';
import authService from './AuthService';

const userLogged = authService.getLoggedUser();
const apiUrl = process.env.REACT_APP_API_URL;

const userSerivice = {

    async register(data : RegisterUser) {
        const endpoint = `${apiUrl}/usuario`
        return axios.post(endpoint, data);
    }
}

export default userSerivice;