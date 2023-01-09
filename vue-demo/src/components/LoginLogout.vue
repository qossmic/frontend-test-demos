<!-- *********************************
 * Extremely rudimentary login fake
 ********************************** -->
<template>
    <div class="login-container">
        <button @click="handleButtonClick" class="login-logout-button" data-testid="loginLogoutButton">
            <span v-if="!isLoggedIn">Login</span>
            <span v-else>Logout</span>
        </button>
        <div class="login-modal" v-if="isModalVisible">
            <div v-if="!isLoggedIn" class="form-row">
                <label>Username</label>
                <input type="text" data-testid="loginUsernameField" v-model="usernameField" />
            </div>
            <div v-if="!isLoggedIn" class="form-row">
                <label>Password</label>
                <input type="text" data-testid="loginPasswordField" v-model="passwordField" />
                <div class="error-message">
                    <span v-if="hasFormErrors">Wrong credentials</span>
                </div>
            </div>

            <div>
                <button @click="handleLoginButtonClick(true)" data-testid="loginSubmitButton">
                    <span>Login</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { loginStatus } from "@/store/loginStatus";


let isLoggedIn = ref(loginStatus.isLoggedIn);
let isModalVisible = ref(false);
let usernameField = ref("");
let passwordField = ref("");
let hasFormErrors = ref(false);

isLoggedIn.value = loginStatus.isLoggedIn;

function handleButtonClick() {
    isLoggedIn.value === true ? setLoginStatus(false) : toggleModal();
}

function setLoginStatus(newValue) {
    loginStatus.setIsLoggedIn(newValue);
    isModalVisible.value = false;
}

function toggleModal() {
    isModalVisible.value = !isModalVisible.value;
}

function handleLoginButtonClick() {
    if (usernameField.value === "user" && passwordField.value === "test123") {
        setLoginStatus(true);
    } else {
        hasFormErrors.value = true;
    }
}

</script>

<style>
.login-container {
    position: relative;
}

.login-logout-button {
    border: none;
    background-color: transparent;
}

.login-modal {
    position: absolute;
    top: 0;
    right: 0;
    background: white;
    border: 1px solid lightgray;
    padding: 20px;
    width: 250px;
}

.error-message {
    color: red;
    height: 1.5em;
}

.form-row {
    margin-top: 10px
}
.form-row:first-child {
    margin-top: 0;
}

label {
    display: inline-block;
    margin-bottom: 5px;
}
</style>