import axios from "axios";
let url = 'http://localhost:8080'

export default {
    updateUserInformation(user){
        const options = {
            method: 'PUT',
            url: `${url}/api/household/updateUser`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: user
        };
        return axios.request(options);

    },
}