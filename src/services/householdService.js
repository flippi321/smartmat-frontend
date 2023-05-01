import axios from "axios";
const apiClient = axios.create();
//let url = 'https://localhost:8000'

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

}