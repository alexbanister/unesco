export const loginToServer = (user) => {
  return fetch('/api/v1/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(parsedResponse => parsedResponse)
    .catch(err => err);
};

export const getSites = () => {
  return fetch('/api/v1/sites/')
    .then(response => response.json())
    .then(parsedResponse => parsedResponse)
    .catch(err => err);
};

export const addFlagFetch = (flagType, siteId, userId) => {
  return fetch(`/api/v1/users/${userId}/flags/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ siteId, flagType })
  })
    .then(response => response.json())
    .then(parsedResponse => parsedResponse)
    .catch(err => err);
};
export const removeFlagFetch = (flagType, siteId, userId) => {
  return fetch(`/api/v1/users/${userId}/flags/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ siteId, flagType })
  })
    .then(response => response.json())
    .then(parsedResponse => parsedResponse)
    .catch(err => err);
};
