
import axios from 'axios';
import { Telefone } from '../Types/Contato/Telefone';
import authService from './AuthService';
import { CreateTelefone } from '../Types/Contato/CreateTelefone';

const apiUrl = process.env.REACT_APP_API_URL;
const userLogged = authService.getLoggedUser();
const contatoService = {

    async get(clienteId: string) {
        const endpoint = `${apiUrl}/telefone?ClienteId=${clienteId}`
        return axios.get<Telefone[]>(endpoint, { headers: { Authorization: `Bearer ${userLogged.token}` } });
    },
    async create(telefone: CreateTelefone) {
        const endpoint = `${apiUrl}/telefone`
        return axios.post(endpoint, telefone, { headers: { Authorization: `Bearer ${userLogged.token}` } });
    },
    async delete(id: string) {
        const endpoint = `${apiUrl}/telefone/${id}`
        return axios.delete(endpoint, { headers: { Authorization: `Bearer ${userLogged.token}` } });
    }
}

export default contatoService;