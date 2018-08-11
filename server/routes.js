const User= require('./model/User')

module.exports = (app) =>{
    app.get('/users',(req,res)=>{
        User.find()
         .then(users=> res.json(users))
         .catch(err=> console.log('Users not found ', err))
    })
    
    app.post('/newUser', (req,res)=>{
        const {name,email,phone}= req.body 
        const user = new User({
            name,
            email,
            phone
        })
        user.save()
        .then(user=>res.json(user))
        .catch(err=>console.log('error saving new user ', err))
    })
    
    app.delete('/deleteUser/:id',(req,res)=>{
        User.findOneAndRemove({_id:req.params.id})
        .then(users=>res.json(users))
        .catch(err=>console.log('error during deleting user', err))
    })
}