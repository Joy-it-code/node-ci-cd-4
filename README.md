# 🚀 Node.js CI/CD Pipeline with GitHub Actions  

This repository contains a Node.js application with a fully automated CI/CD pipeline using GitHub Actions. It includes automated testing, versioning, and deployment to AWS EC2.

---

## 📌 **Table of Contents**
- [Introduction](#introduction)
- [Deployment Pipeline](#deployment-pipeline)
- [Automated Releases & Versioning](#automated-releases--versioning)
- [Deploying to AWS](#deploying-to-aws)
- [Troubleshooting & Resources](#troubleshooting--resources)

---

## 🎯 **Introduction**
This project demonstrates a modern DevOps workflow using GitHub Actions. It follows best practices for:
- Automated testing with ESLint and Jest
- Semantic versioning for releases
- Zero-downtime deployment to AWS

---

## 🏗 **Deployment Pipeline**
Our deployment pipeline consists of the following stages:

1. **Development** – Writing and testing code in a local environment.
2. **Integration** – Merging changes into a shared branch.
3. **Testing** – Running automated tests to ensure stability.
4. **Staging** – Deploying to a pre-production environment.
5. **Production** – Releasing to end-users.

### 📌 **Deployment Strategies**
- **Blue-Green Deployment** – Two environments (Blue & Green) ensure zero-downtime releases.
- **Canary Releases** – Incremental rollout to small user groups.
- **Rolling Deployment** – Gradual replacement of older instances.

---

## 🔄 **Automated Releases & Versioning**
### ✅ **Semantic Versioning (SemVer)**
I use SemVer (MAJOR.MINOR.PATCH) for versioning:
- **MAJOR** – Breaking changes.
- **MINOR** – Backward-compatible features.
- **PATCH** – Bug fixes.

### ✅ **GitHub Actions for Auto Versioning**
GitHub Actions automatically bumps the version and tags commits.

#### **GitHub Actions Versioning Script**
**Create a new workflow file called .github/workflows/bump-version.yml:**
```yaml
name: Bump version and tag
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Bump version and push tag
        uses: anothrNick/github-tag-action@1.26.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          DEFAULT_BUMP: patch ## Options: major, minor, patch
```
+ Each push to main automatically increments the patch version.


## ☁️ Deploying to AWS
Step 1: Set Up AWS Deployment Workflow
I use GitHub Actions to deploy to AWS EC2.

**AWS Deployment Workflow**
```
name: Deploy to AWS EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to AWS
        run: |
          ssh -i ~/.ssh/ci-cd-key ubuntu@${{ secrets.EC2_HOST }} << 'EOF'
            cd ~/node-ci-cd-4 || git clone https://github.com/Joy-it-code/node-ci-cd-4.git ~/node-ci-cd-4
            cd ~/node-ci-cd-4
            git pull origin main
            npm install
            pm2 restart index.js || pm2 start index.js --name "node-app"
          EOF
```
This workflow deploys the latest code to AWS when changes are pushed to main.


**Run test On Terminal:**
```
npm test
node index.js
curl http://18.208.177.81:3000
```

### Verify AWS CLI Works Locally
Run the following on your local machine to verify if the credentials works before pushing:
```
aws configure
aws sts get-caller-identity
```
![](./img/1.npm.png)
![](./img/2a.node.index.png)
![](./img/2c.curl.png)


**Run test On Browser:**
```
http://localhost:3000
http://18.208.177.81:3000
```
![](./img/2b.localhost.png)
![](./img/2d.ec2browser.png)

---

**Test Your Deployment**
Push changes to main branch
```
git add .
git commit -m "Test CI/CD"
git push origin main
```

## 🛠 Troubleshooting & Resources

✅ GitHub Actions Logs – Check logs for error details.

✅ YAML Validator – Validate workflow files using YAML Lint.

✅ GitHub Secrets – Ensure AWS credentials and SSH keys are correctly set.

✅ PM2 Logs – Run pm2 logs on the server to debug issues.
---


---
## 🎯 Conclusion
By following this guide, I have successfully set up a CI/CD pipeline to automate the deployment of a Node.js application to AWS EC2 using GitHub Actions. This pipeline ensures that every change pushed to the main branch undergoes automated testing, versioning, and seamless deployment, reducing manual effort and minimizing deployment risks.
---


  **Author: Joy Nwatuzor** 

**🎉Happy Coding & Automating! 🚀**
