const loadInitialTemplate = () => {
    const template = `
        <h1>Usuarios</h1>
        <form id="user-form">
            <div>
                <label>Nombre</label>
                <input name = "name" />
            </div>
            <div>
                <label>Apellido</label>
                <input name = "lastname" />
            </div>
            <button type="submit">Enviar</button>
        </form>
        <ul id="users-list"></ul>

        <footer align="center">
        © Hola Mundo 2024 - Todos los derechos reservados
        </footer>
    `
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template
}

const getUsers = async () => {
    const response = await fetch('/users')
    const users = await response.json()
    const template = user => `
        <li>
            ${user.name} ${user.lastname} <button data-id="${user._id}">Eliminar</button>
        </li>
    `

    const userList = document.getElementById('users-list')
    userList.innerHTML = users.map(user => template(user)).join('')
    users.forEach(user => {
        const userNode = document.querySelector(`[data-id="${user._id}"]`)
        userNode.onclick = async e => {
            await fetch(`/users/${user._id}`, {
                method: 'DELETE',
            })
            userNode.parentNode.remove()
            alert('Eliminado con éxito')
        }
    })
}
const addFormListener = () => {
    const useForm = document.getElementById('user-form')
    useForm.onsubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(useForm)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        useForm.reset()
        getUsers()
    }
}

window.onload = () => {
    loadInitialTemplate()
    addFormListener()
    getUsers()
}