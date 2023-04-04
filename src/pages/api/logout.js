import { withIronSessionApiRoute } from 'iron-session/next'

function logoutRoute(req, res) {
  req.session.destroy()
  res.json({ isLoggedIn: false, login: '', avatarUrl: '' })
}

export default withIronSessionApiRoute(logoutRoute)
