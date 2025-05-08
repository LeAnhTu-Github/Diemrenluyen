"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";

const COLORS = ["#3D8AFF", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const BAR_COLORS = [
  "#3D8AFF", // Blue
  "#00C49F", // Teal
  "#FFBB28", // Yellow
  "#FF8042", // Orange
  "#8884D8", // Purple
  "#FF6B6B", // Red
  "#4CAF50", // Green
  "#9C27B0", // Deep Purple
  "#FF9800", // Amber
  "#2196F3", // Light Blue
];

const DashboardContent = () => {
  const [stats, setStats] = useState({
    doanCoSo: 0,
    chiDoan: 0,
    doanVien: 0,
    suKien: 0,
    danhGia: 0,
  });

  const [eventData, setEventData] = useState([]);
  const [evaluationData, setEvaluationData] = useState([]);

  const mockEventData = [
    { name: "Tình nguyện", participants: 67, label: "Hoạt động Tình nguyện" },
    { name: "Kỹ năng", participants: 58, label: "Rèn luyện Kỹ năng" },
    { name: "Sáng tạo", participants: 73, label: "Ý tưởng Sáng tạo" },
  ];

  const mockEvaluationData = [
    { name: "Xuất sắc", value: 40, label: "Đánh giá Xuất sắc" },
    { name: "Tốt", value: 30, label: "Đánh giá Tốt" },
    { name: "Khá", value: 20, label: "Đánh giá Khá" },
    { name: "Trung bình", value: 10, label: "Đánh giá Trung bình" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await axios.get("/api/dashboard/stats");
        setStats(statsResponse.data);

        const eventsResponse = await axios.get("/api/dashboard/events");
        setEventData(eventsResponse.data);

        const evaluationsResponse = await axios.get("/api/dashboard/evaluations");
        setEvaluationData(evaluationsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <CardHeader className="px-6 pt-4 pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800 tracking-tight group-hover:text-indigo-600 transition-colors">Đoàn cơ sở</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="text-3xl font-extrabold text-indigo-600 hover:text-indigo-700 transition-colors">{stats.doanCoSo}</div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <CardHeader className="px-6 pt-4 pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800 tracking-tight group-hover:text-indigo-600 transition-colors">Chi đoàn</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="text-3xl font-extrabold text-indigo-600 hover:text-indigo-700 transition-colors">{stats.chiDoan}</div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <CardHeader className="px-6 pt-4 pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800 tracking-tight group-hover:text-indigo-600 transition-colors">Đoàn viên</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="text-3xl font-extrabold text-indigo-600 hover:text-indigo-700 transition-colors">{stats.doanVien}</div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <CardHeader className="px-6 pt-4 pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800 tracking-tight group-hover:text-indigo-600 transition-colors">Sự kiện</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="text-3xl font-extrabold text-indigo-600 hover:text-indigo-700 transition-colors">{stats.suKien}</div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <CardHeader className="px-6 pt-4 pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800 tracking-tight group-hover:text-indigo-600 transition-colors">Đánh giá</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="text-3xl font-extrabold text-indigo-600 hover:text-indigo-700 transition-colors">{stats.danhGia}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white rounded-xl shadow-lg transition-all duration-300 border border-gray-100">
          <CardHeader className="px-6 pt-4 pb-2">
            <CardTitle className="text-xl font-semibold text-gray-800 tracking-tight">
              Số người tham gia theo sự kiện
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%" className="rounded-lg bg-white p-4 shadow-sm">
                <BarChart
                  data={mockEventData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  barCategoryGap="20%"
                  barGap={4}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={14}
                    label={{
                      value: 'Số người tham gia',
                      angle: -90,
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      padding: "12px",
                    }}
                    labelStyle={{ color: "#1f2937", fontWeight: "600" }}
                    itemStyle={{ color: "#6b7280" }}
                    formatter={(value, name, props) => [`${value} người`, props.payload.label]}
                  />
                  <Legend wrapperStyle={{ fontSize: "14px", color: "#6b7280" }} />
                  <Bar
                    dataKey="participants"
                    className="transition-all duration-300 hover:opacity-80"
                  >
                    {mockEventData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={BAR_COLORS[index % BAR_COLORS.length]}
                        name={entry.label}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-lg transition-all duration-300 border border-gray-100">
          <CardHeader className="px-6 pt-4 pb-2">
            <CardTitle className="text-xl font-semibold text-gray-800 tracking-tight">Phân bố đánh giá</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%" className="rounded-lg bg-white p-4 shadow-sm">
                <PieChart>
                  <Pie
                    data={mockEvaluationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {mockEvaluationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      padding: "12px",
                    }}
                    labelStyle={{ color: "#1f2937", fontWeight: "600" }}
                    itemStyle={{ color: "#6b7280" }}
                    formatter={(value, name, props) => [`${value} đánh giá`, props.payload.label]}
                  />
                  <Legend wrapperStyle={{ fontSize: "14px", color: "#6b7280" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;