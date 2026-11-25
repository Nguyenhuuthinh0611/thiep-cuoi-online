/* =========================================================
   CẤU HÌNH THIỆP CƯỚI — chỉ cần sửa file này
   (tên, ngày giờ, địa điểm, ảnh, nhạc, tài khoản mừng cưới...)
   ========================================================= */
window.WEDDING = {
  groom: {
    name: "Hoàng Long",
    fullName: "Hoàng Long",
    photo: "images/groom.jpg",
    bio: "Một chàng trai hiền lành, thích công nghệ và luôn tin rằng điều tuyệt vời nhất đời mình là gặp được em.",
    father: "Ông Hoàng Bình",
    mother: "Bà Nguyễn Giáng Hương",
  },
  bride: {
    name: "Thùy Vân",
    fullName: "Thùy Vân",
    photo: "images/bride.jpg",
    bio: "Cô gái nhỏ yêu hoa, yêu những chuyến đi và đã nói “đồng ý” với người con trai ấy.",
    father: "Ông Nguyễn Châu Hiệp",
    mother: "Bà Võ Thị Tuyết",
  },

  // Ngày giờ hôn lễ (giờ Việt Nam). Định dạng: YYYY-MM-DDTHH:mm:ss+07:00
  date: "2026-12-05T18:00:00+07:00",
  lunarDate: "", // ví dụ: "Tức ngày 17 tháng 02 năm Bính Ngọ" (để trống nếu không dùng)

  venue: {
    name: "Thảo Viên - Botanic Garden",
    address: "Số 2, Ngõ 31 Hoàng Cầu, Hà Nội",
    // Link Google Maps (mở khi bấm "Chỉ đường")
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Th%E1%BA%A3o+Vi%C3%AAn+Botanic+Garden%2C+S%E1%BB%91+2+Ng%C3%B5+31+Ho%C3%A0ng+C%E1%BA%A7u%2C+H%C3%A0+N%E1%BB%99i",
    // Link nhúng bản đồ (Google Maps → Chia sẻ → Nhúng bản đồ → copy phần src). Để "" nếu không muốn hiện bản đồ
    mapEmbed: "https://www.google.com/maps?q=Th%E1%BA%A3o+Vi%C3%AAn+Botanic+Garden%2C+S%E1%BB%91+2+Ng%C3%B5+31+Ho%C3%A0ng+C%E1%BA%A7u%2C+H%C3%A0+N%E1%BB%99i&output=embed",
  },

  invitation: "Bạn và người thương đến dự buổi tiệc chung vui cùng gia đình chúng tôi",

  coverPhoto: "images/cover.jpg",   // ảnh bìa lớn
  savePhoto: "images/save-the-date.jpg",
  thankPhoto: "images/thank-you.jpg",

  // Album: thêm/bớt tuỳ ý (đặt ảnh vào thư mục images/album/)
  album: [
    "images/album/01.jpg",
    "images/album/02.jpg",
    "images/album/03.jpg",
    "images/album/04.jpg",
    "images/album/05.jpg",
    "images/album/06.jpg",
    "images/album/07.jpg",
    "images/album/08.jpg",
    "images/album/09.jpg",
    "images/album/10.jpg",
    "images/album/11.jpg",
    "images/album/12.jpg",
    "images/album/13.jpg",
    "images/album/14.jpg",
    "images/album/15.jpg",
    "images/album/16.jpg",
    "images/album/17.jpg",
    "images/album/18.jpg",
    "images/album/19.jpg",
    "images/album/20.jpg",
    "images/album/21.jpg",
    "images/album/22.jpg",
    "images/album/23.jpg",
    "images/album/24.jpg",
    "images/album/25.jpg",
  ],

  // Chuyện tình yêu (để [] thì không hiện)
  story: [],

  timeline: [
    { time: "17:30", label: "Đón khách" },
    { time: "18:00", label: "Khai tiệc báo hỷ" },
    { time: "19:00", label: "Giao lưu & Tiệc mừng" },
  ],

  dresscode: {
    note: "Rất vui nếu bạn diện trang phục theo tông màu dưới đây",
    colors: ["#FFFFFF", "#E8E2D8", "#8F7964", "#3A3333", "#111111"],
  },

  // Hộp mừng cưới — ảnh QR đặt trong images/qr-*.png
  gifts: [
    { owner: "Chú rể", bank: "Techcombank", account: "2206 9488 889", holder: "HOANG LONG", qr: "images/qr-hoanglong.png" },
  ],

  music: "music/song.mp3", // nhạc nền (để "" nếu không dùng)

  // Lưu RSVP + lời chúc vào Google Sheets (xem README, mục "Kết nối Google Sheets").
  // Để "" thì form vẫn chạy nhưng lời chúc chỉ lưu trên máy người gửi.
  sheetApi: "https://script.google.com/macros/s/AKfycbz1frUvc15KV6fSTncYiqvCzRDDzDoXZDdiqohVlZFDgTdSUf4I9aNtGlwhhMAdUW5N/exec",
};
