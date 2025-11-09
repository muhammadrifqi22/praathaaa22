// === Daftar 25 siswa ===
const siswa = [
  "Ahmad Fauzan", "Aisyah Putri", "Budi Santoso", "Citra Dewi", "Dimas Prasetyo",
  "Eka Wulandari", "Fajar Nugroho", "Gina Aprilia", "Hadi Saputra", "Indah Permata",
  "Joko Riyadi", "Kartika Sari", "Lukman Hakim", "Maya Fitriani", "Nanda Setiawan",
  "Oki Ramadhani", "Putri Ayu", "Qoryatul Aini", "Rizki Kurniawan", "Siti Rahma",
  "Teguh Pratama", "Umar Hidayat", "Vina Lestari", "Wahyu Adi", "Yuni Safitri"
];

const namaSiswaSelect = document.getElementById("namaSiswa");
siswa.forEach(nama => {
  const option = document.createElement("option");
  option.textContent = nama;
  namaSiswaSelect.appendChild(option);
});

// === Ambil Data dari LocalStorage ===
let kasMasuk = JSON.parse(localStorage.getItem("kasMasuk")) || [];
let kasKeluar = JSON.parse(localStorage.getItem("kasKeluar")) || [];

// === Simpan ke LocalStorage ===
function simpanData() {
  localStorage.setItem("kasMasuk", JSON.stringify(kasMasuk));
  localStorage.setItem("kasKeluar", JSON.stringify(kasKeluar));
}

// === Tambah Kas Masuk ===
document.getElementById("tambahKas").addEventListener("click", () => {
  const nama = namaSiswaSelect.value;
  const tanggal = document.getElementById("tanggalKas").value;
  const jumlah = parseInt(document.getElementById("jumlahKas").value);

  if (!tanggal || isNaN(jumlah) || jumlah <= 0) {
    alert("Lengkapi data kas masuk dengan benar!");
    return;
  }

  kasMasuk.push({ nama, tanggal, jumlah });
  simpanData();
  tampilkanKasMasuk();

  document.getElementById("tanggalKas").value = "";
  document.getElementById("jumlahKas").value = "";
});

// === Tambah Kas Keluar ===
document.getElementById("tambahKeluar").addEventListener("click", () => {
  const tanggal = document.getElementById("tanggalKeluar").value;
  const keterangan = document.getElementById("keteranganKeluar").value;
  const jumlah = parseInt(document.getElementById("jumlahKeluar").value);

  if (!tanggal || !keterangan || isNaN(jumlah) || jumlah <= 0) {
    alert("Lengkapi data pengeluaran dengan benar!");
    return;
  }

  kasKeluar.push({ tanggal, keterangan, jumlah });
  simpanData();
  tampilkanKasKeluar();

  document.getElementById("tanggalKeluar").value = "";
  document.getElementById("keteranganKeluar").value = "";
  document.getElementById("jumlahKeluar").value = "";
});

// === Tampilkan Data Kas Masuk ===
function tampilkanKasMasuk() {
  const body = document.getElementById("bodyKasMasuk");
  body.innerHTML = "";
  kasMasuk.forEach((d, i) => {
    body.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${d.nama}</td>
        <td>${d.tanggal}</td>
        <td>Rp ${d.jumlah.toLocaleString()}</td>
        <td><button onclick="hapusKasMasuk(${i})">Hapus</button></td>
      </tr>
    `;
  });
}

// === Tampilkan Data Kas Keluar ===
function tampilkanKasKeluar() {
  const body = document.getElementById("bodyKasKeluar");
  body.innerHTML = "";
  kasKeluar.forEach((d, i) => {
    body.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${d.tanggal}</td>
        <td>${d.keterangan}</td>
        <td>Rp ${d.jumlah.toLocaleString()}</td>
        <td><button onclick="hapusKasKeluar(${i})">Hapus</button></td>
      </tr>
    `;
  });
}

// === Hapus Data ===
function hapusKasMasuk(i) {
  if (confirm("Hapus data kas masuk ini?")) {
    kasMasuk.splice(i, 1);
    simpanData();
    tampilkanKasMasuk();
  }
}
function hapusKasKeluar(i) {
  if (confirm("Hapus data pengeluaran ini?")) {
    kasKeluar.splice(i, 1);
    simpanData();
    tampilkanKasKeluar();
  }
}

// === Rekap Keuangan ===
document.getElementById("lihatRekap").addEventListener("click", () => {
  const totalMasuk = kasMasuk.reduce((sum, d) => sum + d.jumlah, 0);
  const totalKeluar = kasKeluar.reduce((sum, d) => sum + d.jumlah, 0);
  const saldo = totalMasuk - totalKeluar;

  const totalPerSiswa = {};
  siswa.forEach(n => totalPerSiswa[n] = 0);
  kasMasuk.forEach(d => totalPerSiswa[d.nama] += d.jumlah);

  let tabelSiswa = `
    <table>
      <tr><th>Nama Siswa</th><th>Total Kas Masuk (Rp)</th></tr>
  `;
  siswa.forEach(n => {
    tabelSiswa += `<tr><td>${n}</td><td>Rp ${totalPerSiswa[n].toLocaleString()}</td></tr>`;
  });
  tabelSiswa += `</table>`;

  document.getElementById("rekapContainer").innerHTML = `
    <h3>Rekap Keuangan Kelas</h3>
    <p><b>Total Kas Masuk:</b> Rp ${totalMasuk.toLocaleString()}</p>
    <p><b>Total Pengeluaran:</b> Rp ${totalKeluar.toLocaleString()}</p>
    <p><b>Saldo Akhir:</b> Rp ${saldo.toLocaleString()}</p>
    <h3>Detail Kas Tiap Siswa</h3>
    ${tabelSiswa}
  `;
});

// === Tampilkan Awal ===
tampilkanKasMasuk();
tampilkanKasKeluar();
