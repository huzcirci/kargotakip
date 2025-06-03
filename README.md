Proje Hakkında Bilgi
Örnek Çalışmalar:
Benzer kargo takip sistemleri incelendi. Örneğin, Aras Kargo ve Yurtiçi Kargo’nun web uygulamaları analiz edildi.

Özgünlük ve Farklılıklar:
Sistemde kullanıcı dostu arayüz ve gerçek zamanlı kargo durumu güncellemeleri sunulmuştur.

Kullanılan Teknolojiler:
Backend: Node.js, Express.js
Frontend: EJS (Embedded JavaScript Templates)
Veritabanı: MySQL
Oturum Yönetimi: express-session
Diğer: HTML, CSS



2. Projenin Github’da Yayınlanması
Proje, Github’da yeni bir repository oluşturularak paylaşılmıştır.
Kodlar git init, git add ., git commit -m "ilk yükleme" ve git push komutlarıyla yüklenmiştir.
Açık kaynak olarak paylaşılmıştır, isteyen herkes erişebilir.



3. Projenin Yapılış Aşamaları
Menülerin Tasarımı:
Ana sayfa, kargo sorgulama, giriş/çıkış ve yönetici paneli menüleri tasarlandı. Menülerin yerleşimi için kullanıcı deneyimi göz önünde bulunduruldu.

Menülerdeki Veriler ve Bölümler:
Kullanıcılar kargo takip numarası ile sorgulama yapabiliyor. Yönetici panelinde kargo ekleme, güncelleme ve silme işlemleri mevcut.

İşlevlerin Belirlenmesi ve Uygulanması:
Kullanıcıdan gelen sorgu, backend’e iletiliyor ve veritabanından kargo bilgisi çekiliyor.

Veritabanı ve Backend:
MySQL’de kargolar, kullanıcılar gibi tablolar oluşturuldu.
Tablolar arası ilişkiler:kargolar tablosunda kullanici_id ile kullanıcıya bağlandı.
Adım Adım Yapılış:
Proje klasörü oluşturuldu
Node.js ve gerekli paketler yüklendi
Veritabanı tasarlandı
Backend kodları yazıldı
Frontend şablonları hazırlandı
Testler yapıldı ve hata ayıklama gerçekleştirildi
Yayınlama işlemleri yapıldı

4. Karşılaşılan Zorluklar ve Çözümleri
Veritabanı Bağlantı Sorunları:
Bağlantı ayarları tekrar kontrol edilerek düzeltildi.
Kullanıcı Girişi Güvenliği:
express-session ile oturum yönetimi sağlandı.

5. Projenin Geliştirilebilecek Yönleri
Mobil uyumlu arayüz eklenebilir.
Kargo durum güncellemeleri için SMS/email entegrasyonu yapılabilir.
Çoklu dil desteği eklenebilir.

6. Kaynakça
Node.js Resmi Dokümantasyonu
Express.js Guide
MySQL Documentation
Github Docs


