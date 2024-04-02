import viewItemBot from './item-bot';

export default () => (`
  <ul class="list-group mt-5 overflow-y">
    ${viewItemBot()}
    ${viewItemBot()}
    ${viewItemBot()}
  </ul>
`);
