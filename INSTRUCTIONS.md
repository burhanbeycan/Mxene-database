# MXene Database - Complete Instructions

## 📦 What You Have

You now have a **complete, production-ready MXene functionalization database** with:

✅ **19,008 entries** with 99 properties each  
✅ **Interactive React website** with search, filter, visualizations  
✅ **All source code** ready for GitHub Pages deployment  
✅ **Complete documentation** and setup guides  
✅ **VS Code configuration** for easy development  

---

## 🚀 Quick Start Options

### Option 1: View Locally in VS Code (Recommended First Step)

1. **Download the project** (already done if you have the files)

2. **Open in VS Code**:
   ```bash
   cd mxene-database
   code .
   ```

3. **Install dependencies**:
   ```bash
   pnpm install
   ```
   
   *Don't have pnpm?* Install it: `npm install -g pnpm`

4. **Start development server**:
   ```bash
   pnpm run dev
   ```

5. **Open browser**: Go to `http://localhost:5173/`

**That's it!** You should see the interactive database running locally.

---

### Option 2: Deploy to GitHub Pages

#### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it (e.g., `mxene-database`)
3. **Don't** initialize with README

#### Step 2: Update Configuration

Edit `vite.config.js` and change line 11:
```javascript
base: '/YOUR-REPO-NAME/',  // Replace with your actual repo name
```

For example, if your repo is `mxene-database`:
```javascript
base: '/mxene-database/',
```

#### Step 3: Initialize Git and Push

```bash
cd mxene-database

# Initialize git (if not already done)
git init
git add -A
git commit -m "Initial commit"

# Add your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 4: Deploy Using GitHub Actions (Automatic)

The project includes a GitHub Actions workflow that will automatically deploy your site when you push to the main branch.

**Configure GitHub Pages:**
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select: **GitHub Actions**
4. That's it! Your site will deploy automatically

**Your site will be live at:**
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

#### Alternative: Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
pnpm run build

# Run the deployment script
./deploy-github-pages.sh

# Follow the instructions printed by the script
```

---

## 📁 Project Files Overview

### Main Application Files
- **`src/App.jsx`** - Main React component (all functionality)
- **`src/App.css`** - Styling with Tailwind CSS
- **`index.html`** - HTML entry point

### Data Files
- **`public/mxene_comprehensive_database.csv`** - Full database (16 MB)
- **`public/database_summary.json`** - Statistics and metadata

### Configuration Files
- **`vite.config.js`** - Build configuration (⚠️ Update `base` path!)
- **`package.json`** - Dependencies
- **`.github/workflows/deploy.yml`** - Automatic deployment

### Documentation
- **`README.md`** - Comprehensive project documentation
- **`SETUP_GUIDE.md`** - Detailed setup and troubleshooting
- **`QUICKSTART.md`** - Quick reference guide
- **`INSTRUCTIONS.md`** - This file

### Scripts
- **`deploy-github-pages.sh`** - Manual deployment script

---

## 🎯 What the Website Does

### 1. Overview Tab
- Database statistics (19,008 entries, 66 MXene bases, etc.)
- Key metrics cards (molecular weight, LogP, binding energies)
- Distribution charts (metals, functionalizations)

### 2. Database Tab
- **Search**: By MXene name, functional group, or SMILES
- **Filter**: By metal type and functionalization type
- **Sort**: By binding energy, LogP, molecular weight, TPSA
- **Pagination**: Browse 20 entries at a time
- **Export**: Download filtered data as CSV

### 3. Analytics Tab
- **Metal Distribution**: Bar chart showing entries per metal
- **Binding Energy Distribution**: Histogram of binding affinities
- **LogP vs Molecular Weight**: Scatter plot
- **Functionalization Distribution**: Horizontal bar chart

### 4. Top Binders Tab
- Leaderboard of top 20 compounds by binding energy
- Detailed properties for each entry
- Medal system for top 3 binders

---

## 🔧 Common Tasks

### Change Website Title
Edit `index.html`, line 7:
```html
<title>Your Custom Title Here</title>
```

### Modify Color Scheme
Edit `src/App.css`, CSS variables in `:root` section

### Add New Filters
Edit `src/App.jsx`, add filter state and logic in the `filteredData` useMemo

### Update Data
Replace files in `public/` folder:
- `mxene_comprehensive_database.csv`
- `database_summary.json`

---

## 📊 Database Details

**Properties Included (99 total)**:
- **RDKit Descriptors (38)**: MW, LogP, TPSA, H-bonds, rings, complexity indices
- **Docking Results (30)**: Binding energies for 5 proteins (Vina, Glide, AutoDock)
- **Drug-likeness (10)**: Lipinski RO5, Veber rules, synthetic accessibility
- **MXene Properties (9)**: Lattice parameters, band gaps, electronic structure
- **Metadata (12)**: IDs, names, formulas, SMILES

**Protein Targets**:
1. Human Serum Albumin (PDB: 1AO6)
2. Lysozyme (PDB: 1LYZ)
3. Bovine Serum Albumin (PDB: 4F5S)
4. Acetylcholinesterase (PDB: 1ACJ)
5. Carbonic Anhydrase II (PDB: 1CA2)

---

## 🐛 Troubleshooting

### Website shows blank page after deployment
**Solution**: Update `base` in `vite.config.js` to match your repo name

### CSV file not loading
**Solution**: Check browser console (F12) for errors. Ensure file is in `public/` folder

### Port 5173 already in use
**Solution**: Use different port: `pnpm run dev -- --port 3000`

### GitHub Pages shows 404
**Solution**: 
1. Check GitHub Pages settings (Settings → Pages)
2. Verify `base` path in `vite.config.js`
3. Wait 2-5 minutes after deployment

See **SETUP_GUIDE.md** for more troubleshooting tips.

---

## 📚 Documentation Files

1. **README.md** - Complete project overview, chemistry details, findings
2. **SETUP_GUIDE.md** - Detailed setup, deployment, troubleshooting
3. **QUICKSTART.md** - Quick reference for common commands
4. **INSTRUCTIONS.md** - This file (getting started guide)
5. **SUMMARY.txt** - Executive summary of the database

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts Examples](https://recharts.org/en-US/examples)
- [GitHub Pages Guide](https://docs.github.com/en/pages)

---

## ✅ Pre-Deployment Checklist

Before deploying to GitHub Pages:

- [ ] Update `base` in `vite.config.js` with your repo name
- [ ] Test locally with `pnpm run dev`
- [ ] Build successfully with `pnpm run build`
- [ ] Preview build with `pnpm run preview`
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Configure GitHub Pages settings
- [ ] Wait for deployment (2-5 minutes)
- [ ] Test live site

---

## 🎉 You're All Set!

Your MXene database is ready to:
- ✅ Run locally for development
- ✅ Deploy to GitHub Pages for public access
- ✅ Share with collaborators
- ✅ Customize and extend

**Next Steps:**
1. Start with local development (Option 1 above)
2. Explore the code in VS Code
3. Make any customizations you want
4. Deploy to GitHub Pages (Option 2 above)
5. Share your live site URL!

---

## 📞 Need Help?

- Check **SETUP_GUIDE.md** for detailed instructions
- See **QUICKSTART.md** for quick reference
- Review **README.md** for project details
- Open an issue on GitHub for support

---

**Happy coding! 🚀🧪**

*MXene Functionalization Database v1.0*
