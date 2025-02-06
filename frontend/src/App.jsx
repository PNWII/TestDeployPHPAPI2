import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//import ProtectedRoute from "./Components/ProtectedRoute";
import RoleBasedRoute from "./Components/RoleBasedRoute";
import RegisterStudent from "./ComponentsDocument/RegisterLogin/RegisterStudent";
import RegisterTeacher from "./ComponentsDocument/RegisterLogin/RegisterTeacher";
import LoginStudent from "./ComponentsDocument/RegisterLogin/LoginStudent";
import LoginTeacher from "./ComponentsDocument/RegisterLogin/LoginTeacher";
import LoginAdmin from "./ComponentsDocument/RegisterLogin/LoginAdmin";
import GraduateOfficerPage from "./GraduateOfficerPage";
import AdminPage from "./AdminPage";
import Home from "./Home";
import TeacherPage from "./TeacherPage";
import ChairpersonCurriculumPage from "./ChairpersonCurriculumPage";
import AcademicResearchAssociateDeanPage from "./AcademicResearchAssociateDeanPage";
import IndustrialEducationDeanPage from "./IndustrialEducationDeanPage";
import Gs10report from "./DocumentForm/Gs10report";
import Gs11report from "./DocumentForm/Gs11report";
import Gs12report from "./DocumentForm/Gs12report";
import Gs13report from "./DocumentForm/Gs13report";
import Gs14report from "./DocumentForm/Gs14report";
import Gs15report from "./DocumentForm/Gs15report";
import Gs16report from "./DocumentForm/Gs16report";
import Gs17report from "./DocumentForm/Gs17report";
import Gs18report from "./DocumentForm/Gs18report";
import Gs19report from "./DocumentForm/Gs19report";
import Gs23report from "./DocumentForm/Gs23report";
import ViewStudentTeacher from "./ComponentsDocument/ViewStudent/ViewStudentTeacher";
import ViewStudentOfficer from "./ComponentsDocument/ViewStudent/ViewStudentOfficer";
import ViewStudentIndustrialEducationDean from "./ComponentsDocument/ViewStudent/ViewStudentIndustrialEducationDean";
import ViewStudentChairpersonCurriculum from "./ComponentsDocument/ViewStudent/ViewStudentChairpersonCurriculum";
import ViewStudentAcademicResearchAssociateDean from "./ComponentsDocument/ViewStudent/ViewStudentAcademicResearchAssociateDean";
import HistoryDocumentStudent from "./HistoryDocumentStudent";
import HistoryDocumentAdmin from "./HistoryDocumentAdmin";
import ProfileStudent from "./ComponentsDocument/Profile/ProfileStudent";
import ProfileTeacher from "./ComponentsDocument/Profile/ProfileTeacher";
import ProfileAdmin from "./ComponentsDocument/Profile/ProfileAdmin";
import ProfileChairpersonCurriculum from "./ComponentsDocument/Profile/ProfileChairpersonCurriculum";
import ProfileGraduateOfficer from "./ComponentsDocument/Profile/ProfileGraduateOfficer";
import ProfileAcademicResearchAssociateDean from "./ComponentsDocument/Profile/ProfileAcademicResearchAssociateDean";
import ProfileIndustrialEducationDean from "./ComponentsDocument/Profile/ProfileIndustrialEducationDean";
import AdvicePage from "./ComponentsDocument/AdvicePage";
import AboutPageAdmin from "./ComponentsDocument/About/AboutPageAdmin";
import AboutPageTeacher from "./ComponentsDocument/About/AboutPageTeacher";
import AboutPageChairpersonCurriculum from "./ComponentsDocument/About/AboutPageChairpersonCurriculum";
import AboutPageGraduateOfficer from "./ComponentsDocument/About/AboutPageGraduateOfficer";
import AboutPageAcademicResearchAssociateDean from "./ComponentsDocument/About/AboutPageAcademicResearchAssociateDean";
import AboutPageIndustrialEducationDean from "./ComponentsDocument/About/AboutPageIndustrialEducationDean";

function App() {
  return (
    <Router>
      <Routes>
        {/* หน้าเริ่มต้น */}
        <Route path="/" element={<LoginStudent />} />
        <Route path="/loginteacher" element={<LoginTeacher />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />

        {/* หน้า Register */}
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/registerteacher" element={<RegisterTeacher />} />

        <Route path="/profileteacher" element={<ProfileTeacher />} />
        <Route
          path="/profilechairperson-curriculum"
          element={<ProfileChairpersonCurriculum />}
        />
        <Route
          path="/profilegraduate-officer"
          element={<ProfileGraduateOfficer />}
        />
        <Route
          path="/profileacademic-research-associate-dean"
          element={<ProfileAcademicResearchAssociateDean />}
        />
        <Route
          path="/profileindustrial-education-dean"
          element={<ProfileIndustrialEducationDean />}
        />
        <Route path="/aboutpageteacher" element={<AboutPageTeacher />} />
        <Route path="/aboutpageadmin" element={<AboutPageAdmin />} />
        <Route
          path="/aboutpagechairperson-curriculum"
          element={<AboutPageChairpersonCurriculum />}
        />
        <Route
          path="/aboutpagegraduate-officer"
          element={<AboutPageGraduateOfficer />}
        />
        <Route
          path="/aboutpageacademic-research-associate-dean"
          element={<AboutPageAcademicResearchAssociateDean />}
        />
        <Route
          path="/aboutpageindustrial-education-dean"
          element={<AboutPageIndustrialEducationDean />}
        />

        {/* หน้า Role-Based */}
        <Route
          path="/adminpage"
          element={
            <RoleBasedRoute role="admin">
              <AdminPage />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/profileadmin"
          element={
            <RoleBasedRoute role="admin">
              <ProfileAdmin />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/historydocumentadmin"
          element={
            <RoleBasedRoute role="admin">
              <HistoryDocumentAdmin />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/teacherpage"
          element={
            <RoleBasedRoute role="ครูอาจารย์ที่ปรึกษา">
              <TeacherPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/viewstudentteacher"
          element={
            <RoleBasedRoute role="ครูอาจารย์ที่ปรึกษา">
              <ViewStudentTeacher />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/chairperson-curriculum"
          element={
            <RoleBasedRoute role="ประธานคณะกรรมการบริหารหลักสูตร">
              <ChairpersonCurriculumPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/viewstudent-chairperson-curriculum"
          element={
            <RoleBasedRoute role="ประธานคณะกรรมการบริหารหลักสูตร">
              <ViewStudentChairpersonCurriculum />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/graduate-officer"
          element={
            <RoleBasedRoute role="เจ้าหน้าที่บัณฑิตศึกษาประจำคณะครุศาสตร์อุตสาหกรรม">
              <GraduateOfficerPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/viewstudent-officer"
          element={
            <RoleBasedRoute role="เจ้าหน้าที่บัณฑิตศึกษาประจำคณะครุศาสตร์อุตสาหกรรม">
              <ViewStudentOfficer />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/academic-research-associate-dean"
          element={
            <RoleBasedRoute role="รองคณบดีฝ่ายวิชาการและวิจัย">
              <AcademicResearchAssociateDeanPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/viewstudent-academic-research-associate-dean"
          element={
            <RoleBasedRoute role="รองคณบดีฝ่ายวิชาการและวิจัย">
              <ViewStudentAcademicResearchAssociateDean />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/industrial-education-dean"
          element={
            <RoleBasedRoute role="คณบดีคณะครุศาสตร์อุตสาหกรรม">
              <IndustrialEducationDeanPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/viewstudent-industrial-education-dean"
          element={
            <RoleBasedRoute role="คณบดีคณะครุศาสตร์อุตสาหกรรม">
              <ViewStudentIndustrialEducationDean />
            </RoleBasedRoute>
          }
        />
        {/* รายงานเอกสาร */}
        <Route
          path="/gs10report"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Gs10report />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/gs11report"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Gs11report />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/gs12report"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Gs12report />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/gs13report"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Gs13report />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/gs14report"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Gs14report />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/gs15report"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Gs15report />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/gs16report"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Gs16report />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/gs17report"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Gs17report />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/gs18report"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Gs18report />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/gs19report"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Gs19report />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/gs23report"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Gs23report />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/profilestudent"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <ProfileStudent />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/advicepage"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <AdvicePage />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/historydocumentstudent"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <HistoryDocumentStudent />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <RoleBasedRoute role="นักเรียนนักศึกษา">
              <Home />
            </RoleBasedRoute>
          }
        />

        {/* เส้นทางสำรอง */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
