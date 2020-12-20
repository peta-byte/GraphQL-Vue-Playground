const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios').default;
const mutations = require('../../server/mutations').mutations;
const queries = require('../../server/queries').queries;

const app = express();
const appPort = process.env.PORT || 4000;
const serverPort = process.env.SERVERPORT || 3000;
const appURL = process.env.APPURL || `http://localhost:${appPort}/`;
const serverURL = process.env.SERVERURL || `http://localhost:${serverPort}/`;
const root = path.join(__dirname, '../static');

app.use(express.json());
app.use(express.static(root));
app.set('views', root);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('app.html', { root: root  });
});

app.get('/user', (req, res) => {
    axios.post(`${serverURL}/graphql`, {
        query: queries.user
    }).then(response => {
        let user = {};
        if (response.data && response.data.data && response.data.data.user && response.data.data.user.success) {
            user = response.data.data.user.user;
        }
        res.send(user);
    })
        .catch(error => {
            res.status(500).send(error);
        })
        .then(() => {
            // all done
        });
});

app.get('/users', (req, res) => {
    axios.post(`${serverURL}/graphql`, {
        query: queries.users
    }).then(response => {
        let users = [];
        if (response.data && response.data.data && response.data.data.users && response.data.data.users.success) {
            users = response.data.data.users.users;
        }
        res.send(users);
    })
        .catch(error => {
            res.status(500).send(error);
        })
        .then(() => {
            // all done
        });
});

app.get('/demographics', (req, res) => {
    axios.post(`${serverURL}/graphql`, {
        query: queries.demographics
    }).then(response => {
        let gender = [];
        let nationalities = [];
        if (response.data && response.data.data && response.data.data.demographics && response.data.data.demographics.success) {
            gender = response.data.data.demographics.gender ? response.data.data.demographics.gender : gender;
            nationalities = response.data.data.demographics.nationalities ? response.data.data.demographics.nationalities : nationalities;
        }
        res.send({ gender, nationalities });
    })
        .catch(error => {
            res.status(500).send(error);
        })
        .then(() => {
            // all done
        });
});

app.get('/gender', (req, res) => {
    axios.post(`${serverURL}/graphql`, {
        query: queries.gender
    }).then(response => {
        let gender = [];
        if (response.data && response.data.data && response.data.data.gender && response.data.data.gender.success) {
            gender = response.data.data.gender.gender ? response.data.data.gender.gender : gender;
        }
        res.send(gender);
    })
        .catch(error => {
            res.status(500).send(error);
        })
        .then(() => {
            // all done
        });
});

app.get('/nationalities', (req, res) => {
    axios.post(`${serverURL}/graphql`, {
        query: queries.nationalities
    }).then(response => {
        let nationalities = [];
        if (response.data && response.data.data && response.data.data.nationalities && response.data.data.nationalities.success) {
            nationalities = response.data.data.nationalities.nationalities ? response.data.data.nationalities.nationalities : nationalities;
        }
        res.send(nationalities);
    })
        .catch(error => {
            res.status(500).send(error);
        })
        .then(() => {
            // all done
        });
});

app.listen(appPort, () => {
    console.log(`App listening at ${appURL}`);
});