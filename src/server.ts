import express from 'express'
import { router } from './router'
const app = express()

app.use(express.json())
app.use(router)

app.listen(5000,  () => console.log('Server is running on port 5000'))
