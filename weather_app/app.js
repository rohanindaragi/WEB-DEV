import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.render("index.ejs",{weather:null, error:null});
});

app.post("/get-weather", async (req,res)=>{
    try{
        const city = req.body.city;
        const apiKey = "c12aded28448c80f20246c1d146fd4d6";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const result = await axios.get(url);
        const temp = result.data.main.temp;
        res.render("index.ejs", {
            weather: {
                city: result.data.name,
                temp: temp,
                desc: result.data.weather[0].description,
                icon: result.data.weather[0].icon,
            },
            error:null,
        });
    } catch(error){
        res.render("index.ejs", {weather:null, error:"City not found!"});
    }
});

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})