import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';
import { Truck, AlertTriangle, Activity, Gauge, Thermometer, Droplets, Battery, MapPin, TrendingUp, CheckCircle, XCircle, Settings, Download, Upload, Users, Database, Wifi, WifiOff, Clock, Calendar, FileText, Filter, Search, Bell, BellOff, Lock, Unlock, BarChart3, Map, Navigation, Zap, Brain, Package, DollarSign, Fuel, Route, Shield, Play, Pause, SkipBack, SkipForward, RefreshCw, Wrench } from 'lucide-react';

const FleetDigitalTwin = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [telemetryData, setTelemetryData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [alerts, setAlerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: 'Admin', role: 'administrator', id: 'U-001' });
  const [isStreaming, setIsStreaming] = useState(true);
  const [edgeStatus, setEdgeStatus] = useState({});
  const [maintenanceSchedule, setMaintenanceSchedule] = useState([]);
  const [driverBehavior, setDriverBehavior] = useState({});
  const [fuelAnalytics, setFuelAnalytics] = useState([]);
  const [mlPredictions, setMlPredictions] = useState({});
  const [alertRules, setAlertRules] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [timelinePosition, setTimelinePosition] = useState(100);
  const [isPlayingHistory, setIsPlayingHistory] = useState(false);
  const [geofences, setGeofences] = useState([]);
  const [routeOptimization, setRouteOptimization] = useState({});

  // Initialize comprehensive data
  useEffect(() => {
    initializeSystem();
  }, []);

  const initializeSystem = () => {
    // Initialize users
    setUsers([
      { id: 'U-001', name: 'Admin User', role: 'administrator', email: 'admin@fleet.com', active: true },
      { id: 'U-002', name: 'Fleet Manager', role: 'manager', email: 'manager@fleet.com', active: true },
      { id: 'U-003', name: 'Driver John', role: 'driver', email: 'john@fleet.com', active: true },
      { id: 'U-004', name: 'Mechanic Sara', role: 'technician', email: 'sara@fleet.com', active: true }
    ]);

    // Initialize maintenance schedule
    setMaintenanceSchedule([
      { vehicleId: 'V-001', type: 'Oil Change', due: '500 mi', priority: 'medium', scheduled: '2025-10-05' },
      { vehicleId: 'V-002', type: 'Tire Rotation', due: '1,200 mi', priority: 'low', scheduled: '2025-10-15' },
      { vehicleId: 'V-003', type: 'Brake Inspection', due: 'Overdue', priority: 'high', scheduled: '2025-09-28' },
      { vehicleId: 'V-004', type: 'Battery Check', due: '2,500 mi', priority: 'low', scheduled: '2025-11-01' },
      { vehicleId: 'V-005', type: 'Transmission Service', due: '300 mi', priority: 'high', scheduled: '2025-10-02' }
    ]);

    // Initialize alert rules
    setAlertRules([
      { id: 'R-001', name: 'Engine Overheating', condition: 'engineTemp > 95', severity: 'high', enabled: true },
      { id: 'R-002', name: 'Low Fuel Warning', condition: 'fuelLevel < 20', severity: 'medium', enabled: true },
      { id: 'R-003', name: 'Speed Limit Exceeded', condition: 'speed > 75', severity: 'medium', enabled: true },
      { id: 'R-004', name: 'Battery Critical', condition: 'battery < 20', severity: 'high', enabled: true },
      { id: 'R-005', name: 'Harsh Braking', condition: 'deceleration > 8', severity: 'low', enabled: true }
    ]);

    // Initialize geofences
    setGeofences([
      { id: 'G-001', name: 'Main Depot', lat: 33.7490, lng: -84.3880, radius: 500, type: 'safe' },
      { id: 'G-002', name: 'Restricted Zone', lat: 34.0522, lng: -118.2437, radius: 1000, type: 'restricted' },
      { id: 'G-003', name: 'Service Area', lat: 29.7604, lng: -95.3698, radius: 800, type: 'service' }
    ]);

    // Generate historical data
    generateHistoricalData();

    logAudit('System Initialized', 'System startup completed');
  };

  const generateHistoricalData = () => {
    const history = [];
    for (let i = 100; i >= 0; i--) {
      history.push({
        timestamp: new Date(Date.now() - i * 60000).toLocaleTimeString(),
        speed: Math.random() * 80 + 20,
        engineTemp: Math.random() * 30 + 70,
        fuelLevel: 80 - (i * 0.3),
        battery: Math.random() * 20 + 75,
        rpm: Math.random() * 2000 + 1000,
        efficiency: Math.random() * 5 + 6
      });
    }
    setHistoricalData(history);
  };

  // Real-time telemetry simulation with ML-based anomaly detection
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const newDataPoint = {
        timestamp: new Date().toLocaleTimeString(),
        time: new Date().toLocaleTimeString(),
        speed: Math.random() * 80 + 20,
        engineTemp: Math.random() * 30 + 70,
        fuelLevel: Math.random() * 40 + 40,
        battery: Math.random() * 20 + 75,
        rpm: Math.random() * 2000 + 1000,
        lat: 33.7490 + (Math.random() - 0.5) * 0.1,
        lng: -84.3880 + (Math.random() - 0.5) * 0.1,
        efficiency: Math.random() * 3 + 7
      };
      
      setTelemetryData(prev => [...prev.slice(-29), newDataPoint]);

      // Advanced ML-based anomaly detection
      runMLAnomalyDetection(newDataPoint);

      // Update edge device status
      updateEdgeStatus();

      // Update driver behavior metrics
      updateDriverBehavior(newDataPoint);

      // Update fuel analytics
      updateFuelAnalytics(newDataPoint);

      // Check alert rules
      checkAlertRules(newDataPoint);

    }, 2000);

    return () => clearInterval(interval);
  }, [isStreaming, selectedVehicle]);

  const runMLAnomalyDetection = (data) => {
    // Simulate ML model predictions
    const predictions = {
      engineFailureProbability: Math.random() * 0.3,
      maintenanceNeeded: Math.random() > 0.7,
      fuelEfficiencyScore: (data.efficiency / 10) * 100,
      driverSafetyScore: Math.random() * 30 + 70,
      predictedBreakdown: Math.random() > 0.95 ? '2 days' : 'None detected',
      anomalyScore: Math.random() * 100
    };

    setMlPredictions(predictions);

    // High anomaly detection
    if (predictions.anomalyScore > 85) {
      addAlert('high', 'ML Anomaly Detected', `Unusual pattern detected. Anomaly score: ${predictions.anomalyScore.toFixed(1)}`, 'ml');
    }

    if (predictions.maintenanceNeeded) {
      addAlert('medium', 'Predictive Maintenance Alert', 'ML model suggests scheduling maintenance soon', 'ml');
    }
  };

  const updateEdgeStatus = () => {
    setEdgeStatus({
      'V-001': { connected: true, latency: Math.random() * 50 + 10, dataPoints: Math.floor(Math.random() * 100) + 500 },
      'V-002': { connected: true, latency: Math.random() * 50 + 10, dataPoints: Math.floor(Math.random() * 100) + 500 },
      'V-003': { connected: false, latency: 0, dataPoints: 0 },
      'V-004': { connected: true, latency: Math.random() * 50 + 10, dataPoints: Math.floor(Math.random() * 100) + 500 },
      'V-005': { connected: true, latency: Math.random() * 50 + 15, dataPoints: Math.floor(Math.random() * 100) + 500 }
    });
  };

  const updateDriverBehavior = (data) => {
    setDriverBehavior({
      harshBraking: Math.floor(Math.random() * 5),
      harshAcceleration: Math.floor(Math.random() * 3),
      speedingEvents: Math.floor(Math.random() * 2),
      idleTime: Math.floor(Math.random() * 30),
      safetyScore: Math.floor(Math.random() * 20) + 75,
      ecoScore: Math.floor(Math.random() * 15) + 80
    });
  };

  const updateFuelAnalytics = (data) => {
    setFuelAnalytics(prev => {
      const newPoint = {
        time: data.timestamp,
        consumption: Math.random() * 3 + 5,
        efficiency: data.efficiency,
        cost: (Math.random() * 3 + 5) * 3.5
      };
      return [...prev.slice(-19), newPoint];
    });
  };

  const checkAlertRules = (data) => {
    alertRules.forEach(rule => {
      if (!rule.enabled) return;

      // Simple rule engine
      if (rule.condition.includes('engineTemp > 95') && data.engineTemp > 95) {
        addAlert(rule.severity, rule.name, `Temperature: ${data.engineTemp.toFixed(1)}°C`, 'rule');
      }
      if (rule.condition.includes('fuelLevel < 20') && data.fuelLevel < 20) {
        addAlert(rule.severity, rule.name, `Fuel at ${data.fuelLevel.toFixed(1)}%`, 'rule');
      }
      if (rule.condition.includes('speed > 75') && data.speed > 75) {
        addAlert(rule.severity, rule.name, `Speed: ${data.speed.toFixed(1)} mph`, 'rule');
      }
    });
  };

  const addAlert = (severity, title, message, source = 'system') => {
    const newAlert = {
      id: Date.now() + Math.random(),
      severity,
      title,
      message,
      timestamp: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      vehicleId: selectedVehicle?.id || 'V-001',
      source,
      acknowledged: false
    };
    setAlerts(prev => [newAlert, ...prev.slice(0, 49)]);
    logAudit('Alert Generated', `${title} - ${message}`);
  };

  const logAudit = (action, details) => {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      user: currentUser.name,
      userId: currentUser.id,
      action,
      details,
      ip: '192.168.1.' + Math.floor(Math.random() * 255)
    };
    setAuditLog(prev => [entry, ...prev.slice(0, 99)]);
  };

  // Fleet vehicles data with enhanced attributes
  const vehicles = [
    { 
      id: 'V-001', 
      name: 'Truck Alpha', 
      status: 'active', 
      location: 'Route 66, AZ',
      lat: 33.7490,
      lng: -84.3880,
      health: 92, 
      mileage: 45230,
      driver: 'John Smith',
      model: 'Freightliner Cascadia',
      year: 2022,
      vin: '1FUJGHDV8NLAA1234',
      fuelType: 'Diesel'
    },
    { 
      id: 'V-002', 
      name: 'Truck Beta', 
      status: 'active', 
      location: 'I-95, FL',
      lat: 29.7604,
      lng: -95.3698,
      health: 88, 
      mileage: 52100,
      driver: 'Sarah Johnson',
      model: 'Volvo VNL 860',
      year: 2023,
      vin: '4V4NC9EH8NN123456',
      fuelType: 'Diesel'
    },
    { 
      id: 'V-003', 
      name: 'Truck Gamma', 
      status: 'maintenance', 
      location: 'Depot, TX',
      lat: 32.7767,
      lng: -96.7970,
      health: 65, 
      mileage: 78450,
      driver: 'N/A',
      model: 'Kenworth T680',
      year: 2020,
      vin: '1XKYDP9X5LJ123789',
      fuelType: 'Diesel'
    },
    { 
      id: 'V-004', 
      name: 'Truck Delta', 
      status: 'active', 
      location: 'I-80, NE',
      lat: 40.8136,
      lng: -96.7026,
      health: 95, 
      mileage: 32100,
      driver: 'Mike Davis',
      model: 'Peterbilt 579',
      year: 2023,
      vin: '1XPBDP9X4ND123456',
      fuelType: 'Diesel'
    },
    { 
      id: 'V-005', 
      name: 'Truck Epsilon', 
      status: 'warning', 
      location: 'Route 40, NM',
      lat: 35.0844,
      lng: -106.6504,
      health: 72, 
      mileage: 61200,
      driver: 'Lisa Brown',
      model: 'International LT',
      year: 2021,
      vin: '3AKJHHDR8MSKT1234',
      fuelType: 'Diesel'
    }
  ];

  // AI Diagnostics predictions with ML
  const diagnostics = [
    { component: 'Engine', health: 94, prediction: 'Good', nextMaintenance: '2,500 mi', confidence: 0.92, trend: 'stable' },
    { component: 'Transmission', health: 88, prediction: 'Monitor', nextMaintenance: '1,200 mi', confidence: 0.85, trend: 'declining' },
    { component: 'Brakes', health: 76, prediction: 'Attention', nextMaintenance: '500 mi', confidence: 0.78, trend: 'declining' },
    { component: 'Tires', health: 82, prediction: 'Good', nextMaintenance: '3,000 mi', confidence: 0.88, trend: 'stable' },
    { component: 'Battery', health: 91, prediction: 'Good', nextMaintenance: '5,000 mi', confidence: 0.95, trend: 'stable' },
    { component: 'Cooling System', health: 85, prediction: 'Monitor', nextMaintenance: '1,500 mi', confidence: 0.81, trend: 'stable' },
    { component: 'Electrical', health: 89, prediction: 'Good', nextMaintenance: '4,000 mi', confidence: 0.87, trend: 'improving' }
  ];

  useEffect(() => {
    if (!selectedVehicle && vehicles.length > 0) {
      setSelectedVehicle(vehicles[0]);
    }
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'maintenance': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthColor = (health) => {
    if (health >= 90) return 'text-green-400';
    if (health >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-900 border-red-500 text-red-200';
      case 'medium': return 'bg-yellow-900 border-yellow-500 text-yellow-200';
      default: return 'bg-blue-900 border-blue-500 text-blue-200';
    }
  };

  const exportData = (format) => {
    logAudit('Data Export', `Exported data in ${format} format`);
    
    let data = '';
    const vehicle = selectedVehicle;
    const timestamp = new Date().toISOString();
    
    if (format === 'csv') {
      data = 'Timestamp,Vehicle,Speed,EngineTemp,FuelLevel,Battery,RPM\n';
      telemetryData.forEach(d => {
        data += `${d.timestamp},${vehicle.id},${d.speed},${d.engineTemp},${d.fuelLevel},${d.battery},${d.rpm}\n`;
      });
    } else if (format === 'json') {
      data = JSON.stringify({
        vehicle,
        telemetry: telemetryData,
        alerts,
        diagnostics,
        exportedAt: timestamp
      }, null, 2);
    }
    
    const blob = new Blob([data], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fleet-data-${vehicle.id}-${Date.now()}.${format}`;
    a.click();
    
    addAlert('low', 'Export Complete', `Data exported as ${format.toUpperCase()}`, 'system');
  };

  const acknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, acknowledged: true } : a
    ));
    logAudit('Alert Acknowledged', `Alert ID: ${alertId}`);
  };

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
    logAudit('Streaming Toggle', `Streaming ${!isStreaming ? 'started' : 'stopped'}`);
  };

  const renderMapView = () => (
    <div className="bg-slate-800 rounded-lg p-6 shadow-xl h-96">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <Map className="w-5 h-5 mr-2 text-cyan-400" />
        Fleet Location Map
      </h3>
      <div className="relative w-full h-full bg-slate-700 rounded-lg overflow-hidden">
        {/* Simulated Map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
            <p className="text-slate-400">Interactive Map View</p>
            <p className="text-sm text-slate-500 mt-2">
              {vehicles.filter(v => v.status === 'active').length} vehicles tracked
            </p>
          </div>
        </div>
        {/* Vehicle markers */}
        {vehicles.map((vehicle, idx) => (
          <div
            key={vehicle.id}
            className="absolute"
            style={{
              top: `${20 + idx * 15}%`,
              left: `${30 + idx * 10}%`
            }}
          >
            <div className={`w-4 h-4 rounded-full ${getStatusColor(vehicle.status)} animate-pulse`} />
            <div className="text-xs mt-1 bg-slate-900 px-2 py-1 rounded">
              {vehicle.name}
            </div>
          </div>
        ))}
        {/* Geofences */}
        {geofences.map((fence, idx) => (
          <div
            key={fence.id}
            className="absolute border-2 border-dashed rounded-full"
            style={{
              top: `${10 + idx * 25}%`,
              left: `${15 + idx * 20}%`,
              width: '80px',
              height: '80px',
              borderColor: fence.type === 'restricted' ? '#ef4444' : '#10b981'
            }}
          >
            <div className="text-xs text-center mt-8">{fence.name}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistoricalPlayback = () => (
    <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <Clock className="w-5 h-5 mr-2 text-cyan-400" />
        Historical Data Playback
      </h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlayingHistory(!isPlayingHistory)}
            className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded"
          >
            {isPlayingHistory ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded">
            <SkipBack className="w-5 h-5" />
          </button>
          <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded">
            <SkipForward className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={timelinePosition}
              onChange={(e) => setTimelinePosition(e.target.value)}
              className="w-full"
            />
          </div>
          <span className="text-sm text-slate-400">{timelinePosition}%</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={historicalData.slice(0, Math.floor(historicalData.length * timelinePosition / 100))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={10} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
            <Area type="monotone" dataKey="speed" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
            <Area type="monotone" dataKey="engineTemp" stackId="2" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <>
            {/* Vehicle Info Card */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedVehicle?.name}</h2>
                  <p className="text-slate-400 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedVehicle?.location}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {selectedVehicle?.model} • {selectedVehicle?.year} • {selectedVehicle?.vin}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(selectedVehicle?.status)} bg-opacity-20`}>
                    {edgeStatus[selectedVehicle?.id]?.connected ? (
                      <Wifi className="w-4 h-4 mr-1" />
                    ) : (
                      <WifiOff className="w-4 h-4 mr-1" />
                    )}
                    {selectedVehicle?.status?.toUpperCase()}
                  </div>
                  <p className="text-sm text-slate-400 mt-2">{selectedVehicle?.mileage?.toLocaleString()} miles</p>
                  <p className="text-xs text-slate-500 mt-1">Driver: {selectedVehicle?.driver}</p>
                </div>
              </div>

              {/* Real-time Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-700 rounded-lg p-4">
                  <Gauge className="w-8 h-8 mb-2 text-cyan-400" />
                  <p className="text-xs text-slate-400">Speed</p>
                  <p className="text-xl font-bold">{telemetryData[telemetryData.length - 1]?.speed.toFixed(0) || '0'} mph</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <Thermometer className="w-8 h-8 mb-2 text-orange-400" />
                  <p className="text-xs text-slate-400">Engine Temp</p>
                  <p className="text-xl font-bold">{telemetryData[telemetryData.length - 1]?.engineTemp.toFixed(0) || '0'}°C</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <Droplets className="w-8 h-8 mb-2 text-blue-400" />
                  <p className="text-xs text-slate-400">Fuel Level</p>
                  <p className="text-xl font-bold">{telemetryData[telemetryData.length - 1]?.fuelLevel.toFixed(0) || '0'}%</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <Battery className="w-8 h-8 mb-2 text-green-400" />
                  <p className="text-xs text-slate-400">Battery</p>
                  <p className="text-xl font-bold">{telemetryData[telemetryData.length - 1]?.battery.toFixed(0) || '0'}%</p>
                </div>
              </div>

              {/* Streaming Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleStreaming}
                    className={`px-4 py-2 rounded flex items-center ${isStreaming ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    {isStreaming ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isStreaming ? 'Stop' : 'Start'} Stream
                  </button>
                  <div className="text-sm text-slate-400">
                    {isStreaming && <span className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" /> Live</span>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => exportData('csv')}
                    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded flex items-center text-sm"
                  >
                    <Download className="w-4 h-4 mr-1" /> CSV
                  </button>
                  <button
                    onClick={() => exportData('json')}
                    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded flex items-center text-sm"
                  >
                    <Download className="w-4 h-4 mr-1" /> JSON
                  </button>
                </div>
              </div>

              {/* Telemetry Charts */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-cyan-400" />
                  Live Telemetry Stream
                </h3>
                
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={telemetryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="speed" stroke="#06b6d4" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="engineTemp" stroke="#f97316" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={telemetryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="fuelLevel" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="battery" stroke="#10b981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Historical Playback */}
            {renderHistoricalPlayback()}

            {/* AI Diagnostics */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Brain className="w-5 h-5 mr-2 text-cyan-400" />
                AI-Powered Diagnostics & ML Predictions
              </h3>
              
              {/* ML Predictions Summary */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-xs text-slate-400">Failure Probability</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {(mlPredictions.engineFailureProbability * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-xs text-slate-400">Safety Score</p>
                  <p className="text-2xl font-bold text-green-400">
                    {mlPredictions.driverSafetyScore?.toFixed(0) || '0'}
                  </p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-xs text-slate-400">Anomaly Score</p>
                  <p className="text-2xl font-bold text-cyan-400">
                    {mlPredictions.anomalyScore?.toFixed(1) || '0'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {diagnostics.map((diag, idx) => (
                  <div key={idx} className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="font-semibold">{diag.component}</span>
                        <span className="ml-2 text-xs px-2 py-1 bg-slate-600 rounded">
                          {(diag.confidence * 100).toFixed(0)}% confidence
                        </span>
                      </div>
                      <span className={`font-bold ${getHealthColor(diag.health)}`}>{diag.health}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${diag.health >= 90 ? 'bg-green-500' : diag.health >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${diag.health}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>Prediction: <span className="text-white">{diag.prediction}</span></span>
                      <span>Next Service: <span className="text-white">{diag.nextMaintenance}</span></span>
                      <span>Trend: <span className={diag.trend === 'improving' ? 'text-green-400' : diag.trend === 'declining' ? 'text-red-400' : 'text-slate-300'}>{diag.trend}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case 'map':
        return (
          <>
            {renderMapView()}
            <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Navigation className="w-5 h-5 mr-2 text-cyan-400" />
                Route Optimization
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-700 rounded-lg p-4">
                    <p className="text-xs text-slate-400">Optimal Route</p>
                    <p className="text-lg font-bold text-green-400">425 mi</p>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <p className="text-xs text-slate-400">Current Route</p>
                    <p className="text-lg font-bold text-yellow-400">467 mi</p>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <p className="text-xs text-slate-400">Savings</p>
                    <p className="text-lg font-bold text-cyan-400">42 mi</p>
                  </div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Geofences</h4>
                  <div className="space-y-2">
                    {geofences.map(fence => (
                      <div key={fence.id} className="flex items-center justify-between text-sm">
                        <span>{fence.name}</span>
                        <span className={`px-2 py-1 rounded text-xs ${fence.type === 'restricted' ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
                          {fence.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'analytics':
        return (
          <>
            <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Fuel className="w-5 h-5 mr-2 text-cyan-400" />
                Fuel Analytics & Cost Optimization
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fuelAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                  <Legend />
                  <Area type="monotone" dataKey="consumption" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="efficiency" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <DollarSign className="w-6 h-6 mb-2 text-green-400" />
                  <p className="text-xs text-slate-400">Daily Cost</p>
                  <p className="text-xl font-bold">$247</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <TrendingUp className="w-6 h-6 mb-2 text-cyan-400" />
                  <p className="text-xs text-slate-400">Efficiency</p>
                  <p className="text-xl font-bold">7.8 MPG</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <Droplets className="w-6 h-6 mb-2 text-blue-400" />
                  <p className="text-xs text-slate-400">Consumed</p>
                  <p className="text-xl font-bold">145 gal</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <Package className="w-6 h-6 mb-2 text-purple-400" />
                  <p className="text-xs text-slate-400">CO2 Saved</p>
                  <p className="text-xl font-bold">42 kg</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                Driver Behavior Analytics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { name: 'Harsh Braking', value: driverBehavior.harshBraking || 0 },
                      { name: 'Harsh Accel', value: driverBehavior.harshAcceleration || 0 },
                      { name: 'Speeding', value: driverBehavior.speedingEvents || 0 },
                      { name: 'Idle Time', value: (driverBehavior.idleTime || 0) / 10 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                      <Bar dataKey="value" fill="#06b6d4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-700 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-2">Safety Score</p>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-green-400">{driverBehavior.safetyScore || 0}</div>
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: `${driverBehavior.safetyScore || 0}%` }} />
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-2">Eco Score</p>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-cyan-400">{driverBehavior.ecoScore || 0}</div>
                      <Activity className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                      <div className="h-2 bg-cyan-500 rounded-full" style={{ width: `${driverBehavior.ecoScore || 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'maintenance':
        return (
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Wrench className="w-5 h-5 mr-2 text-cyan-400" />
              Maintenance Schedule & History
            </h3>
            <div className="space-y-3">
              {maintenanceSchedule.map((item, idx) => (
                <div key={idx} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.type}</p>
                      <p className="text-sm text-slate-400">{item.vehicleId} • Due in {item.due}</p>
                      <p className="text-xs text-slate-500 mt-1">Scheduled: {item.scheduled}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded text-sm ${
                        item.priority === 'high' ? 'bg-red-900 text-red-200' :
                        item.priority === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-blue-900 text-blue-200'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Users className="w-5 h-5 mr-2 text-cyan-400" />
              User Management & Access Control
            </h3>
            <div className="space-y-3">
              {users.map(user => (
                <div key={user.id} className="bg-slate-700 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-slate-400">{user.email}</p>
                    <p className="text-xs text-slate-500 mt-1">{user.role}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {user.active ? (
                      <Unlock className="w-5 h-5 text-green-400" />
                    ) : (
                      <Lock className="w-5 h-5 text-red-400" />
                    )}
                    <span className={`px-2 py-1 rounded text-xs ${user.active ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'alerts':
        return (
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Settings className="w-5 h-5 mr-2 text-cyan-400" />
              Alert Rules & Configuration
            </h3>
            <div className="space-y-3">
              {alertRules.map(rule => (
                <div key={rule.id} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{rule.name}</p>
                      <p className="text-sm text-slate-400 font-mono">{rule.condition}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        rule.severity === 'high' ? 'bg-red-900 text-red-200' :
                        rule.severity === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-blue-900 text-blue-200'
                      }`}>
                        {rule.severity}
                      </span>
                      {rule.enabled ? (
                        <Bell className="w-5 h-5 text-green-400" />
                      ) : (
                        <BellOff className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'audit':
        return (
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Database className="w-5 h-5 mr-2 text-cyan-400" />
              Audit Log & System Events
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {auditLog.map(entry => (
                <div key={entry.id} className="bg-slate-700 rounded p-3 text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{entry.action}</span>
                    <span className="text-xs text-slate-400">{entry.timestamp}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{entry.details}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    User: {entry.user} ({entry.userId}) • IP: {entry.ip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Fleet Digital Twin Platform
          </h1>
          <p className="text-slate-400">Edge IoT Telemetry & AI-Powered Diagnostics System</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Logged in as: <span className="text-white font-semibold">{currentUser.name}</span></p>
          <p className="text-xs text-slate-500">{currentUser.role}</p>
        </div>
      </div>

      {/* Fleet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => {
              setSelectedVehicle(vehicle);
              logAudit('Vehicle Selected', `Switched to ${vehicle.name}`);
            }}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedVehicle?.id === vehicle.id
                ? 'bg-gradient-to-br from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/50 scale-105'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Truck className="w-6 h-6" />
              <div className="flex items-center">
                {edgeStatus[vehicle.id]?.connected ? (
                  <Wifi className="w-4 h-4 mr-2 text-green-400" />
                ) : (
                  <WifiOff className="w-4 h-4 mr-2 text-red-400" />
                )}
                <div className={`w-3 h-3 rounded-full ${getStatusColor(vehicle.status)}`} />
              </div>
            </div>
            <h3 className="font-semibold text-sm mb-1">{vehicle.name}</h3>
            <p className="text-xs text-slate-300 mb-2">{vehicle.id}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Health:</span>
              <span className={`font-bold ${getHealthColor(vehicle.health)}`}>{vehicle.health}%</span>
            </div>
            {edgeStatus[vehicle.id]?.connected && (
              <p className="text-xs text-slate-400 mt-1">
                Latency: {edgeStatus[vehicle.id]?.latency.toFixed(0)}ms
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-800 rounded-lg p-2 mb-6 flex flex-wrap gap-2">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'map', label: 'Map & Routes', icon: Map },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'maintenance', label: 'Maintenance', icon: Wrench },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'alerts', label: 'Alert Rules', icon: Settings },
          { id: 'audit', label: 'Audit Log', icon: Database }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              logAudit('Tab Changed', `Navigated to ${tab.label}`);
            }}
            className={`px-4 py-2 rounded flex items-center ${
              activeTab === tab.id
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {renderContent()}
        </div>

        {/* Right Column - Alerts & Stats */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
              Real-time Alerts ({alerts.filter(a => !a.acknowledged).length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="text-center text-slate-400 py-8">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>All systems operational</p>
                </div>
              ) : (
                alerts.slice(0, 10).map((alert) => (
                  <div key={alert.id} className={`border-l-4 p-3 rounded ${getSeverityColor(alert.severity)} ${alert.acknowledged ? 'opacity-50' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{alert.title}</p>
                        <p className="text-xs mt-1">{alert.message}</p>
                        <p className="text-xs mt-2 opacity-75">
                          {alert.vehicleId} • {alert.timestamp}
                        </p>
                        <p className="text-xs opacity-60">Source: {alert.source}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        {alert.severity === 'high' && <AlertTriangle className="w-5 h-5" />}
                        {!alert.acknowledged && (
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded"
                          >
                            Ack
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Edge Device Status */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Zap className="w-5 h-5 mr-2 text-cyan-400" />
              Edge Device Status
            </h3>
            <div className="space-y-3">
              {Object.entries(edgeStatus).map(([vehicleId, status]) => (
                <div key={vehicleId} className="bg-slate-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{vehicleId}</span>
                    {status.connected ? (
                      <Wifi className="w-4 h-4 text-green-400" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  {status.connected && (
                    <>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Latency: {status.latency.toFixed(0)}ms</span>
                        <span>Data: {status.dataPoints} pts</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-1 mt-2">
                        <div 
                          className="h-1 bg-green-500 rounded-full"
                          style={{ width: `${Math.min((status.latency / 100) * 100, 100)}%` }}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Fleet Statistics */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Fleet Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Active Vehicles</span>
                <span className="font-bold text-green-400">
                  {vehicles.filter(v => v.status === 'active').length}/{vehicles.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Connected Devices</span>
                <span className="font-bold text-cyan-400">
                  {Object.values(edgeStatus).filter(s => s.connected).length}/{vehicles.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Mileage</span>
                <span className="font-bold">
                  {vehicles.reduce((sum, v) => sum + v.mileage, 0).toLocaleString()} mi
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Avg Health Score</span>
                <span className="font-bold text-cyan-400">
                  {(vehicles.reduce((sum, v) => sum + v.health, 0) / vehicles.length).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Active Alerts</span>
                <span className="font-bold text-yellow-400">
                  {alerts.filter(a => !a.acknowledged).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Maintenance Due</span>
                <span className="font-bold text-orange-400">
                  {maintenanceSchedule.filter(m => m.priority === 'high').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetDigitalTwin;