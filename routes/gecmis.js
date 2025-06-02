const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Geçmiş ekleme formunu gösterir
router.get('/gecmis-ekle', (req, res) => {
  res.render('gecmisEkle', { basari: null, hata: null });
});

// Geçmiş verisini veritabanına ekleme işlemleri
router.post('/gecmis-ekle', (req, res) => {
  const { takip_no, konum, tarih, saat, aciklama } = req.body;

  const sql = 'INSERT INTO kargo_gecmisi (takip_no, konum, tarih, saat, aciklama) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [takip_no, konum, tarih, saat, aciklama], (err) => {
    if (err) {
      console.error('Hata:', err);
      return res.render('gecmisEkle', { hata: 'Veritabanı hatası!', basari: null });
    }

    res.render('gecmisEkle', { basari: 'Kargo geçmişi başarıyla eklendi.', hata: null });
  });
});

// Tüm kargo geçmişini listeler
router.get('/admin/gecmis-liste', (req, res) => {
  const sql = 'SELECT * FROM kargo_gecmisi ORDER BY tarih DESC, saat DESC';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('adminGecmisListe', { gecmisler: results });
  });
});

// Geçmiş düzenleme formunu gösterir
router.get('/admin/gecmis-duzenle/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM kargo_gecmisi WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.render('adminGecmisDuzenle', {
        gecmis: {},
        hata: 'Veritabanı hatası!'
      });
    }

    if (results.length === 0) {
      return res.render('adminGecmisDuzenle', {
        gecmis: {},
        hata: 'Kargo geçmişi bulunamadı!'
      });
    }

    res.render('adminGecmisDuzenle', {
      gecmis: results[0],
      hata: null
    });
  });
});

// Geçmiş verisini günceller
router.post('/admin/gecmis-duzenle/:id', (req, res) => {
  const id = req.params.id;
  const { takip_no, konum, aciklama, tarih, saat } = req.body;

  const sql = `
    UPDATE kargo_gecmisi 
    SET takip_no = ?, konum = ?, aciklama = ?, tarih = ?, saat = ? 
    WHERE id = ?
  `;

  db.query(sql, [takip_no, konum, aciklama, tarih, saat, id], (err) => {
    if (err) {
      console.error(err);
      return res.render('adminGecmisDuzenle', {
        hata: 'Güncelleme sırasında hata oluştu.',
        gecmis: { id, takip_no, konum, aciklama, tarih, saat }
      });
    }

    res.redirect('/admin/gecmis-liste');
  });
});

// Geçmiş verisini siler
router.get('/admin/gecmis-sil/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM kargo_gecmisi WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) throw err;
    res.redirect('/admin/gecmis-liste');
  });
});

module.exports = router;