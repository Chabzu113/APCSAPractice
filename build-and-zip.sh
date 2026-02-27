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

# Zip both files together (named APTestPrep-Mac.zip to distinguish from Windows build)
rm -f ~/Desktop/APTestPrep-Mac.zip
zip -r ~/Desktop/APTestPrep-Mac.zip "AP Test Prep.app" "Open AP Test Prep.command" > /dev/null

# Clean up the temp launcher from dist (keep dist clean)
rm "Open AP Test Prep.command"

# Generate checksums.txt so the in-app updater integrity check passes
shasum -a 256 ~/Desktop/APTestPrep-Mac.zip | awk '{print $1 "  APTestPrep-Mac.zip"}' > ~/Desktop/checksums.txt
echo "🔐 checksums.txt written to Desktop."

echo "✅ Done! APTestPrep-Mac.zip is on your Desktop."
