#!/bin/bash

# Read the current version from package.json
current_version=$(node -p -e "require('./package.json').version")

echo "Current version is $current_version"

# Prompt user to select update type
echo "Which version do you want to update?
Patch (1)
Minor (2)
Major (3)"
read -n 1 update_type
echo ""

# Determine new version based on selected update type
case "$update_type" in
  1 ) new_version=$(echo $current_version | awk -F. '{$NF++;print}' OFS=. ) ;;
  2 ) new_version=$(echo $current_version | awk -F. '{$2++;$NF=0;print}' OFS=. ) ;;
  3 ) new_version=$(echo $current_version | awk -F. '{$1++;$2=0;$NF=0;print}' OFS=. ) ;;
  * ) echo "Invalid input, exiting."; exit 1 ;;
esac


# Get the currrent version of app.json
current_version=$(grep -o '"version": *"[^"]*"' app.json | grep -o '"[^"]*"$' | tr -d '"')

# Update the version field in package.json
npm version $new_version

# Replace the current version in app.json with the new version
sed -i "s/\"version\": *\"$current_version\"/\"version\": \"$new_version\"/" app.json

echo "Version updated to $new_version"