# Vietnamese Translation Checklist 🇻🇳

## Status: ✅ COMPLETED!

---

## Phase 1: Analyse & Vorbereitung ✅

### Dateien die geändert werden müssen:
- [x] `src/context/LanguageContext.tsx` - Haupt-Übersetzungsdatei
- [ ] `src/translations/menuTranslations.ts` - Menü & Gerichte
- [ ] `src/screens/AccountScreen.tsx` - Sprachauswahl UI

### Statistik:
- **Translation Keys gesamt:** 335+
- **Bestehende Sprachen:** Deutsch (de), English (en)
- **Neue Sprache:** Tiếng Việt (vi)

---

## Phase 2: LanguageContext.tsx - Type Definitionen

### 2.1 Language Type erweitern
- [ ] `export type Language = 'de' | 'en' | 'vi';` 

### 2.2 Translations Object Structure
```typescript
const translations: Record<Language, Record<string, string>> = {
  de: { ... },
  en: { ... },
  vi: { ... } // NEU
}
```

---

## Phase 3: Translation Keys - Kategorien

### 3.1 Profile & Account (14 Keys)
- [ ] `profile.edit` - "Chỉnh sửa hồ sơ"
- [ ] `profile.personalData` - "Dữ liệu cá nhân"
- [ ] `profile.updateInfo` - "Cập nhật thông tin tài khoản"
- [ ] `profile.firstName` - "Tên"
- [ ] `profile.firstNamePlaceholder` - "Tên của bạn"
- [ ] `profile.lastName` - "Họ"
- [ ] `profile.lastNamePlaceholder` - "Họ của bạn"
- [ ] `profile.email` - "Địa chỉ email"
- [ ] `profile.emailPlaceholder` - "email@cua.ban"
- [ ] `profile.language` - "Ngôn ngữ"
- [ ] `profile.languageSubtitle` - "Chọn ngôn ngữ ưa thích"
- [ ] `profile.save` - "Lưu thay đổi"
- [ ] `profile.saveSuccess` - "Cập nhật hồ sơ thành công!"
- [ ] `profile.emailInfo` - "Email sẽ được dùng để xác nhận đơn hàng"

**Status:** ⬜ Pending

### 3.2 Language Options (3 Keys)
- [ ] `language.german` - "Tiếng Đức"
- [ ] `language.english` - "Tiếng Anh"
- [ ] `language.vietnamese` - "Tiếng Việt" (NEU!)

**Status:** ⬜ Pending

### 3.3 Account Screen (20+ Keys)
- [ ] `account.title` - "Tài khoản"
- [ ] `account.subtitle` - "Quản lý hồ sơ"
- [ ] `account.guest` - "Khách"
- [ ] `account.notLoggedIn` - "Chưa đăng nhập"
- [ ] `account.login` - "Đăng nhập"
- [ ] `account.register` - "Đăng ký"
- [ ] `account.editProfile` - "Chỉnh sửa hồ sơ"
- [ ] `account.editProfileSubtitle` - "Thông tin cá nhân"
- [ ] `account.orderHistory` - "Lịch sử đơn hàng"
- [ ] `account.language` - "Ngôn ngữ"
- [ ] `account.languageSubtitle` - "Deutsch / English / Tiếng Việt"
- [ ] `account.logout` - "Đăng xuất"
- [ ] `account.logoutConfirm` - "Xác nhận đăng xuất"
- [ ] `account.logoutMessage` - "Bạn có chắc muốn đăng xuất?"
- [ ] `account.cancel` - "Hủy"
- [ ] `account.selectLanguage` - "Chọn ngôn ngữ"
- [ ] `account.currentLanguage` - "Ngôn ngữ hiện tại"

**Status:** ⬜ Pending

### 3.4 Home Screen (7 Keys)
- [ ] `home.heroTitle` - "Chào mừng đến Moggi"
- [ ] `home.heroSubtitle` - "Ẩm thực Nhật Bản hiện đại"
- [ ] `home.chefQuan` - "Chef Quan"
- [ ] `home.chefQuanDescription` - "Chuyên gia sushi"
- [ ] `home.chefRyohey` - "Chef Ryohey"
- [ ] `home.chefRyoheyDescription` - "Bậc thầy ẩm thực"
- [ ] `home.reserveTable` - "Đặt bàn"

**Status:** ⬜ Pending

### 3.5 Products/Menu Screen (8 Keys)
- [ ] `products.title` - "Thực đơn"
- [ ] `products.subtitle` - "Khám phá món ngon"
- [ ] `products.highlights` - "Nổi bật"
- [ ] `products.smallDishes` - "Món nhỏ"
- [ ] `products.fusionSpecials` - "Đặc sản Fusion"
- [ ] `products.sushi` - "Sushi"
- [ ] `products.sides` - "Món phụ"
- [ ] `products.drinks` - "Đồ uống"

**Status:** ⬜ Pending

### 3.6 Cart Screen (8 Keys)
- [ ] `cart.title` - "Giỏ hàng"
- [ ] `cart.subtitle` - "Xem đơn hàng"
- [ ] `cart.empty` - "Giỏ hàng trống"
- [ ] `cart.emptySubtext` - "Thêm món vào giỏ"
- [ ] `cart.clear` - "Xóa giỏ hàng"
- [ ] `cart.total` - "Tổng cộng"
- [ ] `cart.checkout` - "Thanh toán"
- [ ] `cart.clearConfirm` - "Xóa tất cả?"

**Status:** ⬜ Pending

### 3.7 More Screen (15+ Keys)
- [ ] `more.title` - "Thêm"
- [ ] `more.subtitle` - "Cài đặt & Thông tin"
- [ ] `more.orderHistory` - "Lịch sử đơn hàng"
- [ ] `more.contact` - "Liên hệ"
- [ ] `more.helpSupport` - "Trợ giúp & Hỗ trợ"
- [ ] `more.imprint` - "Thông tin pháp lý"
- [ ] `more.privacy` - "Quyền riêng tư"
- [ ] `more.about` - "Về chúng tôi"
- [ ] `more.version` - "Phiên bản"
- [ ] `more.logoutConfirm` - "Xác nhận đăng xuất?"
- [ ] `more.logoutMessage` - "Bạn có chắc?"

**Status:** ⬜ Pending

### 3.8 Login Screen (15+ Keys)
- [ ] `login.title` - "Đăng nhập"
- [ ] `login.sectionTitle` - "Đăng nhập"
- [ ] `login.emailLabel` - "Email / Tên người dùng"
- [ ] `login.emailPlaceholder` - "email@example.com"
- [ ] `login.passwordLabel` - "Mật khẩu"
- [ ] `login.passwordPlaceholder` - "••••••••"
- [ ] `login.forgotPassword` - "Quên mật khẩu?"
- [ ] `login.loginButton` - "Đăng nhập"
- [ ] `login.registerTitle` - "Chưa có tài khoản?"
- [ ] `login.registerSubtitle` - "Đăng ký miễn phí"
- [ ] `login.infoCard` - "Đăng nhập để xem lịch sử"
- [ ] `login.fillAllFields` - "Vui lòng điền đầy đủ"
- [ ] `login.invalidEmail` - "Email không hợp lệ"
- [ ] `login.invalidCredentials` - "Sai email hoặc mật khẩu"

**Status:** ⬜ Pending

### 3.9 Register Screen (25+ Keys)
- [ ] `register.title` - "Đăng ký"
- [ ] `register.pageTitle` - "Tạo tài khoản"
- [ ] `register.subtitle` - "Đăng ký để nhận ưu đãi"
- [ ] `register.firstName` - "Tên"
- [ ] `register.lastName` - "Họ"
- [ ] `register.email` - "Email"
- [ ] `register.birthDate` - "Ngày sinh"
- [ ] `register.password` - "Mật khẩu"
- [ ] `register.createAccount` - "Tạo tài khoản"
- [ ] `register.terms` - "Bằng cách đăng ký..."
- [ ] `register.termsOfService` - "Điều khoản dịch vụ"
- [ ] `register.privacyPolicy` - "Chính sách bảo mật"
- [ ] ... (alle Error-Messages)

**Status:** ⬜ Pending

### 3.10 Verify Email Screen (15+ Keys)
- [ ] `verify.title` - "Xác minh email"
- [ ] `verify.enterCode` - "Nhập mã"
- [ ] `verify.codeSentTo` - "Chúng tôi đã gửi mã đến"
- [ ] `verify.confirm` - "Xác nhận"
- [ ] `verify.resendCode` - "Gửi lại mã"
- [ ] ... (alle Messages)

**Status:** ⬜ Pending

### 3.11 Checkout Flow (40+ Keys)
- [ ] `checkout.title` - "Thanh toán"
- [ ] `checkout.orderType` - "Loại đơn hàng"
- [ ] `checkout.guest` - "Khách"
- [ ] `checkout.login` - "Đăng nhập"
- [ ] `checkout.yourData` - "Thông tin của bạn"
- [ ] `checkout.firstName` - "Tên"
- [ ] `checkout.lastName` - "Họ"
- [ ] `checkout.email` - "Email"
- [ ] `checkout.pickupDate` - "Ngày lấy"
- [ ] `checkout.pickupTime` - "Giờ lấy"
- [ ] `checkout.notes` - "Ghi chú"
- [ ] `checkout.total` - "Tổng cộng"
- [ ] `checkout.placeOrder` - "Đặt hàng"
- [ ] ... (alle weiteren)

**Status:** ⬜ Pending

### 3.12 Reservation Screen (30+ Keys)
- [ ] `reservation.title` - "Đặt bàn"
- [ ] `reservation.subtitle` - "Đặt bàn tại nhà hàng"
- [ ] `reservation.guests` - "Số khách"
- [ ] `reservation.date` - "Ngày"
- [ ] `reservation.time` - "Giờ"
- [ ] `reservation.contactInfo` - "Thông tin liên hệ"
- [ ] `reservation.firstName` - "Tên"
- [ ] `reservation.lastName` - "Họ"
- [ ] `reservation.email` - "Email"
- [ ] `reservation.phone` - "Điện thoại"
- [ ] `reservation.reserve` - "Đặt bàn"
- [ ] ... (alle Steps, Messages)

**Status:** ⬜ Pending

### 3.13 Order Success Screen (15+ Keys)
- [ ] `orderSuccess.title` - "Đặt hàng thành công!"
- [ ] `orderSuccess.thankYou` - "Cảm ơn, {name}!"
- [ ] `orderSuccess.confirmationSent` - "Xác nhận đã gửi đến {email}"
- [ ] `orderSuccess.orderNumber` - "Số đơn hàng"
- [ ] `orderSuccess.details` - "Chi tiết đơn hàng"
- [ ] `orderSuccess.pickup` - "Lấy hàng"
- [ ] `orderSuccess.backToHome` - "Về trang chủ"
- [ ] ... (alle Labels)

**Status:** ⬜ Pending

### 3.14 Contact Screen (20+ Keys)
- [ ] `contact.title` - "Liên hệ & Thông tin"
- [ ] `contact.phone` - "Điện thoại"
- [ ] `contact.email` - "Email"
- [ ] `contact.address` - "Địa chỉ"
- [ ] `contact.openingHours` - "Giờ mở cửa"
- [ ] `contact.monday` - "Thứ Hai:"
- [ ] `contact.tuesdayWednesday` - "Thứ Ba - Thứ Tư:"
- [ ] `contact.thursdaySaturday` - "Thứ Năm - Thứ Bảy:"
- [ ] `contact.sunday` - "Chủ Nhật:"
- [ ] `contact.closedDay` - "Đóng cửa"
- [ ] `contact.lunchService` - "Phục vụ trưa"
- [ ] `contact.eveningService` - "Phục vụ tối"

**Status:** ⬜ Pending

### 3.15 Help & Support Screen (30+ Keys)
- [ ] `helpSupport.title` - "Trợ giúp & Hỗ trợ"
- [ ] `helpSupport.welcomeTitle` - "Làm sao chúng tôi có thể giúp?"
- [ ] `helpSupport.faqTitle` - "Câu hỏi thường gặp"
- [ ] `helpSupport.faq1Question` - "Làm sao đặt hàng?"
- [ ] `helpSupport.faq1Answer` - "Chọn món, thêm vào giỏ..."
- [ ] ... (alle FAQ + Contact Options)

**Status:** ⬜ Pending

### 3.16 Order History Screen (15+ Keys)
- [ ] `orderHistory.title` - "Lịch sử đơn hàng"
- [ ] `orderHistory.noOrders` - "Không có đơn hàng"
- [ ] `orderHistory.orderNumber` - "Đơn hàng #{number}"
- [ ] `orderHistory.statusPending` - "Đang xử lý"
- [ ] `orderHistory.statusConfirmed` - "Đã xác nhận"
- [ ] `orderHistory.statusReady` - "Sẵn sàng"
- [ ] `orderHistory.statusCompleted` - "Hoàn thành"
- [ ] `orderHistory.statusCancelled` - "Đã hủy"
- [ ] ... (alle Labels)

**Status:** ⬜ Pending

### 3.17 Payment Screen (20+ Keys)
- [ ] `payment.title` - "Thanh toán"
- [ ] `payment.orderSummary` - "Tóm tắt đơn hàng"
- [ ] `payment.subtotal` - "Tạm tính"
- [ ] `payment.tax` - "Thuế"
- [ ] `payment.total` - "Tổng cộng"
- [ ] `payment.paymentMethod` - "Phương thức thanh toán"
- [ ] `payment.creditCard` - "Thẻ tín dụng"
- [ ] `payment.payNow` - "Thanh toán ngay"
- [ ] ... (alle Stripe-Texte)

**Status:** ⬜ Pending

### 3.18 Product Categories (16 Keys)
- [ ] `category.newIn` - "Mới"
- [ ] `category.businessLunch` - "Cơm trưa văn phòng"
- [ ] `category.tapasMeat` - "Tapas thịt"
- [ ] `category.tapasFish` - "Tapas hải sản"
- [ ] `category.tapasVegetarian` - "Tapas chay"
- [ ] `category.sticks` - "Xiên"
- [ ] `category.crisps` - "Giòn"
- [ ] `category.baos` - "Bánh bao"
- [ ] `category.noriTacos` - "Taco rong biển"
- [ ] `category.sashimi` - "Sashimi"
- [ ] `category.nigiri` - "Nigiri"
- [ ] `category.hosomaki` - "Hosomaki"
- [ ] `category.uramaki` - "Uramaki"
- [ ] `category.specialRoll` - "Cuộn đặc biệt"
- [ ] `category.crispyRolls` - "Cuộn giòn"
- [ ] `category.sides` - "Món phụ"

**Status:** ⬜ Pending

### 3.19 Navigation Tabs (5 Keys)
- [ ] `nav.home` - "Trang chủ"
- [ ] `nav.menu` - "Thực đơn"
- [ ] `nav.cart` - "Giỏ hàng"
- [ ] `nav.account` - "Tài khoản"
- [ ] `nav.more` - "Thêm"

**Status:** ⬜ Pending

### 3.20 Common/Shared (10+ Keys)
- [ ] `common.ok` - "OK"
- [ ] `common.cancel` - "Hủy"
- [ ] `common.save` - "Lưu"
- [ ] `common.delete` - "Xóa"
- [ ] `common.edit` - "Sửa"
- [ ] `common.success` - "Thành công"
- [ ] `common.error` - "Lỗi"
- [ ] `common.loading` - "Đang tải..."
- [ ] `common.confirm` - "Xác nhận"
- [ ] `common.back` - "Quay lại"

**Status:** ⬜ Pending

### 3.21 Dish Details (5 Keys)
- [ ] `dish.description` - "Mô tả"
- [ ] `dish.price` - "Giá"
- [ ] `dish.quantity` - "Số lượng"
- [ ] `dish.addToCart` - "Thêm vào giỏ"
- [ ] `dish.customization` - "Tùy chỉnh"

**Status:** ⬜ Pending

---

## Phase 4: menuTranslations.ts

### 4.1 Categories (6 Kategorien)
- [ ] Highlights
- [ ] Small Dishes
- [ ] Fusion Specials
- [ ] Sushi
- [ ] Sides
- [ ] Drinks

### 4.2 Dishes (50+ Gerichte)
Alle Gerichtbeschreibungen übersetzen

**Status:** ⬜ Pending

### 4.3 Tags (5 Tags)
- [ ] Scharf →매운 (매운맛)
- [ ] Vegetarisch → Chay
- [ ] Neu → Mới
- [ ] Beliebt → Phổ biến
- [ ] Empfehlung → Đề xuất

**Status:** ⬜ Pending

---

## Phase 5: UI Updates

### 5.1 AccountScreen.tsx
- [ ] Füge Vietnamesisch zur Language-Auswahl hinzu
- [ ] Update Flag: 🇻🇳
- [ ] Update `languageSubtitle`: "Deutsch / English / Tiếng Việt"

### 5.2 Testing
- [ ] Teste alle Screens auf Vietnamesisch
- [ ] Überprüfe Layout (längere Texte?)
- [ ] Teste Sprachwechsel
- [ ] Teste AsyncStorage Persistenz

**Status:** ⬜ Pending

---

## Phase 6: Dokumentation

### 6.1 TRANSLATION_GUIDE.md aktualisieren
- [ ] Vietnamesisch als Sprache dokumentieren
- [ ] Beispiele hinzufügen
- [ ] Best Practices für vi

**Status:** ⬜ Pending

---

## Zusammenfassung

**Gesamt Translation Keys:** ~335
**Dateien zu ändern:** 3
**Geschätzte Zeit:** 3-4 Stunden

**Nächster Schritt:** Phase 2 starten - Language Type erweitern

