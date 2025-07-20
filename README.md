# Peps Monitor

*A platform where users sign up/log in and can uptime monitor URLs at 5‑minute intervals.This project is hosted on [PepsMonitor](https://pepsmonitor.com/).*  

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)


## Introduction

Peps Monitor helps you keep track of your critical web services by checking their uptime every five minutes. Users can register, add up to five URLs for monitoring, view live status updates via WebSockets, and analyze historical uptime data with interactive charts. You can also pause monitoring for any URL at any time.

## Features

- **Monitor up to 5 URLs**: Keep tabs on multiple services simultaneously.  
- **5‑minute intervals**: Automated checks every five minutes for timely alerts.  
- **Real‑time updates**: Live status changes via WebSockets.  
- **Historical charts**: View past uptime data with interactive charts per URL.  
- **Pause monitoring**: Stop checks for any URL when needed.  

## Installation

Clone the repository and start the development environment with Docker Compose:

```bash
# Clone the repository
git clone https://github.com/AlexPepI/uptime-application.git
cd uptime-application

# Launch containers in development mode
docker-compose -f docker-compose.dev.yml --project-name uptime-dev up --build
``` 
## Configuration

### Client (`client/.env`)
Create a .env file inside the client folder with the following variables:
```env
VITE_API_URL=/api
VITE_CLERK_PUBLISHABLE_KEY=pk_test_****
```
### API (`api/.env.dev`)
Create a .env.dev file inside the client folder with the following variables:
```env.dev
DATABASE_URL=postgres://postgres:postgres@postgres-dev:5432/uptime
CLERK_PUBLISHABLE_KEY=pk_test_****
CLERK_SECRET_KEY=sk_test_****
```
