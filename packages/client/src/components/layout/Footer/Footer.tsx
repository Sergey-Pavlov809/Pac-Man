import * as React from 'react'
import { Layout, Avatar, Tooltip, Typography } from 'antd'

import css from './Footer.module.css'

export const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <Layout.Footer className={css.root}>
      <Typography.Text type="secondary">
        {year}. Сделано командой учеников Яндекс Практикума{' '}
      </Typography.Text>
      <Avatar.Group>
        {contributors.map(contrib => (
          <Tooltip key={contrib.name} title={contrib.name} placement="top">
            <a href={contrib.url}>
              <Avatar style={{ backgroundColor: 'blue' }}>
                {contrib.name.split('')[0]}
              </Avatar>
            </a>
          </Tooltip>
        ))}
      </Avatar.Group>
    </Layout.Footer>
  )
}
