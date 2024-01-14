import '../../tests/matchMedia.mock' // Mocking methods which are not implemented in JSDOM https://jestjs.io/docs/29.4/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { GamePage } from './GamePage'

const LayoutForTests = (
  component: React.ReactNode,
  route?: string
): JSX.Element => {
  return (
    <MemoryRouter initialEntries={[route || '/']}>{component}</MemoryRouter>
  )
}

describe('Game page', () => {
  it('it renders game rules', async () => {
    render(LayoutForTests(<GamePage />, '/game'))

    // При загрузке страницы game загружается описание цели игры
    // Проверяем: не должно быть отмеченных пунктов, должна быть кнопка "Далее"
    expect(screen.queryAllByLabelText('check').length).toBe(0)
    expect(screen.queryByText('Далее')).toBeDefined()
    expect(screen.queryByText('Назад')).toBeNull()

    // Кликнем на кнопку "Далее"
    await userEvent.click(screen.getByText('Далее'))

    // Проверяем: должен быть отмечен 1 пункт, должны быть кнопки "Далее" и "Назад"
    expect(screen.queryAllByLabelText('check').length).toBe(1)
    expect(screen.queryByText('Далее')).toBeDefined()
    expect(screen.queryByText('Назад')).toBeDefined()

    // Кликнем на кнопку "Далее"
    await userEvent.click(screen.getByText('Далее'))

    // Проверяем: должен быть отмечено 2 пункта, должны быть кнопки "Начать игру" и "Назад"
    expect(screen.queryAllByLabelText('check').length).toBe(2)
    expect(screen.queryByText('Начать игру')).toBeDefined()
    expect(screen.queryByText('Назад')).toBeDefined()

    // Кликнем на кнопку "Назад"
    await userEvent.click(screen.getByText('Назад'))

    // Проверяем: должен быть отмечен 1 пункт, должны быть кнопки "Далее" и "Назад"
    expect(screen.queryAllByLabelText('check').length).toBe(1)
    expect(screen.queryByText('Далее')).toBeDefined()
    expect(screen.queryByText('Назад')).toBeDefined()
  })
})
