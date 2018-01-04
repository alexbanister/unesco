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

export const fake = () => {
  return true;
};
