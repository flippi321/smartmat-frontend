import { shallowMount } from "@vue/test-utils";
import {describe, it, expect} from "vitest"
import Login from "@/components/LoginComponent.vue";

describe("Login", () => {
    it("renders successfully", () => {
        const wrapper = shallowMount(Login);
        expect(wrapper.exists()).toBe(true);
    });

    it("has a form with email and password inputs", () => {
        const wrapper = shallowMount(Login);
        const emailInput = wrapper.find('input[name="email"]');
        const passwordInput = wrapper.find('input[name="password"]');
        expect(emailInput.exists()).toBe(true);
        expect(passwordInput.exists()).toBe(true);
    });

    it("has a submit button", () => {
        const wrapper = shallowMount(Login);
        const submitButton = wrapper.find('button[type="submit"]');
        expect(submitButton.exists()).toBe(true);
    });
});



