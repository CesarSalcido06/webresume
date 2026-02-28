# Production VPS Deployment Guide

## Prerequisites
- Digital Ocean Droplet (Ubuntu 22.04/24.04)
- Domain pointed to droplet IP (Porkbun)
- SSH key added to droplet

---

## Phase 1: Initial Server Hardening

### 1.1 Connect and Update
```bash
ssh root@YOUR_DROPLET_IP

# Update system
apt update && apt upgrade -y
```

### 1.2 Create Non-Root User
```bash
# Create user with sudo access
adduser cesar
usermod -aG sudo cesar

# Copy SSH key to new user
mkdir -p /home/cesar/.ssh
cp ~/.ssh/authorized_keys /home/cesar/.ssh/
chown -R cesar:cesar /home/cesar/.ssh
chmod 700 /home/cesar/.ssh
chmod 600 /home/cesar/.ssh/authorized_keys

# Test login in NEW terminal before proceeding
# ssh cesar@YOUR_DROPLET_IP
```

### 1.3 Secure SSH
```bash
nano /etc/ssh/sshd_config
```

Change these settings:
```
Port 2222                    # Change from default 22
PermitRootLogin no           # Disable root login
PasswordAuthentication no    # Key-only authentication
PubkeyAuthentication yes
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
```

```bash
systemctl restart sshd
```

**IMPORTANT:** Test new SSH config in separate terminal before closing current session:
```bash
ssh -p 2222 cesar@YOUR_DROPLET_IP
```

### 1.4 Configure Firewall (UFW)
```bash
# Allow new SSH port FIRST (don't lock yourself out!)
ufw allow 2222/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'

# Enable firewall
ufw enable
ufw status verbose
```

### 1.5 Install Fail2ban (Brute Force Protection)
```bash
apt install fail2ban -y

# Create custom config
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5
ignoreip = 127.0.0.1/8

[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 24h
EOF

systemctl enable fail2ban
systemctl start fail2ban
```

### 1.6 Automatic Security Updates
```bash
apt install unattended-upgrades -y
dpkg-reconfigure -plow unattended-upgrades
# Select "Yes" to enable automatic updates
```

---

## Phase 2: Install Application Stack

### 2.1 Install Node.js 20 LTS
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs
node -v  # Verify: v20.x.x
```

### 2.2 Install Nginx
```bash
apt install nginx -y
systemctl enable nginx
```

### 2.3 Install PM2
```bash
npm install -g pm2
```

### 2.4 Install Certbot (SSL)
```bash
apt install certbot python3-certbot-nginx -y
```

---

## Phase 3: Deploy Application

### 3.1 Clone Repository
```bash
# Create web directory
mkdir -p /var/www
cd /var/www

# Clone as cesar user
sudo -u cesar git clone https://github.com/CesarSalcido06/webresume.git
cd webresume
```

### 3.2 Build Frontend
```bash
npm install
npm run build
```

### 3.3 Setup Backend
```bash
cd server
npm install

# Create environment file
cat > .env << 'EOF'
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://cesarsalcido.com

# SMTP - Gmail App Password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

CONTACT_EMAIL=contact@cesarsalcido.com
EOF

# Secure the env file
chmod 600 .env
```

### 3.4 Start with PM2
```bash
cd /var/www/webresume/server
pm2 start index.js --name portfolio
pm2 save
pm2 startup systemd -u cesar --hp /home/cesar
# Run the command it outputs
```

---

## Phase 4: Configure Nginx (Reverse Proxy + Security)

### 4.1 Create Site Config
```bash
cat > /etc/nginx/sites-available/portfolio << 'EOF'
# Rate limiting zone
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

server {
    listen 80;
    server_name cesarsalcido.com www.cesarsalcido.com;

    # Redirect to HTTPS (after SSL is set up)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cesarsalcido.com www.cesarsalcido.com;

    # SSL (certbot will fill these in)
    # ssl_certificate /etc/letsencrypt/live/cesarsalcido.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/cesarsalcido.com/privkey.pem;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # Hide nginx version
    server_tokens off;

    # Root for static files
    root /var/www/webresume/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # Static files with cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy with rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;

        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Block sensitive files
    location ~ /\. {
        deny all;
    }

    location ~ ^/(\.env|package\.json|node_modules) {
        deny all;
    }
}
EOF
```

### 4.2 Enable Site
```bash
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default  # Remove default site
nginx -t  # Test config
systemctl reload nginx
```

---

## Phase 5: SSL Certificate (Let's Encrypt)

### 5.1 Get Certificate
```bash
# Make sure domain is pointed to server first!
certbot --nginx -d cesarsalcido.com -d www.cesarsalcido.com
```

Follow prompts:
- Enter email for renewal notices
- Agree to terms
- Choose to redirect HTTP to HTTPS

### 5.2 Auto-Renewal (Already set up by certbot)
```bash
# Test renewal
certbot renew --dry-run

# Check timer
systemctl list-timers | grep certbot
```

---

## Phase 6: DNS Setup (Porkbun)

In Porkbun dashboard for cesarsalcido.com:

| Type | Host | Answer | TTL |
|------|------|--------|-----|
| A | @ | YOUR_DROPLET_IP | 600 |
| A | www | YOUR_DROPLET_IP | 600 |
| CNAME | www | cesarsalcido.com | 600 |

Wait 5-15 minutes for DNS propagation.

---

## Phase 7: Final Security Checks

### 7.1 Verify Everything
```bash
# Check services running
systemctl status nginx
pm2 status

# Check firewall
ufw status

# Check fail2ban
fail2ban-client status sshd

# Check SSL grade
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=cesarsalcido.com
```

### 7.2 Test Site
```bash
curl -I https://cesarsalcido.com
# Should see security headers
```

---

## Maintenance Commands

```bash
# SSH into server
ssh -p 2222 cesar@YOUR_DROPLET_IP

# View app logs
pm2 logs portfolio

# Restart app
pm2 restart portfolio

# Update code
cd /var/www/webresume
git pull
npm install
npm run build
pm2 restart portfolio

# View nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Check banned IPs
fail2ban-client status sshd
```

---

## Security Checklist

- [x] Non-root user with sudo
- [x] SSH on non-standard port (2222)
- [x] SSH key-only (no passwords)
- [x] Firewall (UFW) - only 2222, 80, 443 open
- [x] Fail2ban for brute force protection
- [x] Automatic security updates
- [x] HTTPS with Let's Encrypt
- [x] Security headers (XSS, CSRF, clickjacking)
- [x] Rate limiting on API
- [x] Hidden server version
- [x] Blocked sensitive files
- [x] Gzip compression
- [x] PM2 for process management

---

## Quick Reference

| Service | Command |
|---------|---------|
| SSH | `ssh -p 2222 cesar@YOUR_IP` |
| Nginx | `systemctl restart nginx` |
| App | `pm2 restart portfolio` |
| Logs | `pm2 logs portfolio` |
| SSL Renew | `certbot renew` |
| Firewall | `ufw status` |
| Banned IPs | `fail2ban-client status sshd` |
