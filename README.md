**Instant Note – Chrome Extension**

A lightweight Chrome extension that allows users to quickly capture and manage notes directly from any webpage. Designed for speed, simplicity, and seamless note-taking without leaving the current tab.

🚀 **Features**
📝 Create notes instantly from any webpage
🔄 Append content to existing notes
📂 View and select previously saved notes
⚡ Fast popup interface for quick interactions
🌐 Backend integration for persistent storage
📡 REST API-based communication
🛠️ Tech Stack

Frontend (Extension UI):

HTML
CSS
JavaScript

Backend:

Node.js
Express.js

Database:

MongoDB
🧠** How It Works**
User opens the extension popup
Chooses to:
Create a new note
Or append to an existing one
Data is sent to backend via API
Backend stores/retrieves notes from MongoDB
Notes are displayed dynamically in the extension

📁** Project Structure**
instant-note/
│
├── frontend/          # Chrome extension files
│   ├── popup.html
│   ├── popup.js
│   ├── styles.css
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│
├── package.json
└── README.md
⚙️ **Installation & Setup**
1. Clone the repository
git clone https://github.com/your-username/instant-note.git
cd instant-note
2. Setup Backend
cd backend
npm install
npm start

Make sure MongoDB is running locally or provide your connection string.

3. Load Chrome Extension
Go to chrome://extensions/
Enable Developer Mode
Click Load Unpacked
Select the frontend folder

🎯** Future Improvements**
🔐 User authentication
☁️ Cloud deployment
🏷️ Tag-based filtering
🔍 Search functionality
📱 Mobile support

👤** Author**

priya raj laxmi
GitHub: https://github.com/pri-laxmi
