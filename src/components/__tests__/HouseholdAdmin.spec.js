import { mount } from "@vue/test-utils";
import HouseholdAdminComponent from "@/components/HouseholdAdminComponent.vue";
import {describe, it, expect, beforeEach} from "vitest";

const testMembers = [
    {
        firstname: "John",
        lastname: "Doe",
    },
    {
        firstname: "Jane",
        lastname: "Doe",
    },
];

const testHouseHold = {
    name: "Test Household",
    invitationNr: "123456",
    fridge: { name: "Test Fridge" },
    shoppinglist: { name: "Test Shopping List" },
};

describe("HouseholdAdminComponent", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(HouseholdAdminComponent, {
            props: {
                id: 1,
                members: testMembers,
                houseHold: testHouseHold,
            },
        });
    });

    it("renders the household name, fridge name, and shopping list name", () => {
        expect(wrapper.find("h1").text()).toBe(testHouseHold.name);
        expect(wrapper.find("#fridge-name").element.value).toBe(testHouseHold.fridge.name);
        expect(wrapper.find("#shoppinglist-name").element.value).toBe(testHouseHold.shoppinglist.name);
    });

    it("renders the list of members", () => {
        const memberItems = wrapper.findAll("li");

        testMembers.forEach((member, index) => {
            const memberItem = memberItems[index];
            expect(memberItem.text()).toBe(`${member.firstname} ${member.lastname}`);
        });
    });

    it("emits an updateInformation event with the correct payload when the 'Oppdater' button is clicked", async () => {
        const newHouseholdName = "New Household Name";
        const newFridgeName = "New Fridge Name";
        const newShoppingListName = "New Shopping List Name";

        await wrapper.find("#household-name").setValue(newHouseholdName);
        await wrapper.find("#fridge-name").setValue(newFridgeName);
        await wrapper.find("#shoppinglist-name").setValue(newShoppingListName);

        await wrapper.find("button").trigger("click");

        const emittedEvent = wrapper.emitted("updateInformation");
        expect(emittedEvent).toHaveLength(1);
        expect(emittedEvent[0]).toEqual([
            {
                householdName: newHouseholdName,
                fridgeName: newFridgeName,
                shoppingListName: newShoppingListName,
            },
        ]);
    });

    it("renders the invitation number", () => {
        expect(wrapper.find("p").text()).toContain(testHouseHold.invitationNr);
    });

    it("updates the input fields when houseHold prop changes", async () => {
        const newHouseHold = {
            ...testHouseHold,
            name: "Updated Household",
            fridge: { name: "Updated Fridge" },
            shoppinglist: { name: "Updated Shopping List" },
        };

        await wrapper.setProps({ houseHold: newHouseHold });

        expect(wrapper.find("#household-name").element.value).toBe(newHouseHold.name);
        expect(wrapper.find("#fridge-name").element.value).toBe(newHouseHold.fridge.name);
        expect(wrapper.find("#shoppinglist-name").element.value).toBe(newHouseHold.shoppinglist.name);
    });

    it("does not emit updateInformation event when all input fields are empty", async () => {
        await wrapper.find("#household-name").setValue("");
        await wrapper.find("#fridge-name").setValue("");
        await wrapper.find("#shoppinglist-name").setValue("");

        await wrapper.find("button").trigger("click");

        const emittedEvent = wrapper.emitted("updateInformation");
        expect(emittedEvent).toBeUndefined();
    });
});

