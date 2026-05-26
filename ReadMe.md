# SocialMedia
## Công Nghệ Sử Dụng
- Next.js App Router `16.2.6`
- TypeScript
- Tailwind CSS `4`
- Lucide React cho toàn bộ biểu tượng
## Trạng Thái Hoàn Thành Yêu Cầu
### Chức Năng Bắt Buộc
- Giao diện video dọc: Mỗi video chiếm khu vực hiển thị feed, trên desktop video được căn giữa theo tỷ lệ dọc `9:16`.
- Cuộn từng video: Feed dùng CSS Scroll Snap với `snap-y`, `snap-mandatory` & `snap-start`.
- Video card: Hiển thị video, tên tác giả, mô tả, nút Like, Comments & Share ở bên phải.
- Play/Pause bằng click: Người dùng click trực tiếp vào video để phát hoặc tạm dừng.
- Mock data: Có `3` video tĩnh, mỗi video bao gồm `id`, `videoUrl`, `authorName`, `description`, `likesCount` & dữ liệu phụ trợ.
### Chức Năng Điểm Cộng
- Auto Play/Pause khi cuộn bằng `IntersectionObserver`.
- Nút Like đổi màu đỏ & tăng/giảm số lượng Like.
- Sidebar trên desktop & Bottom Navigation trên mobile.
### Chức Năng Mở Rộng
- Tìm kiếm video trên Home & Discover.
- Mở Comments Panel, đăng bình luận trong phiên hiện tại.
- Share sao chép link tới video đang chọn.
- Notifications chỉ theo dõi hành động Like & Comment thực tế trong phiên.
- Settings bao gồm Light/Dark Mode & Activity History có thể click quay lại video.
- Profile có thể chỉnh sửa & lưu tạm trong phiên.
## Logic Play/Pause Khi Cuộn Trang
Mỗi `VideoCard` giữ tham chiếu tới thẻ `<video>` bằng `useRef<HTMLVideoElement>`. Khi người dùng click vào video, hàm xử lý kiểm tra `player.paused`: nếu video đang dừng thì gọi `player.play()`, nếu video đang phát thì gọi `player.pause()`.
Tự động phát & dừng khi cuộn được xử lý bằng `IntersectionObserver` trong `useEffect`. Observer theo dõi chính thẻ video với ngưỡng hiển thị `0.7`. Khi video nằm trong viewport từ `70%` trở lên, ứng dụng gọi `play()` ở chế độ `muted` để phù hợp với chính sách autoplay của trình duyệt. Khi video không còn đạt ngưỡng hiển thị, ứng dụng gọi `pause()`.
Sự kiện native `onPlay` & `onPause` đồng bộ state giao diện với trạng thái thật của video, nhờ đó nút Play phủ giữa video chỉ xuất hiện khi video đang dừng.
## Chạy Dự Án
```bash
npm install
npm run dev
```
Mở `http://localhost:3000` trên trình duyệt!
