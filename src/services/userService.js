import axios from "axios";
let url = 'http://localhost:8080'

export default {
    updateUserInformation(user, oldEmail){
        const options = {
            method: 'PUT',
            url: `${url}/api/users/update/${oldEmail}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: user
        };
        return axios.request(options);
    },

    getUserInformation(userId){
        const options = {
            method: 'GET',
            url: `${url}/api/users/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        return axios.request(options);
    },
}