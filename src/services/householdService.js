import axios from "axios";
let url = 'http://localhost:8080'



export default {

    /**
     * Method for getting all users from a household
     * @param householdId id of household
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getAllUsersFromHousehold(householdId){
        const options = {
            method: 'GET',
            url: `${url}/api/household/users/${householdId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        }
        return axios.request(options);
    },

    /**
     * Method for creating a household
     * @param userId id of user
     * @param householdInfo household info
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    createHousehold(userId, householdInfo){
        const options = {
            method: 'POST',
            url: `${url}/api/household/create/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: householdInfo,
        };
        return axios.request(options);
    },

    /**
     * Method for joining a household. Using and invitation number to join a household
     * @param userId id of user
     * @param invitationNr invitation number
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    joinHousehold(userId, invitationNr){
        console.log(userId)
        console.log(invitationNr)

        const options = {
            method: 'POST',
            url: `${url}/api/household/addNewUser/${userId}/${invitationNr}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    },

    /**
     * Method for getting a users household
     * @param userId id of user
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getUsersHousehold(userId){
        const options = {
            method: 'GET',
            url: `${url}/api/household/byUser/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    },

    /**
     * Method for getting a household by id
     * @param householdId id of household
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getHouseholdById(householdId){
        const options = {
            method: 'GET',
            url: `${url}/api/household/${householdId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        };
        return axios.request(options);
    },

    /**
     * Method for updating a households info(name of household, name of fridge, name of shopping list)
     * @param householdId id of household
     * @param householdInfo household info
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    updateHouseHold(householdId, householdInfo){
        const options = {
            method: 'PUT',
            url: `${url}/api/household/update/${householdId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            data: householdInfo,
        };
        return axios.request(options);
    }
}