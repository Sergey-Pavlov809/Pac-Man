import { render } from '@testing-library/react'
import { useGameinitialization } from './useGameinitialization'
import { Game } from './Game'

// Мокаем хук useGameinitialization
jest.mock('./useGameinitialization')

describe('Game Component', () => {
  it('renders without crashing', () => {
    // Рендерим компонент
    render(<Game />)

    // Убеждаемся, что хук был вызван с ref
    expect(useGameinitialization).toHaveBeenCalledWith(expect.any(Object))
  })
})
