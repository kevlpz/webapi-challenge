/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/
const express = require('express');

const db = require('./data/helpers/projectModel.js');

const server = express();

server.use(express.json());

// projects
server.get('/api/projects', (req, res) => {
    db.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Could not get projects"});
        });
});

server.post('/api/projects', (req, res) => {
    db.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Could not post project"});
        });
});

server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.update(id, { name, description })
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Could not update project"});
        });
});

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Could not delete project"});
        });
});

// actions
server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    db.getProjectActions(id)
        .then(actions => res.status(200).json(actions))
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Could not get actions"});
        });
});

server.listen(5000, () => console.log('listening on port 5000'));