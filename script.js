
const WEB_APP_URL = 'https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec';
let token = null;

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(WEB_APP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "login",
      username: username,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      token = `${data.username}-${data.role}`;
      document.getElementById("hasil").innerText = `Login berhasil sebagai ${data.role}`;
      showPage('quizPage');
    } else {
      document.getElementById("hasil").innerText = data.message;
    }
  })
  .catch(err => {
    document.getElementById("hasil").innerText = "Terjadi kesalahan: " + err;
  });
}

function simpanHasil() {
  if (!token) {
    document.getElementById("hasil").innerText = "Silakan login terlebih dahulu.";
    return;
  }

  const nama = document.getElementById("nama").value;
  const kelas = document.getElementById("kelas").value;
  const kuis = document.getElementById("kuis").value;
  const skor = parseInt(document.getElementById("skor").value);
  const total = parseInt(document.getElementById("total").value);

  fetch(WEB_APP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "simpanHasil",
      nama: nama,
      kelas: kelas,
      kuis: kuis,
      skor: skor,
      total: total,
      token: token
    })
  })
  .then(res => res.text())
  .then(text => {
    document.getElementById("hasil").innerText = "Data kuis berhasil disimpan!";
  })
  .catch(err => {
    document.getElementById("hasil").innerText = "Gagal simpan: " + err;
  });
}
