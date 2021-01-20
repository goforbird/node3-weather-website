const { response } = require('express')
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine to know where views are
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory for Express to serve
app.use(express.static(publicDirectoryPath))


// app.get('', ( req, res ) => { // (route, function (obj containing info about incoming request, response))
//     res.send('<h1>HOME PAGE FTFW</h1>')
// }) 

app.get('', ( req, res ) => { // handlebars
    res.render('index', {
        title: 'Weather',
        name: 'Jim'
    })
}) 

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jim'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is some helpful text.',
        name: 'Jim'
    })
})

// app.get('/help', ( req, res ) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     },{
//         name: 'Sarah',
//         age: 26
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1> A Title</h1>')
// } )

// app.get('/products', (req,res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You gotta fucking search you moron.'
//         })
//     }
//     res.send({
//         products: []
//     })
// })

app.get('/weather', (req, res) => {
    const {address} = req.query
    if (!address) {
        return res.send({
            error: 'You didnt provide an address to search'
        })
    }    

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        // const {latitude, longitude, location} = data  // Can put this in the arguments list instead in place of data
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                address,
                forecast: forecastData,
                location
            })
        })
    })



    
} )

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        errorMsg: 'Help page not found',
        name: 'Jim'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Generic 404 error text',
        title: '404 Error',
        name: 'Jim'
    })

})

app.listen(3000, () => { console.log('Server is up on port 3000') }) // port 3000 is a common developer port (port, optional callback when server is started up)