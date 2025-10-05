# MXene Functionalization Database

🧪 **Interactive database of 19,008 functionalized MXene structures with computational properties**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://burhanbeycan.github.io/mxene-database/)
[![Database](https://img.shields.io/badge/Entries-19,008-green)](https://github.com/burhanbeycan/mxene-database)
[![Properties](https://img.shields.io/badge/Properties-99-orange)](https://github.com/burhanbeycan/mxene-database)

## 🎯 Overview

Comprehensive computational database exploring surface functionalization chemistry of OH-terminated MXenes through one-step and multi-step reactions. Includes molecular descriptors, binding energies, and drug-likeness metrics.

**Live Website:** [https://burhanbeycan.github.io/Mxene-database/]

## 📊 Database Statistics

- **19,008 entries** - Functionalized MXene structures
- **66 MXene bases** - Ti, Zr, Hf, V, Nb, Ta, Cr, Mo, W, Sc, Y with C/N
- **42 functional groups** - From 12 reaction types
- **99 properties** - Per entry (RDKit descriptors, docking scores, drug-likeness)
- **5 protein targets** - Molecular docking calculations

## 🏆 Top Results

**Best Binders:**
1. W₂CO₂H₂ + tosylate: **-11.84 kcal/mol**
2. V₃N₂O₂H₂ + phthalate: **-11.82 kcal/mol**
3. Mo₄N₃O₂H₂ + tosylate: **-11.82 kcal/mol**

**Key Metrics:**
- ✅ 100% Lipinski RO5 compliance
- ✅ 100% Veber rules compliance
- Mean LogP: 0.41 ± 0.81
- Mean MW: 98.85 ± 46.29 Da

## 🚀 Quick Start

### View Online
Visit the live website: **[https://burhanbeycan.github.io/Mxene-database/]**

### Run Locally

```bash
# Clone repository
git clone https://github.com/burhanbeycan/mxene-database.git
cd mxene-database

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Open browser → http://localhost:5173/
```

## ✨ Features

- 🔍 **Search & Filter** - By MXene, functional group, metal, properties
- 📊 **Interactive Visualizations** - Charts, graphs, distributions
- 📈 **Analytics Dashboard** - Binding energies, molecular properties
- 🏅 **Top Binders Leaderboard** - Ranked by binding affinity
- 💾 **Export Data** - Download filtered results as CSV
- 📱 **Responsive Design** - Works on all devices

## 🧪 Chemistry

### Functionalization Types (12 categories)
- Esterification (9 reagents)
- Etherification (6 reagents)
- Silylation (4 reagents)
- Phosphorylation (3 reagents)
- Sulfonation (3 reagents)
- Carbamoylation (4 reagents)
- Acylation (4 reagents)
- Polymer grafting (3 reagents)
- Amino functionalization (3 reagents)
- Thiol functionalization (3 reagents)
- Click chemistry (2 reagents)
- Alkylation (4 reagents)

### Protein Targets
1. Human Serum Albumin (PDB: 1AO6)
2. Lysozyme (PDB: 1LYZ)
3. Bovine Serum Albumin (PDB: 4F5S)
4. Acetylcholinesterase (PDB: 1ACJ)
5. Carbonic Anhydrase II (PDB: 1CA2)

## 📁 Files

- `public/mxene_comprehensive_database.csv` - Full database (16 MB)
- `public/database_summary.json` - Statistics
- `src/App.jsx` - Main application
- `INSTRUCTIONS.md` - Setup guide
- `SETUP_GUIDE.md` - Detailed documentation

## 🛠️ Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Recharts** - Data visualization
- **Papa Parse** - CSV parsing
- **RDKit** - Molecular descriptors

## 📚 Documentation

- [**INSTRUCTIONS.md**](INSTRUCTIONS.md) - Getting started guide
- [**SETUP_GUIDE.md**](SETUP_GUIDE.md) - Detailed setup and troubleshooting
- [**QUICKSTART.md**](QUICKSTART.md) - Quick reference

## 🔬 Data Sources

Original MXene structures from:
- D. Ontiveros, F. Viñes and C. Sousa, *J. Mater. Chem. A*, **2023**, 11, 13754–13764.
- D. Ontiveros, S. Vela, F. Viñes and C. Sousa, *Energy Environ. Mater.*, **2024**, 7, e12774.

## 📄 License

This database is provided for academic and research purposes.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Contact

For questions or collaborations, please open an issue on GitHub.

---

**Made with ❤️ for materials science and drug discovery research**

