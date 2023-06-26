import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express()
import multer from 'multer'
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/assets', express.static(path.join(__dirname, '/public/assets')))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })
const UserSchema = new mongoose.Schema(
    {
        name : String,
        picturePath: {
            type: String,
            default: ''
        },
    },

)
const User = mongoose.model("User", UserSchema)

app.post('/auth/register', upload.single('picture'), async (req, res) => {
    try {
        const {
            name,
            picturePath,
        } = req.body

        const newUser = new User({
            name,
            picturePath,

        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


const PORT = 8080
mongoose.connect('mongodb://127.0.0.1:27017/dropzone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
).then(() => {
    console.log("Database Connected...")
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`))

}).catch(err => console.log(`${err} did not connect`))