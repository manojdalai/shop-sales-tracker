# Google Apps Script for Maa Annapurna Store

## Setup Instructions (2 minutes):

### 1. Create Google Apps Script:
1. Go to: https://script.google.com/home
2. Click "New Project"
3. Delete all existing code
4. Copy and paste the code below

### 2. Script Code:
```javascript
// Google Apps Script for Maa Annapurna Store Sales Sync
// Copy this entire code into your Google Apps Script project

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    const action = e.parameter.action;
    
    switch(action) {
      case 'syncSales':
        return syncSalesData(e);
      case 'createSheet':
        return createSalesSheet(e);
      case 'testConnection':
        return testConnection();
      default:
        return createResponse('error', 'Unknown action');
    }
  } catch(error) {
    return createResponse('error', error.toString());
  }
}

function createSalesSheet(e) {
  try {
    const sheetName = e.parameter.sheetName || 'Maa Annapurna Store Sales';
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Create sheet if it doesn't exist
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    }
    
    // Set up headers
    const headers = [
      'Date', 'Time', 'Product Name', 'Quantity', 'Unit', 
      'Price per Unit', 'Total Price', 'Sale Type', 'Category'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    
    // Format columns
    sheet.autoResizeColumns(1, headers.length);
    sheet.setColumnWidth(1, 120); // Date
    sheet.setColumnWidth(2, 80);  // Time
    sheet.setColumnWidth(3, 200); // Product Name
    sheet.setColumnWidth(7, 100); // Total Price
    
    return createResponse('success', 'Sheet created successfully', {
      sheetId: spreadsheet.getId(),
      sheetName: sheetName
    });
  } catch(error) {
    return createResponse('error', error.toString());
  }
}

function syncSalesData(e) {
  try {
    const salesData = JSON.parse(e.parameter.salesData);
    const sheetName = e.parameter.sheetName || 'Maa Annapurna Store Sales';
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      return createResponse('error', 'Sheet not found. Please create sheet first.');
    }
    
    // Get existing data to avoid duplicates
    const existingData = sheet.getDataRange().getValues();
    const existingRows = existingData.slice(1).map(row => 
      `${row[0]}|${row[1]}|${row[2]}|${row[3]}|${row[4]}`
    );
    
    // Prepare new rows
    const newRows = [];
    salesData.forEach(sale => {
      sale.items.forEach(item => {
        const rowKey = `${sale.date}|${sale.time}|${item.name}|${item.quantity}|${item.unit}`;
        if (!existingRows.includes(rowKey)) {
          newRows.push([
            sale.date,
            sale.time,
            item.name,
            item.quantity,
            item.unit,
            item.price,
            item.price * item.quantity,
            item.saleType || 'regular',
            item.category || 'general'
          ]);
        }
      });
    });
    
    // Append new rows
    if (newRows.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, newRows[0].length)
        .setValues(newRows);
      sheet.autoResizeColumns(1, 9);
    }
    
    return createResponse('success', `Synced ${newRows.length} new sales records`, {
      syncedCount: newRows.length,
      totalRows: sheet.getLastRow() - 1
    });
  } catch(error) {
    return createResponse('error', error.toString());
  }
}

function testConnection() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    return createResponse('success', 'Connection successful', {
      spreadsheetId: spreadsheet.getId(),
      spreadsheetName: spreadsheet.getName()
    });
  } catch(error) {
    return createResponse('error', error.toString());
  }
}

function createResponse(status, message, data = null) {
  const response = {
    status: status,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 3. Deploy the Script:
1. Click "Deploy" → "New deployment"
2. Choose "Web app"
3. Description: "Maa Annapurna Store Sales Sync"
4. Execute as: "Me" (your Google account)
5. Who has access: "Anyone with Google account"
6. Click "Deploy"
7. Copy the Web app URL (this is your script URL)

### 4. Share Your Google Sheet:
1. Create a new Google Sheet: https://sheets.google.com
2. Name it: "Maa Annapurna Store Sales"
3. Share the sheet with "anyone with the link can edit"
4. Copy the sheet URL

### 5. Connect in App:
1. Open your app → Admin page
2. Go to "Google Sheets Settings"
3. Enter the Script URL and Sheet URL
4. Click "Test Connection"
5. Click "Create Sheet" to set up headers
6. Done!

## Features:
✅ Automatic sync after each sale
✅ No duplicate entries
✅ Error handling and retry
✅ Manual sync option
✅ Sync status tracking
✅ Multiple Google account support
