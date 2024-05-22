# Furrl Frontend Task

This is a Furrl Frontend #HomesHunt page built with React.js.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)

## Installing Furrl Frontend Task

To install Furrl Frontend, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/axxxay/furrl.git
    ```

2. Navigate into the project directory:
    ```bash
    cd furrl
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```
4. Deployed App Link [https://furrl-wine.vercel.app/](https://furrl-wine.vercel.app/)

## Setting Up Environment Variables

This project uses environment variables for configuration. These are stored in a `.env` file at the root of the project. 

To set up the environment variables:

1. Create a new file in the root directory of the project named `.env`.

2. Open the `.env` file and add your environment variables as key-value pairs. For example:

    ```bash
    REACT_APP_BACKEND_URL=https://furrl-backend-api.com
    ```

Replace `https://furrl-backend-api.com` with your actual Backend Endpoint, respectively.

3. Save the `.env` file. The application will now use these values when running.

**Note:** Never commit the `.env` file to your repository. It contains sensitive information and should be added to your `.gitignore` file.

## Running Furrl Frontend Task

To run Furrl Frontend Task, follow these steps:

1. Start the development server:
    ```bash
    node start
    ```

2. Open your web browser and visit [http://localhost:3000](http://localhost:3000)
