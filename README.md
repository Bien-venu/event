# Event Management System

## Overview
This project is a simple Event Management System built to showcase the following capabilities:

### Admin Features
1. **Authentication:** Admin users are required to log in to manage events.
2. **Event Management:** Admins can create, edit, or delete events with the following attributes:
   - **Title**
   - **Description**
   - **Date**
   - **Available Seats**

> **Note**: Use the following admin credentials for access:
> - **Email**: `admin@gmail.com`
> - **Password**: `admin123`

### User Features
- **Event Viewing and Booking:** Users can view a list of events and book available seats without authentication. 
- **Real-Time Seat Updates:** Seat availability is updated in real-time as users book seats.

## Tech Stack

- **Frontend:** Next.js.
- **Backend:** Next.js API routes.
- **Database:** I use MongoDB.

## Project Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd event
   npm install
   npm run dev
