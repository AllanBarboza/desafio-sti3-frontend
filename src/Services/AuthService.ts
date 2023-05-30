
import axios from 'axios';
import { User } from '../Types/Usuario/User';
import { Auth } from '../Types/Usuario/Auth';



const apiUrl = process.env.REACT_APP_API_URL;

const authService = {

    async authenticate(data : Auth) {
        const endpoint = `${apiUrl}/auth/`
        return axios.post(endpoint, data);
    },

    setLoggedUser(data : User){
        let parsedData = JSON.stringify(data)
        localStorage.setItem("user", parsedData)
    },

    getLoggedUser(){
        let data = localStorage.getItem("user");
        if(!data) return null;
        try {
            let parsedData = JSON.parse(data)
            return parsedData
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

export default authService;