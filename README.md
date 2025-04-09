# Anchorz-Up technical task

## Overview
This is sleek URL shortening service built with Next.js 15, utilizing modern tools like Prisma and PostgreSQL for data management, TailwindCSS and ShadCN components for styling, and Typescript for type safety. This app supports core URL management features including creation, deletion, redirection, and analytics, providing a streamlined online experience through shortened links.

## Features
- **Short Link Generation**: Converts long URLs into a link with 6 randomized characters
- **Redirection**: Redirects users to the original URL via short links.
- **Statistics**: Tracks and displays click counts for each short link.
- **Expiration**: Supports expiration dates for short links.
- **QR Code Generation** (optional): Generates QR codes for easy sharing.
- **API Routes**: 
  - `api/create`: Creates a short link.
  - `api/delete`: Deletes a short link.
  - `api/redirect`: Redirects to the original URL.
  - `api/all`: Gets all the URLs from the db

## Prerequisites
- **Node.js**: Version 16 or later.
- **Environment Variables**: Ensure you have the necessary `.env` file with the following:

```env
DATABASE_URL="postgresql://short-url_owner:QqRB08cVArfm@ep-cool-snow-a2uf1mky.eu-central-1.aws.neon.tech/short-url?sslmode=require"
```

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Ledionrestelica/anchorz-up.git
   cd anchorz-up
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup the Environment Variables**
   Create a `.env` file in the project root and add the `DATABASE_URL` variable:
   ```env
   ```

4. **Start the Development Server**
   Run the Next.js development server:
   ```bash
   npm run dev
   ```
   The app will be accessible at `http://localhost:3000`.

## Project Structure
```
anchorz-up/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── create/
│   │   │   ├── delete/
│   │   │   └── redirect/
│   │   └── ...
│   ├── components/
│   └── utils/
├── prisma/
│   ├── schema.prisma
├── .env
├── package.json
└── README.md
```

## Key Technologies
- **Next.js 15**: Framework for building React applications with an App Router architecture.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **ShadCN**: Component library for modern UIs.
- **Prisma**: ORM for database operations.
- **PostgreSQL**: Relational database for storing URL data.
- **TypeScript**: Ensures type safety and robustness.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License
This project is licensed under the MIT License.
