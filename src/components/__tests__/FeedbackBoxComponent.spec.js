import { mount } from "@vue/test-utils";
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import Vuex from "vuex";
import FeedbackBoxComponent from "@/components/FeedbackBoxComponent.vue";





describe("FeedbackBoxComponent", () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                feedback: null,
            },
            mutations: {
                setFeedback(state, feedback) {
                    state.feedback = feedback;
                },
            },
        });

        wrapper = mount(FeedbackBoxComponent, {
            props: {
                message: "This is a success message",
                type: "success",
            },
            global: {
                plugins: [store],
            },
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("renders the feedback message", () => {
        expect(wrapper.find("p").text()).toBe("This is a success message");
    });

})
