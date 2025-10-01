
#!/bin/bash
# Get EC2 details
INSTANCE_ID=$(aws cloudformation describe-stacks --stack-name ecommerce-dissertation --query "Stacks[0].Outputs[?OutputKey=='InstanceId'].OutputValue" --output text)
EC2_DNS=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query "Reservations[0].Instances[0].PublicDnsName" --output text)

echo "Deploying to EC2: $EC2_DNS"

# Copy application files
scp -o StrictHostKeyChecking=no -r backend frontend/build ec2-user@$EC2_DNS:/home/ec2-user/app/

# SSH and start application
ssh -o StrictHostKeyChecking=no ec2-user@$EC2_DNS << 'EOF'
  cd /home/ec2-user/app/backend
  npm install
  pm2 stop all || true
  pm2 start app.js --name "ecommerce-backend"
  pm2 save
  pm2 startup
EOF

echo "Deployment complete! App available at: http://$EC2_DNS:3000"
