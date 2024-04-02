export default (botName, message, botImage) => (`
<div class="card-body shadow-lg p-3 mb-5 mx-5 bg-body-tertiary rounded mt-5">
  <div class="bot-picture">
    <img src="${botImage}" width="90px">
  </div>
  <h5 class="card-title">${botName}</h5>
  <p class="card-text container-fluid">${message}</p>
  <span>${Date()}</span>
</div>
`);
