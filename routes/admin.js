const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Admin giriş sayfası
router.get('/admin/giris', (req, res) => {
  res.render('adminGiris', { hata: null });
});

// Giriş kontrolü
router.post('/admin/giris', (req, res) => {
  const { kullanici, sifre } = req.body;
  if (kullanici === 'hamzakargo' && sifre === 'hamza12345') {
    req.session.admin = true;
    res.redirect('/admin');
  } else {
    res.render('adminGiris', { hata: 'Kullanıcı adı veya şifre yanlış!' });
  }
});

// Admin paneli anasayfası
router.get('/admin', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/giris');
  res.render('adminPanel');
});

// Admin çıkışı
router.get('/admin/cikis', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Çıkış yapılamadı.');
    res.redirect('/admin/giris');
  });
});

// Kargo listesi
router.get('/admin/kargolar', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/giris');

  const sql = 'SELECT * FROM kargolar ORDER BY id ASC';
  db.query(sql, (err, results) => {
    if (err) return res.send('Veritabanı hatası: ' + err.message);
    res.render('adminKargoListe', { kargolar: results });
  });
});

// Yeni kargo ekleme formu 
router.get('/admin/kargolar/ekle', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/giris');
  res.render('kargoEkle', { hata: null, basari: null });
});

// Yeni kargo ekleme işlemi 
router.post('/admin/kargolar/ekle', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/giris');

  const { takip_no, gonderen, alici, durum, tarih } = req.body;
  const sql = 'INSERT INTO kargolar (takip_no, gonderen, alici, durum, tarih) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [takip_no, gonderen, alici, durum, tarih], (err) => {
    if (err) {
      return res.render('kargoEkle', {
        hata: 'Veritabanı hatası: ' + err.message,
        basari: null,
        takip_no, gonderen, alici, durum, tarih
      });
    }
    res.render('kargoEkle', {
      basari: 'Kargo başarıyla eklendi.',
      hata: null,
      takip_no: '', gonderen: '', alici: '', durum: '', tarih: ''
    });
  });
});

// Kargo düzenleme sayfası 
router.get('/admin/kargolar/duzenle/:id', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/giris');

  const sql = 'SELECT * FROM kargolar WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.send('Veritabanı hatası: ' + err.message);
    if (results.length === 0) return res.send('Kargo bulunamadı.');
    res.render('adminKargoDuzenle', { kargo: results[0], hata: null });
  });
});

// Kargo düzenleme işlemi 
router.post('/admin/kargolar/duzenle/:id', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/giris');

  const { takip_no, gonderen, alici, durum, tarih } = req.body;
  const sql = 'UPDATE kargolar SET takip_no = ?, gonderen = ?, alici = ?, durum = ?, tarih = ? WHERE id = ?';

  db.query(sql, [takip_no, gonderen, alici, durum, tarih, req.params.id], (err) => {
    if (err) return res.send('Veritabanı hatası: ' + err.message);
    res.redirect('/admin/kargolar');
  });
});

// Kargo silme işlemi 
router.get('/admin/kargolar/sil/:id', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/giris');

  const sql = 'DELETE FROM kargolar WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.send('Veritabanı hatası: ' + err.message);
    res.redirect('/admin/kargolar');
  });
});

// ✅ Kargo geçmişi ekleme formu (GET)
router.get('/admin/kargoGecmisiEkle', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/giris');

  const basariMesaji = req.query.basari ? 'Kargo geçmişi başarıyla eklendi.' : null;

  res.render('kargoGecmisiEkle', {
    hata: null,
    basari: basariMesaji,
    takip_no: '',
    konum: '',
    tarih: '',
    saat: '',
    aciklama: ''
  });
});

// ✅ Kargo geçmişi ekleme işlemi (POST)
router.post('/admin/kargoGecmisiEkle', (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/giris');

  const { takip_no, konum, tarih, saat, aciklama } = req.body;
  const sql = 'INSERT INTO kargo_gecmisi (takip_no, konum, tarih, saat, aciklama) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [takip_no, konum, tarih, saat, aciklama], (err) => {
    if (err) {
      return res.render('kargoGecmisiEkle', {
        hata: 'Veritabanı hatası: ' + err.message,
        basari: null,
        takip_no, konum, tarih, saat, aciklama
      });
    }
    // Başarılı ekleme sonrası redirect yerine render yapıyoruz
    res.render('kargoGecmisiEkle', {
      basari: 'Kargo geçmişi başarıyla eklendi.',
      hata: null,
      takip_no, konum, tarih, saat, aciklama: ''
    });
  });
});

module.exports = router;