#!/bin/bash
echo "Starting ecommerce application..."

# Start backend
cd /home/ubuntu/ecommerce-app/backend
npm start > /var/log/ecommerce-backend.log 2>&1 &

# Start frontend
cd /home/ubuntu/ecommerce-app/frontend/build
npx serve -s -l 3000 > /var/log/ecommerce-frontend.log 2>&1 &

echo "Application started"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
