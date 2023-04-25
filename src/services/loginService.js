//import axios from "axios";
//let url = 'https://localhost:8000'
/*
Mocking responses, must be removed:
*/
import users from "@/mockDatabases/users.json";


//const apiClient = axios.create();
//const mock = new MockAdapter(apiClient);

export default class LoginService {
    static async login(email, password) {
        try {
            console.log("LoginService: email =", email);
            console.log("LoginService: password =", password);
            console.log("LoginService: users =", users);

            const user = Object.values(users.users).find((user) => user.email === email && user.password === password);
            console.log("LoginService: user =", user);
            if (!user) {
                throw new Error("Invalid email or password");
            }
            const jwtToken = "thisisanexampletokenhaha";
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                jwtToken: jwtToken,
                status: 200
            };
        } catch (error) {
            return (`Failed to login: ${error.message}`);
        }
    }

}