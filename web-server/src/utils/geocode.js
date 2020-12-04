const request = require('request')



const geoCode = (adress,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${decodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiZmFjdW45MCIsImEiOiJja2h0Y2sxN3cwbXZjMnVxbzNreDZmdmJoIn0.2kEQRd1fH8XpOy2htrGefA&limit=1`
  
    request({url:url,json:true},(error,response)=>{
      if (error){
        callback('Unable to connect to location services!')
      }else if (response.body.features.length==0){
        callback('Location not found, please try whit other')
      }else{
  
        callback(null, {
          latitude:response.body.features[0].center[0],
          longitud:response.body.features[0].center[1],
          location:response.body.features[0].place_name
        })
      }
  
    })
  
  }





module.exports=geoCode