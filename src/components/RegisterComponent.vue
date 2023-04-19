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
                <input type="email" id="email" name="email" placeholder="example@gmail.com">
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
            <button type="submit" class="btn">Registrer</button>
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
    min-height: 75vh;
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
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    transform: translateX(-50%);
}
.btn:hover {
    background-color: #49a078;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
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