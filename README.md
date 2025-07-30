📘 SISTEM UJIAN INTERAKTIF BERBASIS GOOGLE SHEETS

✅ FITUR:
- Login siswa (nama & kelas)
- Ujian pilihan ganda dengan timer
- Kirim hasil ke Spreadsheet
- Pembahasan soal + analisis kompetensi
- Rekap nilai semua siswa

🔧 LANGKAH PENGGUNAAN:

1. BUKA GOOGLE SHEETS → BUAT FILE BARU
2. BUAT 2 sheet:
   - Sheet `soal`
     Kolom: no | soal | a | b | c | d | kunci | pembahasan | kompetensi
   - Sheet `hasil`
     Kolom: timestamp | nama | kelas | skor | total

3. SHARE SPREADSHEET
   Klik "Share" → Anyone with link (Viewer)

4. CATAT SPREADSHEET ID:
   Contoh: https://docs.google.com/spreadsheets/d/**SPREADSHEET_ID**/edit

5. BUAT APP SCRIPT → paste `script.gs`:
--------------------------------------------------------
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('hasil');
  const data = JSON.parse(e.postData.contents);
  const waktu = new Date();
  sheet.appendRow([
    Utilities.formatDate(waktu, "GMT+8", "yyyy-MM-dd HH:mm:ss"),
    data.nama,
    data.kelas,
    data.skor,
    data.total
  ]);
  return ContentService.createTextOutput("OK");
}
--------------------------------------------------------

6. DEPLOY WEB APP:
   - Deploy > New Deployment > Web App
   - Siapa saja bisa akses
   - Salin URL Web App: `https://script.google.com/macros/s/XYZ/exec`

7. DI SETIAP FILE HTML:
   - Ganti `SHEET_ID = '...'` sesuai spreadsheet ID kamu
   - Ganti `FORM_ACTION = '...'` di `ujian.html` ke Web App URL

8. BUKA `login.html` → mulai ujian!

✉️ Saran: Upload semua file ke satu folder di hosting, atau buka lewat browser.
