import React, { useEffect, useState } from "react";
import { searchAppRatings } from "@/services/apprating.services";

interface AppRating {
  id: string;
  userId: string;
  username: string; // <-- Thêm dòng này
  star: number;
  description: string;
  appType: string;
  createdDate: string;
}

interface PageInfo {
  pageNum: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const AppRatingManagement: React.FC = () => {
  const [ratings, setRatings] = useState<AppRating[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchRatings = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await searchAppRatings({ pageNum, pageSize: 10 });
      setRatings(res.pageData ?? []);
      setPageInfo(res.pageInfo ?? null);
    } catch (err) {
      setRatings([]);
      setPageInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings(page);
  }, [page]);

  const handlePrev = () => {
    if (pageInfo && pageInfo.pageNum > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (pageInfo && pageInfo.pageNum < (pageInfo.totalPages ?? 1)) setPage(page + 1);
  };
  const handleRefresh = () => {
    fetchRatings(page);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-center text-[#FF9500] flex-1">
          Danh sách đánh giá app
        </h2>
        <button
          onClick={handleRefresh}
          className="ml-4 bg-[#FF9500] hover:bg-[#e68a00] text-white font-semibold px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Đang tải..." : "Tải lại"}
        </button>
      </div>
      {loading ? (
        <div>Đang tải...</div>
      ) : ratings.length === 0 ? (
        <div className="text-center">Không có dữ liệu.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border text-black font-semibold">#</th>
                <th className="px-4 py-2 border text-black font-semibold">Số sao</th>
                <th className="px-4 py-2 border text-black font-semibold">Mô tả</th>
                <th className="px-4 py-2 border text-black font-semibold">Loại app</th>
                <th className="px-4 py-2 border text-black font-semibold">Ngày tạo</th>
                <th className="px-4 py-2 border text-black font-semibold">Username</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-black">{(pageInfo?.pageSize ?? 10) * (page - 1) + idx + 1}</td>
                  <td className="px-4 py-2 border text-black font-bold">{item.star}★</td>
                  <td className="px-4 py-2 border text-black">{item.description}</td>
                  <td className="px-4 py-2 border text-black">{item.appType}</td>
                  <td className="px-4 py-2 border text-black">{new Date(item.createdDate).toLocaleString()}</td>
                  <td className="px-4 py-2 border text-black">{item.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {pageInfo && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={pageInfo.pageNum === 1}
            className={`px-4 py-2 rounded ${
              pageInfo.pageNum === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#FF9500] text-white hover:bg-[#e68a00]"
            }`}
          >
            Trang trước
          </button>
          <span className="text-black font-medium">
            Trang {pageInfo.pageNum}/{pageInfo.totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={pageInfo.pageNum === pageInfo.totalPages}
            className={`px-4 py-2 rounded ${
              pageInfo.pageNum === pageInfo.totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#FF9500] text-white hover:bg-[#e68a00]"
            }`}
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
};

export default AppRatingManagement;
