#!/bin/bash

# Create standard environment files
touch .env .env.development .env.test .env.testing .env.staging .env.production .env.example

# Create app-specific environment files
touch .env.app1.production .env.analytics.dev

# Add basic template content to each file
for env_file in .env*; do
  cat <<EOF > "$env_file"
# Environment variables for ${env_file#.}

# Database configuration
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=username
# DB_PASS=password
# DB_NAME=database_name

# App configuration
# APP_ENV=${env_file#.env}
# APP_DEBUG=true
# APP_SECRET=your_secret_key_here

# API keys
# API_KEY=your_api_key_here
# EXTERNAL_SERVICE_URL=https://service.example.com

EOF

  # Special cases
  if [[ "$env_file" == ".env.production" || "$env_file" == *".production" ]]; then
    sed -i '/APP_DEBUG/s/true/false/' "$env_file"
  fi
done

echo "Environment files created successfully:"
ls -la .env*