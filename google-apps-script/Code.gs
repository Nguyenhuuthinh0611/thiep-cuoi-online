/**
 * Lưu RSVP + lời chúc vào Google Sheets (miễn phí)
 * Cách dùng: xem README.md, mục "Kết nối Google Sheets"
 */
const SHEET_NAME = "RSVP";

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(["Thời gian", "Tên", "SĐT", "Khách của", "Quan hệ", "Tham dự", "Lời chúc"]);
  }
  return sh;
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const clean = (s) => String(s || "").slice(0, 500);
  sheet_().appendRow([new Date(), clean(d.name), "'" + clean(d.phone), clean(d.side), clean(d.relation), clean(d.attend), clean(d.message)]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const rows = sheet_().getDataRange().getValues().slice(1);
  const wishes = rows
    .filter((r) => r[6])
    .reverse()
    .slice(0, 100)
    .map((r) => ({ name: r[1], message: r[6] })); // KHÔNG trả về số điện thoại
  return ContentService.createTextOutput(JSON.stringify(wishes)).setMimeType(ContentService.MimeType.JSON);
}
