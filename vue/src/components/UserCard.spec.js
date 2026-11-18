import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UserCard from './UserCard.vue'

describe('UserCard', () => {
  const user = {
    id: 1,
    name: 'Leanne Graham',
    email: 'leanne@example.com',
    address: {
      city: 'Quito',
    },
  }

  it('muestra el usuario y emite el evento de favorito', async () => {
    const wrapper = mount(UserCard, {
      props: {
        user,
        isFavorite: false,
      },
    })

    expect(wrapper.text()).toContain('Leanne Graham')

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('toggle-favorite')).toEqual([[1]])
  })
})
