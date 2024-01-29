import * as React from 'react'
import { useNavigate } from 'react-router'

import { Button, Flex, Typography, Col, Row } from 'antd'

import { Paths } from 'config/constants'
import css from './Main.module.css'
import { Pacman } from './components'

const { Title, Text } = Typography

export const Main: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigate = (): void => {
    navigate(Paths.Game)
  }

  return (
    <Flex vertical gap="middle">
      <div className={css.descriptionContainer}>
        <Flex className={css.description} vertical align="center" gap="middle">
          <Title level={4} style={{ color: 'white' }}>
            Попробуй себя в роли голодного жёлтого героя, который должен
            уклоняться от призраков и собирать точки. Прояви ловкость и тактику,
            чтобы победить в этом веселом квесте!
          </Title>
          <Button onClick={handleNavigate} type="primary" size="large">
            Играть
          </Button>
        </Flex>
        {typeof window !== 'undefined' && <Pacman />}
      </div>
      <Row>
        <Col span={2} />
        <Col span={20}>
          <Title level={2}>Геймплей аркадной игры</Title>
          <Text>
            Экран игры занимает собой лабиринт, коридоры которого заполнены
            точками. Задача игрока — управляя Пакманом, съесть все точки в
            лабиринте, избегая встречи с привидениями, которые гоняются за
            героем. В начале каждого уровня призраки находятся в недоступной
            Пакману прямоугольной комнате в середине уровня, из которой они со
            временем освобождаются. Если привидение дотронется до Пакмана, то
            его жизнь теряется, призраки и Пакман возвращаются на исходную
            позицию, но при этом прогресс собранных точек сохраняется. Если при
            столкновении с призраком у Пакмана не осталось дополнительных
            жизней, то игра заканчивается. После съедения всех точек начинается
            новый уровень в том же лабиринте. По бокам лабиринта находятся два
            входа в один туннель, при вхождении в который Пакман и призраки
            выходят с другой стороны лабиринта. Всего в лабиринте находятся 240
            маленьких точек и 4 большие, известные как энерджайзеры. За съедение
            маленькой точки даётся 10 очков, а за съедение энерджайзера — 50.
            Таким образом, в общей сложности все точки в лабиринте стоят 2600
            очков. При съедении Пакманом энерджайзера на ранних уровнях призраки
            в лабиринте на короткое время входят в режим испуга, резко меняют
            направление движения и перекрашиваются в синий цвет. За это время
            Пакман способен съесть призраков посредством столкновения с ними,
            которое безопасно. От съеденного привидения остаются только глаза,
            которые возвращаются в центр лабиринта, где призрак вновь оживает и
            отправляется в погоню за Пакманом. За съедение первого призрака
            после получения энерджайзера даётся 200 очков. За съедение каждого
            следующего привидения при эффекте того же энерджайзера даётся в два
            раза больше: 400, 800 и 1600 соответственно. Таким образом, при
            съедении всех призраков после каждого эффекта энерджайзера игрок
            может заработать за один уровень 12 000 очков.
          </Text>
        </Col>
        <Col span={2} />
      </Row>
    </Flex>
  )
}
