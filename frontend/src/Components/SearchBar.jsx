import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนเส้นทาง

  const documents = [
    {
      name: "คคอ. บว.10 แบบขออนุมัติแต่งตั้งอาจารย์ที่ปรึกษาวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ",
      path: "/gs10report",
    },
    {
      name: "คคอ. บว.11 แบบขอเสนอโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ",
      path: "/gs11report",
    },
    {
      name: "คคอ. บว.12 แบบขอสอบหัวข้อวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ",
      path: "/gs12report",
    },
    {
      name: "คคอ. บว.13 แบบขอส่งโครงการวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ ฉบับแก้ไข",
      path: "/gs13report",
    },
    {
      name: "คคอ. บว.14 แบบขอสอบความก้าวหน้าวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ",
      path: "/gs14report",
    },
    {
      name: "คคอ. บว.15 แบบขอสอบป้องกันวิทยานิพนธ์/การศึกษาค้นคว้าอิสระ",
      path: "/gs15report",
    },
    {
      name: "คคอ. บว.16 แบบขอส่งเล่มวิทยานิพนธ์สมบูรณ์",
      path: "/gs16report",
    },
    {
      name: "คคอ. บว.17 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 1 แบบวิชาการ",
      path: "/gs17report",
    },
    {
      name: "คคอ. บว.18 แบบขอสอบประมวลความรู้",
      path: "/gs18report",
    },
    {
      name: "คคอ. บว.19 แบบขออนุมัติผลการสำเร็จการศึกษา นักศึกษาระดับปริญญาโท แผน 2 แบบวิชาชีพ",
      path: "/gs19report",
    },
    {
      name: "คคอ. บว. 23 แบบขอส่งเล่มการศึกษาค้นคว้าอิสระฉบับสมบูรณ์",
      path: "/gs23report",
    },
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(input.toLowerCase())
  );

  const handleItemClick = (path) => {
    navigate(path); // เปลี่ยนเส้นทางไปยัง path ที่กำหนด
  };

  return (
    <div>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          type="search"
          id="search-input"
          placeholder="ค้นหาเอกสาร..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {input && (
        <ul className="results-list">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc, index) => (
              <li
                key={index}
                className="result-item"
                onClick={() => handleItemClick(doc.path)} // เมื่อคลิกให้เปลี่ยนเส้นทาง
              >
                {doc.name}
              </li>
            ))
          ) : (
            <li className="no-results">ไม่พบข้อมูลที่คุณค้นหา</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
