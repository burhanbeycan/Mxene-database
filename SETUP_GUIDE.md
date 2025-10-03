# MXene Database - Setup & Deployment Guide

## 📋 Table of Contents
1. [Local Development with VS Code](#local-development-with-vs-code)
2. [GitHub Pages Deployment](#github-pages-deployment)
3. [Project Structure](#project-structure)
4. [Troubleshooting](#troubleshooting)

---

## 🖥️ Local Development with VS Code

### Prerequisites
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** - Install with: `npm install -g pnpm`
- **Visual Studio Code** - [Download](https://code.visualstudio.com/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone/Download the Project

```bash
# If using Git
git clone <your-repo-url>
cd mxene-database

# Or download and extract the ZIP file, then navigate to the folder
cd mxene-database
```

### Step 2: Install Dependencies

```bash
# Install all required packages
pnpm install
```

This will install:
- React 19.1.0
- Recharts (data visualization)
- Papa Parse (CSV parsing)
- Tailwind CSS + shadcn/ui (styling)
- Vite (build tool)

### Step 3: Start Development Server

```bash
# Start the development server
pnpm run dev
```

You should see:
```
VITE v6.3.5  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: http://xxx.xxx.xxx.xxx:5173/
```

### Step 4: Open in VS Code

```bash
# Open VS Code in the project directory
code .
```

**Recommended VS Code Extensions:**
1. **ES7+ React/Redux/React-Native snippets** - Code snippets
2. **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
3. **Prettier - Code formatter** - Auto-formatting
4. **ESLint** - Code linting
5. **GitLens** - Git integration

### Step 5: View the Website

1. Open your browser and navigate to `http://localhost:5173/`
2. The site will automatically reload when you make changes to the code
3. Check the browser console (F12) for any errors

### Project Files to Edit

**Main Application:**
- `src/App.jsx` - Main React component with all functionality
- `src/App.css` - Tailwind CSS configuration and custom styles
- `index.html` - HTML entry point (change title here)

**Data Files:**
- `public/mxene_comprehensive_database.csv` - Full database (16 MB)
- `public/database_summary.json` - Statistics and metadata

**UI Components:**
- `src/components/ui/` - Pre-built UI components (buttons, cards, etc.)

### Development Workflow

1. **Make changes** to `src/App.jsx` or other files
2. **Save the file** (Ctrl+S / Cmd+S)
3. **Browser auto-refreshes** with your changes
4. **Check console** for errors (F12 in browser)

### Building for Production

```bash
# Create optimized production build
pnpm run build
```

Output will be in the `dist/` folder.

### Preview Production Build Locally

```bash
# Preview the production build
pnpm run preview
```

---

## 🚀 GitHub Pages Deployment

### Method 1: Automated Script (Recommended)

```bash
# Run the deployment script
./deploy-github-pages.sh
```

This script will:
1. Build the production version
2. Create/switch to `gh-pages` branch
3. Copy build files to root
4. Commit changes
5. Provide instructions for pushing

### Method 2: Manual Deployment

#### Step 1: Build the Project

```bash
pnpm run build
```

#### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/) and create a new repository
2. Name it (e.g., `mxene-database`)
3. **Don't** initialize with README, .gitignore, or license

#### Step 3: Configure Git Remote

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Or if using SSH
git remote add origin git@github.com:YOUR-USERNAME/YOUR-REPO-NAME.git
```

#### Step 4: Push to GitHub

```bash
# Push main branch
git push -u origin master

# Or if your default branch is 'main'
git branch -M main
git push -u origin main
```

#### Step 5: Deploy to GitHub Pages

**Option A: Using gh-pages branch**

```bash
# Create and switch to gh-pages branch
git checkout -b gh-pages

# Copy dist contents to root
cp -r dist/* .

# Commit and push
git add -A
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force
```

**Option B: Using GitHub Actions (Recommended)**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install pnpm
      run: npm install -g pnpm
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Build
      run: pnpm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

#### Step 6: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `gh-pages` (or `main` if using Actions)
   - **Folder**: `/ (root)` or `/docs` depending on setup
4. Click **Save**
5. Wait 1-2 minutes for deployment

#### Step 7: Access Your Site

Your site will be available at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

### Updating the Deployed Site

```bash
# Make your changes
# Build the project
pnpm run build

# Switch to gh-pages branch
git checkout gh-pages

# Copy new build
cp -r dist/* .

# Commit and push
git add -A
git commit -m "Update site"
git push origin gh-pages --force

# Switch back to main branch
git checkout main
```

---

## 📁 Project Structure

```
mxene-database/
├── public/                          # Static files
│   ├── mxene_comprehensive_database.csv  # Full database (16 MB)
│   ├── database_summary.json        # Statistics
│   └── favicon.ico                  # Site icon
├── src/
│   ├── components/
│   │   └── ui/                      # UI components (shadcn/ui)
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── tabs.jsx
│   │       └── ... (40+ components)
│   ├── hooks/                       # Custom React hooks
│   ├── lib/                         # Utility functions
│   ├── App.jsx                      # Main application component
│   ├── App.css                      # Tailwind CSS styles
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles
├── dist/                            # Production build (generated)
├── node_modules/                    # Dependencies (generated)
├── .gitignore                       # Git ignore rules
├── index.html                       # HTML entry point
├── package.json                     # Project dependencies
├── pnpm-lock.yaml                   # Dependency lock file
├── vite.config.js                   # Vite configuration
├── components.json                  # shadcn/ui config
├── deploy-github-pages.sh           # Deployment script
├── SETUP_GUIDE.md                   # This file
└── README.md                        # Project documentation
```

---

## 🔧 Troubleshooting

### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: Port 5173 already in use

**Solution:**
```bash
# Kill the process using the port
# On macOS/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use a different port
pnpm run dev -- --port 3000
```

### Issue: CSV file not loading

**Solution:**
1. Check that `mxene_comprehensive_database.csv` is in `public/` folder
2. Check browser console (F12) for CORS errors
3. Ensure file size is under GitHub's limits (100 MB)

### Issue: GitHub Pages shows 404

**Solution:**
1. Verify `gh-pages` branch exists and has content
2. Check GitHub Pages settings (Settings → Pages)
3. Wait 2-5 minutes after pushing for deployment
4. Check if base URL is correct in `vite.config.js`:

```javascript
export default defineConfig({
  base: '/YOUR-REPO-NAME/',  // Add this line
  plugins: [react()],
})
```

### Issue: Blank page after deployment

**Solution:**
Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/mxene-database/',  // Replace with your repo name
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

Then rebuild and redeploy.

### Issue: Styles not loading

**Solution:**
1. Ensure `App.css` imports are present in `App.jsx`:
   ```javascript
   import './App.css'
   ```
2. Check that Tailwind CSS is properly configured
3. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)

---

## 📊 Database Information

- **Total Entries**: 19,008
- **File Size**: 16 MB (CSV)
- **Properties**: 99 per entry
- **Load Time**: ~2-3 seconds on first load

The database is loaded client-side using Papa Parse. For very large datasets, consider:
1. Server-side API
2. Database pagination
3. Data compression

---

## 🎨 Customization Tips

### Change Color Scheme

Edit `src/App.css` - modify CSS variables:

```css
:root {
  --primary: oklch(0.205 0 0);     /* Primary color */
  --secondary: oklch(0.97 0 0);    /* Secondary color */
  --accent: oklch(0.97 0 0);       /* Accent color */
  /* ... more colors */
}
```

### Add New Charts

1. Import Recharts components in `App.jsx`:
```javascript
import { LineChart, Line, AreaChart, Area } from 'recharts'
```

2. Add chart component in JSX:
```javascript
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={yourData}>
    <XAxis dataKey="x" />
    <YAxis />
    <Line type="monotone" dataKey="y" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer>
```

### Modify Filters

Edit the filter section in `App.jsx`:

```javascript
// Add new filter
const [selectedProperty, setSelectedProperty] = useState('all')

// Add filter logic in useMemo
if (selectedProperty !== 'all') {
  filtered = filtered.filter(row => row.Property === selectedProperty)
}
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Recharts Documentation](https://recharts.org/)
- [GitHub Pages Guide](https://pages.github.com/)

---

## 💡 Tips for VS Code

### Keyboard Shortcuts

- **Ctrl/Cmd + P**: Quick file open
- **Ctrl/Cmd + Shift + F**: Search across all files
- **Ctrl/Cmd + `**: Toggle terminal
- **Alt + Click**: Multiple cursors
- **Ctrl/Cmd + D**: Select next occurrence
- **F2**: Rename symbol

### Recommended Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## ✅ Checklist for Deployment

- [ ] Install Node.js and pnpm
- [ ] Clone/download project
- [ ] Run `pnpm install`
- [ ] Test locally with `pnpm run dev`
- [ ] Build with `pnpm run build`
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Configure GitHub Pages
- [ ] Update base URL in `vite.config.js` if needed
- [ ] Test deployed site
- [ ] Share the URL!

---

**Need Help?** Open an issue on GitHub or check the documentation links above.

**Happy Coding! 🚀**
