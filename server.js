/* eslint no-unused-vars: "off" */
const express = require('express');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
// eslint-disable-next-line
const database = require('knex')(configuration);

const app = express();
const bodyParser = require('body-parser');

const requireHTTPS = (request, response, next) => {
  if (request.header('x-forwarded-proto') !== 'https') {
    return response.redirect(`https://${request.header('host')}${request.url}`);
  }
  return next();
};
if (process.env.NODE_ENV === 'production') { app.use(requireHTTPS); }

const port = process.env.NODE_ENV === 'test' ? 5000 : process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./build'));
app.set('port', port);

app.locals.title = 'UNESCO Tracker';

app.get('/api/v1/sites', (request, response) => {
  database('sites').select()
    .then(sites => response.status(200).json({ sites }))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/sites/:id', (request, response) => {
  const { id } = request.params;
  database('sites').where('id', id).select()
    .then((site) => {
      if (!site.length) {
        return response.status(404).json({ error: `No site found with id ${id}` });
      }
      return response.status(200).json({ site });
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;
  database('users').where('id', id).select()
    .then((user) => {
      if (!user.length) {
        return response.status(404).json({ error: `No user found with id ${id}` });
      }
      return response.status(200).json(user[0]);
    })
    .catch(error => response.status(500).json({ error }));
});
app.post('/api/v1/users', (request, response) => {
  if (!request.body.email &&
      !request.body.first_name &&
      !request.body.last_name &&
      !request.body.token) {
    return response.status(422)
      .json({ error: 'Expected format: { email: <String>, first_name: <String>, last_name: <String>, token: <String> }.' });
  }
  return database('users').insert(request.body, 'id')
    .then((id) => {
      response.status(201).json(id);
    })
    .catch((error) => {
      response.status(500).json(error);
    });
});
// app.delete('/api/v1/users/:id', (request, response) => {});

app.get('/api/v1/users/:id/favorites', (request, response) => {
  const { userId } = request.params;
  database('sites').where('id', userId).select()
    .then((site) => {
      if (!site.length) {
        return response.status(404).json({ error: 'No favorites found' });
      }
      return response.status(200).json({ site });
    })
    .catch(error => response.status(500).json({ error }));
});
app.post('/api/v1/users/:id/favorites', (request, response) => {
  const { id } = request.params;
  const { siteId } = request.body;
  if (!siteId) {
    return response.status(422)
      .json({ error: 'Expected format: { siteId: <Int> }.' });
  }
  return database('favorites').insert({
    user_id: id,
    site_id: siteId
  })
    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      response.status(500).json(error);
    });
});
app.delete('/api/v1/users/:id/favorites', (request, response) => {});

app.get('/api/v1/users/:id/visited', (request, response) => {});
app.post('/api/v1/users/:id/visited', (request, response) => {});
app.delete('/api/v1/users/:id/visited', (request, response) => {});

app.get('/api/v1/users/:id/wants', (request, response) => {});
app.post('/api/v1/users/:id/wants', (request, response) => {});
app.delete('/api/v1/users/:id/wants', (request, response) => {});

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
