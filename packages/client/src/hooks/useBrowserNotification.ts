import * as React from 'react'

type Options = NotificationOptions & {
  click: (this: Notification, event: Event) => unknown
}

export const useBrowserNotification = (
  title: string,
  options?: Options
): { notify: () => void; close: () => void } => {
  const [hasPermission, setHasPermission] = React.useState<boolean>(
    Notification?.permission === 'granted'
  )
  const notification = React.useRef<Notification | null>(null)

  const notify = React.useCallback((): void => {
    if (hasPermission) {
      notification.current = new Notification(title, options)
      if (typeof options?.click === 'function') {
        notification.current?.addEventListener('click', options.click)
      }
    }
  }, [hasPermission, options, title])

  const close = (): void => {
    notification.current?.close()
  }

  React.useEffect(() => {
    if ('Notification' in window && !hasPermission) {
      Notification.requestPermission().then(status =>
        setHasPermission(status === 'granted')
      )
    }
  }, [hasPermission, notification, options])

  return {
    notify,
    close,
  }
}
