import axios from "axios";
let url = 'http://localhost:8080'



export default {
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