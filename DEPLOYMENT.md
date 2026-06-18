# Deployment Guide: Digidrops Web App (Next.js)

This document provides instructions for deploying updates to the Digidrops Web App on the DigitalOcean Droplet.

---

## 🚀 One-Step Redeploy Command

Once logged into your Droplet as `root`, copy and paste this command block to run the entire deployment sequence:

```bash
cd /var/www/digidrop-web-app && \
sudo -u henry git reset --hard && \
sudo -u henry git pull && \
npm run build && \
sudo -u henry pm2 restart all
```

---

## 🔍 Detailed Step-by-Step Breakdown

If you prefer to run or troubleshoot the commands one by one, follow these steps:

### Step 1: Navigate to the Project Root
The repository is located in the `/var/www/` directory on the server:
```bash
cd /var/www/digidrop-web-app
```

### Step 2: Clean and Pull the Latest Changes
* **Why Hard Reset?** If local edits/files (such as temporary test outputs or log files) exist on the server, Git might abort the pull. Resetting ensures a clean pull matching GitHub exactly.
* **Why `sudo -u henry`?** The GitHub SSH keys are bound to user `henry`, so Git commands must be run under their profile:
```bash
sudo -u henry git reset --hard
sudo -u henry git pull
```

### Step 3: Build the Next.js Production App
This compiles and optimizes all pages:
```bash
npm run build
```

### Step 4: Restart the App Process
The Next.js app runs under a PM2 instance managed by user `henry`. 

* **View currently active apps:**
  ```bash
  sudo -u henry pm2 list
  ```
* **Restart the web app:**
  ```bash
  sudo -u henry pm2 restart digidrop-frontend
  ```
  *(Or run `sudo -u henry pm2 restart all` to restart all services running under `henry`)*

---

## 🛠️ Troubleshooting

### 1. Permission Denied (publickey) on Git Pull
* **Error**: `git@github.com: Permission denied (publickey).`
* **Fix**: Ensure you prefixed the Git command with `sudo -u henry`. Running `git pull` directly as `root` will fail because `root` doesn't have the required GitHub SSH keys.

### 2. PM2 process list is empty / "No process found"
* **Error**: `[PM2][WARN] No process found` when running `pm2 list` or `pm2 restart`.
* **Fix**: You are likely running the command as `root`. Run the command as user `henry` instead:
  ```bash
  sudo -u henry pm2 list
  ```
