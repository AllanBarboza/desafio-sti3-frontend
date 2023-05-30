
import axios from 'axios';
import authService from './AuthService';
import { Cliente } from '../Types/Cliente/Cliente';
import { CreateCliente } from '../Types/Cliente/CreateCliente';

const apiUrl = process.env.REACT_APP_API_URL
const userLogged = authService.getLoggedUser();

const endpoint = `${apiUrl}/Cliente`

const clienteService = {

    async Get() {
        return axios.get<Cliente[]>(endpoint, { headers: { Authorization: `Bearer ${userLogged.token}` } });
    },
    async Create(data: CreateCliente) {
        return axios.post<string>(endpoint, data, { headers: { Authorization: `Bearer ${userLogged.token}` } })
    },
    async Update(data: Cliente) {
        return axios.put<string>(endpoint, data, { headers: { Authorization: `Bearer ${userLogged.token}` } })
    },
    async Delete(id: string) {
        return axios.delete<string>(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${userLogged.token}` } })
    }
}

export default clienteService;