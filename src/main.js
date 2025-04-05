import { GoogleGenAI } from '@google/genai';

// import apikey from .env file
const ai = new GoogleGenAI({
	apiKey: import.meta.env.VITE_API_KEY,
});

const chat = ai.chats.create({ model: 'gemini-2.0-flash' });

const inputForm = document.querySelector('form');
const messagesContainer = document.querySelector('.messages');

inputForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const messageText = e.target.inp.value;
	if (messageText.trim() !== '') {
		// Add user message
		const userMessage = document.createElement('div');
		userMessage.classList.add('message', 'user-message');
		userMessage.textContent = messageText;
		messagesContainer.appendChild(userMessage);
		document.querySelector('input').value = '';

		const res = await chat.sendMessage({
			message: messageText,
		});

		// Ai Response
		const aiResponse = document.createElement('div');
		aiResponse.classList.add('message', 'ai-message');
		aiResponse.textContent = res.text;
		messagesContainer.appendChild(aiResponse);

		// Scroll to the bottom of the messages container
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
	}
});
