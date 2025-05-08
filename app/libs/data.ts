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
    { id: 11, description: 'Không tham gia học tập "Tuần sinh hoạt công dân HSSV" đầu năm học' },
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
      link: "https://uneti.edu.vn/hoi-thao-khoa-hoc-cong-nghe-2024",
      status: {
        join: true,
        signup: false,
        notjoin: false,
      },
    },
    {
      id: 2,
      event: "Workshop trí tuệ nhân tạo",
      time: "20/3/2024",
      link: "https://uneti.edu.vn/workshop-ai-2024",
      status: {
        join: false,
        signup: true,
        notjoin: false,
      },
    },
    {
      id: 3,
      event: "Cuộc thi lập trình CodeWar",
      time: "25/3/2024",
      link: "https://uneti.edu.vn/codewar-2024",
      status: {
        join: false,
        signup: false,
        notjoin: true,
      },
    },
    {
      id: 4,
      event: "Seminar về Blockchain",
      time: "1/4/2024",
      link: "https://uneti.edu.vn/seminar-blockchain-2024",
      status: {
        join: true,
        signup: false,
        notjoin: false,
      },
    },
    {
      id: 5,
      event: "Hackathon IoT 2024",
      time: "5/4/2024",
      link: "https://uneti.edu.vn/hackathon-iot-2024",
      status: {
        join: true,
        signup: false,
        notjoin: false,
      },
    },
    {
      id: 6,
      event: "Workshop về Cloud Computing",
      time: "10/4/2024",
      link: "https://uneti.edu.vn/workshop-cloud-2024",
      status: {
        join: true,
        signup: false,
        notjoin: false,
      },
    },
    {
      id: 7,
      event: "Cuộc thi Olympic Tin học",
      time: "15/4/2024",
      link: "https://uneti.edu.vn/olympic-tin-hoc-2024",
      status: {
        join: false,
        signup: true,
        notjoin: false,
      },
    },
    {
      id: 8,
      event: "Hội thảo về An toàn thông tin",
      time: "20/4/2024",
      link: "https://uneti.edu.vn/hoi-thao-an-toan-thong-tin-2024",
      status: {
        join: false,
        signup: false,
        notjoin: true,
      },
    },
    {
      id: 9,
      event: "Workshop về DevOps",
      time: "25/4/2024",
      link: "https://uneti.edu.vn/workshop-devops-2024",
      status: {
        join: true,
        signup: false,
        notjoin: false,
      },
    },
    {
      id: 10,
      event: "Cuộc thi lập trình ACM",
      time: "1/5/2024",
      link: "https://uneti.edu.vn/acm-2024",
      status: {
        join: false,
        signup: true,
        notjoin: false,
      },
    },
    {
      id: 11,
      event: "Seminar về Machine Learning",
      time: "5/5/2024",
      link: "https://uneti.edu.vn/seminar-ml-2024",
      status: {
        join: false,
        signup: false,
        notjoin: true,
      },
    },
  ];
  
