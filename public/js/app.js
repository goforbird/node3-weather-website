// console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



// Listen for the form to be submitted and cancel the default action of refreshing the page.
const weatherForm = document.querySelector('form')
// Extrapolate the text that's in the input field when submit button pressed.
const searchQuery = document.querySelector('input')
// Catch the <p> elements
// const messageOne = document.querySelector('p') // querySelector matches the very first p tag in the doc. Instead, use ID
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

// messageOne.textContent = 'From Javascript' // use textContent to change value of the html element, in this case a <p> tag.

const getWeather = (location) => {
    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
    fetch(url).then((response)=> {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        }
    })
})
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchQuery.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    getWeather(location)
})


