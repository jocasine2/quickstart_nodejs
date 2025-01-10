FROM node:20-bullseye

WORKDIR /app

# Instala pacotes necessários para Cypress no ambiente Docker
RUN apt-get update && apt-get install -y \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    xvfb \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y   libgtk-3-0   libx11-xcb1   libxcb-dri3-0   libatk-bridge2.0-0   libdrm2   libgbm1   libasound2   libnss3   libxshmfence1   libxcomposite1   libxrandr2   libxi6   libxcursor1   libxdamage1   libxrender1   libatk1.0-0
RUN npx cypress install

