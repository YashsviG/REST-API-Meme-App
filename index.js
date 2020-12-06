let express = require('express')
let cors = require('cors');
let app = express();
let jwt = require('jsonwebtoken');

let bodyParser = require('body-parser');
let authController = require('./controllers/loginController');
let memePageController = require('./controllers/memePageController');
let memeController = require('./controllers/memeController');
let userController = require('./controllers/userController');
const { deleteQuizQuestion } = require('./models/memeModel');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

app.use(cors());

/*
Headers: None
Body: { 
    
}
Response: {
    
}
*/
const openRouter = express.Router();

/*
Headers: None
Body: {
    email: string
    username: string
    password: string
}
Response: {
    token: string
}
*/
openRouter.post('/user/create', userController.createUser); 

openRouter.post('/login', authController.authUser); 


/*
Headers: None
Body: { 
    email: string
    username: string
    password: string
}
Response: {
    email: string
    username: string
    password: string
    id: number
    uri: string
}
*/
openRouter.post('/c',userController.createUser);

/*
Headers: None
Query Params: ?search: string
Body: None
Response: [
    {
        title: string
        desc: string
        affinities: {A: "name", B: "name", C: "name", D: "name"}
        image: BLOB
        attempts: number
        id: number
        uri: string
    },
    ...
]
*/
openRouter.get('/search', memePageController.searchMemePage); 

/*
Headers: None
Body: None
Response: {
    "id": number
    "quiz_id": number
    "text": string
    "image": BLOB
    "answers": json as string "[{text:"string", affinityId:"A"},...]",
    "uri": "/api/v1/quiz/question/11"
}
*/
openRouter.get('/meme/:id', memeController.getMeme);

/*
Headers: None
Body: None
Response: {
    "message": "Completed quiz attempt #[number of attempts here]"
}
*/
app.use('/api/v1', openRouter);

const router = express.Router();
//Everything after this point requires a valid token
router.use((req,res,next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'MYSECRETKEY', (err,decode) => {
            if(err) {
                return res.status(401).json({message:'Unauthorized user'})
            } else {
                req.user = decode;
                next();
            }
        })
    } else {
        return res.status(401).json({message:'Unauthorized user'});
    }
})

/*
Headers: None
Body: { 
    title: string
    desc: string
    affinities: {A: "name", B: "name", C: "name", D: "name"}
    image: BLOB (optional)
}
Response: { 
    id: number
    uri: string
    title: string
    desc: string
    affinities: {A: "name", B: "name", C: "name", D: "name"}
    image: BLOB (optional)
}
*/
router.post('/memePage/create',memePageController.newMemePage); 

router.get('/memeList',memeController.memeList);
/*
Headers: None
Body: {
    "quiz_id": number
    "text": string
    "image": BLOB (optional)
    "answers": json as string "[{text:"string", affinityId:"A"},...]",
}
Response: {
    "id": number
    "quiz_id": number
    "text": string
    "image": BLOB
    "answers": json as string "[{text:"string", affinityId:"A"},...]",
    "uri": "/api/v1/quiz/question/11"
    questuibs: [
        "uri string",
        ...
    ]
}
*/
router.post('/memePage/:meme_id/meme/create',memeController.newMeme); //

/*
Headers: None
Body: {
    "text": string
    "image": BLOB
    "answers": json as string "[{text:"string", affinityId:"A"},...]"
}
Response: {
    "id": number
    "quiz_id": number
    "text": string
    "image": BLOB
    "answers": json as string "[{text:"string", affinityId:"A"},...]"
    "uri": "/api/v1/quiz/question/11"
}
*/
router.get('/memePage/:meme_id/meme/', memeController.getMemePageMeme); //

/*
Headers: None
Body: { 
    
}
Response: {
    
}
*/
router.get('/memePage/:id/', memePageController.getMemePage); 

/*
Headers: None
Body: { 
    
}
Response: {
    
}
*/
router.get('/user/:id/memePage', memePageController.getUserMemePage); 

/*
Headers: None
Body: { 
    
}
Response: {
    
}
*/
router.get('/user/:id', userController.getUser);

/*
Headers: None
Body: { 
    
}
Response: {
    
}
*/
router.put('/memePage/:id', memePageController.updateMemePage); 

/*
Headers: None
Body: { 
    
}
Response: {
    
}
*/
// router.put('/memePage/:meme_id/meme/:id', memeController.updateMemePage); //

/*
Headers: None
Body: { 
    
}
Response: {
    
}
*/
router.put('/user/:id', userController.updateUser);

/*
Headers: None
Body: { 
    
}
Response: {
    
}
*/
router.delete('/memePage/:id', memePageController.deleteMemePage); 

/*
Headers: None
Body: { 
    
}
Response: {
    
}
*/
router.delete('/memePage/:meme_id/meme/:id', memeController.deleteMeme); //

/*
Headers: None
Body: { 
    
}
Response: {
    
}
*/
router.delete('/user/:id', userController.deleteUser); 

app.use('/api/v1', router);
const port = 4000;
app.listen(port, () => console.log('Server ready @ port ',port));
//app.listen(process.env.PORT || 4000,() => console.log('Server ready @ port',process.env.PORT ));





