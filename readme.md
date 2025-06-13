# LeetNote

A desktop application that helps you store, manage, and analyze your LeetCode problem solutions. Built with Electron, React, and TypeScript.


## Features

- 📝 Store and manage your LeetCode problem solutions
- 🔍 Analyze code complexity and optimization
- 📊 Track time and space complexity of your solutions
- 💾 Local database storage for your solutions
- 🎯 Easy-to-use interface for managing problems
- 🔄 Automatic code analysis and optimization suggestions

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite with Prisma ORM
- **Desktop**: Electron
- **AI Integration**: Google's Generative AI

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/leetnote.git
cd leetnote
```

2. Install dependencies:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
cd ../electron && npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Google AI API key:
   ```
   API_KEY=your_google_ai_api_key
   ```

## Development

1. Start the development servers:
```bash
# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev

# Start electron
cd electron && npm run dev
```

2. Build the application:
```bash
npm run build
```

3. Package the application:
```bash
npm run package
```

## Project Structure

```
leetnote/
├── frontend/          # React frontend application
├── backend/           # Express backend server
├── electron/          # Electron main process
├── assets/           # Application assets
└── release/          # Build output directory
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




