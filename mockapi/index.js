const express = require("express")
const data = require("./data.json")
const cors = require("cors")

const app = express()
app.use(cors())

// app.use((req,res,next)=>{
//     setTimeout(() => {
//         next()
//     }, 2000);
// })

app.get("/api/cities",(req,res)=>{
    const cities = Object.keys(data)
    res.json(cities)
})


app.get("/api/city/:city",(req,res)=>{
    const cityData = data[req.params.city]

    if (!cityData) {
        return res.status(404).send()
    }

    res.json(cityData)
    
})


app.listen(4000, ()=>{
    console.log("app is listening on port 4000");
    
})