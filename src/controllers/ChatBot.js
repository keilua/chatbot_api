import axios from 'axios';
import viewNav from '../views/nav';
import viewBar from '../views/bar';
import viewListBots from '../views/Chatbot/list-bots';
import viewUserMessage from '../views/Chatbot/user-message';
import viewBotMessage from '../views/Chatbot/bot-message';

const ChatBot = class {
  constructor(params) {
    this.el = document.querySelector('#root');
    this.params = params;

    this.run();
  }

  render() {
    return (`
      <div class="row">
        <div class="col-12">${viewNav()}</div>
      </div>
      <div class="row">
        <div class="col-2">${viewListBots()}</div>
          <div class="col-10 overflow-hidden bg-gradient">
          <div class="row conversations">
            <div class="messages"></div>
          </div>
          <div class="row typing-bar">
            <div class="input-group">${viewBar()}</div>
          </div>
        </div> 
      </div>
    `);
  }

  run() {
    this.el.innerHTML = this.render();
    this.handleOnClickSendMessage();
    this.getMesssages();
  }

  handleOnClickSendMessage() {
    const sendMessageButton = document.getElementById('sendMessageButton');
    const messageInput = document.getElementById('messageInput');

    sendMessageButton.addEventListener('click', () => {
      const messageText = messageInput.value.trim();

      if (messageText !== '') {
        this.sendMessage('Ange', messageText)
          .then(() => this.sendBotResponse());
        messageInput.value = '';
      }
    });
  }

  sendMessage(username, messageText) {
    return new Promise((resolve) => {
      const messagesContainer = document.querySelector('.messages');

      if (messagesContainer) {
        const messageHTML = viewUserMessage(username, messageText);
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);

        if (messageText.trim().toLowerCase() === 'hello') {
          this.sendBotResponse('Hello, how can I assist you today?');
        }
      }

      resolve();
    });
  }

  sendBotResponse(botAnswer) {
    const messagesContainer = document.querySelector('.messages');

    if (messagesContainer) {
      if (botAnswer !== undefined) {
        const botResponseHTML = viewBotMessage(botAnswer);
        messagesContainer.insertAdjacentHTML('beforeend', botResponseHTML);
      }
    }
  }

  async getMesssages() {
    try {
      const response = axios.get('http://localhost/messages');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
};

export default ChatBot;
