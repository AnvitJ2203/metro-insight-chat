# 🚇 Metro Rail Document Intelligence - Project Structure

## Overview
Hackathon-ready frontend for Kochi Metro Rail Ltd. (KMRL) engineers to upload, search, and chat with technical documents.

## 📁 File Structure & Responsibilities

### Core Application Files
```
src/
├── pages/
│   ├── Index.tsx                    # Main app entry point - handles login/dashboard routing
│   └── NotFound.tsx                 # 404 error page
│
├── components/
│   ├── Login.tsx                    # 🔐 Login form with KMRL branding
│   ├── Dashboard.tsx                # 🏠 Main dashboard layout with tab management
│   ├── DashboardHeader.tsx          # 📋 Top header with user info and logout
│   ├── DashboardSidebar.tsx         # 📊 Left sidebar with navigation and stats
│   ├── FileUpload.tsx               # 📁 Drag & drop PDF upload component
│   └── SystemStats.tsx              # 📈 Real-time system statistics display
│
├── components/tabs/
│   ├── ChatTab.tsx                  # 💬 Chat interface with chatbot integration area
│   ├── FleetTab.tsx                 # 🚂 Train fleet status monitoring
│   ├── DocumentsTab.tsx             # 📑 Document management and listing
│   └── SearchTab.tsx                # 🔍 Document search with results
│
├── components/ui/                   # Shadcn UI components (buttons, cards, etc.)
├── hooks/                           # React hooks (toast, mobile detection)
├── lib/                             # Utility functions
└── assets/                          # Images and static files
```

## 🎯 Component Responsibilities

### 🔐 Login.tsx
- Simple username/password form
- KMRL branding with metro train icon
- Connects to FastAPI `/auth/login` endpoint
- Redirects to dashboard on success

### 🏠 Dashboard.tsx
- Main application container
- Tab state management (chat, fleet, documents, search)
- User session handling
- Document upload state coordination

### 📊 DashboardSidebar.tsx
- Navigation between tabs
- File upload interface
- System statistics display
- Collapsible responsive design

### 💬 ChatTab.tsx - **CHATBOT INTEGRATION ZONE**
```typescript
// 🎯 YOUR CHATBOT INTEGRATION AREA
// Replace the ScrollArea section with your React chatbot:

<YourChatbotComponent 
  messages={messages}
  onSendMessage={handleSendMessage}
  isLoading={isLoading}
  className="flex-1"
/>
```
- Quick action buttons for common queries
- Message history with user/assistant styling
- **Integration container ready for your React chatbot**
- Connects to FastAPI `/chat` endpoint

### 🚂 FleetTab.tsx
- Real-time train status display
- Status categories: Ready, Maintenance, Safety Alerts
- Train cards with inspection dates and issues
- Connects to FastAPI `/fleet` endpoint

### 📑 DocumentsTab.tsx
- Document listing with metadata
- File upload integration
- View/download document actions
- Document type badges and file size display

### 🔍 SearchTab.tsx
- Document search across all uploaded files
- Relevance scoring and result ranking
- Highlighted search results with context
- Connects to FastAPI `/search?q=...` endpoint

### 📁 FileUpload.tsx
- Drag & drop PDF upload
- Multiple file selection
- Upload progress indicator
- Connects to FastAPI `/upload` endpoint

## 🔧 FastAPI Backend Integration

### Required API Endpoints
```python
# Authentication
POST /auth/login
Body: {"username": str, "password": str}
Response: {"token": str, "user": {...}}

# File Upload
POST /upload
Body: FormData with files
Response: {"documents": [...], "count": int}

# Chat Assistant
POST /chat
Body: {"message": str, "context": str}
Response: {"response": str, "sources": [...]}

# Document Search
GET /search?q={query}
Response: {"results": [...], "count": int}

# Fleet Status
GET /fleet
Response: {"trains": [...], "summary": {...}}
```

## 🎨 Design System

### Color Palette
- **Primary**: Metro Blue (`hsl(217 91% 60%)`)
- **Secondary**: Railway Grey (`hsl(220 14% 96%)`)
- **Status Colors**:
  - Ready: `hsl(142 76% 36%)` (Green)
  - Maintenance: `hsl(45 93% 47%)` (Yellow)
  - Alert: `hsl(0 84% 60%)` (Red)

### Typography & Spacing
- Rounded corners: `0.75rem`
- Card shadows with metro blue glow
- Responsive grid layouts
- Metro-themed gradients and animations

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Deploy Your Chatbot
1. Locate the chatbot integration area in `ChatTab.tsx`
2. Replace the mock chat interface with your React component
3. Connect to your FastAPI chat endpoint

### 4. Connect FastAPI Backend
Update all mock API calls with your actual FastAPI endpoints:
- Login: `/auth/login`
- Upload: `/upload`
- Chat: `/chat`
- Search: `/search`
- Fleet: `/fleet`

## 📱 Mobile Responsive
- Collapsible sidebar on mobile
- Touch-friendly buttons and inputs
- Responsive grid layouts
- Mobile-optimized file upload

## 🔒 Security Features
- Input validation on all forms
- File type restrictions (PDF only)
- User session management
- Toast notifications for user feedback

## 🎯 Demo Features
- Mock data for all components
- Working file upload simulation
- Realistic fleet status display
- Sample search results
- Interactive chat interface ready for integration

## 🛠 Customization
1. **Branding**: Update colors in `index.css` and `tailwind.config.ts`
2. **API Endpoints**: Replace mock calls with actual FastAPI URLs
3. **Chatbot**: Integrate your React chatbot in `ChatTab.tsx`
4. **Features**: Add new tabs by creating components in `tabs/` folder

---

**Ready for hackathon deployment!** 🚀
The frontend is fully functional with mock data and ready to connect to your FastAPI backend.