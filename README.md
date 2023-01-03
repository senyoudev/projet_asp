# Car Rental Website
This is a car rental website built using the following technologies:

ASP.NET Core Web API for the backend
JWT authentication for secure user login
Swagger for testing the APIs
SQL Server Entity Framework (Code First) for the database
React in the frontend
Context API for state management
Axios to fetch the APIs
React-Bootstrap for styling
Cloudinary to store images
## Features
Homepage with statistics, special offers, access to the account (authentication), ...
Profiles:

*Administrator
Dashboard (history of all customers, list of customers with problems, addition to blacklist, addition to favorites list) of the database
Management of profiles and database.
*Owner space
Owner information form (depending on whether agency or individual) (profile)
History
*Car space
Form for adding information about the car and owner (profile).
Possibility to update/delete information
List of cars
List of available cars Availability list after date selection Search for car by criterion (brand, color, owner, ...)
*Renter space
Renter information form (profile) Reservation form (selection of car, choice of payment)
Renter history.
Note that this specification remains open to introduce new techniques and additional sections that seem very effective for the application.


## Getting Started
To run this project, you will need the following software installed on your machine:

.NET Core 
Node.js
SQL Server
Clone the repository: git clone https://github.com/senyoudev/projet_asp.git
Navigate to the backend directory: cd car-rental-website/backend
Restore the dependencies: dotnet restore
Update the connection string in appsettings.json to point to your local SQL Server instance
Run the database migration: dotnet ef database update
Start the backend server: dotnet run
Navigate to the frontend directory: cd ../frontend
Install the dependencies: npm install
Start the frontend server: npm start
The frontend should now be running on http://localhost:3000.

## API Documentation
You can access the API documentation using Swagger at https://localhost:44378/swagger/index.html

## Contributions
Contributions are welcome! If you find a bug or want to suggest a new feature, please open an issue. If you want to contribute code, please fork the repository and submit a pull request

## Website Demo
<video src="./screens/demo.mp4" width="320" height="240" controls></video>

