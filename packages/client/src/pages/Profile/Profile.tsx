import * as React from 'react'
import { Navigate } from 'react-router'
import { routes } from '../../routes'
import { Flex, Upload, UploadProps } from 'antd'
import defaultAvatar from '../../assets/defaultAvatar.png'
import { Button } from './components'
import {
  initialData,
  cardStyle,
  fieldStyle,
  isAuthenticated,
  baseApi,
  customRequest,
  fetchData,
} from './utils'
import { UserType } from './types'
import cn from 'classnames'
import css from './Profile.module.css'
import { ChangePassword } from './components/ChangePassword'

export const Profile: React.FC = () => {
  const [userData, setUserData] = React.useState<UserType>(initialData)
  const [isOpenPopup, setIsOpenPopup] = React.useState(false)

  const props: UploadProps = {
    showUploadList: false,
    maxCount: 1,
    customRequest: ({ file }) => customRequest(file, setUserData),
  }

  const avatarPath = userData.avatar
    ? `${baseApi}/resources/${userData.avatar}`
    : defaultAvatar

  React.useEffect(() => {
    fetchData(setUserData)
  }, [])

  if (!isAuthenticated) {
    return <Navigate to={routes.signin()} replace />
  }

  return (
    <>
      <Flex style={cardStyle} justify="center" align="center">
        <div className={cn(css.root, css.boundary)}>
          <Flex gap={50} justify="center" vertical align="center">
            <Upload {...props} maxCount={1}>
              <div className={cn(css.avatarWrapper, css.boundary)}>
                <img
                  src={avatarPath}
                  width={200}
                  height={200}
                  alt="Аватар"
                  className={css.avatarImg}
                />
              </div>
            </Upload>
            <div className={css.content}>
              <p className={css.fullName}>
                {userData?.first_name} {userData.second_name}
              </p>
              <Flex style={fieldStyle} justify="space-between">
                <div className={css.label}>Login:</div>
                <div>{userData.login}</div>
              </Flex>
              <Flex style={fieldStyle} justify="space-between">
                <div className={css.label}>Email:</div>
                <div>{userData.email}</div>
              </Flex>
              <Flex style={fieldStyle} justify="space-between">
                <div className={css.label}>Phone:</div>
                <div>{userData.phone}</div>
              </Flex>
              <div style={{ textAlign: 'center' }}>
                <Button onClick={(): void => setIsOpenPopup(true)}>
                  Поменять пароль
                </Button>
                <Upload {...props}>
                  <div>
                    <Button>Поменять аватар</Button>
                  </div>
                </Upload>
              </div>
            </div>
          </Flex>
        </div>
      </Flex>
      <ChangePassword
        isOpen={isOpenPopup}
        closePopup={(): void => setIsOpenPopup(false)}
      />
    </>
  )
}
