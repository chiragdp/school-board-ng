#!/bin/bash

# Check if json-server is installed globally
if ! command -v json-server &> /dev/null; then
  echo "json-server is not installed globally. Installing it..."
  npm install -g json-server
fi

# Execute npm install
echo "Running npm install..."
npm install

# Prompt user for mode
echo "Choose the mode:"
echo "1. Development mode"
echo "2. Build and start mode"

read -p "Enter your choice (1 or 2): " choice

if [[ $choice == 1 ]]; then
  # Prompt user for delay option
  read -p "Enter the delay in milliseconds (or leave empty for no delay): " delay

  # Execute commands for development mode
  echo "Running in development mode..."
  if [[ -n $delay ]]; then
    json-server --watch backend/db.json --routes backend/routes.json --delay $delay & ng serve --proxy-config proxy.json
  else
    json-server --watch backend/db.json --routes backend/routes.json & ng serve --proxy-config proxy.json
  fi
elif [[ $choice == 2 ]]; then
  # Execute commands for build and start mode
  echo "Running in build and start mode..."
  ng build && json-server --watch backend/db.json --routes backend/routes.json & ng serve --proxy-config proxy.json
else
  echo "Invalid choice. Exiting..."
  exit 1
fi
