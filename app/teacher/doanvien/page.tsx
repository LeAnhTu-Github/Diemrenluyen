import getDoanViens from "../../actions/getDoanViens";
import DoanVienClient from "../../components/doanvien/DoanVienClient";

const DoanVienPage = async () => {
  const doanViens = await getDoanViens();

  return (
    <DoanVienClient doanViens={doanViens} />
  );
}

export default DoanVienPage; 