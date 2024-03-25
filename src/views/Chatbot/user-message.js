export default (username, messageText) => (`
  <div class="row">
    <div class="col-6 card-body shadow-lg p-3 mb-5 mx-5 bg-body-tertiary rounded mt-3">
      <div class="user-picture">
        <img src="https://freesvg.org/img/1538298822.png" width="90px">
      </div>
      <h5 class="username">${username}</h5>
      <p class="user-text container-fluid">${messageText}.</p>
    </div>
  </div>
`);
