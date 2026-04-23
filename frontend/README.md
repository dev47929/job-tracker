# Job Tracker Frontend

A modern React application for tracking job applications. Built with React 19, Vite, Tailwind CSS, and Material-UI.

## Overview

The Job Tracker frontend is a responsive web application that allows users to:

- Create an account and authenticate securely
- Track job applications and their statuses
- View a personalized dashboard with application statistics
- Manage job application details
- Responsive design for mobile and desktop

## Technology Stack

- **React 19** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Material-UI (MUI)** - Component library
- **React Router 7.13.0** - Client-side routing
- **React Icons 5.6.0** - Icon library
- **Motion 12.38.0** - Animation library
- **DaisyUI 5.5.18** - Tailwind CSS component library
- **ESLint 9.39.1** - Code linting

## Prerequisites

Before running the application, ensure you have:

- **Node.js 16+** installed (LTS recommended)
- **npm 8+** or **yarn** as package manager
- **Git** (for version control)
- Backend API running on `http://localhost:8080/api`

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd job-tracker/frontend
```

### 2. Install Dependencies

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

### 3. Configure Environment

Create a `.env` file in the frontend root directory:

```env
VITE_API_URL=http://localhost:8080/api
VITE_ENV=development
```

For production:

```env
VITE_API_URL=https://your-api-domain.com/api
VITE_ENV=production
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

### Development

```bash
npm run dev        # Start development server with HMR
npm run lint       # Run ESLint to check code quality
npm run preview    # Preview production build locally
npm run build      # Build for production
```

### Production Build

```bash
npm run build      # Creates optimized build in dist/
npm run preview    # Test production build locally
```

## Project Structure

```
frontend/
├── src/
│   ├── main.jsx                           # Application entry point
│   ├── App.jsx                            # Root component
│   ├── App.css                            # Global styles
│   ├── index.css                          # Global CSS
│   │
│   ├── auth/                              # Authentication pages
│   │   ├── Auth.jsx                       # Auth wrapper
│   │   ├── AuthLogin.jsx                  # Login page
│   │   └── AuthSignup.jsx                 # Signup page
│   │
│   ├── components/
│   │   ├── public/                        # Public pages
│   │   │   ├── Landing.jsx                # Landing page
│   │   │   └── LandingComponents/
│   │   │       ├── Hero.jsx
│   │   │       ├── Navbar.jsx
│   │   │       └── iphone.jsx
│   │   │
│   │   ├── private/                       # Protected components
│   │   │   └── UserContext.jsx            # User context provider
│   │   │
│   │   └── User'/                         # User dashboard components
│   │       ├── Dashboard/
│   │       │   ├── Dashboard.jsx          # Main dashboard
│   │       │   ├── Sidebar.jsx            # Navigation sidebar
│   │       │   └── Table.jsx              # Jobs table
│   │       └── Navigation/
│   │
│   ├── assets/                            # Images, icons, etc.
│   │
│   └── reactbits/                         # Reusable components & utilities
│       ├── gradient.jsx                   # Gradient component
│       ├── LandingGlobe.jsx               # Globe animation
│       └── ...
│
├── index.html                             # HTML entry point
├── vite.config.js                         # Vite configuration
├── eslint.config.js                       # ESLint configuration
├── tailwind.config.js                     # Tailwind CSS config
├── package.json                           # Dependencies
└── README.md                              # This file
```

## Core Features

### 1. Authentication

- User signup and login
- JWT token-based authentication
- Secure token storage
- Protected routes

### 2. Job Tracking Dashboard

- View all job applications
- Add new job applications
- Update job status (Applied, Interviewing, Offered, Rejected)
- Delete job entries
- Real-time status updates

### 3. User Dashboard

- Personal statistics (total applications, accepted, rejected)
- Job applications table with sorting/filtering
- Quick actions for each job
- Sidebar navigation

### 4. Responsive Design

- Mobile-first approach
- Desktop and tablet optimization
- Touch-friendly interface
- Adaptive navigation

## Component Hierarchy

```
App
├── Landing (Public)
│   ├── Navbar
│   ├── Hero
│   └── LandingGlobe
├── Auth (Public)
│   ├── AuthLogin
│   └── AuthSignup
└── UserDashboard (Private)
    ├── Sidebar
    ├── Dashboard
    │   └── Table
    └── Navigation
```

## State Management

The application uses React Context API for state management:

- **UserContext**: Manages user authentication state and user data
- Local component state for UI interactions

## API Integration

The frontend communicates with the backend API at configured endpoint:

### Authentication Endpoints

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Job Endpoints

- `GET /jobs` - Fetch all jobs
- `POST /jobs` - Create new job
- `PUT /jobs/{id}` - Update job status
- `DELETE /jobs/{id}` - Delete job

### User Endpoints

- `GET /user/dashboard` - Fetch user dashboard data
- `PUT /user/profile` - Update user profile

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow React best practices
- Keep components focused and reusable
- Use descriptive variable/function names

### Component Creation

```jsx
// Example component structure
export const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return <div className="component-class">{/* JSX content */}</div>;
};

export default MyComponent;
```

### Styling

- Prioritize Tailwind CSS classes
- Use DaisyUI components for consistency
- Create custom CSS in separate files when needed
- Follow mobile-first design approach

### Environment Variables

```javascript
// Access environment variables in components
const apiUrl = import.meta.env.VITE_API_URL;
const env = import.meta.env.VITE_ENV;
```

## Routing Structure

The application uses React Router v7:

```
/                      → Landing page (public)
/auth/login            → Login page (public)
/auth/signup           → Signup page (public)
/dashboard             → User dashboard (protected)
/dashboard/jobs        → Jobs management (protected)
/dashboard/profile     → User profile (protected)
```

## Building for Production

### 1. Optimize Build

```bash
npm run build
```

This creates a `dist/` folder with optimized production build.

### 2. Deploy

Deploy the `dist/` folder to your hosting service:

**Netlify:**

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Vercel:**

```bash
npm install -g vercel
vercel --prod
```

**Static Hosting (Apache/Nginx):**

- Copy `dist/` contents to your web server
- Configure server to serve `index.html` for all routes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting with Vite
- Lazy loading of components
- Image optimization
- Minified CSS and JavaScript
- Efficient re-renders with React.memo

## Troubleshooting

### Port Already in Use

```bash
# Run on different port
npm run dev -- --port 3000
```

### CORS Errors

- Verify backend CORS configuration
- Ensure `VITE_API_URL` points to correct backend URL
- Check browser console for specific error

### Build Size Issues

```bash
# Analyze bundle size
npm install -g vite-plugin-visualizer
```

### Hot Module Replacement (HMR) Not Working

- Clear `.vite/` cache folder
- Restart development server

## Debugging

### React DevTools

Install the React DevTools browser extension for debugging component tree and state.

### Network Tab

Use browser DevTools Network tab to inspect API requests/responses.

### Console Logging

```javascript
console.log("Debug info:", data);
console.error("Error message:", error);
```

## Security Considerations

- Store JWT tokens securely (localStorage/sessionStorage)
- Never commit `.env` files with real credentials
- Validate all user inputs
- Sanitize displayed data
- Use HTTPS in production
- Implement CSRF protection
- Keep dependencies updated: `npm audit`

## Performance Metrics

Monitor these metrics for optimal performance:

- **Lighthouse Score**: Aim for 90+
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

## Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all packages to latest
npm update

# Install latest peer dependencies
npm install --save-dev @latest
```

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes following code guidelines
3. Run linting: `npm run lint`
4. Build locally: `npm run build`
5. Commit changes: `git commit -am 'Add new feature'`
6. Push to branch: `git push origin feature/your-feature`
7. Submit a Pull Request

## Related Documentation

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Material-UI Documentation](https://mui.com)
- [React Router Documentation](https://reactrouter.com)
- [React Icons Documentation](https://react-icons.github.io/react-icons)

## License

This project is provided as-is for educational and professional use.

## Support

For issues and questions:

1. Check existing documentation
2. Review browser console for errors
3. Check network requests in DevTools
4. Contact the development team

---

**Last Updated:** April 2026
**Frontend Version:** 0.0.0
**Node Version Required:** 16+
