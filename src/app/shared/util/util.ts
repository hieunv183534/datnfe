export const Util: any = {
  getDateTime: (d: Date) => {
    return `${formatNumber(d.getDate())}/${formatNumber(d.getMonth() + 1)}/${formatNumber(d.getFullYear())} ${formatNumber(d.getHours())}:${formatNumber(d.getMinutes())}`;
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
  constructor(_name: string, _value: number) {
    this.name = _name;
    this.value = _value;
  }

  name?: string;
  value?: number;
}



export class FsiValues {

  static getName(value: number, arr: DataPointDto[]){
    return arr.find(x=> x.value == value)?.name;
  }

  static getMultiName(values: number[], arr: DataPointDto[]){
    return arr.filter(x=> values.includes(x.value?? 0)).map(x=> x.name).join(',');
  }

  static areas: DataPointDto[] = [
    new DataPointDto("Bắc Giang", 1),
    new DataPointDto("Bắc Kạn", 2),
    new DataPointDto("Cao Bằng", 3),
    new DataPointDto("Hà Giang", 4),
    new DataPointDto("Lạng Sơn", 5),
    new DataPointDto("Phú Thọ", 6),
    new DataPointDto("Quảng Ninh", 7),
    new DataPointDto("Thái Nguyên", 8),
    new DataPointDto("Tuyên Quang", 9),
    new DataPointDto("Yên Bái", 10),
    new DataPointDto("Điện Biên", 11),
    new DataPointDto("Hòa Bình", 12),
    new DataPointDto("Lai Châu", 13),
    new DataPointDto("Sơn La", 14),
    new DataPointDto("Bắc Ninh", 15),
    new DataPointDto("Hà Nam", 16),
    new DataPointDto("Hà Nội", 17),
    new DataPointDto("Hải Dương", 18),
    new DataPointDto("Hải Phòng", 19),
    new DataPointDto("Hưng Yên", 20),
    new DataPointDto("Nam Định", 21),
    new DataPointDto("Ninh Bình", 22),
    new DataPointDto("Thái Bình", 23),
    new DataPointDto("Vĩnh Phúc", 24),
    new DataPointDto("Hà Tĩnh", 25),
    new DataPointDto("Nghệ An", 26),
    new DataPointDto("Quảng Bình", 27),
    new DataPointDto("Thanh Hóa", 28),
    new DataPointDto("Bình Định", 29),
    new DataPointDto("Đà Nẵng", 30),
    new DataPointDto("Kon Tum", 31),
    new DataPointDto("Quảng Nam", 32),
    new DataPointDto("Quảng Ngãi", 33),
    new DataPointDto("Thừa Thiên Huế", 34),
    new DataPointDto("Đắk Lắk", 35),
    new DataPointDto("Đắk Nông", 36),
    new DataPointDto("Gia Lai", 37),
    new DataPointDto("Khánh Hòa", 38),
    new DataPointDto("Lâm Đồng", 39),
    new DataPointDto("Ninh Thuận", 40),
    new DataPointDto("Phú Yên", 41),
    new DataPointDto("Quảng Trị", 42),
    new DataPointDto("Đồng Nai", 43),
    new DataPointDto("Bà Rịa - Vũng Tàu", 44),
    new DataPointDto("Bình Thuận", 45),
    new DataPointDto("Đồng Tháp", 46),
    new DataPointDto("Bình Dương", 47),
    new DataPointDto("Bình Phước", 48),
    new DataPointDto("Hồ Chí Minh", 49),
    new DataPointDto("Long An", 50),
    new DataPointDto("Tiền Giang", 51),
    new DataPointDto("An Giang", 52),
    new DataPointDto("Bạc Liêu", 53),
    new DataPointDto("Bến Tre", 54),
    new DataPointDto("Cà Mau", 55),
    new DataPointDto("Hậu Giang", 56),
    new DataPointDto("Kiên Giang", 57),
    new DataPointDto("Sóc Trăng", 58),
    new DataPointDto("Tây Ninh", 59),
    new DataPointDto("Trà Vinh", 60),
    new DataPointDto("Vĩnh Long", 61),
    new DataPointDto("Cần Thơ", 62),
    new DataPointDto("Đồng Tháp", 63)
  ];

  static fields: DataPointDto[] = [
    new DataPointDto("Công nghệ thông tin", 1),
    new DataPointDto("Y tế và chăm sóc sức khỏe", 2),
    new DataPointDto("Kinh doanh và tài chính", 3),
    new DataPointDto("Năng lượng và môi trường", 4),
    new DataPointDto("Thiết bị điện tử", 5),
    new DataPointDto("Giáo dục", 6),
    new DataPointDto("Vận tải", 7),
    new DataPointDto("Khách sạn và du lịch", 8),
    new DataPointDto("Thực phẩm và nông nghiệp", 9),
    new DataPointDto("Thương mại điện tử", 10),
    new DataPointDto("Công nghiệp và sản xuất", 11)
  ];

  static personalities: DataPointDto[] = [
    new DataPointDto("Cầu tiến", 1),
    new DataPointDto("Cầu toàn", 2),
    new DataPointDto("Chuyên nghiệp", 3),
    new DataPointDto("Chăm chỉ", 4),
    new DataPointDto("Chân thành", 5),
    new DataPointDto("Chủ động", 6),
    new DataPointDto("Chỉnh chu", 7),
    new DataPointDto("Cởi mở", 8),
    new DataPointDto("Dễ gần", 9),
    new DataPointDto("Hài hước", 10),
    new DataPointDto("Hòa đồng", 11),
    new DataPointDto("Khéo léo", 12),
    new DataPointDto("Kiên cường", 13),
    new DataPointDto("Kỷ luật", 14),
    new DataPointDto("Lạc quan", 15),
    new DataPointDto("Lắng nghe", 16),
    new DataPointDto("Linh hoạt", 17),
    new DataPointDto("Mạnh mẽ", 18),
    new DataPointDto("Nghiêm túc", 19),
    new DataPointDto("Nhạy bén", 20),
    new DataPointDto("Nhẫn nhịn", 21),
    new DataPointDto("Nhiệt huyết", 22),
    new DataPointDto("Nhiệt tình", 23),
    new DataPointDto("Năng động", 24),
    new DataPointDto("Năng nổ", 25),
    new DataPointDto("Quyết đoán", 26),
    new DataPointDto("Quyết liệt", 27),
    new DataPointDto("Sáng suốt", 28),
    new DataPointDto("Sáng tạo", 29),
    new DataPointDto("Táo bạo", 30),
    new DataPointDto("Tâm huyết", 31),
    new DataPointDto("Thân thiện", 32),
    new DataPointDto("Thẳng thắn", 33),
    new DataPointDto("Thích ứng", 34),
    new DataPointDto("Thực tế", 35),
    new DataPointDto("Tích cực", 36),
    new DataPointDto("Tỉ mỉ", 37),
    new DataPointDto("Tự lập", 38),
    new DataPointDto("Tự tin", 39),
    new DataPointDto("Tốt bụng", 40),
    new DataPointDto("Trác nhiệm", 41),
    new DataPointDto("Trạng tâm", 42),
    new DataPointDto("Trung thực", 43),
    new DataPointDto("Tập trung", 44)
  ]

  static skills: DataPointDto[] = [
    new DataPointDto("Kỹ năng tự học", 1),
    new DataPointDto("Kỹ năng giao tiếp", 2),
    new DataPointDto("Kỹ năng viết", 3),
    new DataPointDto("Kỹ năng nói trước đám đông", 4),
    new DataPointDto("Kỹ năng thuyết trình", 5),
    new DataPointDto("Kỹ năng tư duy phản biện", 6),
    new DataPointDto("Kỹ năng thuyết phục", 7),
    new DataPointDto("Kỹ năng đàm phán", 8),
    new DataPointDto("Kỹ năng bán hàng", 9),
    new DataPointDto("Kỹ năng xây dựng niềm tin", 10),
    new DataPointDto("Kỹ năng trình bày vấn đề", 11),
    new DataPointDto("Kỹ năng quản lý thời gian", 12),
    new DataPointDto("Kỹ năng quản lý cảm xúc", 13),
    new DataPointDto("Kỹ năng tập trung", 14),
    new DataPointDto("Kỹ năng ra quyết định trong điều kiện khó khăn", 15),
    new DataPointDto("Kỹ năng giải quyết xung đột", 16),
    new DataPointDto("Kỹ năng thay đổi và thích nghi", 17),
    new DataPointDto("Kỹ năng lãnh đạo", 18),
    new DataPointDto("Kỹ năng truyền cảm hứng", 19),
    new DataPointDto("Kỹ năng đào tạo", 20),
    new DataPointDto("Kỹ năng lắng nghe", 21),
    new DataPointDto("Kỹ năng đặt câu hỏi", 22),
    new DataPointDto("Kỹ năng đặt mục tiêu", 23),
    new DataPointDto("Kỹ năng lên kế hoạch", 24),
    new DataPointDto("Kỹ năng tạo sức ảnh hưởng", 25),
    new DataPointDto("Kỹ năng tư duy sáng tạo", 26),
    new DataPointDto("Kỹ năng chịu áp lực ", 27),
    new DataPointDto("Kỹ năng đọc", 28),
    new DataPointDto("kỹ năng sắp xếp công việc", 29),
    new DataPointDto("Kỹ năng làm việc độc lập", 30),
    new DataPointDto("Kỹ năng làm việc nhóm", 31),
    new DataPointDto("Kỹ năng quản lý tài chính", 32),
    new DataPointDto("Kỹ năng lắng nghe", 33),
    new DataPointDto("Kỹ năng thấu hiểu", 34),
    new DataPointDto("Kỹ năng quan sát", 35),
    new DataPointDto("Kỹ năng nhìn người ", 36),
    new DataPointDto("Kỹ năng xây dựng  quan hệ", 37),
    new DataPointDto("Kỹ năng chăm sóc, duy trì mối quan hệ", 38),
    new DataPointDto("Kỹ năng xây dựng thương hiệu cá nhân", 39),
    new DataPointDto("Kỹ năng tin học văn phòng", 40),
    new DataPointDto("Kỹ năng giao việc", 41),
    new DataPointDto("Kỹ năng tạo năng lượng tích cực", 42),
    new DataPointDto("Kỹ năng gắn kết tập thể", 43),
    new DataPointDto("Kỹ năng kỷ luật bản thân", 44)
  ]

  static yearOfExps: DataPointDto[] = [
    new DataPointDto("Dưới 1 năm", 1),
    new DataPointDto("1-2 năm", 2),
    new DataPointDto("2-3 năm", 3),
    new DataPointDto("3-5 năm", 4),
    new DataPointDto("Trên 5 năm", 5)
  ]

  static availableTimes: DataPointDto[] = [
    new DataPointDto("0-10 tiếng/tuần", 1),
    new DataPointDto("10-20 tiếng/tuần", 2),
    new DataPointDto("20-30 tiếng/tuần", 3),
    new DataPointDto("30+ tiếng/tuần", 4),
    new DataPointDto("Toàn thời gian", 5)
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
}
