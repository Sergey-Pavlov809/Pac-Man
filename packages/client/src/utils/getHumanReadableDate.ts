// TODO: change to date-fns getHumanReadableDate
export const getHumanReadableDate = (time: string): string => {
  const messageDate = new Date(Date.parse(time))
  const now = new Date(Date.now())

  if (
    now.getFullYear() !== messageDate.getFullYear() ||
    now.getMonth() !== messageDate.getMonth() ||
    now.getDate() - messageDate.getDate() > 6
  ) {
    return `${messageDate.getDate()}.${messageDate.getMonth()}.${messageDate.getFullYear()}`
  }

  const minutes = messageDate.getMinutes()
  const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`

  return `${messageDate.getHours()}:${formattedMinutes}`
}
