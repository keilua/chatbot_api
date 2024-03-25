export default (message) => (`
<div class="card-body shadow-lg p-3 mb-5 mx-5 bg-body-tertiary rounded mt-5">
  <div class="bot-picture">
    <img src="https://freesvg.org/img/1538298822.png" width="90px">
  </div>
  <h5 class="card-title">Bot Response</h5>
  <p class="card-text container-fluid">${message}</p>
  <span>${Date()}</span>
</div>
`);
