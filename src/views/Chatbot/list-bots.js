import viewItemBot from './item-bot';

export default () => (`
  <ul class="list-group mt-5">
    ${viewItemBot()}
    ${viewItemBot()}
    ${viewItemBot()}
  </ul>
`);
