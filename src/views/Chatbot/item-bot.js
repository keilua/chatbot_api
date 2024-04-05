export default (bot) => `
  <div class="card-body bot shadow-lg p-3 mb-5 bg-body-tertiary rounded rounded-pill">
    <img src="${bot.imageUrl}" width="90px">
    <h5 class="card-title">${bot.name}</h5>
  </div>
`;
