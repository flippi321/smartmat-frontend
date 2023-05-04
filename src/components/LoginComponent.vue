<template>
    <div class="container">
        <form @submit.prevent="login">
            <h2>Logg inn</h2>
            <div class="input">
                <label for="email">Epost</label>
                <input
                        class="form-control"
                        type="text"
                        name="email"
                        placeholder="eksempel@email.com"
                />
            </div>
            <div class="input">
                <label for="password">Passord</label>
                <input
                        class="form-control"
                        type="password"
                        name="password"
                        placeholder="passord"
                />
            </div>
            <div class="alt">
                Har du ikke en bruker? <span @click="moveToRegister">Registrer</span>
            </div>
            <button type="submit" class="btn" id="login_button">
                Logg inn
            </button>
            <div
                    class="alert"
                    role="alert"
                    id="alert_1"
            ><br>
            </div>
        </form>
    </div>
</template>

<script>
import pinia, { useAuthStore } from '@/stores';
import loginService from "@/services/loginService";

export default {
    store: true,

    data() {
        return {
            email: "",
            password: "",
        };
    },

    methods: {

        async login(){
            const store = useAuthStore(pinia);
            console.log(store.getIsLoggedIn)
            document.getElementById("alert_1").innerHTML = "";
            this.email = document.querySelector("input[name=email]").value;
            this.password = document.querySelector("input[name=password]").value;


            if (!this.email || !this.password) {
                document.getElementById("alert_1").innerHTML = "Vennligst fyll inn alle felter";
                return;
            }

            if (!/\S+@\S+\.\S+/.test(this.email)) {
                document.getElementById("alert_1").innerHTML = "Ugyldig epost";
                return;
            }

            console.log("trying to log in")


            try {
                const response = await loginService.login(this.email, this.password);
                console.log(response);
                console.log(response.status);

                if (response.status === 200) {
                    sessionStorage.setItem("token", response.data.access_token);
                    sessionStorage.setItem("refresh_token", response.data.refresh_token);
                    store.setLoggedIn();
                    store.setEmail(response.data.email);
                    store.setFirstName(response.data.firstname);
                    store.setLastName(response.data.lastname);
                    store.setUserId(response.data.id);
                    this.$router.push("/household?id=1");
                }
            } catch (error) {
                console.log("error", error.response);
                if (error.response && error.response.status === 401) {
                    document.getElementById("alert_1").innerHTML = "Feil brukernavn eller passord";
                } else {
                    document.getElementById("alert_1").innerHTML = "En feil oppstod under innlogging";
                }
            }
        },

        moveToRegister() {
            this.$router.push("/register");
        }
    }
}
</script>

<style scoped>

form {
    width: 100%;
    max-width: 330px;
    margin: auto;
    padding: 10px;
    border: 2px solid black;
    border-radius: 5px;
    background-color: #f5f5f5;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
}

button{
    width: 70%;
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    overflow-x: hidden;
}
.input {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}
.input > label {
    text-align: start;
}
.input > input {
    margin-top: 6px;
    height: 38px !important;
}

.btn {
    position: relative;
    left: 50%;
    padding: 1em 2.5em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 700;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    transform: translateX(-50%);
}
.btn:hover {
    background-color: #49a078;
    box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translate(-50%, -3px);
}
.btn:active {
    transform: translate(-50%, -1px);
}

.alt {
    text-align: center;
}
.alt > span {
    color: #0d6efd;
    cursor: pointer;
}

.alert {
    color: red;
}
</style>