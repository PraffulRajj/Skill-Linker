# SkillLinker 2.0 - Services in 10 Minutes (MVP)

<p align="center">
  <img src="https://i.imgur.com/your-logo-image-url.png" alt="SkillLinker Logo" width="150"/>
</p>

<p align="center">
  <strong>A full-stack MVP of a service booking platform that connects users (Seekers) with skilled service providers (Providers) with a USP of "service in 10 minutes".</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

---

## 🚀 Concept

**SkillLinker** is an on-demand service platform inspired by Urban Company but with a quick-commerce twist like Blinkit. When a user (a "Seeker") needs an urgent service like a plumber or an electrician, the platform instantly notifies and dispatches an available "Provider" who is in the same local area, guaranteeing service arrival within minutes.

This MVP demonstrates the core real-time matching and notification flow using a simplified location model (pincode).

## ✨ Core Features

-   **Dual User Roles**: Separate registration, login, and dashboard experiences for **Seekers** (customers) and **Providers** (skilled workers).
-   **Service Catalog**: Seekers can browse a list of available services (e.g., AC Repair, Electrician).
-   **Instant Service Requests**: Seekers can request a service, which is immediately broadcast to all available Providers in their pincode.
-   **Real-time Notifications**: Providers receive instant push notifications for new job requests via Socket.io.
-   **Accept/Reject Flow**: Providers can accept a job, which locks the request and notifies the Seeker in real-time.
-   **Live Status Tracking**: Seekers can track the status of their request from `Pending` to `Accepted` to `Completed`.
-   **Secure Authentication**: JWT-based authentication to protect user routes and data.

---

## 🛠️ Tech Stack

| Category      | Technology                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------------ |
| **Frontend**  | [React](https://reactjs.org/) (with Vite), [TailwindCSS](https://tailwindcss.com/), [React Router](https://reactrouter.com/), [Axios](https://axios-http.com/), [Socket.io-client](https://socket.io/docs/v4/client-api/) |
| **Backend**   | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Mongoose](https://mongoosejs.com/) (for MongoDB)                                   |
| **Database**  | [MongoDB](https://www.mongodb.com/) (Local or Atlas)                                                          |
| **Real-time** | [Socket.io](https://socket.io/)                                                                               |
| **Auth**      | [JSON Web Tokens (JWT)](https://jwt.io/)                                                                      |

---


## 🕹️ How to Use the MVP

To see the real-time functionality in action:

1.  **Register Users**:
    -   Open two separate browser tabs or windows.
    -   In the first tab, **register as a 'Seeker'**.
    -   In the second tab, **register as a 'Provider'**.
    -   **Important**: Use the **same pincode** (e.g., `834001`) for both users so they can be matched.

2.  **Log In**:
    -   Log in as the Seeker in the first tab. You will be taken to the Seeker Dashboard.
    -   Log in as the Provider in the second tab. You will be taken to the Provider Dashboard.

3.  **Request a Service**:
    -   As the Seeker, select a service from the list (e.g., "Fan Repair") and click "Request Now".

4.  **Accept the Service**:
    -   The Provider's dashboard will instantly show the new request under "Available Jobs".
    -   The Provider can click "Accept".

5.  **See Real-Time Updates**:
    -   The Seeker's "My Requests" list will update in real-time to show the status as `Accepted`.
    -   The job will disappear from the Provider's "Available Jobs" list.

---

## 📁 Folder Structure

SkillLinker-MVP/
├── client/ # React Frontend
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components (Login, Register, Dashboards)
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── ...
├── server/ # Node.js Backend
│ ├── config/ # DB Connection
│ ├── controllers/ # Route logic (optional, for larger apps)
│ ├── middleware/ # Auth middleware
│ ├── models/ # Mongoose schemas (User, ServiceRequest)
│ ├── routes/ # API routes
│ ├── utils/ # Utility functions (e.g., generateToken)
│ ├── .env # Environment variables
│ ├── package.json
│ └── server.js # Express and Socket.io server setup
└── README.md


---

## 📈 Future Improvements

This MVP provides a solid foundation. Here are some features to consider for the next version:

-   [ ] **Real Geo-Location**: Integrate Google Maps or Mapbox API for precise distance calculation and provider tracking.
-   [ ] **Live Provider Tracking**: Show the provider's location on a map for the seeker.
-   [ ] **In-App Chat**: Add a chat feature for communication between Seeker and Provider.
-   [ ] **Ratings and Reviews**: Allow Seekers to rate Providers after service completion.
-   [ ] **Payment Integration**: Integrate a payment gateway like Stripe or Razorpay.
-   [ ] **More Complex Statuses**: Add statuses like `On the way`, `Work in Progress`, `Payment Pending`.
-   [ ] **Admin Panel**: A dashboard for admins to manage users, services, and disputes.

---

<h1>FOUNDER - PRAFFUL RAJ</h1>
