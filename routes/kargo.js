const express = require('express');
const router = express.Router();
const db = require('../database/db'); 

// 📦 Kargo sorgulama işlemi
router.post('/kargo-sorgula', (req, res) => {
  const takipNo = req.body.takip_no;
  if (!takipNo) {
    return res.render('index', { hata: 'Takip numarası girilmedi.', basari: null });
  }
  const kargoQuery = 'SELECT * FROM kargolar WHERE takip_no = ?';
  db.query(kargoQuery, [takipNo], (err, kargoResults) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Veritabanı hatası.');
    }
    if (kargoResults.length === 0) {
      return res.render('index', { hata: 'Bu takip numarasına ait kargo bulunamadı.', basari: null });
    }
    const kargo = kargoResults[0];
    const gecmisQuery = 'SELECT * FROM kargo_gecmisi WHERE takip_no = ? ORDER BY tarih DESC';
    db.query(gecmisQuery, [takipNo], (err, gecmisResults) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Geçmiş bilgisi alınamadı.');
      }
      res.render('kargoSonuc', {
        kargo,
        gecmisi: gecmisResults
      });
    });
  });
});

// 📌 Kargo geçmişi ekleme formunu gösterir
router.get('/gecmis-ekle', (req, res) => {
  res.render('gecmisEkle', {
    hata: null,
    basari: null,
    showForm: false    
  });
});

// 📌 Kargo geçmişini formdan gelen veriyi veritabanına ekleme
router.post('/gecmis-ekle', (req, res) => {
  const { takip_no, konum, tarih, saat, aciklama } = req.body;
  const sql = `
    INSERT INTO kargo_gecmisi (takip_no, konum, tarih, saat, aciklama)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [takip_no, konum, tarih, saat, aciklama], (err, result) => {
    if (err) {
      console.error('Kargo geçmişi eklenirken hata oluştu:', err);
      return res.render('gecmisEkle', {
        hata: 'Veritabanı hatası. Lütfen bilgileri kontrol edip tekrar deneyin.',
        basari: null,
        takip_no, konum, tarih, saat, aciklama,
        showForm: true   
      });
    }
    res.render('gecmisEkle', {
      basari: '✅ Kargo geçmişi başarıyla eklendi.',
      hata: null,
      takip_no: '', konum: '', tarih: '', saat: '', aciklama: '',
      showForm: true   
    });
  });
});

// 🆕 Yeni kargo ekleme formunu gösterir
router.get('/kargo-ekle', (req, res) => {
  res.render('kargoEkle', {
    hata: null,
    basari: null,
    showForm: false    
  });
});

// Yeni kargo kaydını veritabanına ekler
router.post('/kargo-ekle', (req, res) => {
  const { takip_no, gonderen, alici, durum, tarih } = req.body;
  if (!takip_no || !gonderen || !alici || !durum) {
    return res.render('kargoEkle', {
      hata: "Takip No, Gönderen, Alıcı ve Durum alanları zorunludur.",
      basari: null,
      takip_no, gonderen, alici, durum, tarih,
      showForm: true    
    });
  }
  const insertQuery = `
    INSERT INTO kargolar (takip_no, gonderen, alici, durum, tarih)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(insertQuery, [takip_no, gonderen, alici, durum, tarih || null], (err, result) => {
    if (err) {
      console.error("Kargo ekleme hatası:", err);
      return res.render('kargoEkle', {
        hata: "Kargo eklenirken bir hata oluştu. Lütfen tekrar deneyin.",
        basari: null,
        takip_no, gonderen, alici, durum, tarih,
        showForm: true    
      });
    }
    res.render('kargoEkle', {
      basari: "✅ Kargo başarıyla eklendi.",
      hata: null,
      takip_no: '', gonderen: '', alici: '', durum: '', tarih: '',
      showForm: true    
    });
  });
});

module.exports = router;