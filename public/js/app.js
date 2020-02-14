const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    messageTwo.textContent = ''
    messageOne.textContent = 'Loading...'
    e.preventDefault()
    const location = search.value
    fetchWeather(location)
})

const fetchWeather = (address) => {

    fetch(`http://localhost:5000/weather?address=${address}`)
        .then(response => {
            response.json().then((data) => {
                const { location, forecast, error } = data;
                if (data.error) {
                    messageOne.textContent = error
                }
                else {
                    if (location === undefined || forecast === undefined) {
                        messageOne.textContent = 'Please Enter a Location'
                        messageTwo.textContent = ''
                    }
                    else {
                        messageOne.textContent = `Location: ${location}`
                        messageTwo.textContent = ` ForeCast: ${forecast}`
                    }
                }
            })
        })
}



