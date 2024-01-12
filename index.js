const { use } = require('express/lib/application')
const mongoose = require('mongoose')

mongoose.connect('your MongoDB link')

const User = mongoose.model('User', {
    username: String,
    edad: Number,
})

const crear = async () => {
    const user = new User({ username: 'chanchito triste', edad: 25 })
    const savedUser = await user.save()
    console.log(savedUser)
}

// crear()

const buscarTodo = async () => {
    const users = await User.find()
    console.log(users)
}

// buscarTodo()

const buscar = async () => {
    const user = await User.find({ username: 'chanchito feliz' })
    console.log(user)
}

// buscar()

const buscarUno = async () => {
    const user = await User.findOne({ username: 'chanchito feliz' })
    console.log(user)
}

// buscarUno()

const actualizar = async () => {
    const user = await User.findOne({ username: 'chanchito feliz' })
    console.log(user)
    user.edad = 30
    await user.save()
}

// actualizar()

const destroy = async () => {
    const user = await User.findOne({ username: 'chanchito triste' })
    console.log(user)
    if (user) {
        await user.deleteOne()
    }
}

// destroy()