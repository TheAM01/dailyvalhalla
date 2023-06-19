import fs from 'fs';

import create from './Functions/create-post.js';

function createRoutes (app, dir) {

    
    app.get('/', (req, res) => {
        console.log(req.session)
        res.sendFile(j(dir, '/Public/index.html'))
    })
    
    app.get('/home', (req, res) => {
        res.sendFile(j(dir, '/Public/index.html'))
    });

    app.get('/latest', (req, res) => {
        res.sendFile(j(dir, "/Public/Static/latest.html"))
    });

    app.get('/post/:id', (req, res) => {
        const exists = fs.existsSync(j(dir, `/Public/Posts/${req.params.id}.json`));
        if (!exists) return res.sendStatus(404);
        res.sendFile(j(dir, '/Public/Dynamic/post.html'))
    });

    app.get('/create', (req, res) => {
        res.sendFile(j(dir, "/Public/Dynamic/add-post.html"))
    })

    app.get('/script.js', (req, res) => {
        res.sendFile(j(dir, '/Public/Scripts/script.js'))
    })

    app.get('/style.css', (req, res) => {
        res.sendFile(j(dir, '/Public/Styles/style.css'))
    })

    app.get('/style_mobile.css', (req, res) => {
        res.sendFile(j(dir, '/Public/Styles/style_mobile.css'))
    })

    app.get('/style_minor.css', (req, res) => {
        res.sendFile(j(dir, '/Public/Styles/style_minor.css'))
    });

    app.post('/create', (req, res) => {
        create(req, res, dir);
    })
}

function j(dir, path) {
    return `${dir}${path}`
}

export default createRoutes