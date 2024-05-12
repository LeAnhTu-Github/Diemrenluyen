const items = [
    "Đạt điểm trung bình học tập trên 9,0",
    "Đạt điểm trung bình học tập từ 8,0 đến  9,0",
    "Đạt điểm trung bình học tập từ 7,0 đến  8,0",
    "Có tinh thần cố gắng vượt khó, vươn lên trong học tập",
    "Tham gia các CLB học thuật, hoạt động NCKH, các cuộc thi khởi nghiệp sáng tạo; thi học sinh giỏi;… do Nhà trường tổ chức hoặc được cử tham gia",
    "Có thành tích khác:…………………………………………………………………",
    "Điểm cộng về ý thức chấp hành nội quy, quy chế, quy định trong nhà trường",
    "Có các hành động tích cực trên các trang mạng xã hội phù hợp với chủ trương của Nhà trường, Nhà nước được tập thể ghi nhận",
    "Tham gia tích cực các hoạt động lao động công ích, giữ gìn an ninh trật tự góp phần xây dựng cho sự phát triển của Nhà trường",
    "Tham gia thực tập tăng cường năng lực nghề nghiệp tại các doanh nghiệp; các buổi hội thảo, khóa đào tạo kỹ năng mềm về hướng nghiệp, tư vấn giới thiệu việc làm,..",
    "Tham gia hoạt động khác:…………………………………………………………",
    "Điểm cộng về ý thức tham gia các hoạt động chính trị, xã hội, văn hóa, văn nghệ, thể thao, phòng chống tội phạm và các tệ nạn xã hội",
    "Được tham dự lớp học nhận thức về Đảng, được kết nạp Đảng, là Đảng viên hoàn thành tốt nhiệm vụ, Đoàn viên, Hội viên ưu tú,…",
    "Tham gia tích cực các hoạt động chính trị, xã hội, văn hóa, văn nghệ, thể thao của Nhà trường, khoa, lớp phát động và tổ chức",
    "Tham gia các hoạt động tình nguyện, hiến máu nhân đạo, công tác xã hội; tham gia tuyên truyền, phòng chống tội phạm và các tệ nạn xã hội",
    "Tham gia hoạt động trong các CLB do Đoàn thanh niên, Hội sinh viên tổ chức",
  ];
  
 export const dataIncrese = items.map((item, index) => {
    return {
      id: index,
      description: item,
    };
  });

export const dataMinus = [
    { id: 0, description: 'Vi phạm quy chế thi, kiểm tra' },
    { id: 1, description: 'Thi lại môn học, học phần' },
    { id: 2, description: 'Vi phạm thời gian học tập, thiếu ý thức trong học tập' },
    { id: 3, description: 'Vi phạm khác' },
    { id: 4, description: 'Đi học hộ hoặc nhờ người khác đi học hộ' },
    { id: 5, description: 'Không đóng học phí đúng thời hạn' },
    { id: 6, description: 'Không khai báo, chấp hành các quy định về nội, ngoại trú; Không nộp bài thu hoạch, bản cam kết,…theo quy định' },
    { id: 7, description: 'Không tham gia BHYT theo quy định' },
    { id: 8, description: 'Vi phạm các nội quy, quy định của Nhà trường' },
    { id: 9, description: 'Vi phạm khác' },
    { id: 10, description: 'Vi phạm các quy định về an toàn giao thông, tệ nạn xã hội, các quy định về đời sống văn hóa, các trò chơi có nội dung không lành mạnh,…' },
    { id: 11, description: 'Không tham gia học tập “Tuần sinh hoạt công dân HSSV” đầu năm học' },
    { id: 12, description: 'Vi phạm khác' },
    { id: 13, description: 'Vi phạm chủ trương, đường lối, chính sách của Đảng, pháp luật của Nhà nước' },
    { id: 14, description: 'Có hành vi gây mất đoàn kết, mất an ninh trật tự, an toàn xã hội trong trường, lớp và nơi cư trú' },
    { id: 15, description: 'Vi phạm khác' },
    { id: 16, description: 'Báo cáo không trung thực, có hành vi bao che cho vi phạm của sinh viên trong lớp' },
    { id: 17, description: 'Cán bộ lớp, cán bộ Đoàn, cán bộ Hội sinh viên chưa hoàn thành nhiệm vụ' },
  ];

export const table = [
    {
      id: 1,
      event: "Hội thảo khoa học và công nghệ",
      time: "15/3/2024",
      link: "https://uneti.edu.vn/category/thong-bao/",
      status: {
        join: true,
        signup: false,
        notjoin: false,
      },
    },
    {
      id: 2,
      event: "Workshop trí tuệ nhân tạo",
      time: "15/3/2024",
      link: "https://uneti.edu.vn/category/thong-bao/",
      status: {
        join: false,
        signup: true,
        notjoin: false,
      },
    },
    {
      id: 3,
      event: "Workshop trí tuệ nhân tạo",
      time: "15/3/2024",
      link: "https://uneti.edu.vn/category/thong-bao/",
      status: {
        join: false,
        signup: false,
        notjoin: true,
      },
    },
    {
      id: 4,
      event: "Hội thảo khoa học và công nghệ",
      time: "15/3/2024",
      link: "https://uneti.edu.vn/category/thong-bao/",
      status: {
        join: true,
        signup: false,
        notjoin: false,
      },
    },
    {
      id: 5,
      event: "Hội thảo khoa học và công nghệ",
      time: "15/3/2024",
      link: "https://uneti.edu.vn/category/thong-bao/",
      status: {
        join: true,
        signup: false,
        notjoin: false,
      },
    },
    {
      id: 6,
      event: "Hội thảo khoa học và công nghệ",
      time: "15/3/2024",
      link: "https://uneti.edu.vn/category/thong-bao/",
      status: {
        join: true,
        signup: false,
        notjoin: false,
      },
    },
    {
      id: 7,
      event: "Workshop trí tuệ nhân tạo",
      time: "15/3/2024",
      link: "https://uneti.edu.vn/category/thong-bao/",
      status: {
        join: false,
        signup: true,
        notjoin: false,
      },
    },
    {
      id: 8,
      event: "Workshop trí tuệ nhân tạo",
      time: "15/3/2024",
      link: "https://uneti.edu.vn/category/thong-bao/",
      status: {
        join: false,
        signup: false,
        notjoin: true,
      },
    },
    {
      id: 9,
      event: "Hội thảo khoa học và công nghệ",
      time: "15/3/2024",
      link: "https://uneti.edu.vn/category/thong-bao/",
      status: {
        join: true,
        signup: false,
        notjoin: false,
      },
    },
    {
      id: 10,
      event: "Workshop trí tuệ nhân tạo",
      time: "15/3/2024",
      link: "https://uneti.edu.vn/category/thong-bao/",
      status: {
        join: false,
        signup: true,
        notjoin: false,
      },
    },
    {
      id: 11,
      event: "Workshop trí tuệ nhân tạo",
      time: "15/3/2024",
      link: "https://uneti.edu.vn/category/thong-bao/",
      status: {
        join: false,
        signup: false,
        notjoin: true,
      },
    },
  ];
  
export const eventData = [
  {
    id: "1",
    title: "Công nghệ Blockchain",
    name: "Công nghệ Blockchain - Những buổi học thú vị nào đang chờ đón cùng CLB Tin Học!",
    description:`Công nghệ Blockchain - Những buổi học thú vị nào đang chờ đón cùng CLB Tin Học! "🔗,
    " 🌟 Mở đầu với  buổi hội thảo trực tuyến "Tiềm năng và Thách thức với lĩnh vực Blockchain và AI". Đây là cơ hội tuyệt vời để tìm hiểu và thảo luận về những xu hướng công nghệ đang có sức lan tỏa mạnh mẽ trên thế giới hiện nay. ",
    "" 🔍 Nội dung buổi hội thảo sẽ tập trung vào việc giới thiệu về Tiềm năng và Thách thức với lĩnh vực Blockchain và AI, hai xu hướng công nghệ đang có sức lan tỏa mạnh mẽ trên toàn cầu.
     🚀 Ngoài ra, chúng ta cũng sẽ có cơ hội được biết thêm về Câu lạc bộ Blockchain và cách thức hoạt động của nó, cùng với việc trao đổi lịch sinh hoạt định kỳ của câu lạc bộ.
     👥 Buổi hội thảo cũng mở ra không gian trao đổi mở, nơi mọi thành viên có thể chia sẻ kiến thức, kinh nghiệm và mạng lưới liên kết trong lĩnh vực Blockchain và AI.
     🕣 Thời gian: 20:30 - 22:00, thứ 5 ngày 04/4/2024
     🔗 Link Zoom: https://us06web.zoom.us/j/82040748581...
     📌  Mọi người đều được mời tham gia, không chỉ các thành viên hiện tại mà còn cả những ai quan tâm đến lĩnh vực công nghệ này. Đừng bỏ lỡ cơ hội tham gia và trở thành một phần của cộng đồng chuyên ngành sôi động này!
     --------------------------------------------
     KHOA CÔNG NGHỆ THÔNG TIN 
     TRƯỜNG ĐẠI HỌC KINH TẾ - KỸ THUẬT CÔNG NGHIỆP 
      Cơ sở Hà Nội: Số 218 Lĩnh Nam, Hoàng Mai, Hà Nội. 
      Cơ sở Nam Định: 353 Trần Hưng Đạo, TP. Nam Định. 
      [Thông tin liên hệ]
     Page Khoa Công nghệ thông tin:
      https://www.facebook.com/cntt.ktktcn 
     Website Khoa Công nghệ thông tin: 
      https://khoacntt.uneti.edu.vn/ 
     Page Câu lạc bộ Tin học (ITC):
      https://www.facebook.com/InformationTechnologyClub.uneti 
     Nhóm cựu Sinh viên Khoa Công nghệ thông tin:
      https://www.facebook.com/groups/227524322389377 
     Kênh Tiktok Câu lạc bộ: 
      https://www.tiktok.com/@itc.uneti
     #ITC #Blockchain #CôngNghệ #NhómBlockchain`,
    time: "15/5/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    author: " Mr. Mạnh Cường - AI engineer",
    host: "CLB Tin Học",
    imageEvent:"/images/event1.jpeg",
    address: "Hội trường lớn - toà HA11 ",  
  },{
    id: "2",
    title: "Khủng hoảng mất dữ liệu",
    name: "TỌA ĐÀM TRỰC TUYẾN :  “BẢO VỆ & NGĂN NGỪA KHỦNG HOẢNG MẤT DỮ LIỆU NHẠY CẢM TẠI  DOANH NGHIỆP",
    time: "30/3/2023",
    link: "https://uneti.edu.vn/category/thong-bao/",
    author: " Thầy Trương Thái Kiệt",
    host: "CLB Tin Học",
    imageEvent:"/images/event2.jpeg",
    address: "Hội trường lớn - toà HA11 ",  
    description: `📣📣TỌA ĐÀM TRỰC TUYẾN :  “BẢO VỆ & NGĂN NGỪA KHỦNG HOẢNG MẤT DỮ LIỆU NHẠY CẢM TẠI  DOANH NGHIỆP“ 
    🔔Link tham gia MIỄN PHÍ : https://forms.gle/ikhhTGF9Kup1NpQPA
    - Các mối đe dọa đánh cắp dữ liệu nhạy cảm từ bên trong và bên ngoài nhắm  vào doanh nghiệp
    - Làm thế nào để ngăn chặn từ nguồn, từ gốc các mỗi đe dọa
    - Xây dựng kịch bản phòng ngừa rủi ro , ngăn chặn khủng hoảng nếu bị de dọa và tấn công
    - Hỏi đáp các vấn đề liên quan phòng ngừa rủi ro, phòng ngừa mấy dữ liệu quan trọng dành riêng cho CEO, lãnh đạo tổ chức, doanh nghiệp, cá nhân muốn làm nghề 
    - Quà tặng voucher ưu đãi khóa học trị giá đến 400.000đ cho các khách tham gia buổi tọa đàm trực tuyến 🎁
    - Thông qua buổi tọa đàm trực tuyến này,các doanh nghiệp có thể giao lưu và đặt câu hỏi trực tiêp với :
       + Thầy Võ Đỗ Thắng – Chuyên gia, giảng viên  an ninh mạng 
       + Thầy Trương Thái Kiệt – Chuyên gia, giảng viên  an ninh mạng 
    - Hình thức : Online qua Google Meets
    - Thời gian 9:00 -11:00, sáng  Thứ 7 Ngày 30/03/2023
    --------------------------------------------
    KHOA CÔNG NGHỆ THÔNG TIN 
    TRƯỜNG ĐẠI HỌC KINH TẾ - KỸ THUẬT CÔNG NGHIỆP 
    Cơ sở Hà Nội: Số 218 Lĩnh Nam, Hoàng Mai, Hà Nội. 
    Cơ sở Nam Định: 353 Trần Hưng Đạo, TP. Nam Định. 
    [Thông tin liên hệ]
    Page Khoa Công nghệ thông tin:
    https://www.facebook.com/cntt.ktktcn 
    Website Khoa Công nghệ thông tin: 
    https://khoacntt.uneti.edu.vn/ 
    Cổng thông tin việc làm Khoa Công nghệ thông tin: https://vieclam-khoacntt.uneti.edu.vn/
    Page Câu lạc bộ Tin học (ITC):
    https://www.facebook.com/InformationTechnologyClub.uneti 
    Nhóm cựu Sinh viên Khoa Công nghệ thông tin:
    https://www.facebook.com/groups/227524322389377 
    Kênh Tiktok Câu lạc bộ: 
    https://www.tiktok.com/@itc.uneti`
  },
  {
    id: "3",
    title:"Cuộc thi Olympic tin học",
    name:"[THÔNG BÁO CHÍNH THỨC PHÁT ĐỘNG CUỘC THI OLYMPIC TIN HỌC NĂM HỌC 2023-2024 ]",
    time: "28/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    author: "Câu lạc bộ tin học ITC",
    host: "CLB Tin Học",
    imageEvent:"/images/event3.jpeg",
    address: "Hội trường lớn - toà HA11 ",  
    description:`“Olympic Tin học” là cuộc thi nhằm thúc đẩy phong trào học tập, nâng cao kiến thức, rèn luyện kỹ năng tin học văn phòng, kỹ năng lập trình cho sinh viên trong nhà trường. Chỉ còn một thời gian ngắn nữa thôi, cuộc thi Olympic Tin học sinh viên cho toàn thể sinh viên các khoa trong Trường Đại học Kinh tế - Kỹ thuật Công nghiệp sẽ diễn ra. Không biết các bạn đã chuẩn bị cho bản thân đến đâu rồi nhỉ?? Tất cả các bạn đã sẵn sàng cả rồi chứ⁉
    Và dưới đây là một số thông tin chi tiết bạn cần 
    nắm được khi tham dự cuộc thi:
    I.  👨‍👩‍👦‍👦ĐỐI TƯỢNG THAM GIA: 
    1. Khối không chuyên tin học: 
    + Đối tượng dự thi: Khối thi này dành cho tất cả sinh viên năm nhất các ngành đào tạo mã ngành Công nghệ thông tin - Tin học (theo Thông tư 09/2022/TT-BGDĐT gồm các mã: 748xxxx: Máy tính và CNTT, 7460108- Khoa học dữ liệu, 7460107 - Khoa học tính toán, 7140210 - Sư phạm Tin học, 7460117 - Toán tin) hoặc tất cả sinh viên các ngành đào tạo khác mã ngành Công nghệ thông tin - Tin học (theo Thông tư 09/2022/TT-BGDĐT gồm các mã: 748xxxx: Máy tính và CNTT, 7460108- Khoa học dữ liệu, 7460107 - Khoa học tính toán, 7140210 - Sư phạm Tin học, 7460117 - Toán tin). 
    + Nội dung thi: Tin học văn phòng theo định dạng đề thi của hãng Microsoft (Microsoft Office Specialist).
    2. Khối chuyên tin học: 
    + Đối tượng dự thi: Dành cho sinh viên đào tạo theo mã ngành Công nghệ thông tin - Tin học (theo Thông tư 09/2022/TT-BGDĐT gồm các mã: 748xxxx: Máy tính và CNTT, 7460108- Khoa học dữ liệu, 7460107 - Khoa học tính toán, 7140210 - Sư phạm Tin học, 7460117 - Toán tin). Khuyến khích các sinh viên không thuộc các mã ngành đào tạo trên đăng ký dự thi. 
    + Nội dung thi: Thuật toán, cấu trúc dữ liệu và kỹ thuật lập trình.
    3. Khối siêu cup tin học:
    + Đối tượng dự thi: Khối thi này dành cho các sinh viên năm cuối được đào tạo theo mã ngành Công nghệ thông tin - Tin học, hoặc các sinh viên đã đạt giải trong các kỳ thi opympic tin học cấp trường, olympic tin học Quốc gia.
    + Nội dung thi: Thuật toán và cấu trúc dữ liệu nâng cao, tối ưuhóa và kỹ thuật lập trình nâng cao.
    II.  ⏰THỜI GIAN ĐĂNG KÝ:
    📌 Từ ngày 22/03/2024 đến trước ngày 28/03/2024: Sinh viên toàn trường đăng ký theo 
    Google Form:
    https://forms.gle/NxkDpWYzr3CW9FcdA
    III. 📗NỘI DUNG DỰ THI:
    1. Thi tin học văn phòng theo định dạng đề thi của hãng Microsoft Office Specialist) dành cho đối tượng chuyên tin và không chuyên.
    2. Giải các bài toán trên máy tính bằng ngôn ngữ lập trình dành cho đối tượng chuyên tin.
    IV.  🖥️CÔNG CỤ SỬ DỤNG:
    - Với sinh viên khoa Công nghệ thông tin: Ngôn ngữ lập trình C, C++, Java.
    - Với sinh viên thuộc các Khoa khác: Microsoft Office.
    V. 📜HÌNH THỨC THI: 
    Thực hành trên máy tính.
    👉👉👉CÒN CHẦN CHỪ GÌ NỮA, HÃY NHANH TAY ĐĂNG KÝ VÀ THỬ SỨC MÌNH TẠI OLYMPIC TIN HỌC NĂM HỌC 2023 - 2024 CÁC BẠN NHÉ!
    #ITC #CNTT #UNETI
    --------------------------------------------
    KHOA CÔNG NGHỆ THÔNG TIN 
    TRƯỜNG ĐẠI HỌC KINH TẾ - KỸ THUẬT CÔNG NGHIỆP 
    🏫Cơ sở Hà Nội: Số 218 Lĩnh Nam, Hoàng Mai, Hà Nội. 
    🏫Cơ sở Nam Định: 353 Trần Hưng Đạo, TP. Nam Định. 
    ☎️[Thông tin liên hệ]
    Page Khoa Công nghệ thông tin:
     🔗https://www.facebook.com/cntt.ktktcn  
    Website Khoa Công nghệ thông tin:  
    🔗https://khoacntt.uneti.edu.vn/  
    Page Câu lạc bộ Tin học (ITC):
    🔗https://www.facebook.com/InformationTechnologyClub.uneti  
    Nhóm cựu Sinh viên Khoa Công nghệ thông tin:
     🔗https://www.facebook.com/groups/227524322389377  
    Kênh Tiktok Câu lạc bộ: 
    🔗https://www.tiktok.com/@itc.uneti`

  },{
    id: "4",
    title: "Công nghệ Blockchain",
    name: "Công nghệ Blockchain - Những buổi học thú vị nào đang chờ đón cùng CLB Tin Học!",
    description:`Công nghệ Blockchain - Những buổi học thú vị nào đang chờ đón cùng CLB Tin Học! "🔗,
    " 🌟 Mở đầu với  buổi hội thảo trực tuyến "Tiềm năng và Thách thức với lĩnh vực Blockchain và AI". Đây là cơ hội tuyệt vời để tìm hiểu và thảo luận về những xu hướng công nghệ đang có sức lan tỏa mạnh mẽ trên thế giới hiện nay. ",
    "" 🔍 Nội dung buổi hội thảo sẽ tập trung vào việc giới thiệu về Tiềm năng và Thách thức với lĩnh vực Blockchain và AI, hai xu hướng công nghệ đang có sức lan tỏa mạnh mẽ trên toàn cầu.
     🚀 Ngoài ra, chúng ta cũng sẽ có cơ hội được biết thêm về Câu lạc bộ Blockchain và cách thức hoạt động của nó, cùng với việc trao đổi lịch sinh hoạt định kỳ của câu lạc bộ.
     👥 Buổi hội thảo cũng mở ra không gian trao đổi mở, nơi mọi thành viên có thể chia sẻ kiến thức, kinh nghiệm và mạng lưới liên kết trong lĩnh vực Blockchain và AI.
     🕣 Thời gian: 20:30 - 22:00, thứ 5 ngày 04/4/2024
     🔗 Link Zoom: https://us06web.zoom.us/j/82040748581...
     📌  Mọi người đều được mời tham gia, không chỉ các thành viên hiện tại mà còn cả những ai quan tâm đến lĩnh vực công nghệ này. Đừng bỏ lỡ cơ hội tham gia và trở thành một phần của cộng đồng chuyên ngành sôi động này!
     --------------------------------------------
     KHOA CÔNG NGHỆ THÔNG TIN 
     TRƯỜNG ĐẠI HỌC KINH TẾ - KỸ THUẬT CÔNG NGHIỆP 
      Cơ sở Hà Nội: Số 218 Lĩnh Nam, Hoàng Mai, Hà Nội. 
      Cơ sở Nam Định: 353 Trần Hưng Đạo, TP. Nam Định. 
      [Thông tin liên hệ]
     Page Khoa Công nghệ thông tin:
      https://www.facebook.com/cntt.ktktcn 
     Website Khoa Công nghệ thông tin: 
      https://khoacntt.uneti.edu.vn/ 
     Page Câu lạc bộ Tin học (ITC):
      https://www.facebook.com/InformationTechnologyClub.uneti 
     Nhóm cựu Sinh viên Khoa Công nghệ thông tin:
      https://www.facebook.com/groups/227524322389377 
     Kênh Tiktok Câu lạc bộ: 
      https://www.tiktok.com/@itc.uneti
     #ITC #Blockchain #CôngNghệ #NhómBlockchain`,
    time: "15/5/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    author: " Mr. Mạnh Cường - AI engineer",
    host: "CLB Tin Học",
    imageEvent:"/images/event1.jpeg",
    address: "Hội trường lớn - toà HA11 ",  
  },{
    id: "5",
    title: "Khủng hoảng mất dữ liệu",
    name: "TỌA ĐÀM TRỰC TUYẾN :  “BẢO VỆ & NGĂN NGỪA KHỦNG HOẢNG MẤT DỮ LIỆU NHẠY CẢM TẠI  DOANH NGHIỆP",
    time: "30/3/2023",
    link: "https://uneti.edu.vn/category/thong-bao/",
    author: " Thầy Trương Thái Kiệt",
    host: "CLB Tin Học",
    imageEvent:"/images/event2.jpeg",
    address: "Hội trường lớn - toà HA11 ",  
    description: `📣📣TỌA ĐÀM TRỰC TUYẾN :  “BẢO VỆ & NGĂN NGỪA KHỦNG HOẢNG MẤT DỮ LIỆU NHẠY CẢM TẠI  DOANH NGHIỆP“ 
    🔔Link tham gia MIỄN PHÍ : https://forms.gle/ikhhTGF9Kup1NpQPA
    - Các mối đe dọa đánh cắp dữ liệu nhạy cảm từ bên trong và bên ngoài nhắm  vào doanh nghiệp
    - Làm thế nào để ngăn chặn từ nguồn, từ gốc các mỗi đe dọa
    - Xây dựng kịch bản phòng ngừa rủi ro , ngăn chặn khủng hoảng nếu bị de dọa và tấn công
    - Hỏi đáp các vấn đề liên quan phòng ngừa rủi ro, phòng ngừa mấy dữ liệu quan trọng dành riêng cho CEO, lãnh đạo tổ chức, doanh nghiệp, cá nhân muốn làm nghề 
    - Quà tặng voucher ưu đãi khóa học trị giá đến 400.000đ cho các khách tham gia buổi tọa đàm trực tuyến 🎁
    - Thông qua buổi tọa đàm trực tuyến này,các doanh nghiệp có thể giao lưu và đặt câu hỏi trực tiêp với :
       + Thầy Võ Đỗ Thắng – Chuyên gia, giảng viên  an ninh mạng 
       + Thầy Trương Thái Kiệt – Chuyên gia, giảng viên  an ninh mạng 
    - Hình thức : Online qua Google Meets
    - Thời gian 9:00 -11:00, sáng  Thứ 7 Ngày 30/03/2023
    --------------------------------------------
    KHOA CÔNG NGHỆ THÔNG TIN 
    TRƯỜNG ĐẠI HỌC KINH TẾ - KỸ THUẬT CÔNG NGHIỆP 
    Cơ sở Hà Nội: Số 218 Lĩnh Nam, Hoàng Mai, Hà Nội. 
    Cơ sở Nam Định: 353 Trần Hưng Đạo, TP. Nam Định. 
    [Thông tin liên hệ]
    Page Khoa Công nghệ thông tin:
    https://www.facebook.com/cntt.ktktcn 
    Website Khoa Công nghệ thông tin: 
    https://khoacntt.uneti.edu.vn/ 
    Cổng thông tin việc làm Khoa Công nghệ thông tin: https://vieclam-khoacntt.uneti.edu.vn/
    Page Câu lạc bộ Tin học (ITC):
    https://www.facebook.com/InformationTechnologyClub.uneti 
    Nhóm cựu Sinh viên Khoa Công nghệ thông tin:
    https://www.facebook.com/groups/227524322389377 
    Kênh Tiktok Câu lạc bộ: 
    https://www.tiktok.com/@itc.uneti`
  },
  {
    id: "6",
    title:"Cuộc thi Olympic tin học",
    name:"[THÔNG BÁO CHÍNH THỨC PHÁT ĐỘNG CUỘC THI OLYMPIC TIN HỌC NĂM HỌC 2023-2024 ]",
    time: "28/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    author: "Câu lạc bộ tin học ITC",
    host: "CLB Tin Học",
    imageEvent:"/images/event3.jpeg",
    address: "Hội trường lớn - toà HA11 ",  
    description:`“Olympic Tin học” là cuộc thi nhằm thúc đẩy phong trào học tập, nâng cao kiến thức, rèn luyện kỹ năng tin học văn phòng, kỹ năng lập trình cho sinh viên trong nhà trường. Chỉ còn một thời gian ngắn nữa thôi, cuộc thi Olympic Tin học sinh viên cho toàn thể sinh viên các khoa trong Trường Đại học Kinh tế - Kỹ thuật Công nghiệp sẽ diễn ra. Không biết các bạn đã chuẩn bị cho bản thân đến đâu rồi nhỉ?? Tất cả các bạn đã sẵn sàng cả rồi chứ⁉
    Và dưới đây là một số thông tin chi tiết bạn cần 
    nắm được khi tham dự cuộc thi:
    I.  👨‍👩‍👦‍👦ĐỐI TƯỢNG THAM GIA: 
    1. Khối không chuyên tin học: 
    + Đối tượng dự thi: Khối thi này dành cho tất cả sinh viên năm nhất các ngành đào tạo mã ngành Công nghệ thông tin - Tin học (theo Thông tư 09/2022/TT-BGDĐT gồm các mã: 748xxxx: Máy tính và CNTT, 7460108- Khoa học dữ liệu, 7460107 - Khoa học tính toán, 7140210 - Sư phạm Tin học, 7460117 - Toán tin) hoặc tất cả sinh viên các ngành đào tạo khác mã ngành Công nghệ thông tin - Tin học (theo Thông tư 09/2022/TT-BGDĐT gồm các mã: 748xxxx: Máy tính và CNTT, 7460108- Khoa học dữ liệu, 7460107 - Khoa học tính toán, 7140210 - Sư phạm Tin học, 7460117 - Toán tin). 
    + Nội dung thi: Tin học văn phòng theo định dạng đề thi của hãng Microsoft (Microsoft Office Specialist).
    2. Khối chuyên tin học: 
    + Đối tượng dự thi: Dành cho sinh viên đào tạo theo mã ngành Công nghệ thông tin - Tin học (theo Thông tư 09/2022/TT-BGDĐT gồm các mã: 748xxxx: Máy tính và CNTT, 7460108- Khoa học dữ liệu, 7460107 - Khoa học tính toán, 7140210 - Sư phạm Tin học, 7460117 - Toán tin). Khuyến khích các sinh viên không thuộc các mã ngành đào tạo trên đăng ký dự thi. 
    + Nội dung thi: Thuật toán, cấu trúc dữ liệu và kỹ thuật lập trình.
    3. Khối siêu cup tin học:
    + Đối tượng dự thi: Khối thi này dành cho các sinh viên năm cuối được đào tạo theo mã ngành Công nghệ thông tin - Tin học, hoặc các sinh viên đã đạt giải trong các kỳ thi opympic tin học cấp trường, olympic tin học Quốc gia.
    + Nội dung thi: Thuật toán và cấu trúc dữ liệu nâng cao, tối ưuhóa và kỹ thuật lập trình nâng cao.
    II.  ⏰THỜI GIAN ĐĂNG KÝ:
    📌 Từ ngày 22/03/2024 đến trước ngày 28/03/2024: Sinh viên toàn trường đăng ký theo 
    Google Form:
    https://forms.gle/NxkDpWYzr3CW9FcdA
    III. 📗NỘI DUNG DỰ THI:
    1. Thi tin học văn phòng theo định dạng đề thi của hãng Microsoft Office Specialist) dành cho đối tượng chuyên tin và không chuyên.
    2. Giải các bài toán trên máy tính bằng ngôn ngữ lập trình dành cho đối tượng chuyên tin.
    IV.  🖥️CÔNG CỤ SỬ DỤNG:
    - Với sinh viên khoa Công nghệ thông tin: Ngôn ngữ lập trình C, C++, Java.
    - Với sinh viên thuộc các Khoa khác: Microsoft Office.
    V. 📜HÌNH THỨC THI: 
    Thực hành trên máy tính.
    👉👉👉CÒN CHẦN CHỪ GÌ NỮA, HÃY NHANH TAY ĐĂNG KÝ VÀ THỬ SỨC MÌNH TẠI OLYMPIC TIN HỌC NĂM HỌC 2023 - 2024 CÁC BẠN NHÉ!
    #ITC #CNTT #UNETI
    --------------------------------------------
    KHOA CÔNG NGHỆ THÔNG TIN 
    TRƯỜNG ĐẠI HỌC KINH TẾ - KỸ THUẬT CÔNG NGHIỆP 
    🏫Cơ sở Hà Nội: Số 218 Lĩnh Nam, Hoàng Mai, Hà Nội. 
    🏫Cơ sở Nam Định: 353 Trần Hưng Đạo, TP. Nam Định. 
    ☎️[Thông tin liên hệ]
    Page Khoa Công nghệ thông tin:
     🔗https://www.facebook.com/cntt.ktktcn  
    Website Khoa Công nghệ thông tin:  
    🔗https://khoacntt.uneti.edu.vn/  
    Page Câu lạc bộ Tin học (ITC):
    🔗https://www.facebook.com/InformationTechnologyClub.uneti  
    Nhóm cựu Sinh viên Khoa Công nghệ thông tin:
     🔗https://www.facebook.com/groups/227524322389377  
    Kênh Tiktok Câu lạc bộ: 
    🔗https://www.tiktok.com/@itc.uneti`

  }
]