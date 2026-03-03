// Google Sheets Service for Maa Annapurna Store
// Handles all Google Sheets integration

class GoogleSheetsService {
  constructor() {
    this.scriptUrl = localStorage.getItem('googleScriptUrl') || '';
    this.sheetUrl = localStorage.getItem('googleSheetUrl') || '';
    this.lastSyncTime = localStorage.getItem('lastSyncTime') || null;
    this.syncStatus = localStorage.getItem('syncStatus') || 'disconnected';
  }

  // Save configuration
  saveConfig(scriptUrl, sheetUrl) {
    this.scriptUrl = scriptUrl;
    this.sheetUrl = sheetUrl;
    localStorage.setItem('googleScriptUrl', scriptUrl);
    localStorage.setItem('googleSheetUrl', sheetUrl);
  }

  // Test connection to Google Apps Script
  async testConnection() {
    if (!this.scriptUrl) {
      return { success: false, message: 'Script URL not configured' };
    }

    try {
      const url = `${this.scriptUrl}?action=testConnection&t=${Date.now()}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.status === 'success') {
        this.syncStatus = 'connected';
        localStorage.setItem('syncStatus', 'connected');
        return { 
          success: true, 
          message: 'Connection successful',
          data: result.data 
        };
      } else {
        throw new Error(result.message || 'Connection failed');
      }
    } catch (error) {
      this.syncStatus = 'error';
      localStorage.setItem('syncStatus', 'error');
      return { 
        success: false, 
        message: `Connection failed: ${error.message}` 
      };
    }
  }

  // Create Google Sheet with proper headers
  async createSheet(sheetName = 'Maa Annapurna Store Sales') {
    if (!this.scriptUrl) {
      return { success: false, message: 'Script URL not configured' };
    }

    try {
      const url = `${this.scriptUrl}?action=createSheet&sheetName=${encodeURIComponent(sheetName)}&t=${Date.now()}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.status === 'success') {
        return { 
          success: true, 
          message: 'Sheet created successfully',
          data: result.data 
        };
      } else {
        throw new Error(result.message || 'Sheet creation failed');
      }
    } catch (error) {
      return { 
        success: false, 
        message: `Sheet creation failed: ${error.message}` 
      };
    }
  }

  // Sync sales data to Google Sheets
  async syncSales(salesData) {
    if (!this.scriptUrl) {
      return { success: false, message: 'Script URL not configured' };
    }

    if (!salesData || salesData.length === 0) {
      return { success: true, message: 'No sales data to sync', syncedCount: 0 };
    }

    try {
      const url = `${this.scriptUrl}?action=syncSales&t=${Date.now()}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `salesData=${encodeURIComponent(JSON.stringify(salesData))}&sheetName=${encodeURIComponent('Maa Annapurna Store Sales')}`
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.status === 'success') {
        this.lastSyncTime = new Date().toISOString();
        localStorage.setItem('lastSyncTime', this.lastSyncTime);
        this.syncStatus = 'synced';
        localStorage.setItem('syncStatus', 'synced');
        
        return { 
          success: true, 
          message: result.message,
          syncedCount: result.data?.syncedCount || 0,
          totalRows: result.data?.totalRows || 0
        };
      } else {
        throw new Error(result.message || 'Sync failed');
      }
    } catch (error) {
      this.syncStatus = 'error';
      localStorage.setItem('syncStatus', 'error');
      return { 
        success: false, 
        message: `Sync failed: ${error.message}` 
      };
    }
  }

  // Get sync status
  getSyncStatus() {
    return {
      status: this.syncStatus,
      lastSyncTime: this.lastSyncTime,
      scriptUrl: this.scriptUrl,
      sheetUrl: this.sheetUrl
    };
  }

  // Clear configuration
  clearConfig() {
    this.scriptUrl = '';
    this.sheetUrl = '';
    this.lastSyncTime = null;
    this.syncStatus = 'disconnected';
    localStorage.removeItem('googleScriptUrl');
    localStorage.removeItem('googleSheetUrl');
    localStorage.removeItem('lastSyncTime');
    localStorage.removeItem('syncStatus');
  }

  // Get unsynced sales (sales after last sync time)
  getUnsyncedSales(allSales) {
    if (!this.lastSyncTime) {
      return allSales; // All sales need to be synced
    }

    const lastSync = new Date(this.lastSyncTime);
    return allSales.filter(sale => new Date(sale.date + ' ' + sale.time) > lastSync);
  }
}

export default GoogleSheetsService;
