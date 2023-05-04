import { describe, it, beforeEach, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import UserComponent from '@/components/UserComponent.vue'
import router from '@/router'

describe('UserComponent.vue', () => {
    let store
    let state
    let actions
    let wrapper

    const user = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
    }

    beforeEach(() => {
        state = {
            user: {
                ...user,
            },
        }

        store = createStore({
            modules: {
                auth: {
                    state,
                    actions,
                    namespaced: true,
                },
            },
        })

        wrapper = shallowMount(UserComponent, {
            propsData: {
                id: user.id,
                user,
            },
            global: {
                plugins: [store],
                mocks: {
                    $router: router,
                },
            },
        })
    })

    it('renders the user information correctly', () => {
        expect(wrapper.find('h1').text()).toBe('User Information')
        expect(wrapper.find('strong').text()).toBe('User ID:')
        expect(wrapper.find('[type="text"]').element.value).toBe(user.firstname)
    })

    it('renders the correct user ID', () => {
        expect(wrapper.find('[style="margin-left: 10px;"]').text()).toBe(String(user.id))
    })

    it('renders the correct user email', () => {
        const emailInput = wrapper.findAll('[type="text"]').filter(input => input.element.value === user.email)[0]
        expect(emailInput.element.value).toBe(user.email)
    })

    it('toggles edit mode when clicking the edit icons', async () => {
        const editIcons = wrapper.findAll('[alt="Edit"]')
        const firstIcon = editIcons[0]

        expect(wrapper.vm.editFirstName).toBe(false)
        await firstIcon.trigger('click')
        expect(wrapper.vm.editFirstName).toBe(true)
    })
})
