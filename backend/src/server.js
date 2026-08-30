import 'dotenv/config';import app from './app.js';app.listen(process.env.PORT||5000,()=>console.log('Safety API running'));
