# **TicTacToeGPT**

TicTacToeGPT is an innovative take on the classic game of Tic-Tac-Toe, powered by artificial intelligence. Play against a smart AI opponent that learns from your moves and provides an engaging gaming experience. With features like difficulty levels, game analytics, and multiplayer options, Tic-Tac-ToeGPT offers a modern twist to this timeless game. Built with Next.js and OpenAI's GPT-4, this app provides an intelligent and adaptive gaming experience.

## Table of Contents

- [**TicTacToeGPT**](#tic-tac-toegpt)
  - [Table of Contents](#table-of-contents)
  - [Live Demo](#live-demo)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [How to run the project](#how-to-run-the-project)
  - [Screenshots](#screenshots)
  - [How to use the application](#how-to-use-the-application)
  - [Use cases and further enhancements](#use-cases-and-further-enhancements)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)
  - [Contact](#contact)

## Live Demo

Live demo - [TicTacToeGPT](https://tg-woad.vercel.app/)

## Features

- Multiple difficulty levels (Easy, Medium, Hard)
- AI-powered opponent using GPT-4
- User authentication and profiles

## Technologies Used

- Next.js
- Database: MongoDB
- AI Integration: OpenAI's GPT-4
- State Management: Redux Toolkit
- Real-time features: Socket.io
- Authentication: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Next.js
- MongoDB
- OpenAI API key
- Node.js 14.0 or later

### How to run the project

**1. Clone the repository:**

```bash
git clone https://github.com/0xmetaschool/tic-tac-toe-gpt.git
cd tic-tac-toe-gpt
```

**2. Install dependencies:**

```bash
npm install
```

**3. Set up the database:**

Ensure you have [MongoDB](https://www.mongodb.com/) installed and running on your system, or use a cloud-hosted MongoDB service like [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database). Create a new Cluster, select a free plan, and copy the connection string, this will be required in the next step.

**4. Set up environment variables:**

Create a `.env.local` file in the root directory and add the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
SOCKET_SERVER=your_socket_server_url
```

**5. Run the development server:**

```bash
npm run dev
```

**6. Open your browser and navigate to `http://localhost:3000`**

You should now see the AI-powered Tic-Tac-ToeGPT application running with Next.js.

## Screenshots



## How to use the application

1. Register for a new account or log in
2. Select difficulty level playing against AI
3. 

## Use cases and further enhancements

1. Implement an AI that learns from player patterns to provide more challenging gameplay
2. 

## Contributing

We welcome contributions! Here's how you can help make Tic-Tac-ToeGPT even better:

1. Fork the project (`gh repo fork https://github.com/0xmetaschool/tic-tac-toe-gpt.git`)
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/0xmetaschool/tic-tac-toe-gpt/blob/main/LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 API
- The Chakra UI team for their excellent React component library
- The open-source community for various game development resources

## Contact

Please open an issue in the GitHub repository for any queries or support.
