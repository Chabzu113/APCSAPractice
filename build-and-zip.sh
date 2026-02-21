#!/bin/bash
echo "🔨 Building AP Test Prep..."
cd "$(dirname "$0")/electron"
npm run build

echo "📦 Creating ZIP with launcher..."
cd ../dist/mac-arm64

# Create a .command launcher — users double-click this instead of the .app
# It strips quarantine then opens the app automatically
cat > "Open AP Test Prep.command" << 'EOF'
#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
APP="$DIR/AP Test Prep.app"
echo "Removing macOS quarantine flag..."
xattr -cr "$APP"
echo "Opening AP Test Prep..."
open "$APP"
EOF
chmod +x "Open AP Test Prep.command"

# Zip both files together
rm -f ~/Desktop/APTestPrep.zip
zip -r ~/Desktop/APTestPrep.zip "AP Test Prep.app" "Open AP Test Prep.command" > /dev/null

# Clean up the temp launcher from dist (keep dist clean)
rm "Open AP Test Prep.command"

echo "✅ Done! ZIP is on your Desktop."
