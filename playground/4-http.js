// http request whitout library

const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=11efe9a35c8893e921ab3e013d7fb042&query=37.8267,-122.4233'

const request = http.request(url,(response)=>{
    let data = ''
    response.on('data',chunk =>{
        data = data + chunk.toString()
    })

    response.on('end',()=>{
        const body = JSON.parse(data)
        console.log(body);
    })
     
})

request.on('error',error=>{
    console.log('An error!');
})

request.end()