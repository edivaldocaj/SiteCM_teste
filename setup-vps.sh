#!/bin/bash
# ══════════════════════════════════════════════════════════════
# Cavalcante & Melo — VPS Setup Script
# Execute como root no VPS Hostinger com Ubuntu 24.04 LTS
# Usage: bash setup-vps.sh
# ══════════════════════════════════════════════════════════════

set -e

DOMAIN="cavalcantemelo.adv.br"
APP_DIR="/var/www/cavalcantemelo"
LOG_DIR="/var/log/cavalcantemelo"
DB_NAME="cavalcantemelo"
DB_USER="cmadmin"
DB_PASS="MUDE_ESTA_SENHA_AGORA"  # ⚠️ ALTERE ANTES DE EXECUTAR
GIT_REPO="https://github.com/edivaldocaj/siteCM.git"

echo "══════════════════════════════════════════════════"
echo "  Cavalcante & Melo — VPS Setup"
echo "══════════════════════════════════════════════════"

# 1. Update system
echo "📦 Atualizando sistema..."
apt update && apt upgrade -y

# 2. Install essential tools
echo "🔧 Instalando ferramentas essenciais..."
apt install -y curl wget git build-essential ufw software-properties-common

# 3. Install Node.js 20 LTS
echo "📗 Instalando Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# 4. Install PostgreSQL 16
echo "🐘 Instalando PostgreSQL 16..."
apt install -y postgresql postgresql-contrib

# Start PostgreSQL
systemctl enable postgresql
systemctl start postgresql

# Create database and user
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
echo "✅ PostgreSQL configurado: $DB_NAME / $DB_USER"

# 5. Install Nginx
echo "🌐 Instalando Nginx..."
apt install -y nginx
systemctl enable nginx

# 6. Install PM2
echo "⚡ Instalando PM2..."
npm install -g pm2

# 7. Install Certbot (SSL)
echo "🔒 Instalando Certbot..."
apt install -y certbot python3-certbot-nginx

# 8. Configure Firewall
echo "🛡️ Configurando firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw --force enable

# 9. Create app directory
echo "📁 Criando diretório da aplicação..."
mkdir -p $APP_DIR
mkdir -p $LOG_DIR

# 10. Clone repository
echo "📥 Clonando repositório..."
cd $APP_DIR
git clone $GIT_REPO .

# 11. Create .env file
echo "📝 Criando arquivo .env..."
cat > $APP_DIR/.env << EOF
PAYLOAD_SECRET=$(openssl rand -base64 32)
DATABASE_URI=postgresql://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME

NEXT_PUBLIC_SITE_URL=https://$DOMAIN
NEXT_PUBLIC_SITE_NAME=Cavalcante & Melo Sociedade de Advogados

NEXT_PUBLIC_WHATSAPP_NUMBER=5584999999999
NEXT_PUBLIC_WHATSAPP_MESSAGE=Olá! Gostaria de falar com um advogado.

NEWS_REVALIDATE_SECRET=$(openssl rand -hex 16)
EOF

echo "⚠️ IMPORTANTE: Edite o .env com suas credenciais reais:"
echo "   nano $APP_DIR/.env"

# 12. Install dependencies and build
echo "📦 Instalando dependências..."
cd $APP_DIR
npm ci
echo "🔨 Building..."
npm run build

# 13. Configure Nginx
echo "🌐 Configurando Nginx..."
cp $APP_DIR/nginx.conf /etc/nginx/sites-available/$DOMAIN
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# 14. Start with PM2
echo "🚀 Iniciando aplicação com PM2..."
cd $APP_DIR
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup

# 15. SSL Certificate
echo "🔒 Obtendo certificado SSL..."
echo "Execute manualmente após apontar o DNS:"
echo "  certbot --nginx -d $DOMAIN -d www.$DOMAIN --agree-tos --no-eff-email -m contato@$DOMAIN"
echo ""
echo "Renovação automática (teste):"
echo "  certbot renew --dry-run"

echo ""
echo "══════════════════════════════════════════════════"
echo "  ✅ Setup concluído!"
echo "══════════════════════════════════════════════════"
echo ""
echo "Próximos passos:"
echo "  1. Edite o .env: nano $APP_DIR/.env"
echo "  2. Aponte o DNS do domínio para este IP"
echo "  3. Execute o Certbot para SSL"
echo "  4. Configure os GitHub Secrets para deploy automático:"
echo "     - VPS_HOST: $(curl -s ifconfig.me)"
echo "     - VPS_USER: root"
echo "     - VPS_SSH_KEY: (sua chave privada SSH)"
echo "     - VPS_PORT: 22"
echo "     - NEWS_REVALIDATE_SECRET: (valor gerado no .env)"
echo "     - SITE_URL: https://$DOMAIN"
echo ""
echo "Acesse: http://$(curl -s ifconfig.me):3000"
