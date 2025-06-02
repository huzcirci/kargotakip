const express = require('express');
const router = express.Router();

// Hakkımızda sayfası
router.get('/hakkinda', (req, res) => {
  res.render('hakkinda');
});

// İletişim sayfası 
router.get('/iletisim', (req, res) => {
  res.render('iletisim');
});

module.exports = router;