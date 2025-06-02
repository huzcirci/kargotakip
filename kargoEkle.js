console.log("🚀 kargoEkle.js başladı");


const connection = require('./database/db');

const yeniKargo = {
  gonderen: 'Hamza Uzçirci',
  alici: 'Cihan Kentmen',
  durum: 'Yolda',
  tarih: '2025-05-15'
};

const sql = 'INSERT INTO kargolar SET ?';

connection.query(sql, yeniKargo, (err, result) => {
  if (err) {
    return console.error('Veri ekleme hatası:', err);
  }
  console.log('Yeni kargo eklendi, ID:', result.insertId);

  
  connection.query('SELECT * FROM kargolar', (err, rows) => {
    if (err) {
      console.error('Kargoları çekme hatası:', err);
    } else {
      console.log('Güncel Kargo Listesi:');
      console.table(rows);
    }

    
    connection.end(() => {
      console.log('Bağlantı kapatıldı.');
    });
  });
});
