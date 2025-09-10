# Project Name

A full-stack application built with **NestJS**, **Prisma**, **React.js**, and **Zustand**.  
This repository contains the **backend**, **client (frontend app)**, and **dashboard (admin panel)**.

---

## 🚀 Tech Stack

### Backend
- **NestJS**
- **Prisma ORM**
- **Native WebSockets**
- **Database**: (Postgres / MySQL / SQLite) ← specify here

### Frontend (Client & Dashboard)
- **React.js**
- **Zustand** (state management)
- **TanStack Query** (data fetching & caching)
- **Ant Design** (UI components)
- **Vite** (build tool)

---

## ⚙️ Prerequisites
- npm or yarn
- Database installed & running (configured in `.env`) (PostgresSQL)

---

## 🛠️ Backend Setup

1. Create a `.env` file in the backend folder (see `.env.example` if available).
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Initialize Prisma client:
   ```bash
   npm run db:client:init
   ```
4. Run database migrations:
   ```bash
   npm run db:migrate
   ```
5. Seed the database:
   ```bash
   npm run db:seed
   ```
6. Build & start the project:
   ```bash
   npm run build && npm run start
   ```

---

## 🖥️ Frontend (Client) Setup

1. Create a `.env` file in the client folder.
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the project:
   ```bash
   npm run dev
   ```
By default, the client runs on **http://localhost:5173** (can be changed in Vite config).

---

## 📊 Frontend (Dashboard) Setup

1. Create a `.env` file in the dashboard folder.
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the project:
   ```bash
   npm run dev
   ```
By default, the dashboard also runs on **http://localhost:5173** (can be changed in Vite config).

---

## 📚 Features & Notes

- **Pagination**:
    - Pagination is available on the frontend.
    - Ideally, pagination should be implemented on the backend for efficiency.
    - Options:
        - Use [prisma-pagination](https://www.npmjs.com/package/prisma-pagination) package
        - Implement a **custom pagination strategy** (cursor-based or offset-based).

- **Message Broker (RabbitMQ / Kafka)**:
    - Can be used for **event-driven communication** between services.
    - Example cases:
        - Processing bets (`doBet` action) asynchronously.
        - Broadcasting game outcomes or updates to multiple consumers.
        - Handling high-volume event logs (e.g., user actions, transactions, audits).
        - Queueing long-running jobs (e.g., bonus calculations, settlement).

- **Redis**:
    - Can be used for **caching, pub/sub, and fast access storage**.
    - Example cases:
        - Store live bet states in memory for quick retrieval.
        - Implement **session management** or token blacklisting.
        - Use Redis Pub/Sub for **real-time notifications** (bet status updates, wins/losses).
        - Cache frequently accessed data (statistics, leaderboards, dashboards).

- **WebSockets Enhancements**:
    - Already used for live game updates.
    - Extend WebSocket usage for **dashboard real-time data**:
        - Live user activity tracking.
        - Real-time bet flow monitoring.
        - Instant alerts (e.g., suspicious betting patterns).
    - Use Redis Pub/Sub or Kafka Streams to broadcast events across multiple backend instances.

---
