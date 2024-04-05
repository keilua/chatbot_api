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
        this.sendMessage(messageText);
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

  sendMessage(messageText) {
    const messagesContainer = document.querySelector('.messages');

    if (messagesContainer) {
      const messageHTML = viewUserMessage(messageText);
      messagesContainer.insertAdjacentHTML('beforeend', messageHTML);

      const trimmedMessage = messageText.trim().toLowerCase();
      if (trimmedMessage === 'infos') {
        this.getMesssages();
      } else if (trimmedMessage.startsWith('wiki:')) {
        const searchTerm = trimmedMessage.substring(5).trim();
        this.searchWikipediaSummary(searchTerm);
      } else if (trimmedMessage === 'wiki') {
        this.searchRandomWikipedia();
      } else if (trimmedMessage === 'joke') {
        this.getChuckNorrisJoke();
      } else {
        this.sendBotResponse('Patrick', 'Sorry, I do not understand.');
      }
    }
  }

  searchWikipediaSummary(searchTerm) {
    axios.get(`https://fr.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`)
      .then((response) => {
        const summary = response.data.extract;
        if (summary) {
          this.sendBotResponse('Wiki', summary);
        } else {
          this.sendBotResponse('Wiki', 'Sorry, I could not find a summary for that term.');
        }
      })
      .catch((error) => {
        console.error('Error fetching Wikipedia data:', error);
        this.sendBotResponse('Wiki', 'Sorry, I encountered an error while fetching data from Wikipedia.');
      });
  }

  searchRandomWikipedia() {
    axios.get('https://fr.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'random',
        rnlimit: 1,
        origin: '*'
      }
    })
      .then((response) => {
        const pageTitle = response.data.query.random[0].title;
        const articleUrl = `https://fr.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;
        this.sendBotResponse('Wiki', `Here's a random Wikipedia article for you: <a href="${articleUrl}" target="_blank">${pageTitle}</a>`);
      })
      .catch((error) => {
        console.error('Error fetching Wikipedia data:', error);
        this.sendBotResponse('Wiki', 'Sorry, I encountered an error while fetching data from Wikipedia.');
      });
  }

  sendBotResponse(botName, botAnswer) {
    const messagesContainer = document.querySelector('.messages');

    if (messagesContainer) {
      if (botAnswer !== undefined) {
        let botImage;
        if (botName === 'Patrick') {
          botImage = 'https://imgs.search.brave.com/22X538RZAP339QfJ8tNjMah1HgzOyQKDak1lJT0uf9E/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzI4L1BhdHJpY2tf/U3Rhcl9jaGFyYWN0/ZXIucG5n';
        } else if (botName === 'Chuck Norris') {
          botImage = 'https://imgs.search.brave.com/4ND4pkg6LaIe8A3_QHsBWmwPXHqdcj82bdp7cNsT1is/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9ob2xs/eXdvb2RsaWZlLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/NC8wMy9DaHVjay1O/b3JyaXMtU1MtMy5q/cGc_dz02ODA';
        } else if (botName === 'Wiki') {
          botImage = 'https://imgs.search.brave.com/7GQlh38XPpKOEAOfFi9Nigu1AWmRM0x-Nilk2N3W9So/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/MW1pbjMwLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8w/NC9Mb2dvLVdpa2lw/ZWRpYS01MDB4NDcy/LmpwZw';
        } else {
          botImage = 'https://freesvg.org/img/1538298822.png';
        }

        const botResponseHTML = viewBotMessage(botName, botAnswer, botImage);
        messagesContainer.insertAdjacentHTML('beforeend', botResponseHTML);
      }
    }
  }

  async getMesssages() {
    try {
      const response = await axios.get('http://localhost/user/1');
      const responseData = JSON.stringify(response.data);
      this.sendBotResponse('Patrick', responseData);
    } catch (error) {
      console.log(error);
    }
  }

  async getChuckNorrisJoke() {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      const joke = response.data.value;
      this.sendBotResponse('Chuck Norris', joke);
    } catch (error) {
      console.error('Error fetching Chuck Norris joke:', error);
      this.sendBotResponse('Chuck Norris', 'Sorry, I encountered an error while fetching a Chuck Norris joke.');
    }
  }
};

export default ChatBot;
