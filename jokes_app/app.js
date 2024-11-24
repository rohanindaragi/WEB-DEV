import express, { application } from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>{
    res.render('index',{joke:null, error:null});
});

// fetching joke from api
app.get('/get-joke', async(req,res)=>{
    try{
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
        const jokeData = response.data;
        
        const joke = jokeData.type === 'single'?jokeData.joke:`${jokeData.setup} - ${jokeData.delivery}`;

        res.render('index',{joke,error:null});
    }catch(error){
        console.error('error.message');
        res.render('index',{joke:null, error:'Failed to fetch joke please try again'});
    }
});

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})
