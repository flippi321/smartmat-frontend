import axios from "axios";
const apiClient = axios.create();
let url = 'http://localhost:8080'

/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(apiClient);
import groceryItems from "@/mockDatabases/all-groceries.json";

mock.onGet("/getAllUsersFromHousehold").reply(200, {
    groceryItems,
});

mock.onGet("/removeUserFromHousehold", { params: { userId: 1, householdId: 1 } }).reply(200)

mock.onGet("/addUserToHousehold", { params: { userId: 1, householdId: 1 } }).reply(200)


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

    removeUserFromHousehold(userId, householdId){
        return apiClient.delete("/removeUserFromHousehold", { params: { userId: userId, householdId: householdId } })
    },

    addUserToHousehold(userId, householdId){
        const options = {
            method: 'POST',
            url: `${url}/api/household/addUser`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        }
        return axios.request(options);
    },

}