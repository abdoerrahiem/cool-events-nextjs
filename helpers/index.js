import cookie from 'cookie'

export const getCookies = (req) =>
  cookie.parse(req ? req.headers.cookie || '' : '')
