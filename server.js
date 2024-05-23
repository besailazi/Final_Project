import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config()
const app = express();
const PORT = 4000;
const {API_KEY} = process.env

app.use(cors());

app.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT}`);
});

app.get('/', async(req, res)=>{
	try {
		const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=flowers&order=&per_page=&page=`)
		const data = await response.json();
		res.json(data)
	} catch (error){
		console.log(error);
	}

})