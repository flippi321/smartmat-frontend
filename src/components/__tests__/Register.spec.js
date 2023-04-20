import { mount } from '@vue/test-utils'
import Register from '@/components/RegisterComponent.vue'
import { describe, it, expect } from 'vitest'

describe('Register', () => {
    it('renders properly', function () {
        const wrapper = mount(Register)
        expect(wrapper.exists()).toBe(true)
    });

    it('has a form with email and password inputs', function () {
        const wrapper = mount(Register)
        const emailInput = wrapper.find('input[name="email"]')
        const passwordInput = wrapper.find('input[name="password"]')
        expect(emailInput.exists()).toBe(true)
        expect(passwordInput.exists()).toBe(true)
    });


    /**
    it('displays an error if the passwords do not match', async () => {
        const wrapper = mount(Register)
        await wrapper.find('[name="firstName"]').setValue('John')
        await wrapper.find('[name="lastName"]').setValue('Doe')
        await wrapper.find('[name="email"]').setValue('johndoe@example.com')
        await wrapper.find('[name="password"]').setValue('password123')
        await wrapper.find('[name="confirmPassword"]').setValue('password')

        await wrapper.find('[id="submit"]').trigger('click')
        const error = wrapper.find('#alert_1')
        expect(error.text()).toBe('Passordene er ikke like!')
    })
    */



})
