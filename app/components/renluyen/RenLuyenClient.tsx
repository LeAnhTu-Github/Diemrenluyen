// // app/components/renluyen/RenLuyenClient.tsx
// 'use client';

// import { useState, useEffect, useCallback, useMemo } from "react";
// // import { useRouter } from "next/navigation"; // Không dùng nếu gọi action trực tiếp
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { ChiDoan, RenLuyen } from "@prisma/client";
// import { SafeDoanVienForRenLuyen, RenLuyenEntry, RenLuyenDataMap } from "@/app/actions/getDoanViensWithRenLuyen"; // Import types từ action
// import Container from "@/app/components/Container";
// import Heading from "@/app/components/Heading";
// import RenLuyenFilters from "./RenLuyenFilters";
// import RenLuyenTable from "./RenLuyenTable";
// import getDoanViensWithRenLuyenAction from "@/app/actions/getDoanViensWithRenLuyen"; // Đổi tên import để rõ ràng là action

// type ChiDoanOption = Pick<ChiDoan, 'maCD' | 'tenCD'>;

// interface RenLuyenClientProps {
//   chiDoans: ChiDoanOption[];
//   hocKyList: number[];
//   initialSelectedMaCD?: string | null;
//   initialSelectedHocKy?: number | null;
//   initialDoanViens: SafeDoanVienForRenLuyen[];
//   initialRenLuyenData: RenLuyenDataMap;
// }

// const RenLuyenClient: React.FC<RenLuyenClientProps> = ({
//   chiDoans,
//   hocKyList,
//   initialSelectedMaCD = chiDoans[0]?.maCD || null,
//   initialSelectedHocKy = hocKyList[0] || null,
//   initialDoanViens,
//   initialRenLuyenData,
// }) => {
//   // const router = useRouter(); // Không cần thiết nếu chỉ cập nhật state
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(false);
//   const [selectedMaCD, setSelectedMaCD] = useState<string | null>(initialSelectedMaCD);
//   const [selectedHocKy, setSelectedHocKy] = useState<number | null>(initialSelectedHocKy);
//   const [displayedDoanViens, setDisplayedDoanViens] = useState<SafeDoanVienForRenLuyen[]>(initialDoanViens);
//   const [renLuyenData, setRenLuyenData] = useState<RenLuyenDataMap>(initialRenLuyenData);

//   const XEP_LOAI_OPTIONS = useMemo(() => ['Xuất sắc', 'Tốt', 'Khá', 'Trung bình', 'Yếu', 'Kém'], []);

//   const fetchData = useCallback(async (maCD: string, hocKy: number) => {
//     setIsFetching(true);
//     setDisplayedDoanViens([]);
//     setRenLuyenData({});
//     try {
//        const result = await getDoanViensWithRenLuyenAction({ maCD, hocKy }); // Gọi action
//        if(result) {
//          setDisplayedDoanViens(result.doanViens);
//          setRenLuyenData(result.renLuyenMap);
//        } else {
//          toast.error('Không thể tải dữ liệu rèn luyện.');
//        }
//     } catch (error) {
//       toast.error('Lỗi khi tải dữ liệu rèn luyện.');
//       console.error("Fetch data error:", error);
//     } finally {
//       setIsFetching(false);
//     }
//   }, []);

//   useEffect(() => {
//     // Chỉ fetch nếu có cả maCD và hocKy được chọn
//     // và chúng khác với giá trị ban đầu (để tránh fetch khi mới load nếu đã có initial data)
//     if (selectedMaCD && selectedHocKy !== null ) {
//         // Kiểm tra nếu lựa chọn thay đổi so với ban đầu HOẶC nếu không có dữ liệu ban đầu
//         if(selectedMaCD !== initialSelectedMaCD || selectedHocKy !== initialSelectedHocKy || initialDoanViens.length === 0){
//              fetchData(selectedMaCD, selectedHocKy);
//         } else {
//             // Nếu không thay đổi và đã có initial data, dùng initial data
//              setDisplayedDoanViens(initialDoanViens);
//              setRenLuyenData(initialRenLuyenData);
//         }
//     } else {
//       setDisplayedDoanViens([]);
//       setRenLuyenData({});
//     }
//   // Thêm initial values vào dependencies để xử lý đúng khi quay lại trang
//   }, [selectedMaCD, selectedHocKy, fetchData, initialSelectedMaCD, initialSelectedHocKy, initialDoanViens, initialRenLuyenData]);

//   const handleSaveRow = useCallback(async (maDV: string, diem: number | null, xepLoai: string) => {
//     if (selectedHocKy === null) {
//         toast.error("Vui lòng chọn học kỳ."); return;
//     }
//     // ... (Validation như cũ) ...
//      if (diem !== null && (isNaN(diem) || diem < 0 || diem > 100)) {
//         toast.error(`Điểm của ${maDV} phải là số từ 0-100 hoặc để trống.`); return;
//      }
//       if (diem === null && xepLoai !== '') {
//          toast.error(`Không thể có xếp loại khi điểm trống cho ${maDV}.`); return;
//      }
//      if (diem !== null && !xepLoai) {
//           toast.error(`Vui lòng chọn xếp loại cho ${maDV}.`); return;
//      }
//      if(xepLoai && !XEP_LOAI_OPTIONS.includes(xepLoai) && xepLoai !== ''){
//          toast.error(`Xếp loại không hợp lệ cho ${maDV}.`); return;
//      }

//     setIsLoading(true); // Dùng isLoading chung khi lưu
//     try {
//         // ================================================================
//         // ====> THAY ĐỔI API CALL Ở ĐÂY <====
//         // Sử dụng URL API mới đã định nghĩa trong cấu trúc thư mục của bạn
//         await axios.put(`/api/doanvien/${maDV}/renluyen/${selectedHocKy}`, {
//             diem: diem, // API backend sẽ xử lý null
//             xepLoai: xepLoai === '' ? null : xepLoai // Gửi null nếu xếp loại rỗng
//         });
//         // ================================================================

//         toast.success(`Đã lưu rèn luyện cho ${maDV} - HK ${selectedHocKy}`);
//         // Cập nhật state cục bộ để UI phản ánh ngay lập tức
//         setRenLuyenData(prevData => ({
//             ...prevData,
//             [maDV]: { diem: diem ?? 0, xepLoai }
//         }));
//     } catch (error: any) {
//         console.error("Save row error:", error);
//         toast.error(error?.response?.data?.message || 'Lỗi khi lưu rèn luyện.');
//     } finally {
//         setIsLoading(false);
//     }
//   }, [selectedHocKy, XEP_LOAI_OPTIONS]);

//   return (
//     <Container>
//       <div className="flex flex-col gap-6 p-4 md:p-6"> {/* Thêm padding */}
//         <Heading
//           title="Quản lý Rèn luyện"
//           subtitle="Cập nhật điểm và xếp loại rèn luyện cho đoàn viên theo học kỳ"
//         />
//         <RenLuyenFilters
//           chiDoans={chiDoans}
//           hocKyList={hocKyList}
//           selectedMaCD={selectedMaCD}
//           selectedHocKy={selectedHocKy}
//           onChiDoanChange={setSelectedMaCD} // Truyền trực tiếp hàm setter
//           onHocKyChange={(hk) => setSelectedHocKy(hk)} // Truyền trực tiếp hàm setter
//           disabled={isFetching || isLoading}
//         />
//         <RenLuyenTable
//           doanViens={displayedDoanViens}
//           renLuyenData={renLuyenData}
//           xepLoaiOptions={XEP_LOAI_OPTIONS}
//           onSaveRow={handleSaveRow}
//           isLoading={isLoading || isFetching}
//           selectedHocKy={selectedHocKy}
//         />
//          {isFetching && <div className="text-center p-4">Đang tải dữ liệu...</div>}
//          {!isFetching && displayedDoanViens.length === 0 && selectedMaCD && selectedHocKy !== null && (
//             <div className="text-center p-4 text-gray-500">Không có đoàn viên trong chi đoàn này hoặc chưa chọn học kỳ.</div>
//          )}
//          {(!selectedMaCD || selectedHocKy === null) && !isFetching && (
//              <div className="text-center p-4 text-gray-500">Vui lòng chọn Chi đoàn và Học kỳ.</div>
//          )}
//       </div>
//     </Container>
//   );
// };

// export default RenLuyenClient;