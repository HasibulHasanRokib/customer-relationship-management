# Modern CRM System

A modern Customer Relationship Management (CRM) system built with **Next.js**, **TypeScript**, **Prisma**, and a **PostgreSQL** database. This application helps businesses manage customer interactions, track sales, and streamline communication through a user-friendly, responsive interface.

---

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Deployment](#deployment)

---

## 🚀 Features

- **Customer Management**: Create, view, update, and delete customer records
- **Interaction Tracking**: Log all customer communications and activities
- **Sales Pipeline**: Visualize and manage deals through different stages
- **User Authentication**: Secure login with role-based access control via NextAuth.js
- **File Uploads**: Upload and manage documents using UploadThing
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Analytics Dashboard**: Monitor key metrics and performance indicators

---

## 🛠 Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL 
- **ORM**: Prisma
- **File Uploads**: UploadThing
- **Authentication**: Auth.js
- **Form Handling**: React Hook Form
- **UI Components**: ShadCN UI
- **Deployment**: Vercel

---

## 🧰 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or later
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/) (or alternative SQL DB)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/crm-nextjs.git
cd crm-nextjs
```

2. Install dependencies:

```bash
npm install
```
3. Set up environment variables:

```bash
DATABASE_URL=""
JWT_SECRET="" 
UPLOADTHING_TOKEN=""
```

4. Run the development server:

```bash
npm run dev
```

### Deployment
- Push your code to a GitHub repository
- Create a new project in ***Vercel*** and connect your repository
- Add environment variables in Vercel's project settings
- Deploy!
### Screenshot

![screencapture-localhost-3000-dashboard-2025-07-05-13_40_54](https://github.com/user-attachments/assets/d0a937dc-5d02-4680-9883-0be8a10a8582)
