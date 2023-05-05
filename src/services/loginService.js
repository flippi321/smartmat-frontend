import axios from "axios";
let url = 'http://localhost:8080'


export default {

    /**
     * Method for logging in
     * @param email email
     * @param password
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    login(email, password) {
        const options = {
            method: 'POST',
            url: `${url}/api/v1/auth/authenticate`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: email,
                password: password
            }
        };
        return axios.request(options);
    },

    /**
     * Method for refreshing access token with refresh token
     * @param refreshToken refresh token
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    refreshAccessToken(refreshToken) {
        const options = {
            method: 'POST',
            url: `${url}/api/v1/auth/refresh-token`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        };
        return axios.request(options);
    },


}