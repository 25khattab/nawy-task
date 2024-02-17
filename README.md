# Apartment Listing App

A simple application for listing apartments. This project is built with Next.js for the frontend, Node.js for the backend, and MongoDB as the database. The mobile app is developed using React Native and Expo.

## Technologies Used

- Next.js (React)
- Node.js
- MongoDB
- React Native
- Expo

## Installation

### Backend & Frontend

1. Navigate to the `next` folder:
    ```bash
    cd next
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. Navigate back to the root directory:
    ```bash
    cd ../
    ```
4. Open your browser and go to [http://localhost:3000](http://localhost:3000).

### Mobile

1. Navigate to the `mobile` folder:
    ```bash
    cd nawy-mobile
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the Expo development server:
    ```bash
    npm run start
    ```

5. Open the Expo Go app on your mobile device and scan the QR code to preview the app.

## API Endpoints

### Get All Apartments
- **Endpoint:** `GET /api/apartments`
- **Description:** Retrieve a list of all apartments.

### Get Apartment Details by ID
- **Endpoint:** `GET /api/apartments/:id`
- **Description:** Retrieve details of a specific apartment by its ID.

### Create Apartment
- **Endpoint:** `POST /api/apartments`
- **Description:** Create a new apartment.

#### Request Body Schema:
```json
{
  "name": "Apartment Name",
  "price": 1500,
  "bathrooms": 2,
  "bedrooms": 3,
  "apartmentArea": 1200,
  "location": {
    "longitude": 123.456,
    "latitude": 45.678,
    "area": "Example Area",
    "city": "Example City"
  }
}
