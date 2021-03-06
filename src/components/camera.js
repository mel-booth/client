const request = require('superagent')
const url = require('./requestUrl')

function accessCamera (state, dispatch) {
  if (state.user.shotsRemaining > 0) {
    cloudinary.openUploadWidget({ cloud_name: 'flooki', upload_preset: 'clientuploads', sources: ['camera'], default_source: 'local', multiple: false, theme: 'minimal', button_class: 'flooki_button' },
      function (err, result) {
        if (result) {
          request
            .post(`${url}entries/new`)
            .type('application/json')
            .send({ user_id: state.user.user_id, image_url: result[0].secure_url })
            .withCredentials()
            .end((err, response) => {
              if (err) console.log(err)
              dispatch({type: 'ADD_NEW_PHOTO', payload: {'entry_id': response.body.entry_id, 'image_url': result[0].secure_url}})
            })
        } else if (err) console.log(err)
      }, false)
  } else alert('You have no shots left for today') // FIX
}

module.exports = accessCamera
