/** TODO: временно для проверки в DEV режиме, после можно убрать **/
export const serviceWorkerDEV = import.meta.env.DEV
import serviceWorkerUrlDEV from '../serviceWorker?url'
const serviceWorkerUrl = serviceWorkerDEV
  ? serviceWorkerUrlDEV
  : './serviceWorker.js'

function checkCompatibility(reporting = true): boolean {
  if (!('serviceWorker' in navigator)) {
    reporting && console.warn('ServiceWorker is not supported')
    return false
  }
  if (!caches) {
    reporting && console.warn('Caches is not supported')
    return false
  }
  return true
}

export function registerServiceWorker(reporting = true): void {
  if (!checkCompatibility(reporting)) {
    return
  }
  navigator.serviceWorker
    .register(serviceWorkerUrl)
    .then(registration => {
      reporting &&
        console.log(
          'SW registration successful with scope: ',
          registration.scope
        )
    })
    .catch((error: string) => {
      reporting && console.warn('SW registration failed: ', error)
    })
}

export function unregisterServiceWorker(reporting = true): void {
  if (!checkCompatibility(reporting)) {
    return
  }
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
      registration.unregister()
      reporting && console.log('SW unregistered: ', registration)
    }
  })
}
