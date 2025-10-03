#!/bin/bash

# GitHub Pages Deployment Script for MXene Database

echo "🚀 Deploying MXene Database to GitHub Pages..."

# Build the project
echo "📦 Building production version..."
pnpm run build

# Create gh-pages branch if it doesn't exist
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Copy dist contents to root
echo "📋 Copying build files..."
cp -r dist/* .

# Add CNAME if you have a custom domain (optional)
# echo "yourdomain.com" > CNAME

# Commit and push
echo "💾 Committing changes..."
git add -A
git commit -m "Deploy to GitHub Pages"

echo "✅ Ready to push! Run: git push origin gh-pages --force"
echo ""
echo "📝 Then configure GitHub Pages:"
echo "   1. Go to your repository Settings"
echo "   2. Navigate to Pages section"
echo "   3. Select 'gh-pages' branch as source"
echo "   4. Click Save"
echo ""
echo "🌐 Your site will be available at: https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/"

