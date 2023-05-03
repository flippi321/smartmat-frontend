import { mount } from '@vue/test-utils';
import WeekPlannerComponent from '@/components/WeekPlannerComponent.vue';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import sinon from 'sinon';
import axios from 'axios';


describe('WeekPlannerComponent.vue', () => {

    let axiosStub;

    beforeEach(() => {
        axiosStub = sinon.stub(axios, 'request');
        axiosStub.withArgs(sinon.match({ url: sinon.match(/\/api\/recipes\/weekRecommender\/\d+/) })).resolves({
            data: [
                {
                    id: 1,
                    name: 'Test Recipe',
                    imageUrl: 'test-image-url',
                    description: 'Test description',
                },
                {
                    id: 2,
                    name: 'Test Recipe 2',
                    imageUrl: 'test-image-url-2',
                    description: 'Test description 2',
                },
                {
                    id: 3,
                    name: 'Test Recipe 3',
                    imageUrl: 'test-image-url-3',
                    description: 'Test description 3',
                },
                {
                    id: 4,
                    name: 'Test Recipe 4',
                    imageUrl: 'test-image-url-4',
                    description: 'Test description 4',
                },
                {
                    id: 5,
                    name: 'Test Recipe 5',
                    imageUrl: 'test-image-url-5',
                    description: 'Test description 5',
                },
                {
                    id: 6,
                    name: 'Test Recipe 6',
                    imageUrl: 'test-image-url-6',
                    description: 'Test description 6',
                },
                {
                    id: 7,
                    name: 'Test Recipe 7',
                    imageUrl: 'test-image-url-7',
                    description: 'Test description 7',
                },

            ],
        });
        axiosStub.withArgs(sinon.match({ url: sinon.match(/\/api\/recipes\/missingIngredients\/\d+\/\d+/) })).resolves({
            data: [
                {
                    "id": 1,
                    "name": "Missing Ingredients of: Eggerøre",
                    "description": "Missing items",
                    "ingredients": []
                },
                {
                    "id": 1,
                    "name": "Eggerøre",
                    "description": "En enkel og deilig frokostrett laget med egg, melk og smør.",
                    "ingredients": [
                        {
                            "id": 1,
                            "name": "Melk",
                            "amount": 0,
                            "unit": "L"
                        },
                        {
                            "id": 2,
                            "name": "Egg",
                            "amount": 4,
                            "unit": "stk"
                        }
                    ]
                }
            ],
        });
    });

    afterEach(() => {
        axiosStub.restore();
    });

    describe('WeekPlannerComponent.vue', () => {
        it('renders the component', () => {
            const wrapper = mount(WeekPlannerComponent);
            expect(wrapper.exists()).toBe(true);

        });

        it('generates a weekly menu when the button is clicked', async () => {
            const wrapper = mount(WeekPlannerComponent);
            const button = wrapper.find('.btn');
            await button.trigger('click');
            expect(wrapper.vm.weeklyMenu.length).toBe(7);
        });


        it('displays the correct number of people in the input field', async () => {
            const wrapper = mount(WeekPlannerComponent);
            const input = wrapper.find('#nrOfPeople');
            const numberOfPeople = 4;
            await input.setValue(numberOfPeople);
            expect(wrapper.vm.nrOfPeople).toBe(numberOfPeople);
        });

        it('displays the weekly menu', async () => {
            const wrapper = mount(WeekPlannerComponent);
            await wrapper.setData({
                weeklyMenu: [
                    { name: 'Pasta bolognese', description: 'Pasta med kjøttsaus' },
                    { name: 'Taco', description: 'Taco med kjøttdeig, salat, tomat, mais, agurk, løk, ost, salsa og rømme' },
                    { name: 'Kylling tikka masala', description: 'Kylling i tikka masala med ris' },
                    { name: 'Fiskegrateng', description: 'Fiskegrateng' },
                    { name: 'Laks med ris', description: 'Laks med ris og grønnsaker' },
                    { name: 'Hamburger', description: 'Hamburger med salat, tomat, agurk, løk og ost' },
                    { name: 'Pizza', description: 'Pizza med tomatsaus, skinke, ost og bacon' },
                ],
            });
            const dinners = wrapper.findAll('.dinner-item');
            expect(dinners.length).toBe(7);
        });
    });

});



