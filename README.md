# **TicTacToeGPT**

TicTacToeGPT is an innovative take on the classic game of Tic-Tac-Toe, powered by AI. Play against a smart AI opponent that learns from your moves and provides an engaging gaming experience. With features like difficulty levels, customizable board and Smart AI, TicTacToeGPT offers a modern twist to this timeless game. Built with Next.js and OpenAI's GPT-4, this app provides an intelligent and adaptive gaming experience.

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
- Customizable Board Sizes ( 3x3, 4x4 and 5x5)
- AI-powered opponent using GPT-4
- User authentication and profiles

## Technologies Used

- Next.js
- Database: MongoDB
- AI Integration: OpenAI's GPT-4
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
```

**5. Run the development server:**

```bash
npm run dev
```

**6. Open your browser and navigate to `http://localhost:3000`**

You should now see the AI-powered TicTacToeGPT application running with Next.js.

## Screenshots

![image](https://github.com/user-attachments/assets/2797ddbf-9326-4e2c-a544-ab6a669ece1a)![image](https://github.com/user-attachments/assets/d2276c6c-cfa8-4194-b083-ad36e9e76b07)

## How to use the application

1. Register for a new account or log in
2. Select difficulty level playing against AI
3. Pick a board size (3x3, 4x4, or 5x5) to customize the game experience
4. Begin the game against the AI
5. At any time, reset the game to start over

## Use cases and further enhancements

1. Users can enjoy a quick, smart, and adaptive Tic-Tac-Toe game with a challenging AI opponent.
2. With difficulty levels and adaptive AI, TicTacToeGPT allows players to improve their strategic thinking over time.
3. Developers can explore the integration of AI with a classic game.
4. Introduce a leaderboard system and achievements to increase engagement and encourage competitive play.
5. Add options for users to select different themes and sound effects, making the game more personalized.
6. Provide players with game statistics, such as win rates per difficulty level and insights into gameplay patterns.

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
