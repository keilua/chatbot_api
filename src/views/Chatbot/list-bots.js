import botModel from '../../model/bot';
import viewItemBot from './item-bot';

export default () => (
  `
    <ul class="list-group mt-5 overflow-y">
      ${botModel.map((bot) => viewItemBot(bot)).join('')}
    </ul>
  `
);
