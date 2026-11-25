const {Router} = require('express')
const router = Router()
const {addPost} = require('../db/queries');




router.get('/',(req, res, next)=>{
    res.render('post')
})


router.post('/',(req, res, next)=>{
    // Post logic and db
    const {post} = req.body
    // You can get req.user from the passport implication
    addPost('Anonymous', post)
    res.redirect('/')
})



module.exports = router