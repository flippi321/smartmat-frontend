<template>
    <div class="container">
        <form @submit.prevent = "register">
            <h2>Opprett en bruker</h2>
            <div class="input">
                <label for="">Fornavn</label>
                <input type="text" id="firstName" name="firstName" placeholder="Fornavn">
            </div>

            <div class="input">
                <label for="">Etternavn</label>
                <input type="text" id="lastName" name="lastName" placeholder="Etternavn">
            </div>

            <div class="input">
                <label for="email">Epost</label>
                <input type="text" id="email" name="email" placeholder="example@gmail.com">
            </div>

            <div class="input">
                <label for="password">Passord</label>
                <input type="password" id="password" name="password" placeholder="passord">
            </div>

            <div class="input">
                <label for="confirmPassword">Bekreft passord</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="bekreft passord">
            </div>

            <div class="alt">
                Har du allerede en bruker? <span @click="moveToLogin">Logg inn</span>
            </div>
            <button type="submit" id="submit" class="btn">Registrer</button>
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
import registerService from "@/services/registerService";
import pinia, { useAuthStore } from "@/stores";
export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
    },

    methods: {
        async register(){
            const store = useAuthStore(pinia);
            document.getElementById("alert_1").innerHTML = "";

            this.firstName = document.querySelector("input[name=firstName]").value;
            this.lastName = document.querySelector("input[name=lastName]").value;
            this.email = document.querySelector("input[name=email]").value;
            this.password = document.querySelector("input[name=password]").value;
            this.confirmPassword = document.querySelector("input[name=confirmPassword]").value;

            if (!this.firstName.trim() || !this.lastName.trim() || !this.email.trim() || !this.password || !this.confirmPassword) {
                document.getElementById("alert_1").innerHTML = "Fyll inn alle felter!";
                return;
            }

            if (!/\S+@\S+\.\S+/.test(this.email)) {
                document.getElementById("alert_1").innerHTML = "Ugyldig epost";
                return;
            }

            if (this.password !== this.confirmPassword) {
                document.getElementById("alert_1").innerHTML = "Passordene er ikke like!";
                return;
            }

            if (this.password.length < 8) {
                document.getElementById("alert_1").innerHTML = "Passordet må være minst 8 tegn!";
                return;
            }

            const user = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
            };

            try {
                const response = await registerService.registerUser(user);
                console.log(response);
                console.log(response.status);

                if (response.status === 200) {
                    sessionStorage.setItem("token", response.data.access_token);
                    store.setLoggedIn();
                    store.setEmail(response.data.email);
                    store.setFirstName(response.data.firstname);
                    store.setLastName(response.data.lastname);
                    store.setUserId(response.data.id);
                    this.$router.push("/joinHousehold");
                }
            } catch (error) {
                console.log("error", error.response);
                if (error.response && error.response.data && error.response.data) {
                    document.getElementById("alert_1").innerHTML = "Noe gikk galt: " + error.response.data;
                } else {
                    document.getElementById("alert_1").innerHTML = "En feil oppstod under registrering";
                }
            }


        },

        moveToLogin() {
            this.$router.push("/login");
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