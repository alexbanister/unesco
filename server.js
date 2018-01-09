const express = require('express');

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
  const { id, email, name } = request.body;
  if (!email && !id && !name) {
    return response.status(422)
      .json({ error: 'Expected format: { email: <String>, name: <String>, id: <String> }.' });
  }
  return database('users').where('id', id).select()
    .then(async (users) => {
      if (users.length < 1) {
        return database('users').insert(request.body, '*')
          .then((user) => {
            // eslint-disable-next-line
            const { email, id, name } = user[0];
            response.status(201).json({
              email,
              id,
              name,
              favorites: [],
              visited: [],
              wants: []
            });
          })
          .catch((error) => {
            response.status(500).json(error);
          });
      }
      const favorites = await database('sites')
        .join('favorites', 'favorites.site_id', 'sites.id')
        .where('favorites.user_id', id)
        .select('site_id')
        .then((fav) => {
          return fav.reduce((accum, site) => {
            return [...accum, site.site_id];
          }, []);
        })
        .catch(error => error);

      const visited = await database('sites')
        .join('visited', 'visited.site_id', 'sites.id')
        .where('visited.user_id', id)
        .select('site_id')
        .then((visit) => {
          return visit.reduce((accum, site) => {
            return [...accum, site.site_id];
          }, []);
        })
        .catch(error => error);

      const wants = await database('sites')
        .join('wants', 'wants.site_id', 'sites.id')
        .where('wants.user_id', id)
        .select('site_id')
        .then((want) => {
          return want.reduce((accum, site) => {
            return [...accum, site.site_id];
          }, []);
        })
        .catch(error => error);
      return response.status(200).json({
        email,
        id,
        name,
        favorites,
        visited,
        wants
      });
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/users/:id/flags', (request, response) => {
  const { id } = request.params;
  const { siteId, flagType } = request.body;
  if (!siteId || !flagType) {
    return response.status(422)
      .json({ error: 'Expected format: { siteId: <Int>, flagType: <String> }.' });
  }
  return database(flagType).insert({
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
app.delete('/api/v1/users/:id/flags', (request, response) => {
  const { id } = request.params;
  const { siteId, flagType } = request.body;
  if (!siteId || !flagType) {
    return response.status(422)
      .json({ error: 'Expected format: { siteId: <Int>, flagType: <String> }.' });
  }
  return database(flagType)
    .where({
      user_id: id,
      site_id: siteId
    })
    .del()
    .then((result) => {
      if (!result) {
        response.status(422).json({ error: 'No favorite site found' });
      } else {
        response.sendStatus(204);
      }
    })
    .catch(error => response.status(422).json(error));
});

app.get('/*', (request, response) => {
  // eslint-disable-next-line
  response.sendFile('./build/index.html', { 'root': __dirname });
});

app.use((request, response) => {
  response.status(404).send('Sorry can\'t find that!');
  response.end();
});

app.use((error, request, response) => {
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
