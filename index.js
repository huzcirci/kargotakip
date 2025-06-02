const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

const db = require('./database/db');

const kargoRoutes = require('./routes/kargo');
const gecmisRoutes = require('./routes/gecmis');
const adminRoutes = require('./routes/admin');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

// admin için oturum yönetimi
app.use(session({
  secret: 'gizliAdminAnahtari',
  resave: false,
  saveUninitialized: true
}));

// iletisim sayfasını gösterir
app.get('/iletisim', (req, res) => {
  res.render('iletisim', { gonderildi: false });
});

// iletisim formu post edildiğinde
app.post('/iletisim', (req, res) => {
  const { isim, email, mesaj } = req.body;
  console.log("Yeni iletişim mesajı:", { isim, email, mesaj });

  

  res.render('iletisim', { gonderildi: true });
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', kargoRoutes);
app.use('/', gecmisRoutes);
app.use('/', adminRoutes);


app.get('/', (req, res) => {
  res.render('index', { hata: null, basari: null });
});

const genelRoutes = require('./routes/genel'); 
app.use(genelRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🚀 Sunucu ${PORT} portunda çalışıyor...');
});
