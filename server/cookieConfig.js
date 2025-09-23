// server/cookieConfig.js
// Cookie options for secure JWT storage

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  httpOnly: true,
  secure: isProduction, // true in production (HTTPS)
  sameSite: isProduction ? 'strict' : 'lax',
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};
