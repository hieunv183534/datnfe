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

export class FsiValues {
  static fields = [];
  static areas = ["An Giang","Bà Rịa – Vũng Tàu", "Bạc Liêu","Bắc Giang","Bắc Kạn","Bắc Ninh","Bến Tre","Bình Dương",
                  "Bình Định","Bình Phước","Bình Thuận","Cà Mau","Cao Bằng","Cần Thơ","Đà Nẵng","Đắk Lắk","Đắk Nông",
                "Điện Biên","Đồng Nai","Đồng Tháp","Gia Lai","Hà Giang","Hà Nam","Hà Nội","Hà Tĩnh","Hải Dương"
              ,"Hải Phòng","Hậu Giang","Hòa Bình","TP Hồ Chí Minh","Hưng Yên","Khánh Hòa","Kiên Giang","Kon Tum",
            "Lai Châu","Lạng Sơn","Lào Cai","Lâm Đồng","Long An","Nam Định","Nghệ An","Ninh Bình","Ninh Thuận",
          "Phú Thọ","Phú Yên","Quảng Bình","Quảng Nam","Quảng Ngãi","Quảng Ninh","Quảng Trị","Sóc Trăng","Sơn La",
        "Tây Ninh","Thái Bình","Thái Nguyên","Thanh Hóa","Thừa Thiên Huế","Tiền Giang","Trà Vinh","Tuyên Quang","Vĩnh Long",
      "Vĩnh Phúc","Yên Bái "];
}
