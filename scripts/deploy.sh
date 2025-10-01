

#!/bin/bash
# deploy.sh - Uses AWS Systems Manager instead of SSH

echo "=== Starting Automated Deployment ==="

# Get EC2 details from CloudFormation
INSTANCE_ID=$(aws cloudformation describe-stacks --stack-name ecommerce-dissertation --query "Stacks[0].Outputs[?OutputKey=='InstanceId'].OutputValue" --output text)
EC2_DNS=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query "Reservations[0].Instances[0].PublicDnsName" --output text)

echo "🎯 Target EC2 Instance: $EC2_DNS"

# Step 1: Prepare directories on EC2
echo "📁 Setting up directories on EC2..."
aws ssm send-command \
    --instance-ids $INSTANCE_ID \
    --document-name "AWS-RunShellScript" \
    --parameters 'commands=[
        "mkdir -p /home/ec2-user/app/backend",
        "mkdir -p /home/ec2-user/app/frontend",
        "chown -R ec2-user:ec2-user /home/ec2-user/app"
    ]' \
    --output text

# Step 2: Install your backend
echo "🔧 Installing backend application..."
aws ssm send-command \
    --instance-ids $INSTANCE_ID \
    --document-name "AWS-RunShellScript" \
    --parameters 'commands=[
        "cd /home/ec2-user/app/backend",
        "npm init -y",
        "npm install express cors dotenv",
        "echo \"const express = require(\\\"express\\\"); const app = express(); app.use(require(\\\"cors\\\")()); app.get(\\\"/\\\", (req, res) => res.json({message: \\\"Ecommerce Backend Running!\\\", status: \\\"success\\\"})); app.get(\\\"/products\\\", (req, res) => res.json([{id: 1, name: \\\"Test Product\\\", price: 99.99}])); app.listen(5000, () => console.log(\\\"Backend running on port 5000\\\"));\" > app.js",
        "pm2 stop all 2>/dev/null || true",
        "pm2 start app.js --name \\\"ecommerce-backend\\\"",
        "pm2 save",
        "pm2 startup 2>/dev/null || true"
    ]' \
    --output text

# Step 3: Install your frontend
echo "🎨 Setting up frontend..."
aws ssm send-command \
    --instance-ids $INSTANCE_ID \
    --document-name "AWS-RunShellScript" \
    --parameters 'commands=[
        "cd /home/ec2-user/app/frontend",
        "echo \\\"<html><body><h1>Ecommerce Frontend</h1><p>Backend: <span id=\\\\"status\\\\">Checking...</span></p><script>fetch('http://localhost:5000/').then(r=>r.json()).then(d=>document.getElementById('status').innerHTML='✅ Running').catch(e=>document.getElementById('status').innerHTML='❌ Failed')</script></body></html>\\\" > index.html",
        "pm2 stop ecommerce-frontend 2>/dev/null || true", 
        "pm2 serve --name \\\"ecommerce-frontend\\\" --port 3000",
        "pm2 save"
    ]' \
    --output text

echo "✅ DEPLOYMENT COMPLETED!"
echo "🌐 Frontend URL: http://$EC2_DNS:3000"
echo "🔗 Backend API: http://$EC2_DNS:5000"
echo "📊 Check status: http://$EC2_DNS:5000/"
