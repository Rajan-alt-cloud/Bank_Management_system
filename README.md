🏦 Bank Management System
A full‑stack Bank Management System built using React (Frontend) and Django REST Framework (Backend) with SQLite3 as the database.
This project helps manage accounts, transactions, and user data efficiently through a modern web interface.


✨ Features
👤 Accounts Management – Create, update, and view user accounts.
💸 Transactions – Handle deposits, withdrawals, and transfers securely.
🔐 JWT Authentication – Secure login with access & refresh tokens.
📊 Dashboard – Visual overview of accounts, transactions, and system stats.
🖥️ Frontend (React) – Interactive UI for customers and admins.
⚙️ Backend (Django DRF) – RESTful APIs for data handling and authentication.
🗄️ Database (SQLite3) – Lightweight and easy to set up for development.


📁 bank-management-system/
├── accounts/          # Django app for user accounts
├── transactions/      # Django app for handling transactions
├── bank_backend/      # Django backend with DRF
├── bank-frontend/     # React frontend application
└── db.sqlite3         # SQLite database


🚀 Installation & Setup
Backend (Django DRF)
cd bank_backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend (React)
cd bank-frontend
npm install
npm run dev


🔐 JWT Authentication
/api/token/ → Get access + refresh token using username & password
/api/token/refresh/ → Get new access token using refresh token
/api/token/verify/ → Verify token validity


🧑 User Management
Method	Endpoint	   |   Description	           | Auth Required
POST	/api/users/    | Create new user   	       |     ❌
GET	/api/users/	     |  List all users	         |     ✅
GET	/api/users/{id}/ | Get user details	         |     ✅

Method	Endpoint	             |              Description	                     |Auth Required
POST	/api/transactions/	     |     Create new transaction	                   |  ✅
GET	/api/transactions/         |   	List all transactions                      |  ✅
GET	/api/transactions/{id}/    |  	Get transaction details	                   |  ✅


📊 Dashboard
| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| GET | ``/api/dashboard/`` | Get system overview (accounts, transactions, stats) | ✅ |


🧪 Current CRUD Status
✅ Create User
✅ Read User (Profile / List)
✅ Update User
❌ Delete User (Not implemented yet)


📈 Future Enhancements
🗑️ Add Delete User functionality
📊 Expand Dashboard with analytics & charts
🌐 Deployment on cloud (Azure / AWS)
💬 Notifications & Email alerts


🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.


