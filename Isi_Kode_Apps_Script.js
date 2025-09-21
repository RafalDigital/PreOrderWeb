function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    var payload = JSON.parse(e.postData.contents);

    var lastRow = sheet.getLastRow();
    var nextNomor;
    if (lastRow === 1) {
      nextNomor = 1;
    } else {
      var lastNomor = sheet.getRange(lastRow, 1).getValue();
      nextNomor = lastNomor + 1;
    }

    var rowData = [
      nextNomor,
      new Date(),
      payload.nama,
      payload.alamat,
      payload.daftarProduk,
      payload.totalHarga,
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput("Data berhasil ditambahkan.").setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService.createTextOutput("Terjadi kesalahan: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}