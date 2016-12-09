const yo = require('yo-yo')
const request = require('superagent')
const header = require ('./header')


module.exports = login
function loginRequest(form) {
  console.log(form)
}

function login (state, dispatch) {
  function onSubmit (e) {
    e.preventDefault()
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    request
      .post('http://one-shot-api.herokuapp.com/api/v1/users/login')
      .send({username, password})
      .end((error, response) => {
        if (error) {
          console.log(error, 'Error goes here')
        } else {
          console.log("got it!!!!!", response.body.user)
          dispatch({type: 'RECEIVE_USER', payload: response.body.user})
        }
      })
    console.log(username);
  }

  return yo`
    <div>
    ${header(state)}
      <h3>Login</h3>
      <input id='username' type='text' placeholder='username'/>
      <input id='password' type='password' placeholder='password'/>
      <button onclick=${onSubmit} class='loginBtn' type='submit'>Sign In</button>
      <button class='signupBtn' type='submit'>Sign Up</button>
    </div>
  `
}
