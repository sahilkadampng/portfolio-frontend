import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type SectionKey = 'getting-started' | 'api-reference' | 'auth' | 'database' | 'deployment';

interface DocSection {
    title: string;
    tag: string;
    content: { heading: string; code?: string; text: string }[];
}

const sections: Record<SectionKey, DocSection> = {
    'getting-started': {
        title: 'Getting Started',
        tag: 'Quickstart',
        content: [
            {
                heading: 'Installation',
                code: `# Clone the repository
git clone https://github.com/sahilkadampng/project.git
cd project

# Install dependencies
npm install

# Start development server
npm run dev`,
                text: 'Clone the repo, install dependencies, and start the dev server. The application runs on port 3000 by default.',
            },
            {
                heading: 'Environment Setup',
                code: `# .env configuration
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d
NODE_ENV=development`,
                text: 'Create a .env file in the root directory. All environment variables are validated at startup.',
            },
        ],
    },
    'api-reference': {
        title: 'API Reference',
        tag: 'Endpoints',
        content: [
            {
                heading: 'Base URL & Headers',
                code: `// Base URL
https://api.example.com/v1

// Required Headers
Content-Type: application/json
Authorization: Bearer <token>`,
                text: 'All API requests require JSON content type. Protected routes need a valid JWT in the Authorization header.',
            },
            {
                heading: 'Response Format',
                code: `// Success Response
{
  "status": "success",
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 42,
    "limit": 10
  }
}

// Error Response
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid format" }
  ]
}`,
                text: 'All responses follow a consistent schema. Pagination metadata is included for list endpoints.',
            },
            {
                heading: 'Users Endpoint',
                code: `GET    /api/v1/users          // List users
GET    /api/v1/users/:id      // Get user
POST   /api/v1/users          // Create user
PATCH  /api/v1/users/:id      // Update user
DELETE /api/v1/users/:id      // Delete user`,
                text: 'Full CRUD operations with role-based access control. Admin routes require elevated permissions.',
            },
        ],
    },
    auth: {
        title: 'Authentication',
        tag: 'Security',
        content: [
            {
                heading: 'Login Flow',
                code: `POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}

// Response
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "dGhpcyBpcyBhIHJl...",
  "expiresIn": "7d"
}`,
                text: 'Login returns a JWT access token and a refresh token. Store tokens securely — never in localStorage for production.',
            },
            {
                heading: 'Token Refresh',
                code: `POST /api/v1/auth/refresh
{
  "refreshToken": "dGhpcyBpcyBhIHJl..."
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": "7d"
}`,
                text: 'Use the refresh endpoint to get a new access token without re-authenticating. Refresh tokens are single-use.',
            },
        ],
    },
    database: {
        title: 'Database',
        tag: 'Data Layer',
        content: [
            {
                heading: 'Schema Design',
                code: `// User Schema (Mongoose)
const userSchema = new Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  active:   { type: Boolean, default: true }
}, { timestamps: true });

userSchema.index({ email: 1 });
userSchema.index({ role: 1, active: 1 });`,
                text: 'All schemas use timestamps and strategic indexing. Sensitive fields like password are excluded from queries by default.',
            },
            {
                heading: 'Query Patterns',
                code: `// Pagination helper
const paginate = async (Model, query, options) => {
  const { page = 1, limit = 10, sort = '-createdAt' } = options;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Model.find(query).sort(sort).skip(skip).limit(limit),
    Model.countDocuments(query)
  ]);

  return { data, total, page, pages: Math.ceil(total / limit) };
};`,
                text: 'Reusable pagination utility. Supports sorting, filtering, and population — optimized for large collections.',
            },
        ],
    },
    deployment: {
        title: 'Deployment',
        tag: 'DevOps',
        content: [
            {
                heading: 'Production Build',
                code: `# Build for production
npm run build

# Start production server
NODE_ENV=production npm start

# Or use PM2
pm2 start ecosystem.config.js --env production`,
                text: 'Production builds are optimized with tree-shaking and minification. Use PM2 or Docker for process management.',
            },
            {
                heading: 'Docker Setup',
                code: `# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "dist/server.js"]

# docker-compose.yml
services:
  api:
    build: .
    ports: ["3000:3000"]
    env_file: .env
    depends_on: [mongo]
  mongo:
    image: mongo:7
    volumes: [mongo-data:/data/db]`,
                text: 'Docker container with multi-stage builds. Docker Compose for local development with MongoDB.',
            },
        ],
    },
};

const sidebarItems: { key: SectionKey; label: string }[] = [
    { key: 'getting-started', label: 'Getting Started' },
    { key: 'api-reference', label: 'API Reference' },
    { key: 'auth', label: 'Authentication' },
    { key: 'database', label: 'Database' },
    { key: 'deployment', label: 'Deployment' },
];

export default function Docs() {
    const [active, setActive] = useState<SectionKey>('getting-started');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const section = sections[active];

    return (
        <>
            <Navbar />
            <main className="bg-[#f4f6fb] min-h-screen pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-blue-600 uppercase mb-6">
                            ● Documentation :: Reference ●
                        </p>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 uppercase leading-tight tracking-tight">
                            API <span className="text-blue-600 italic">Docs.</span>
                        </h1>
                        <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
                            Everything you need to understand, integrate, and deploy.
                        </p>
                    </div>

                    {/* Mobile sidebar toggle */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden w-full mb-4 px-4 py-3 bg-white border border-gray-200 rounded-xl font-mono text-sm text-gray-700 flex items-center justify-between"
                    >
                        <span>{section.title}</span>
                        <span className="text-gray-400">{sidebarOpen ? '▲' : '▼'}</span>
                    </button>

                    <div className="flex gap-6">
                        {/* Sidebar */}
                        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-56 shrink-0`}>
                            <div className="bg-white border border-gray-200 rounded-xl p-4 sticky top-28">
                                <p className="font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-4 px-2">
                                    Navigation
                                </p>
                                <nav className="space-y-1">
                                    {sidebarItems.map((item) => (
                                        <button
                                            key={item.key}
                                            onClick={() => { setActive(item.key); setSidebarOpen(false); }}
                                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-arimo transition-colors cursor-pointer ${
                                                active === item.key
                                                    ? 'bg-blue-50 text-blue-600 font-semibold'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-md font-mono text-[10px] tracking-wider text-blue-600 uppercase">
                                        {section.tag}
                                    </span>
                                    <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">
                                        Last updated: Feb 2026
                                    </span>
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 uppercase tracking-tight mb-8">
                                    {section.title}
                                </h2>

                                <div className="space-y-10">
                                    {section.content.map((block, i) => (
                                        <div key={i}>
                                            <h3 className="text-lg font-bold text-gray-900 mb-3">{block.heading}</h3>
                                            {block.code && (
                                                <div className="bg-[#1e1e2e] rounded-lg p-5 mb-4 overflow-x-auto">
                                                    <pre className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre">
                                                        {block.code}
                                                    </pre>
                                                </div>
                                            )}
                                            <p className="text-gray-500 text-sm leading-relaxed">{block.text}</p>
                                            {i < section.content.length - 1 && (
                                                <div className="mt-8 h-px bg-gray-100" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Prev / Next nav */}
                            <div className="mt-6 flex justify-between">
                                {(() => {
                                    const idx = sidebarItems.findIndex((s) => s.key === active);
                                    const prev = idx > 0 ? sidebarItems[idx - 1] : null;
                                    const next = idx < sidebarItems.length - 1 ? sidebarItems[idx + 1] : null;
                                    return (
                                        <>
                                            {prev ? (
                                                <button onClick={() => setActive(prev.key)} className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-mono text-xs text-gray-600 hover:text-gray-900 hover:border-gray-300 transition cursor-pointer">
                                                    ← {prev.label}
                                                </button>
                                            ) : <span />}
                                            {next ? (
                                                <button onClick={() => setActive(next.key)} className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-mono text-xs text-gray-600 hover:text-gray-900 hover:border-gray-300 transition cursor-pointer">
                                                    {next.label} →
                                                </button>
                                            ) : <span />}
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
