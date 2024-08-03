# Decentralized-Voting-System

## 1. Architecture
### 1.1 Overview
Provide a high-level overview of the project, including its purpose and key features. Include a diagram of the system architecture if possible.

### 1.2 Components
#### Backend: 
Node.js with Express, MongoDB for data storage.

<b>APIs:</b> Define RESTful API endpoints.
<br/>
<b>Authentication:</b> Use middleware for securing routes.
<br/>
<b>Database:</b> MongoDB collections and schema.
<br/>
#### Frontend:
React with Web3 integration.
<br/>
<b>Components:</b> Overview of main components (e.g., VotingPage, CreatePoll).
<br/>
<b>State Management:</b> Use of context or state management libraries.
<br/>
#### Blockchain:
Smart contracts deployed on Ethereum or a test network.

<b>Smart Contracts:</b> Overview of key contracts and their functions.
### 1.3 Data Flow
Describe how data moves through the system, from user interactions on the frontend to backend processing and blockchain interactions.

## 2. Setup Instructions
### 2.1 Prerequisites
`Node.js: Version X.X.X`
<br/>
`MongoDB: Running instance or MongoDB Atlas`
<br/>
`Ethereum: Ganache or testnet for development`
<br/>
`Metamask: Browser extension for managing Ethereum accounts`

## 2.2 Backend Setup
### 1.Clone the Repository
```

git clone https://github.com/zamanali423/Decentralized-Voting-System
cd server

```

### 2.Install Dependencies
```

npm install

```

### 3.Environment Variables

Create a `.env` file in the root directory.
<br/>
Add the following environment variables
```

PORT=3001
URL=mongodb://localhost:27017/your-db-name
WEB3_PROVIDER_URL=http://localhost:7545

```

### 4.Run the Server
```

npm start

```

## 2.3 Frontend Setup
### 1.Clone the Repository
```

git clone https://github.com/zamanali423/Decentralized-Voting-System
cd client

```

### 2.Install Dependencies
```

npm install

```

### 3.Environment Variables

Create a `.env` file in the root directory.
<br/>
Add the following environment variables
```

REACT_APP_WEB3_PROVIDER_URL=http://localhost:7545

```

### 4.Start the Development Server
```

npm start

```

## 2.4 Blockchain Setup
### Deploy Smart Contracts

Use Truffle or Hardhat for deploying contracts to a test network.
<br/>
Ensure the contract ABI and address are correctly configured in the frontend.

### Interact with Contracts

Verify deployment using tools like Etherscan or Truffle Console.


## 3. Usage Guide
### 3.1 Running the Application
<b>Start the Backend Server:</b> npm start in the backend directory.
<br/>
<b>Start the Frontend Application:</b> npm start in the frontend directory.

### 3.2 Creating a Poll
Navigate to the `Create Poll` page in the frontend.
<br/>
Fill in the poll details, including question, options, and votes.
<br/>
Click `Create Poll` to submit the form.

### 3.3 Voting
Navigate to the `Voting Page.`
<br/>
View available polls and cast your vote.
<br/>
Ensure Metamask is connected to the correct network and account.

### 3.4 Viewing Results
Navigate to the `Results` page.
<br/>
View the results fetched from the backend and verified on the blockchain.

### 3.5 Error Handling
<b>Common Errors:</b> Network issues, authentication failures.
<br/>
<b>Debugging Tips:</b> Check console logs, inspect network requests, and review smart contract events.

## 4. Additional Resources
<b>API Documentation:</b> Link to Swagger or Postman documentation.
<br/>
<b>Smart Contract Documentation:</b> Details about contract methods and events.
<br/>
<b>Troubleshooting:</b> Common issues and their fixes.


