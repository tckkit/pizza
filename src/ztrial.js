const form = document.querySelector('#form')
const input = document.querySelector('#input')

form.addEventListener('submit', async event => {
    event.preventDefault()
    const file = input.files[0]
    console.log(file)
})