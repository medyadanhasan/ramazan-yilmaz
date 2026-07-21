# Admin Paneli Kurulumu (Decap CMS)

Site artık `data/*.json` dosyalarından içerik çekiyor ve `/admin` adresinde bir yönetim paneli hazır. Panelin GitHub'a giriş yapıp kaydedebilmesi için tek eksik adım: bir OAuth bağlantısı kurmak. Bu adımlar hesap oluşturma ve gizli anahtar girme içerdiği için sizin yapmanız gerekiyor — aşağıda tek tek anlatıyorum.

## 1. Değişiklikleri GitHub'a yükleyin

Bu klasördeki yeni dosyaları (`data/`, `js/render.js`, `admin/`, güncellenen `.html` ve `css/style.css`, `js/main.js`) mevcut yöntiminizle (Claude Code / git push) `medyadanhasan/ramazanyilmaz` reposuna gönderin.

## 2. GitHub OAuth App oluşturun

1. https://github.com/settings/developers → **New OAuth App**
2. Alanları doldurun:
   - **Application name:** Ramazan Yılmaz CMS
   - **Homepage URL:** `https://ramazanyilmaz.net`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
3. Kaydedince bir **Client ID** ve **Client Secret** üretilir — ikisini de bir kenara not edin (Secret'ı sadece bir kez görebilirsiniz).

## 3. Netlify'da OAuth için "aracı" bir site oluşturun

Siteniz GitHub Pages'te kalacak — Netlify sadece giriş (OAuth) işlemini yönetmek için ücretsiz kullanılıyor, ekstra kod yazmanıza gerek yok.

1. https://app.netlify.com → GitHub hesabınızla ücretsiz kaydolun
2. **Add new site → Import an existing project → GitHub** → `medyadanhasan/ramazanyilmaz` reposunu seçin
3. Build ayarlarını değiştirmeden **Deploy** deyin (bu site canlıda kullanılmayacak, sadece OAuth için var olacak)
4. Deploy bitince Netlify size `https://rastgele-isim-12345.netlify.app` gibi bir adres verir — bunu not edin
5. Netlify panelinde: **Site configuration → Access control → OAuth → Install provider**
   - Provider: **GitHub**
   - Client ID / Client Secret: 2. adımda aldığınız değerleri yapıştırın → Kaydet

## 4. config.yml'i güncelleyin

`admin/config.yml` dosyasında şu satırların başındaki `#` işaretini kaldırıp adresi kendi Netlify adresinizle değiştirin:

```yaml
base_url: https://rastgele-isim-12345.netlify.app
auth_endpoint: auth
```

Değişikliği kaydedip GitHub'a gönderin (push).

## 5. Panele giriş

DNS ve GitHub Pages custom domain ayarları tamamlandıktan sonra:

`https://ramazanyilmaz.net/admin/` adresine gidin → **Login with GitHub** → reponuza erişim izni verin. Artık panelden:
- Her sayfanın metinlerini düzenleyebilir,
- Kart/proje/deneyim öğesi ekleyip çıkarabilir,
- Görsel yükleyip kartlara veya profil fotoğrafına ekleyebilirsiniz.

Kaydettiğiniz her değişiklik doğrudan GitHub reponuza commit olarak düşer ve site birkaç dakika içinde güncellenir.

**Not:** Panele yalnızca reponuza yazma izni olan GitHub hesapları (yani sizin hesabınız) giriş yapabilir — başka biri giremez.
