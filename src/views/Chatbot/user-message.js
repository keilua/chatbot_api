export default (messageText) => {
  const usermessage = {
    author: 'keanu Richard',
    avatar: 'https://freesvg.org/img/1538298822.png',
    type: 'user',
    date: Date(),
    text: messageText
  };
  return (`
  <div class="row">
    <div class="col-6 card-body shadow-lg p-3 mb-5 mx-5 bg-body-tertiary rounded mt-3">
      <div class="user-picture">
        <img src="${usermessage.avatar}" width="90px">
      </div>
      <h5 class="username">${usermessage.author}</h5>
      <p class="user-text container-fluid">${usermessage.text}.</p>
      <span>${usermessage.date}</span>
    </div>
  </div>
  `);
};
