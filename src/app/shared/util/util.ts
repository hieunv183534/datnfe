export class Util {
  static getDateTime(d: Date) {
    return `${formatNumber(d.getDate())}/${formatNumber(d.getMonth() + 1)}/${formatNumber(d.getFullYear())} ${formatNumber(d.getHours())}:${formatNumber(d.getMinutes())}`;
  }

  static getDate(d: Date) {
    return `${formatNumber(d.getDate())}/${formatNumber(d.getMonth() + 1)}/${formatNumber(d.getFullYear())}`;
  }

  static getAge(birthday: any) {
    birthday = new Date(birthday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}

function formatNumber(n: any) {
  if (n >= 10)
    return n;
  else
    return '0' + n;
}

export class DataPointDto {

  /**
   *
   */
  constructor(_name: string, _value: number, _enName: string = "") {
    this.name = _name;
    this.value = _value;
    this.enName = _enName;
  }

  name?: string;
  value?: number;
  enName?: string;
}

export class UniversitySpecialized {

  /**
   *
   */
  constructor(_universityName?: string, _specializeds?: string[]) {
    this.universityName = _universityName;
    this.specializeds = _specializeds;
  }

  universityName?: string;
  specializeds?: string[];
}



export class FsiValues {

  static getName(value: number, arr: DataPointDto[]) {
    return arr.find(x => x?.value == value)?.name;
  }

  static getMultiName(values: number[], arr: DataPointDto[]) {
    return arr.filter(x => values?.includes(x.value ?? 0)).map(x => x.name).join(', ');
  }
  static genders: DataPointDto[] = [
    new DataPointDto("Nam", 1),
    new DataPointDto("Nữ", 2),
    new DataPointDto("Không xác định", 3),
  ]
  static workTypes: DataPointDto[] = [
    new DataPointDto("Làm việc offline", 1),
    new DataPointDto("Làm việc từ xa", 2),
  ]
  static areas: DataPointDto[] = [
    new DataPointDto("Bắc Giang", 1, "BacGiang"),
    new DataPointDto("Bắc Kạn", 2, "BacKan"),
    new DataPointDto("Cao Bằng", 3, "CaoBang"),
    new DataPointDto("Hà Giang", 4, "HaGiang"),
    new DataPointDto("Lạng Sơn", 5, "LangSon"),
    new DataPointDto("Phú Thọ", 6, "PhuTho"),
    new DataPointDto("Quảng Ninh", 7, "QuangNinh"),
    new DataPointDto("Thái Nguyên", 8, "ThaiNguyen"),
    new DataPointDto("Tuyên Quang", 9, "TuyenQuang"),
    new DataPointDto("Yên Bái", 10, "YenBai"),
    new DataPointDto("Điện Biên", 11, "DienBien"),
    new DataPointDto("Hòa Bình", 12, "HoaBinh"),
    new DataPointDto("Lai Châu", 13, "LaiChau"),
    new DataPointDto("Sơn La", 14, "SonLa"),
    new DataPointDto("Bắc Ninh", 15, "BacNinh"),
    new DataPointDto("Hà Nam", 16, "HaNam"),
    new DataPointDto("Hà Nội", 17, "HaNoi"),
    new DataPointDto("Hải Dương", 18, "HaiDuong"),
    new DataPointDto("Hải Phòng", 19, "HaiPhong"),
    new DataPointDto("Hưng Yên", 20, "HungYen"),
    new DataPointDto("Nam Định", 21, "NamDinh"),
    new DataPointDto("Ninh Bình", 22, "NinhBinh"),
    new DataPointDto("Thái Bình", 23, "ThaiBinh"),
    new DataPointDto("Vĩnh Phúc", 24, "VinhPhuc"),
    new DataPointDto("Hà Tĩnh", 25, "HaTinh"),
    new DataPointDto("Nghệ An", 26, "NgheAn"),
    new DataPointDto("Quảng Bình", 27, "QuangBinh"),
    new DataPointDto("Thanh Hóa", 28, "ThanhHoa"),
    new DataPointDto("Bình Định", 29, "BinhDinh"),
    new DataPointDto("Đà Nẵng", 30, "DaNang"),
    new DataPointDto("Kon Tum", 31, "KonTum"),
    new DataPointDto("Quảng Nam", 32, "QuangNam"),
    new DataPointDto("Quảng Ngãi", 33, "QuangNgai"),
    new DataPointDto("Thừa Thiên Huế", 34, "ThuaThienHue"),
    new DataPointDto("Đắk Lắk", 35, "DakLak"),
    new DataPointDto("Đắk Nông", 36, "DakNong"),
    new DataPointDto("Gia Lai", 37, "GiaLai"),
    new DataPointDto("Khánh Hòa", 38, "KhanhHoa"),
    new DataPointDto("Lâm Đồng", 39, "LamDong"),
    new DataPointDto("Ninh Thuận", 40, "NinhThuan"),
    new DataPointDto("Phú Yên", 41, "PhuYen"),
    new DataPointDto("Quảng Trị", 42, "QuangTri"),
    new DataPointDto("Đồng Nai", 43, "DongNai"),
    new DataPointDto("Bà Rịa - Vũng Tàu", 44, "BaRiaVungTau"),
    new DataPointDto("Bình Thuận", 45, "BinhThuan"),
    new DataPointDto("Đồng Tháp", 46, "DongThap"),
    new DataPointDto("Bình Dương", 47, "BinhDuong"),
    new DataPointDto("Bình Phước", 48, "BinhPhuoc"),
    new DataPointDto("Thành phố Hồ Chí Minh", 49, "HoChiMinh"),
    new DataPointDto("Long An", 50, "LongAn"),
    new DataPointDto("Tiền Giang", 51, "TienGiang"),
    new DataPointDto("An Giang", 52, "AnGiang"),
    new DataPointDto("Bạc Liêu", 53, "BacLieu"),
    new DataPointDto("Bến Tre", 54, "BenTre"),
    new DataPointDto("Cà Mau", 55, "CaMau"),
    new DataPointDto("Hậu Giang", 56, "HauGiang"),
    new DataPointDto("Kiên Giang", 57, "KienGiang"),
    new DataPointDto("Sóc Trăng", 58, "SocTrang"),
    new DataPointDto("Tây Ninh", 59, "TayNinh"),
    new DataPointDto("Trà Vinh", 60, "TraVinh"),
    new DataPointDto("Vĩnh Long", 61, "VinhLong"),
    new DataPointDto("Cần Thơ", 62, "CanTho"),
    new DataPointDto("Đồng Tháp", 63, "DongThap")
  ];

  static specializies: DataPointDto[] = [
    new DataPointDto("Agency (Design/Development)", 1, "Design/Development"),
    new DataPointDto("Agency (Marketing/Advertising)", 2, "Marketing/Advertising"),
    new DataPointDto("Bán lẻ - Hàng tiêu dùng - FMCG", 3, "Retail/FMCG"),
    new DataPointDto("Bảo hiểm", 4, "Insurance"),
    new DataPointDto("Bảo trì / Sửa chữa", 5, "Maintenance/Repair"),
    new DataPointDto("Bất động sản", 6, "Real Estate"),
    new DataPointDto("Chứng khoán", 7, "Securities"),
    new DataPointDto("Cơ khí", 8, "Mechanical"),
    new DataPointDto("Cơ quan nhà nước", 9, "Government"),
    new DataPointDto("Du lịch", 10, "Tourism"),
    new DataPointDto("Dược phẩm / Y tế / Công nghệ sinh học", 11, "Pharmaceuticals/Healthcare/Biotechnology"),
    new DataPointDto("Điện tử / Điện lạnh", 12, "Electronics/Refrigeration"),
    new DataPointDto("Giải trí", 13, "Entertainment"),
    new DataPointDto("Giáo dục / Đào tạo", 14, "Education/Training"),
    new DataPointDto("In ấn / Xuất bản", 15, "Printing/Publishing"),
    new DataPointDto("Internet / Online", 16, "Internet/Online"),
    new DataPointDto("IT - Phần cứng", 17, "IT - Hardware"),
    new DataPointDto("IT - Phần mềm", 18, "IT - Software"),
    new DataPointDto("Kế toán / Kiểm toán", 19, "Accounting/Auditing"),
    new DataPointDto("Khác", 20, "Other"),
    new DataPointDto("Logistics - Vận tải", 21, "Logistics/Transportation"),
    new DataPointDto("Luật", 22, "Law"),
    new DataPointDto("Marketing / Truyền thông / Quảng cáo", 23, "Marketing/Communication/Advertising"),
    new DataPointDto("Môi trường", 24, "Environment"),
    new DataPointDto("Năng lượng", 25, "Energy"),
    new DataPointDto("Ngân hàng", 26, "Banking"),
    new DataPointDto("Nhà hàng / Khách sạn", 27, "Restaurant/Hotel"),
    new DataPointDto("Nhân sự", 28, "Human Resources"),
    new DataPointDto("Nông Lâm Ngư nghiệp", 29, "Agriculture/Fishery/Forestry"),
    new DataPointDto("Sản xuất", 30, "Manufacturing"),
    new DataPointDto("Tài chính", 31, "Finance"),
    new DataPointDto("Thiết kế / kiến trúc", 32, "Design/Architecture"),
    new DataPointDto("Thời trang", 33, "Fashion"),
    new DataPointDto("Thương mại điện tử", 34, "E-commerce"),
    new DataPointDto("Tổ chức phi lợi nhuận", 35, "Non-profit Organization"),
    new DataPointDto("Tự động hóa", 36, "Automation"),
    new DataPointDto("Tư vấn", 37, "Consulting"),
    new DataPointDto("Viễn thông", 38, "Telecommunications"),
    new DataPointDto("Xây dựng", 39, "Construction"),
    new DataPointDto("Xuất nhập khẩu", 40, "Import/Export"),
  ];

  static fields: DataPointDto[] = [
    new DataPointDto("Bao bì / In ấn / Dán nhãn", 1),
    new DataPointDto("Bán lẻ / Bán sỉ", 2),
    new DataPointDto("Bảo hiểm", 3),
    new DataPointDto("Bất Động Sản / Cho thuê", 4),
    new DataPointDto("Chuỗi cung ứng", 5),
    new DataPointDto("Chính phủ & NGO", 6),
    new DataPointDto("Chứng khoán", 7),
    new DataPointDto("Công nghệ bất động sản", 8),
    new DataPointDto("Công nghệ giáo dục", 9),
    new DataPointDto("Công nghệ tài chính", 10),
    new DataPointDto("Công nghệ y tế", 11),
    new DataPointDto("Cung cấp nhân lực", 12),
    new DataPointDto("Cơ khí / Máy móc / Thiết bị công nghiệp", 13),
    new DataPointDto("Dệt may / May mặc / Giày dép", 14),
    new DataPointDto("Dịch vụ Y tế / Chăm sóc sức khỏe", 15),
    new DataPointDto("Dịch vụ kho bãi", 16),
    new DataPointDto("Dịch vụ lưu trú / Nhà hàng / Khách sạn / Du lịch", 17),
    new DataPointDto("Dịch vụ môi trường / Chất thải", 18),
    new DataPointDto("Giáo dục / Đào tạo", 19),
    new DataPointDto("Hoá chất / Hoá sinh", 20),
    new DataPointDto("Hàng tiêu dùng", 21),
    new DataPointDto("Hậu cần / Giao nhận", 22),
    new DataPointDto("Hệ thống CNTT & Thiết bị", 23),
    new DataPointDto("Khai khoáng / Dầu khí", 24),
    new DataPointDto("Kiến trúc / Thiết kế nội thất", 25),
    new DataPointDto("Kế toán / Kiểm toán", 26),
    new DataPointDto("Kỹ thuật xây dựng / Cơ sở hạ tầng", 27),
    new DataPointDto("Làm đẹp (Mỹ phẩm) & Chăm sóc cá nhân", 28),
    new DataPointDto("Luật / Dịch vụ pháp lý", 29),
    new DataPointDto("Năng lượng và môi trường", 30),
    new DataPointDto("Nền tảng dịch vụ", 31),
    new DataPointDto("Nghiên cứu", 32),
    new DataPointDto("Nghệ thuật / Giải trí", 33),
    new DataPointDto("Ngân hàng", 34),
    new DataPointDto("Nhập khẩu / Xuất khẩu", 35),
    new DataPointDto("Nhựa & Cao su", 36),
    new DataPointDto("Nông nghiệp công nghệ cao", 37),
    new DataPointDto("Nội thất / Gỗ", 38),
    new DataPointDto("Phần Mềm CNTT / Dịch vụ Phần mềm", 39),
    new DataPointDto("Sản xuất", 40),
    new DataPointDto("Sản xuất và Phân phối Điện / Khí đốt / Nước", 41),
    new DataPointDto("Thiết bị y tế", 42),
    new DataPointDto("Thú y", 43),
    new DataPointDto("Thương mại điện tử", 44),
    new DataPointDto("Thời trang / Trang sức", 45),
    new DataPointDto("Truyền thông / Báo chí / Quảng cáo", 46),
    new DataPointDto("Tài chính", 47),
    new DataPointDto("Tự động hoá", 48),
    new DataPointDto("Viễn thông", 49),
    new DataPointDto("Vận tải", 50),
    new DataPointDto("Vật liệu xây dựng", 51),
    new DataPointDto("Ô tô", 52),
    new DataPointDto("Điện / Điện tử", 53),
  ];


  static purposes: DataPointDto[] = [
    new DataPointDto("Tôi đang có ý tưởng khởi nghiệp", 1, "Have Idea"),
    new DataPointDto("Tôi muốn tìm người có ý tưởng", 2, "Find People Have Idea"),
    new DataPointDto("Tôi đang tham gia dự án", 3, "Have Project"),
    new DataPointDto("Tôi muốn tham gia dự án", 4, "Find People Have Project"),
  ];

  static jobs: DataPointDto[] = [
    new DataPointDto("Học sinh/sinh viên", 1, "Student"),
    new DataPointDto("Giáo viên", 2, "Teacher"),
    new DataPointDto("Kỹ sư", 3, "Engineer"),
    new DataPointDto("Nhà nghiên cứu/khoa học", 4, "Researcher/Scientist"),
    new DataPointDto("Kinh doanh/buôn bán", 5, "Business/Entrepreneur"),
    new DataPointDto("Công viên chức", 6, "Civil Servant"),
    new DataPointDto("Khác", 0, "Other")
  ];

  static personalities: DataPointDto[] = [
    new DataPointDto("Cầu tiến", 1, "Progressive"),
    new DataPointDto("Cầu toàn", 2, "Meticulous"),
    new DataPointDto("Chuyên nghiệp", 3, "Professional"),
    new DataPointDto("Chăm chỉ", 4, "Diligent"),
    new DataPointDto("Chân thành", 5, "Sincere"),
    new DataPointDto("Chủ động", 6, "Proactive"),
    new DataPointDto("Chỉnh chu", 7, "Meticulous"),
    new DataPointDto("Cởi mở", 8, "Open-minded"),
    new DataPointDto("Dễ gần", 9, "Approachable"),
    new DataPointDto("Hài hước", 10, "Humorous"),
    new DataPointDto("Hòa đồng", 11, "Friendly"),
    new DataPointDto("Khéo léo", 12, "Skillful"),
    new DataPointDto("Kiên cường", 13, "Persistent"),
    new DataPointDto("Kỷ luật", 14, "Disciplined"),
    new DataPointDto("Lạc quan", 15, "Optimistic"),
    new DataPointDto("Lắng nghe", 16, "Attentive"),
    new DataPointDto("Linh hoạt", 17, "Flexible"),
    new DataPointDto("Mạnh mẽ", 18, "Strong"),
    new DataPointDto("Nghiêm túc", 19, "Serious"),
    new DataPointDto("Nhạy bén", 20, "Sharp"),
    new DataPointDto("Nhẫn nhịn", 21, "Patient"),
    new DataPointDto("Nhiệt huyết", 22, "Enthusiastic"),
    new DataPointDto("Nhiệt tình", 23, "Passionate"),
    new DataPointDto("Năng động", 24, "Energetic"),
    new DataPointDto("Năng nổ", 25, "Dynamite"),
    new DataPointDto("Quyết đoán", 26, "Decisive"),
    new DataPointDto("Quyết liệt", 27, "Determined"),
    new DataPointDto("Sáng suốt", 28, "Insightful"),
    new DataPointDto("Sáng tạo", 29, "Creative"),
    new DataPointDto("Táo bạo", 30, "Bold"),
    new DataPointDto("Tâm huyết", 31, "Passionate"),
    new DataPointDto("Thân thiện", 32, "Friendly"),
    new DataPointDto("Thẳng thắn", 33, "Frank"),
    new DataPointDto("Thích ứng", 34, "Adaptable"),
    new DataPointDto("Thực tế", 35, "Practical"),
    new DataPointDto("Tích cực", 36, "Positive"),
    new DataPointDto("Tỉ mỉ", 37, "Meticulous"),
    new DataPointDto("Tự lập", 38, "Independent"),
    new DataPointDto("Tự tin", 39, "Confident"),
    new DataPointDto("Tốt bụng", 40, "Kind-hearted"),
    new DataPointDto("Trách nhiệm", 41, "Responsible"),
    new DataPointDto("Trung thực", 42, "Honest"),
    new DataPointDto("Tập trung", 43, "Focused")
  ]

  static skills: DataPointDto[] = [
    new DataPointDto("Kỹ năng bán hàng", 1),
    new DataPointDto("Kỹ năng bán hàng online", 2),
    new DataPointDto("Kỹ năng chăm sóc khách hàng online", 3),
    new DataPointDto("Kỹ năng chăm sóc, duy trì mối quan hệ", 4),
    new DataPointDto("Kỹ năng chịu áp lực", 5),
    new DataPointDto("Kỹ năng đàm phán", 6),
    new DataPointDto("Kỹ năng đàm phán quốc tế", 7),
    new DataPointDto("Kỹ năng đào tạo", 8),
    new DataPointDto("Kỹ năng đặt câu hỏi", 9),
    new DataPointDto("Kỹ năng đặt mục tiêu", 10),
    new DataPointDto("Kỹ năng đọc", 11),
    new DataPointDto("Kỹ năng gắn kết tập thể", 12),
    new DataPointDto("Kỹ năng giải quyết xung đột", 13),
    new DataPointDto("Kỹ năng giảng dạy online", 14),
    new DataPointDto("Kỹ năng giao tiếp", 15),
    new DataPointDto("Kỹ năng giao tiếp phi ngôn ngữ", 16),
    new DataPointDto("Kỹ năng giao việc", 17),
    new DataPointDto("Kỹ năng học tập online hiệu quả", 18),
    new DataPointDto("Kỹ năng kỷ luật bản thân", 19),
    new DataPointDto("Kỹ năng làm việc độc lập", 20),
    new DataPointDto("Kỹ năng làm việc nhóm", 21),
    new DataPointDto("Kỹ năng làm việc từ xa hiệu quả", 22),
    new DataPointDto("Kỹ năng lãnh đạo", 23),
    new DataPointDto("Kỹ năng lắng nghe", 24),
    new DataPointDto("Kỹ năng lập trình cơ bản", 25),
    new DataPointDto("Kỹ năng lên kế hoạch", 26),
    new DataPointDto("Kỹ năng livestreaming", 27),
    new DataPointDto("Kỹ năng marketing online", 28),
    new DataPointDto("Kỹ năng nghiên cứu khoa học", 29),
    new DataPointDto("Kỹ năng nhìn người", 30),
    new DataPointDto("Kỹ năng nói trước đám đông", 31),
    new DataPointDto("Kỹ năng phân tích dữ liệu marketing", 32),
    new DataPointDto("Kỹ năng quản lý cảm xúc", 33),
    new DataPointDto("Kỹ năng quản lý chiến dịch marketing online", 34),
    new DataPointDto("Kỹ năng quản lý cộng đồng online", 35),
    new DataPointDto("Kỹ năng quản lý khủng hoảng", 36),
    new DataPointDto("Kỹ năng quản lý rủi ro", 37),
    new DataPointDto("Kỹ năng quản lý tài chính", 38),
    new DataPointDto("Kỹ năng quản lý thời gian", 39),
    new DataPointDto("Kỹ năng quan sát", 41),
    new DataPointDto("Kỹ năng quay phim, dựng phim", 42),
    new DataPointDto("Kỹ năng ra quyết định trong điều kiện khó khăn", 43),
    new DataPointDto("Kỹ năng sản xuất podcast", 44),
    new DataPointDto("Kỹ năng sáng tạo nội dung", 45),
    new DataPointDto("kỹ năng sắp xếp công việc", 46),
    new DataPointDto("Kỹ năng sử dụng dữ liệu", 47),
    new DataPointDto("Kỹ năng sử dụng mạng xã hội hiệu quả", 48),
    new DataPointDto("Kỹ năng tạo năng lượng tích cực", 49),
    new DataPointDto("Kỹ năng tạo sức ảnh hưởng", 50),
    new DataPointDto("Kỹ năng tập trung", 51),
    new DataPointDto("Kỹ năng thay đổi và thích nghi", 52),
    new DataPointDto("Kỹ năng thấu hiểu", 53),
    new DataPointDto("Kỹ năng thiết kế đồ họa", 54),
    new DataPointDto("Kỹ năng thuyết phục", 55),
    new DataPointDto("Kỹ năng thuyết trình", 56),
    new DataPointDto("Kỹ năng tin học văn phòng", 57),
    new DataPointDto("Kỹ năng trình bày vấn đề", 58),
    new DataPointDto("Kỹ năng truyền cảm hứng", 59),
    new DataPointDto("Kỹ năng tư duy chiến lược", 60),
    new DataPointDto("Kỹ năng tư duy phản biện", 61),
    new DataPointDto("Kỹ năng tư duy sáng tạo", 62),
    new DataPointDto("Kỹ năng tự học", 63),
    new DataPointDto("Kỹ năng viết", 64),
    new DataPointDto("Kỹ năng viết báo cáo khoa học", 65),
    new DataPointDto("Kỹ năng viết blog", 66),
    new DataPointDto("Kỹ năng viết sách điện tử", 68),
    new DataPointDto("Kỹ năng xây dựng niềm tin", 70),
    new DataPointDto("Kỹ năng xây dựng quan hệ", 72),
    new DataPointDto("Kỹ năng xây dựng thương hiệu cá nhân", 74),
    new DataPointDto("Kỹ năng xây dựng thương hiệu cá nhân online", 76),
    new DataPointDto("Kỹ năng xây dựng và duy trì văn hóa doanh nghiệp ", 78),
  ]

  static yearOfExps: DataPointDto[] = [
    new DataPointDto("Dưới 1 năm", 1, "Less than 1 year"),
    new DataPointDto("1-2 năm", 2, "1-2 years"),
    new DataPointDto("2-3 năm", 3, "2-3 years"),
    new DataPointDto("3-5 năm", 4, "3-5 years"),
    new DataPointDto("Trên 5 năm", 5, "More than 5 years")
  ]

  static availableTimes: DataPointDto[] = [
    new DataPointDto("0-10 tiếng/tuần", 1, "0-10 hours/week"),
    new DataPointDto("10-20 tiếng/tuần", 2, "10-20 hours/week"),
    new DataPointDto("20-30 tiếng/tuần", 3, "20-30 hours/week"),
    new DataPointDto("30+ tiếng/tuần", 4, "30+ hours/week"),
    new DataPointDto("Toàn thời gian", 5, "Full-time")
  ]

  static projectStages: DataPointDto[] = [
    new DataPointDto("Xác lập", 1),
    new DataPointDto("Nghiên cứu", 2),
    new DataPointDto("MVP", 3),
    new DataPointDto("Kiểm thử", 4),
    new DataPointDto("Tăng trưởng 1", 5),
    new DataPointDto("Tăng trưởng 2", 6),
    new DataPointDto("Tăng trưởng 3", 7),
    new DataPointDto("Tăng trưởng 4", 8)
  ]

  static scale: DataPointDto[] = [
    new DataPointDto("Dưới 10 người", 1),
    new DataPointDto("10 - 30 người", 2),
    new DataPointDto("30 - 50 người", 3),
    new DataPointDto("Trên 50 người", 4),
  ]

  static activePurpose: DataPointDto[] = [
    new DataPointDto("Lợi nhuận", 1),
    new DataPointDto("Phi lợi nhuận", 2),
  ]

  static universities: UniversitySpecialized[] = [
    new UniversitySpecialized("Trường Đại học Kinh tế - Kỹ thuật Công nghiệp UNETI",
      [
        "Ngôn ngữ Anh",
        "Quản trị kinh doanh",
        "Marketing",
        "Kinh doanh thương mại",
        "Tài chính - Ngân hàng",
        "Bảo hiểm",
        "Kế toán",
        "Kiểm toán",
        "Khoa học dữ liệu",
        "Mạng máy tính và truyền thông dữ liệu",
        "Công nghệ kỹ thuật máy tính",
        "Công nghệ thông tin",
        "Công nghệ kỹ thuật cơ khí",
        "Công nghệ kỹ thuật cơ điện tử",
        "Công nghệ kỹ thuật Ô tô",
        "Công nghệ kỹ thuật điện, điện tử",
        "Công nghệ kỹ thuật điện tử - viễn thông",
        "CNKT điều khiển và tự động hoá",
        "Logistics và Quản lý chuỗi cung ứng",
        "Công nghệ dệt, may",
        "Công nghệ sợi, dệt",
        "Công nghệ thực phẩm",
        "Quản trị dịch vụ du lịch và lữ hành",
        "Quản trị khách sạn"
      ]),
    new UniversitySpecialized("HUST", ["IT1", "IT2"])
  ]

  static suggestOpen: DataPointDto[] = [
    new DataPointDto("Xin chào!", 1),
    new DataPointDto("Kính gửi!", 2),
    new DataPointDto("Dear Sir!", 3),
    new DataPointDto("Dear Madam!", 4),
    new DataPointDto("Gửi người cộng sự tương lai của tôi!", 5),
  ]

  static suggestContent: DataPointDto[] = [
    new DataPointDto("Tôi đang rất quan tâm đến dự án mà bạn đang triển khai. Tôi tin rằng với kinh nghiệm và kỹ năng của mình, tôi có thể đóng góp một phần vào sự thành công của dự án.", 1),
    new DataPointDto("Tôi đang tìm kiếm những người có ý tưởng sáng tạo và muốn biến ý tưởng đó thành hiện thực. Tôi tin rằng với sự hợp tác của chúng ta, chúng ta có thể tạo ra những điều tuyệt vời. Nếu bạn có ý tưởng nào muốn chia sẻ, tôi rất mong muốn được gặp gỡ và thảo luận với bạn.", 2),
    new DataPointDto("Tôi tin rằng dự án của mình có tiềm năng lớn và tôi muốn biến nó thành hiện thực. Tuy nhiên, tôi cần sự giúp đỡ của bạn. Bạn có kinh nghiệm và chuyên môn trong lĩnh vực này và tôi tin rằng bạn sẽ là một cộng sự tuyệt vời cho dự án. Tôi muốn mời bạn cùng tham gia. Nếu bạn quan tâm, chúng ta có thể gặp mặt để thảo luận thêm.", 3),
    new DataPointDto("Tôi tin rằng ý tưởng của mình có tiềm năng lớn và tôi muốn biến nó thành hiện thực. Tuy nhiên, tôi cần sự giúp đỡ của bạn. Bạn có kinh nghiệm và chuyên môn trong lĩnh vực này và tôi tin rằng bạn sẽ là một cộng sự tuyệt vời. Tôi muốn mời bạn cùng tham gia. Nếu bạn quan tâm, chúng ta có thể gặp mặt để thảo luận thêm.", 4),
  ]

  static suggestEnd: DataPointDto[] = [
    new DataPointDto("Trân trọng!", 1),
    new DataPointDto("Thân ái!", 2),
    new DataPointDto("Chúc bạn một ngày tốt lành!", 3),
    new DataPointDto("Chúc bạn mọi điều tốt đẹp!", 4),
    new DataPointDto("Tôi rất vui được gặp bạn!", 5),
    new DataPointDto("Chào bạn, người bạn đồng hành lý tưởng của tôi!", 6),
    new DataPointDto("Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với tôi, tôi đợi tin từ bạn!", 7),
    new DataPointDto("Cảm ơn bạn đã dành thời gian, chúc bạn sức khoẻ, thành công và may mắn. Mong sớm nhận được tin từ bạn!", 8),
    new DataPointDto("Hãy cùng nhau tạo ra một thế giới tốt đẹp hơn. Tôi mong sớm được làm việc cùng bạn!", 9),
    new DataPointDto("Hãy theo đuổi ước mơ của bạn, ngay cả khi chúng có vẻ điên rồ!", 10),
    new DataPointDto("Hãy tin vào những điều không thể!", 11),
    new DataPointDto("Hãy sống trọn từng khoảnh khắc!", 12),
    new DataPointDto("Thank you for reading. I wish you to always be happy. I hope to receive news from you soon.", 13),
    new DataPointDto("Tập hợp nhiều cây thành rừng, nhiều người thành đoàn!", 14),
    new DataPointDto("Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao!", 15),
    new DataPointDto("'Đoàn kết là sức mạnh.' - Chủ tịch Hồ Chí Minh", 16),
    new DataPointDto("'Hợp tác là nền tảng của sự phát triển.' - Thủ tướng Nguyễn Xuân Phúc", 17),
    new DataPointDto("'Một mình chúng ta có thể làm rất ít, cùng nhau chúng ta có thể làm rất nhiều.' - Helen Keller", 18),
    new DataPointDto("'Hợp tác là sức mạnh.' -  Franklin D. Roosevelt", 19),
    new DataPointDto("'Trí tuệ của một người là giới hạn. Trí tuệ của nhiều người là không giới hạn.' - Albert Einstein", 20),
    new DataPointDto("'Hợp tác là chìa khóa cho sự thành công.' - Paul McCartney", 21),
    new DataPointDto("'Hợp tác là chìa khóa cho sự đổi mới.' - Peter Drucker", 22),
    new DataPointDto("'Chúng ta không thể làm được nhiều điều lớn lao nếu chúng ta không làm cùng nhau.' - Helen Keller", 23),
  ]
}
