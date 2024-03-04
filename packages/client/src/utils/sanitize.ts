import sanitizeHtml from 'sanitize-html'

type valuesType = Record<string, string | number>

export const sanitize = (values: unknown): unknown => {
  const sanitizeValues: valuesType = {}
  const obj = values as Record<string, string>
  Object.keys(obj).forEach(key => {
    sanitizeValues[key] = sanitizeHtml(String(obj[key]))
  })
  return sanitizeValues
}
