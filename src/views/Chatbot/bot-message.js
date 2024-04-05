export default (botName, message, botImage) => {
  const botmessage = {
    image: botImage,
    name: botName,
    actions: message
  };
  return (`
    <div class="card-body shadow-lg p-3 mb-5 mx-5 bg-body-tertiary rounded mt-5">
      <div class="bot-picture">
        <img src="${botmessage.image}" width="90px">
      </div>
      <h5 class="card-title">${botmessage.name}</h5>
      <p class="card-text container-fluid"> ${botmessage.actions}</p>
      <span>${Date()}</span>
    </div>
  `);
};
