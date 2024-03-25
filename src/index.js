import Router from './router';
import './index.scss';
import ChatBot from './controllers/ChatBot';

const routes = [{
  url: '/',
  controller: ChatBot
}];

new Router(routes);
