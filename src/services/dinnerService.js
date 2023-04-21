import axios from "axios";
//let url = 'https://localhost:8000'

/*
Mocking responses, must be removed:
*/
import MockAdapter from "axios-mock-adapter";
var mock = new MockAdapter(axios);

import dinners from "@/mockDatabases/dinners.json";

mock.onGet("/getDinners", { params: { id: 1 } }).reply(200, {
    dinners,
});

export default {
    getDinners(){
        return(axios.get("/getDinners"));
    }
}