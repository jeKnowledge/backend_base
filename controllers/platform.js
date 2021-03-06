import express from 'express'
import { render_view, redirectLogin } from '../utils'
import { User } from '../models'
import routes from '../routes.json'
import controllers from './index';

let router = express.Router()

router.get('/', redirectLogin, (_ ,res) => {
  render_view(res, "platform/index")
})

router.post('/logout', (req, _)=>{
  req.session = null
})

router.get('/show_profile',redirectLogin, (req, res)=>{
  let user = User.get(req.session.id)
  render_view(res, 'platform/show_profile', { user })
})

router.get('/delete_profile', redirectLogin, (req, res)=>{
  User.destroy(req.session.id)
  return res.redirect('/logout')
})

router.get('/edit_profile', redirectLogin, (req, res)=>{
  let user = User.get(req.session.id)
  render_view(res, 'platform/edit_profile', {user})
})

router.post('/edit_profile', (req, res)=>{
  let user = User.update(req.session.id, {
    username: req.body.username,
    email: req.body.email  
  })
  render_view(res, 'platform/show_profile', {user})
})

export default router