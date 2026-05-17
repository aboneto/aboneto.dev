#!/bin/bash

# Source and destination directories
SRC_DIR="assets/images"
DEST_DIR="assets/img"

# Find all JPG, JPEG, and PNG files in the source directory
find "$SRC_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    # Get the relative path of the file from SRC_DIR
    rel_path="${file#$SRC_DIR/}"
    
    # Compute the destination path
    # Change the extension to .webp
    dest_path="$DEST_DIR/${rel_path%.*}.webp"
    
    # Create the destination directory if it doesn't exist
    mkdir -p "$(dirname "$dest_path")"
    
    # Convert using cwebp with 90% quality
    # We only convert if the destination file doesn't exist or is older than the source file
    if [ ! -f "$dest_path" ] || [ "$file" -nt "$dest_path" ]; then
        echo "Converting: $file -> $dest_path"
        cwebp -q 85 "$file" -o "$dest_path" -quiet
    else
        echo "Skipping (already exists and up to date): $dest_path"
    fi
done

echo "Conversion complete!"
