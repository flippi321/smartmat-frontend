import { describe, it, beforeEach, expect } from 'vitest'
// imports
import { mount } from "@vue/test-utils";
import UserComponent from "@/components/UserComponent.vue";
import { createStore } from "vuex";

// Mocking the database
const user = {
    id: 1,
    firstName: "Teodor",
    lastName: "Birkeland",
    email: "teodorbi@stud.ntnu.no",
    password: "1234",
};

// Creating a store
const store = createStore({
    state: {
        user,
    },
});

describe("UserComponent.vue", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(UserComponent, {
            global: {
                plugins: [store],
            },
            propsData: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    });

    it("renders user information", () => {
        expect(wrapper.find("h1").text()).toBe("User Information");

        const inputs = wrapper.findAll("input[type='text'][disabled]");
        expect(inputs[0].element.value).toBe(user.id.toString());
        expect(inputs[1].element.value).toBe(user.firstName);
        expect(inputs[2].element.value).toBe(user.lastName);
        expect(inputs[3].element.value).toBe(user.email);
    });


    it("enables input fields when edit icon is clicked", async () => {
        const editIcons = wrapper.findAll("img.edit-img");

        await editIcons[0].trigger("click");
        expect(wrapper.vm.editId).toBe(true);

        await editIcons[1].trigger("click");
        expect(wrapper.vm.editFirstName).toBe(true);

        await editIcons[2].trigger("click");
        expect(wrapper.vm.editLastName).toBe(true);

        await editIcons[3].trigger("click");
        expect(wrapper.vm.editEmail).toBe(true);
    });

    it("disables input fields after saving changes", async () => {
        // Enable edit mode for at least one input field by triggering a click event on the corresponding edit icon
        const editFirstNameIcon = wrapper.find("input[type='text'][disabled] + img");
        await editFirstNameIcon.trigger("click");
        await wrapper.vm.$nextTick();

        const saveButton = wrapper.find("button");

        await wrapper.vm.$nextTick();

        await saveButton.trigger("click");

        //expect(wrapper.vm.editId).toBe(false);
        expect(wrapper.vm.editFirstName).toBe(false);
        expect(wrapper.vm.editLastName).toBe(false);
        expect(wrapper.vm.editEmail).toBe(false);
    });
});
