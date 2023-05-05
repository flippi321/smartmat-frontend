import { mount } from "@vue/test-utils";
import Register from "@/components/RegisterComponent.vue";
import { describe, it, expect, beforeEach } from "vitest";
import sinon from "sinon";

describe("Register.vue", () => {
    let wrapper;
    let routerPushMock;

    beforeEach(() => {
        routerPushMock = sinon.spy();
        wrapper = mount(Register, {
            global: {
                mocks: {
                    $router: {
                        push: routerPushMock,
                    },
                },
            },
        });
    });


    it("renders the registration form", () => {
        expect(wrapper.find("h2").text()).toBe("Opprett en bruker");
        expect(wrapper.find("input[name='firstName']").attributes("placeholder")).toBe("Fornavn");
        expect(wrapper.find("input[name='lastName']").attributes("placeholder")).toBe("Etternavn");
        expect(wrapper.find("input[name='email']").attributes("placeholder")).toBe("example@gmail.com");
        expect(wrapper.find("input[name='password']").attributes("placeholder")).toBe("passord");
        expect(wrapper.find("input[name='confirmPassword']").attributes("placeholder")).toBe("bekreft passord");
    });

    it("moves to the login page when 'Logg inn' is clicked", async () => {
        await wrapper.find(".alt span").trigger("click");
        expect(routerPushMock.calledWith("/login")).toBe(true);
    });
});
