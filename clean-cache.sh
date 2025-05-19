#!/bin/bash
# Script to restart React Native app, clearing cache and restarting the bundler

echo "🧹 Cleaning React Native cache..."
cd apps/frontend-app

# Kill any existing Metro Bundler processes
echo "🛑 Stopping any running Metro processes..."
lsof -ti :8081 | xargs kill -9 2>/dev/null || echo "No Metro process running"

# Clear various caches
echo "🗑️ Clearing caches..."
rm -rf node_modules/.cache
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/haste-*

# Restart the app
echo "🚀 Restarting app..."
cd ../..
pnpm dev

echo "✅ App should be restarting with clean cache"
