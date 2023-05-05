import axios from "axios";
let url = 'http://localhost:8080'

export default {

    /**
     * Method for updating user information
     * @param user the user to update
     * @param oldEmail the old email of the user
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
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

    /**
     * Method for getting user information
     * @param userId the id of the user
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
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