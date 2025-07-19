# UPVC Software - Safe Plast Management System

A comprehensive React-based web application for managing UPVC window manufacturing and sales operations. Built for Safe Plast with integrated Firebase backend for real-time data management.

## 🏗️ Features

- **Dashboard**: Real-time business metrics and KPIs
- **Window Designer**: Interactive UPVC window configuration tool
- **Quotation System**: Generate professional quotes with dynamic pricing
- **Customer Management**: Complete customer database with history
- **Inventory Tracking**: Stock management for UPVC materials and hardware
- **Sales Management**: Order processing and sales analytics
- **Settings**: Company details, tax configuration, and system preferences
- **Firebase Integration**: Real-time database with authentication

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0, Tailwind CSS 3.4.17
- **Backend**: Firebase (Firestore, Authentication)
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Styling**: Tailwind CSS with PostCSS

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Firebase project (for backend services)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/upvc-software.git
cd upvc-software
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Set up Firestore database
   - Configure authentication
   - Update Firebase configuration in `src/firebase.js`

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Top navigation bar
│   ├── Sidebar.js      # Side navigation menu
│   └── KpiCard.js      # Dashboard KPI widgets
├── pages/              # Main application pages
│   ├── Dashboard.js    # Business overview
│   ├── WindowDesigner.js # Window configuration
│   ├── CreateQuote.js  # Quotation generation
│   ├── Customers.js    # Customer management
│   ├── Inventory.js    # Stock management
│   ├── Sales.js        # Sales tracking
│   ├── Reports.js      # Analytics and reports
│   └── Settings.js     # System configuration
├── firebase.js         # Firebase configuration
├── App.js             # Main application component
└── index.js           # Application entry point
```

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App for full configuration control

## 🏢 Company Information

**Safe Plast**
- Address: Indore-Ahmadabad Highway, Opp. RTO Office, Nr. Laxshmi Narayan force showroom, Dahod, 389151
- Email: safeplast.maker@gmail.com
- Phone: +91 9408427918
- GSTIN: 24AIDPB1130H2Z4

## 🔐 Firebase Setup

The application uses Firebase for:
- **Firestore**: Real-time database for storing quotes, customers, inventory
- **Authentication**: User authentication and authorization
- **Cloud Functions**: Server-side business logic (if needed)

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Safe Plast. All rights reserved.

## 📞 Support

For support and inquiries, contact:
- Email: safeplast.maker@gmail.com
- Phone: +91 9408427918

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
