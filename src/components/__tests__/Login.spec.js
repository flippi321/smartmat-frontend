import { mount } from "@vue/test-utils";
import Login from "@/components/LoginComponent.vue";
import { describe, it, expect, beforeEach } from "vitest";
import sinon from "sinon";

describe("Login.vue", () => {
    let wrapper;
    let routerPushMock;

    beforeEach(() => {
        routerPushMock = sinon.spy();
        wrapper = mount(Login, {
            global: {
                mocks: {
                    $router: {
                        push: routerPushMock,
                    },
                },
            },
        });
    });

    it("renders the login form", () => {
        expect(wrapper.find("h2").text()).toBe("Logg inn");
        expect(wrapper.find("input[name='email']").attributes("placeholder")).toBe("eksempel@email.com");
        expect(wrapper.find("input[name='password']").attributes("placeholder")).toBe("passord");
    });

    it("moves to the register page when 'Registrer' is clicked", async () => {
        await wrapper.find(".alt span").trigger("click");
        expect(routerPushMock.calledWith("/register")).toBe(true);
    });
});
