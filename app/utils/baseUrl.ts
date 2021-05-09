const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://e-commerce-delta-dun.vercel.app/'
    : 'http://localhost:3000/'

export default baseUrl
