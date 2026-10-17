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
    father: "Ông Nguyễn Văn A",
    mother: "Bà Trần Thị B",
  },
  bride: {
    name: "Thùy Vân",
    fullName: "Thùy Vân",
    photo: "images/bride.jpg",
    bio: "Cô gái nhỏ yêu hoa, yêu những chuyến đi và đã nói “đồng ý” với người con trai ấy.",
    father: "Ông Lê Văn C",
    mother: "Bà Phạm Thị D",
  },

  // Ngày giờ hôn lễ (giờ Việt Nam). Định dạng: YYYY-MM-DDTHH:mm:ss+07:00
  date: "2026-04-04T17:30:00+07:00",
  lunarDate: "", // ví dụ: "Tức ngày 17 tháng 02 năm Bính Ngọ" (để trống nếu không dùng)

  venue: {
    name: "Tư gia nhà trai",
    address: "42 Đường 9, Tập Thể F361 An Dương, Tây Hồ, Hà Nội",
    // Link Google Maps (mở khi bấm "Chỉ đường")
    mapUrl: "https://www.google.com/maps/search/?api=1&query=42+%C4%90%C6%B0%E1%BB%9Dng+9+T%E1%BA%ADp+Th%E1%BB%83+F361+An+D%C6%B0%C6%A1ng+T%C3%A2y+H%E1%BB%93+H%C3%A0+N%E1%BB%99i",
    // Link nhúng bản đồ (Google Maps → Chia sẻ → Nhúng bản đồ → copy phần src). Để "" nếu không muốn hiện bản đồ
    mapEmbed: "https://www.google.com/maps?q=42+%C4%90%C6%B0%E1%BB%9Dng+9+T%E1%BA%ADp+Th%E1%BB%83+F361+An+D%C6%B0%C6%A1ng+T%C3%A2y+H%E1%BB%93+H%C3%A0+N%E1%BB%99i&output=embed",
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

  // Chuyện tình yêu (có thể xoá bớt)
  story: [
    { date: "2019", title: "Lần đầu gặp gỡ", text: "Một buổi chiều Hà Nội, hai đứa vô tình ngồi cùng bàn trong quán cà phê quen." },
    { date: "2021", title: "Chính thức hẹn hò", text: "Sau rất nhiều tin nhắn “ngủ ngon”, anh đã lấy hết can đảm để ngỏ lời." },
    { date: "2025", title: "Lời cầu hôn", text: "Chiếc nhẫn nhỏ và một câu hỏi lớn — em đã gật đầu." },
  ],

  timeline: [
    { time: "16:30", label: "Đón khách" },
    { time: "17:30", label: "Lễ Thành Hôn" },
    { time: "18:00", label: "Khai tiệc" },
    { time: "19:00", label: "Giao lưu & Tiệc mừng" },
  ],

  dresscode: {
    note: "Rất vui nếu bạn diện trang phục theo tông màu dưới đây",
    colors: ["#FFFFFF", "#E8E2D8", "#8F7964", "#3A3333", "#111111"],
  },

  // Hộp mừng cưới — ảnh QR đặt trong images/qr-*.png
  gifts: [
    { owner: "Chú rể", bank: "Vietcombank", account: "0123456789", holder: "HOANG LONG", qr: "images/qr-groom.png" },
    { owner: "Cô dâu", bank: "Techcombank", account: "9876543210", holder: "THUY VAN", qr: "images/qr-bride.png" },
  ],

  music: "music/song.mp3", // nhạc nền (để "" nếu không dùng)

  // Lưu RSVP + lời chúc vào Google Sheets (xem README, mục "Kết nối Google Sheets").
  // Để "" thì form vẫn chạy nhưng lời chúc chỉ lưu trên máy người gửi.
  sheetApi: "",
};
