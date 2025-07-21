import express from 'express'
import 'dotenv/config'

const app = express() //created a object

// const port = 3001;

const port = process.env.PORT || 3000

// app.get('/',(req,res)=>{
//     res.send("Hello!")
// })

// app.get("/admin",(req ,res)=>{
//     res.send("Hello admin")
// })
// app.get("/user",(req ,res)=>{
//     res.send("Hello user")
// })

app.use(express.json()) //accepting all the data ccoming in JSON format

let data = [];
let nextId = 1;


//  Adding new user
app.post('/user',(req , res)=>{
    const {name, age} = req.body //destructring data coming in format req.body.price
    const newUser = {id: nextId++ , name, age} //creating object to store it 
    data.push(newUser)
    res.status(201).send(newUser)

})


// get all user
app.get('/user',(req,res)=>{   // displaying complete array
    res.status(200).send(data)
})


// get user with id
app.get('/user/:id',(req,res)=>{ //whatever after / will be id taking specific id to give single object
    const userDetailed = data.find(t=> t.id === parseInt(req.params.id)) // anything coming in url call it params
    if (!userDetailed){
        return res.status(404).send('User not Found')
    }
    res.status(200).send(userDetailed);
})


//update user
app.put('/user/:id',(req,res)=>{
    const userDetailed = data.find(t=> t.id === parseInt(req.params.id))
     if (!userDetailed){
        return res.status(404).send('User not Found')
    }
    const {name,age} = req.body
    userDetailed.name = name
    userDetailed.age = age
    res.send(200).send(userDetailed)
})

//delete user
app.delete('/user/:id',(req,res)=>{
    const index =   data.findIndex(t=> t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('User not found')
    }
    data.splice(index,1)
    return res.status(204).send('Deleted')
})

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
    
} )
