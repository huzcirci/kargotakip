console.log(">> kargoEkle.js çalıştı");



const connection = require('./database/db');


const sql = 'SELECT * FROM kargolar';

connection.query(sql, (err, rows) => {
  if (err) {
    console.error(' Kargoları çekme hatası:', err);
  } else {
    console.log('✅ Kargolar başarıyla çekildi:');
    console.table(rows);
  }
  connection.end(() => {
    console.log('🔌 Bağlantı kapatıldı.');
  });
});
