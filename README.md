
# Running the React App Locally

Follow these steps to get the React Weather App running on your local machine.

## Step 1: Clone the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/Maurilio-Saddoud/weather-app.git
```

## Step 2: Install Dependencies

Navigate to the project directory and install the necessary dependencies:

```bash
cd <project-directory>
npm install
```

Replace `<project-directory>` with the actual directory name.

## Step 3: Set Up Environment Variables

### Index.html

Paste the required Google Places key into the `index.html` file.

### .env File

Find the `.env` file in the root of the project and paste the necessary OpenWeather API key into it.

## Step 4: Start the Application

Start the application using the following command:

```bash
npm start
```

The app should now be running on `http://localhost:3000`.

## Note

If the Google Places API fails to load, give the page a refresh. In my experience, the API loads successfully about 50% of the time. :p
