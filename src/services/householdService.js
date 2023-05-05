import axios from "axios";
const apiClient = axios.create();
let url = 'https://localhost:8000'

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
        return apiClient.get("/getAllUsersFromHousehold", { params: { id:householdId } });
    },

    removeUserFromHousehold(userId, householdId){
        return apiClient.delete("/removeUserFromHousehold", { params: { userId: userId, householdId: householdId } })
    },

    addUserToHousehold(userId, householdId){
        return apiClient.delete("/addUserToHousehold", { params: { userId: userId, householdId: householdId } })
    },

    /*
    * {
        "name" : "householdfor1user2",
        "fridge" : {
	        "name" : "fridgeforhousehold2"
            },
        "shoppinglist": {
	        "name" : "shoppinglistforhousehold2"
            }
       }*/
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

    /*
    {
        "firstname" : "test1",
        "lastname" : "test1surname",
        "email" : "test1@test.com",
        "password" : "passord"
      }
        */
    joinHousehold(userId, invitationNr){
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
}