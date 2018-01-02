/* eslint no-unused-vars: "off" */
const express = require('express');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
// eslint-disable-next-line
const database = require('knex')(configuration);

const app = express();
const bodyParser = require('body-parser');

// eslint-disable-next-line
const requireHTTPS = (request, response, next) => {
  if (request.header('x-forwarded-proto') !== 'https') {
    return response.redirect(`https://${request.header('host')}${request.url}`);
  }
  next();
};
if (process.env.NODE_ENV === 'production') { app.use(requireHTTPS); }

app.use(express.static('./build/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 4000);

app.locals.title = 'APP NAME';

app.get('/api/v1/sites', (request, response) => {
  database('sites').select()
    .then(sites => response.status(200).json({ sites }))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/sites/:id', (request, response) => {
  const { id } = request.body;
  database('sites').where('id', id).select()
    .then((site) => {
      if (!site.length) {
        return response.status(404).json({ error: `No site found with id ${id}` });
      }
      return response.status(200).json({ site });
    })
    .catch(error => response.status(500).json({ error }));
});
app.post('api/v1/sites', (request, response) => {});
app.patch('api/v1/sites/:id', (request, response) => { });
app.delete('api/v1/sites', (request, response) => { });

app.post('api/v1/users', (request, response) => {});
app.get('api/v1/users/:id', (request, response) => {});
app.patch('api/v1/users/:id', (request, response) => {});
app.delete('api/v1/users/:id', (request, response) => {});

app.get('api/v1/users/:id/favorites', (request, response) => {});
app.post('api/v1/users/:id/favorites', (request, response) => {});
app.delete('api/v1/users/:id/favorites', (request, response) => {});

app.get('api/v1/users/:id/visited', (request, response) => {});
app.post('api/v1/users/:id/visited', (request, response) => {});
app.delete('api/v1/users/:id/visited', (request, response) => {});

app.get('api/v1/users/:id/wants', (request, response) => {});
app.post('api/v1/users/:id/wants', (request, response) => {});
app.delete('api/v1/users/:id/wants', (request, response) => {});

app.use((request, response, next) => {
  response.status(404).send('Sorry can\'t find that!');
  response.end();
});

app.use((error, request, response, next) => {
  // eslint-disable-next-line no-console
  console.error(error.stack);
  response.status(500).send('Something broke!');
  response.end();
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
