## Project Overview

The FFM Backend provides RESTful API endpoints to manage various aspects of a fast food restaurant including:

- Customer management with authentication
- Food and food categories management
- Material and material categories management
- Order processing
- Employee management
- Coupon management
- Payment integration with VNPay

## Tech Stack

- **Node.js** and **Express**: Core server framework
- **TypeScript**: For type-safe code
- **Drizzle ORM**: Database ORM for MySQL
- **PlanetScale**: MySQL-compatible serverless database platform
- **JWT**: For authentication
- **VNPay Integration**: Payment processing

## Project Structure

- **api/**: Contains controller logic and route definitions for each entity
- **action/**: Contains database schema definitions and migrations
- **drizzle/**: Contains database connection setup
- **model/**: Contains TypeScript interfaces for data models
- **content/**: Static files like images

## Getting Started

1. Clone the repository
2. Copy .env.example to .env and configure your database connection
3. Copy config/example to config/default.json
3. Install dependencies with `npm install`
4. Start the development server with `npm start`

## Docker Support

The project includes a Dockerfile for containerization. Build with:

```bash
docker build -t ffm-backend .
docker run -p 3030:3030 ffm-backend
```