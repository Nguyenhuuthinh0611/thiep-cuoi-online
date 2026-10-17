# 💍 Thiệp cưới online — Hoàng Long & Thùy Vân

Web tĩnh thuần HTML/CSS/JS, **không cần build, không cần cài gì**. Deploy miễn phí lên GitHub Pages hoặc Cloudflare Pages.

## Cấu trúc

```
thiep-cuoi/
├── index.html              # Khung trang
├── css/style.css           # Giao diện (màu, font, hiệu ứng)
├── js/config.js            # ⭐ NỘI DUNG — chỉ cần sửa file này
├── js/main.js              # Logic (đếm ngược, album, RSVP...)
├── images/                 # Ảnh cưới (đang là ảnh tạm)
│   ├── cover.jpg           # Ảnh bìa — dọc, ~1080x1920
│   ├── groom.jpg / bride.jpg   # Chân dung — dọc 3:4
│   ├── save-the-date.jpg / thank-you.jpg
│   ├── og-image.jpg        # Ảnh hiện khi gửi link Zalo/Messenger (1200x630)
│   ├── qr-groom.png / qr-bride.png   # QR chuyển khoản
│   └── album/01.jpg ...    # Album (thêm bao nhiêu cũng được, khai báo trong config.js)
├── music/song.mp3          # Nhạc nền (tự thêm)
└── google-apps-script/Code.gs  # (tuỳ chọn) lưu RSVP vào Google Sheets
```

## 1. Mở & chạy thử trên VS Code

1. VS Code → **File → Open Folder…** → chọn thư mục `thiep-cuoi`.
2. Cài extension **Live Server** (VS Code sẽ gợi ý sẵn).
3. Chuột phải `index.html` → **Open with Live Server** → trình duyệt mở `http://127.0.0.1:5500`.

## 2. Thay nội dung & ảnh

- Sửa tên, tên bố mẹ, ngày giờ, địa chỉ, số tài khoản… trong **`js/config.js`**.
- Thay ảnh: chép ảnh thật **đè lên đúng tên file** trong `images/` (hoặc đổi đường dẫn trong config).
- **Nén ảnh trước khi đưa lên** (mỗi ảnh nên < 500KB, rộng ~1200px) để khách mở bằng 4G cho nhanh — dùng https://squoosh.app hoặc https://tinypng.com.
- Thêm nhạc: chép file vào `music/song.mp3`.

## 3. Đưa lên GitHub

```bash
cd thiep-cuoi
git init
git add .
git commit -m "Thiệp cưới online"
git branch -M main
git remote add origin https://github.com/<username>/thiep-cuoi.git   # tạo repo trống trên github.com trước
git push -u origin main
```

## 4a. Deploy GitHub Pages (đơn giản nhất)

1. Repo trên GitHub → **Settings → Pages**.
2. *Source*: **Deploy from a branch** → Branch **main**, thư mục **/ (root)** → **Save**.
3. Đợi 1–2 phút, link sẽ là: `https://<username>.github.io/thiep-cuoi/`

> Muốn link gọn `https://<username>.github.io` → đặt tên repo là `<username>.github.io`.

## 4b. Deploy Cloudflare Pages (nhanh hơn ở VN, link đẹp hơn)

1. Vào https://dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**.
2. Chọn repo `thiep-cuoi`.
3. *Framework preset*: **None** · *Build command*: **để trống** · *Build output directory*: **/** → **Save and Deploy**.
4. Link: `https://thiep-cuoi.pages.dev` (đổi tên project để có link như `huuthinh-minhtrang.pages.dev`).

Mỗi lần `git push`, cả hai nền tảng tự cập nhật lại web.

## 5. (Tuỳ chọn) Kết nối Google Sheets để nhận RSVP + lời chúc

Nếu bỏ qua bước này, form vẫn hoạt động nhưng lời chúc chỉ lưu trên máy người gửi — bạn sẽ **không** nhận được.

1. Tạo 1 Google Sheet mới → **Tiện ích mở rộng → Apps Script**.
2. Xoá code mẫu, dán toàn bộ nội dung `google-apps-script/Code.gs` → Lưu.
3. **Triển khai → Tùy chọn triển khai mới** → loại **Ứng dụng web**
   - *Thực thi dưới dạng*: **Tôi**
   - *Người có quyền truy cập*: **Bất kỳ ai**
4. Cấp quyền → copy **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).
5. Dán vào `sheetApi: "..."` trong `js/config.js` → commit & push.

Danh sách khách xác nhận sẽ hiện trong tab **RSVP** của Sheet. Số điện thoại chỉ bạn xem được, không hiện trên web.

## Lưu ý

- Ảnh `og-image.jpg`: sau khi có link thật, sửa thẻ `og:image` trong `index.html` thành URL đầy đủ (hiện đang là `https://hoanglong-thuyvan.pages.dev/images/og-image.jpg`; nếu đổi tên miền thì sửa lại) để Zalo/Facebook hiện ảnh xem trước.
- Số tài khoản ngân hàng sẽ công khai với ai có link — chỉ gửi link cho người quen.
