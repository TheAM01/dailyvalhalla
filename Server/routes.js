import fs from 'fs';

function createRoutes (app, dir) {

    app.get('/', (req, res) => {
        res.sendFile(j(dir, '/Public/index.html'))
    })
    
    app.get('/home', (req, res) => {
        res.sendFile(j(dir, '/Public/index.html'))
    })

    app.get('/post/:id', (req, res) => {
        const exists = fs.existsSync(j(dir, `/Public/Posts/${req.params.id}.json`));
        if (!exists) return res.sendStatus(404);
        res.sendFile(j(dir, '/Public/post.html'))
    });

    app.get('/create', (req, res) => {
        res.sendFile(j(dir, "/Public/Users/add-post.html"))
    })

    app.get('/script.js', (req, res) => {
        res.sendFile(j(dir, '/Public/script.js'))
    })

    app.get('/style.css', (req, res) => {
        res.sendFile(j(dir, '/Public/style.css'))
    })

    app.get('/style_mobile.css', (req, res) => {
        res.sendFile(j(dir, '/Public/style_mobile.css'))
    })

    app.get('/style_minor.css', (req, res) => {
        res.sendFile(j(dir, '/Public/style_minor.css'))
    })
}

function j(dir, path) {
    return `${dir}${path}`
}

export default createRoutes