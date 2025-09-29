# Fleet Digital Twin Platform
### Edge IoT Telemetry & AI-Powered Diagnostics System for Real-Time Fleet Management

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A production-ready frontend for enterprise IoT fleet management with predictive maintenance and real-time analytics**

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Real-World Integration](#real-world-integration)
- [Cost Analysis](#cost-analysis)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

The Fleet Digital Twin Platform is an advanced web application designed for real-time monitoring, AI-driven diagnostics, and predictive maintenance of vehicle fleets. Built with modern React and real-time data visualization, it provides fleet managers with comprehensive insights into vehicle health, driver behavior, and operational efficiency.

### Key Capabilities

- Monitor unlimited vehicles with real-time telemetry streaming
- AI/ML-powered predictive maintenance and failure detection
- Comprehensive driver behavior analytics and safety scoring
- Advanced route optimization and geofencing
- Enterprise-grade user management and audit logging
- Flexible data export and historical playback

### Use Cases

- **Logistics Companies** - Monitor delivery fleets, optimize routes, reduce fuel costs
- **Construction** - Track heavy equipment health, prevent costly breakdowns
- **Public Transportation** - Ensure bus fleet reliability and passenger safety
- **Rental Services** - Monitor vehicle condition and maintenance needs
- **Emergency Services** - Track ambulance/fire truck availability and condition

---

## Features

### 1. Real-Time Telemetry Dashboard

- Multi-vehicle dashboard with simultaneous tracking (5+ vehicles)
- Real-time metrics: Speed, Engine Temperature, Fuel Level, Battery Status, RPM
- 2-second data refresh rate
- Interactive line charts with historical trend analysis
- Vehicle status indicators (Active, Warning, Maintenance, Offline)

### 2. AI-Powered Diagnostics

- Engine failure probability analysis (0-30% risk assessment)
- Component-level health scoring (7 monitored components)
- Maintenance prediction with confidence intervals (78-95% accuracy)
- Real-time anomaly detection (threshold: 85+ anomaly score)
- Trend analysis (Stable, Declining, Improving)

**Monitored Components:**
- Engine (94% avg health)
- Transmission (88% avg health)
- Brakes (76% avg health)
- Tires (82% avg health)
- Battery (91% avg health)
- Cooling System (85% avg health)
- Electrical System (89% avg health)

### 3. Advanced Analytics Suite

**Fuel Analytics:**
- Real-time consumption tracking
- Cost analysis ($247 daily fleet average)
- Efficiency scoring (7.8 MPG fleet average)
- CO2 emissions tracking (42kg saved daily)

**Driver Behavior Monitoring:**
- Safety score calculation (75-95 range)
- Eco-driving score (80-95 range)
- Event tracking: harsh braking, acceleration, speeding, idle time

**Route Optimization:**
- Current vs optimal route comparison
- Distance savings calculations (42 mi average)
- Fuel cost savings projections

### 4. Intelligent Alert System

**Configurable Alert Rules:**
- Engine Overheating (>95°C) - High Priority
- Low Fuel Warning (<20%) - Medium Priority
- Speed Limit Exceeded (>75 mph) - Medium Priority
- Battery Critical (<20%) - High Priority
- Harsh Braking (>8 m/s²) - Low Priority

### 5. Maintenance Management

- Service due tracking (miles or date-based)
- Priority levels (High, Medium, Low)
- Maintenance history logging
- Automated reminders

### 6. Historical Data Playback

- 100+ historical data points retained
- Interactive timeline slider
- Playback controls (Play, Pause, Skip)
- Historical trend visualization

### 7. Enterprise User Management

**Role-Based Access Control:**
- Administrator - Full system access
- Manager - Fleet oversight and reporting
- Driver - Limited vehicle-specific access
- Technician - Maintenance and diagnostic access

### 8. Comprehensive Audit Logging

**Tracked Events:**
- System initialization
- User actions
- Alert generation and acknowledgment
- Data exports
- Configuration changes

### 9. Data Export & Reporting

**Export Formats:**
- CSV (for Excel/spreadsheet analysis)
- JSON (for programmatic processing)

---



---

## Technology Stack

### Core Framework
- **React 18.3.1** - Modern UI library with hooks
- **Vite 5.4.10** - Lightning-fast build tool
- **JavaScript (ES6+)** - Modern syntax and features

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - Cross-browser compatibility

### Data Visualization
- **Recharts 2.x** - React charting library
  - Line Charts - Real-time telemetry
  - Area Charts - Historical data
  - Bar Charts - Driver metrics

### Icons & Graphics
- **Lucide React 0.263.1** - Icon library (40+ icons used)

---

## Getting Started

### Prerequisites

- **Node.js** v16.0.0 or higher
- **npm** v7.0.0 or higher
- **Git** latest version

Check your versions:
```bash
