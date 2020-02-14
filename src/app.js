const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const foreCast = require('./utils/forecast');


const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');
const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hamed Rahimi'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: "Hamed Rahimi"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure maiores facere in quidem recusandae provident dolore laboriosam ipsum nemo odio pariatur reprehenderit alias, vero incidunt. Dolores beatae exercitationem ex voluptas!',
        name: "Hamed Rahimi"
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.json([
            { error: 'You must Provide forecast and location' }
        ])
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        foreCast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.json([{
            ErrorMessage: 'You must Provide a search term'
        }])
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        titile: 404,
        name: 'Hamed Rahimi',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        titile: 404,
        name: 'Hamed Rahimi',
        errorMessage: 'Page Not Found'
    })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
})