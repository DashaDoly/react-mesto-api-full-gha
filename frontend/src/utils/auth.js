const baseUrl = 'http://127.0.0.1:3000'

function getResponse(res) {
    if (res.ok) {
          return res.json();
        }
  return Promise.reject(`${res.status}: ${res.statusText}`);
}


export function register(password, email) {
  return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
  })
  .then(res => getResponse(res))
}

export function authorize(password, email) {
  return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
  })
  .then(res => getResponse(res))
}

export function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
  })
  .then(res => getResponse(res))
}
