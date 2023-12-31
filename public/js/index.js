
console.log("file is load");

const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()

    const location = search.value;

    messageOne.textContent = 'loarding...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('/weather?address='+ location)
        .then( (res) => {
            return res.json()
        })

        .then((data) => {
            if(data.error)
            {
                messageOne.textContent = data.error;
            }

            else
            {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.temp_forecast;
                messageThree.textContent = data.wind_forecast;
            }
        })

        .catch(() => messageOne.textContent = "net not connected")
    })
    