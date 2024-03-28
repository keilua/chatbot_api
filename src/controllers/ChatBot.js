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
            <div class="row">
            </div>
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
  }

  handleOnClickSendMessage() {
    const sendMessageButton = document.getElementById('sendMessageButton');
    const messageInput = document.getElementById('messageInput');

    const sendMessage = () => {
      const messageText = messageInput.value.trim();

      if (messageText !== '') {
        this.sendMessage('Ange', messageText);
        messageInput.value = '';
      }
    };
    messageInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });
    sendMessageButton.addEventListener('click', sendMessage);
  }

  sendMessage(username, messageText) {
    const messagesContainer = document.querySelector('.messages');

    if (messagesContainer) {
      const messageHTML = viewUserMessage(username, messageText);
      messagesContainer.insertAdjacentHTML('beforeend', messageHTML);

      if (messageText.trim().toLowerCase() === 'infos') {
        this.getMesssages();
      } else if (messageText.trim().toLowerCase().startsWith('wiki:')) {
        const searchTerm = messageText.substring(5).trim();
        this.searchWikipediaSummary(searchTerm);
      } else if (messageText.trim().toLowerCase() === 'wiki') {
        this.searchRandomWikipedia();
      }
    }
  }

  searchWikipediaSummary(searchTerm) {
    axios.get(`https://fr.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`)
      .then((response) => {
        const summary = response.data.extract;
        if (summary) {
          this.sendBotResponse(summary);
        } else {
          this.sendBotResponse('Sorry, I could not find a summary for that term.');
        }
      })
      .catch((error) => {
        console.error('Error fetching Wikipedia data:', error);
        this.sendBotResponse('Sorry, I encountered an error while fetching data from Wikipedia.');
      });
  }

  searchRandomWikipedia() {
    axios.get('https://fr.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'random',
        rnlimit: 1,
        rnnamespace: 0,
        origin: '*'
      }
    })
      .then((response) => {
        const pageTitle = response.data.query.random[0].title;
        this.sendBotResponse(`Here's a random Wikipedia article for you: ${pageTitle}`);
      })
      .catch((error) => {
        console.error('Error fetching Wikipedia data:', error);
        this.sendBotResponse('Sorry, I encountered an error while fetching data from Wikipedia.');
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
      const response = await axios.get('http://localhost/messages');
      const responseData = JSON.stringify(response.data);
      this.sendBotResponse(responseData);
    } catch (error) {
      console.log(error);
    }
  }
};

export default ChatBot;
