import { useState } from 'react';
import { Header } from '../../components/Header/Header';
import './Result.css';
import { IScholarship, scholarships } from '../../data/scholarships';

export const Result = () => {
 const [selectedScholarship, setSelectedScholarship] = useState<IScholarship | null>(null);

 const handleScholarshipClick = (scholarship: IScholarship) => {
   setSelectedScholarship(scholarship);
 };

 const handleCloseModal = () => {
   setSelectedScholarship(null);
 };

 return (
   <>
     <Header />
     <div className="result-page">
       <div className="scholarship-list">
         {scholarships.map((scholarship) => (
           <div 
             key={scholarship.id} 
             className="scholarship-card"
             onClick={() => handleScholarshipClick(scholarship)}
           >
             <h3>{scholarship.title}</h3>
             <div className="scholarship-info">
               <div className="info-row">
                 <span className="label">운영기관명</span>
                 <span>{scholarship.organization}</span>
               </div>
               <div className="info-row">
                 <span className="label">모집 상태</span>
                 <span className="status">{scholarship.status}</span>
               </div>
               <div className="info-row">
                 <span className="label">지원내용</span>
                 <span>{scholarship.amount}</span>
               </div>
               <div className="info-row">
                 <span className="label">모집종료일</span>
                 <span>{scholarship.deadline}</span>
               </div>
               {scholarship.note && (
                 <div className="info-row">
                   <span className="label">비고</span>
                   <span>{scholarship.note}</span>
                 </div>
               )}
             </div>
           </div>
         ))}
       </div>

       {selectedScholarship && (
         <div className="modal-overlay">
           <div className="modal">
             <div className="modal-header">
               <button className="close-button" onClick={handleCloseModal}>×</button>
             </div>
             <div className="modal-content">
               <h2>{selectedScholarship.title}</h2>
               <div className="scholarship-detail">
                 <div className="detail-row">
                   <span className="label">장학명</span>
                   <span>{selectedScholarship.title}</span>
                 </div>
                 <div className="detail-row">
                   <span className="label">운영기관명</span>
                   <span>{selectedScholarship.organization}</span>
                 </div>
                 <div className="detail-row">
                   <span className="label">모집 상태</span>
                   <span className="status">{selectedScholarship.status}</span>
                 </div>
                 <div className="detail-row">
                   <span className="label">지원내용</span>
                   <span>{selectedScholarship.amount}</span>
                 </div>
                 <div className="detail-row">
                   <span className="label">모집종료일</span>
                   <span>{selectedScholarship.deadline}</span>
                 </div>
                 {selectedScholarship.note && (
                   <div className="detail-row">
                     <span className="label">비고</span>
                     <span>{selectedScholarship.note}</span>
                   </div>
                 )}
                 <div className="detail-row">
                   <span className="label">링크</span>
                   <a href={selectedScholarship.link} target="_blank" rel="noopener noreferrer">
                     {selectedScholarship.link}
                   </a>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   </>
 );
};