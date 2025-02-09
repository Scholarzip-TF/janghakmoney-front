import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header/Header';
import { locations } from '../../data/locations';
import { universities } from '../../data/universities';
import { SurveyForm, Step } from '../../types/form';
import { createUser } from '../../api/users';
import './Survey.css';

export const Survey = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [searchValue, setSearchValue] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filteredUniversities, setFilteredUniversities] = useState<string[]>([]);

  const [formData, setFormData] = useState<SurveyForm>({
    region: {
      sido: '',
      sigungu: ''
    },
    incomeLevel: null,
    university: '',
    otherUniversity: '',
    scholarships: {
      tuitionFull: false,
      livingExpenses: false
    },
    phoneNumber: '',
    agreement: false
  });

  useEffect(() => {
    if (searchValue) {
      const filtered = universities.filter(uni => 
        uni.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredUniversities(filtered);
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  }, [searchValue]);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length > 11) return numbers.slice(0, 11);
    return numbers;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phoneNumber: formatted });
  };

  const handleNext = async () => {
    if (!isCurrentStepValid()) return;
    
    if (currentStep < 5) {
      setCurrentStep(prev => (prev + 1) as Step);
    } else {
      try {
        const requestData = {
          phone: formData.phoneNumber,
          universityName: formData.university,
          majorRegionName: formData.region.sido,
          minorRegionName: formData.region.sigungu,
          incomeLevel: formData.incomeLevel!,
          hasLivingExpenseScholarship: formData.scholarships.livingExpenses,
          hasFullTuitionScholarship: formData.scholarships.tuitionFull,
        };

        console.log('Create User Request:', requestData); // 디버깅용 로그 추가

        const response = await createUser(requestData);
        console.log('Create User Response:', response); // 디버깅용 로그 추가

        navigate('/result', { 
          state: {
            ...response,
            hasFullTuition: response.hasFullTuitionScholarship,
            hasScholarship: response.hasLivingExpenseScholarship,
            phoneNumber: response.phone
          }
        });
      } catch (error) {
        console.error('Failed to submit survey:', error);
      }
    }
  };


 const handleBack = () => {
   if (currentStep > 1) {
     setCurrentStep(prev => (prev - 1) as Step);
   }
 };

 const isCurrentStepValid = (): boolean => {
   switch(currentStep) {
     case 1:
       return formData.region.sido !== '' && formData.region.sigungu !== '';
     case 2:
       return formData.incomeLevel !== null;
     case 3:
       return formData.university !== '';
     case 4:
       return true;
     case 5:
       const phonePattern = /^010\d{8}$/;
       return phonePattern.test(formData.phoneNumber) && formData.agreement;
     default:
       return false;
   }
 };

 return (
   <>
     <Header />
     <div className="survey-page">
       <div className="survey-container">
         <div className="progress-bar">
           {[1, 2, 3, 4, 5].map((step) => (
             <div 
               key={step} 
               className={`progress-dot ${step <= currentStep ? 'active' : ''}`} 
             />
           ))}
         </div>

         <div className="survey-content">
           {currentStep === 1 && (
             <>
               <h2>거주하시는 지역을 선택해주세요</h2>
               <p className="description">장학금 지원 가능 지역을 확인하기 위해 필요합니다</p>
               <div className="select-group">
                 <select 
                   value={formData.region.sido}
                   onChange={(e) => {
                     setFormData({
                       ...formData,
                       region: { sido: e.target.value, sigungu: '' }
                     });
                   }}
                   className="select-field"
                 >
                   <option value="">시/도 선택</option>
                   {locations.map(location => (
                     <option key={location.sido} value={location.sido}>
                       {location.sido}
                     </option>
                   ))}
                 </select>
                 
                 <select
                   value={formData.region.sigungu}
                   onChange={(e) => {
                     setFormData({
                       ...formData,
                       region: { ...formData.region, sigungu: e.target.value }
                     });
                   }}
                   className="select-field"
                   disabled={!formData.region.sido}
                 >
                   <option value="">시/군/구 선택</option>
                   {formData.region.sido && locations
                     .find(loc => loc.sido === formData.region.sido)
                     ?.sigungu.map(sigungu => (
                       <option key={sigungu} value={sigungu}>
                         {sigungu}
                       </option>
                     ))}
                 </select>
               </div>
             </>
           )}

           {currentStep === 2 && (
             <>
               <h2>소득분위를 선택해주세요</h2>
               <p className="description">한국장학재단 소득분위 기준입니다</p>
               <div className="radio-group">
               {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <div 
                  key={level} 
                  className={`radio-button ${formData.incomeLevel === level ? 'selected' : ''}`}
                  onClick={() => setFormData({
                    ...formData,
                    incomeLevel: level
                  })}
                >
                  {level}분위
                </div>
              ))}
               </div>
             </>
           )}

           {currentStep === 3 && (
             <>
               <h2>소속 대학을 선택해주세요</h2>
               <p className="description">현재 재학/휴학 중인 대학을 선택해주세요</p>
               <div className="search-container">
                 <input
                   type="text"
                   className="search-input"
                   placeholder="대학명을 입력하세요"
                   value={searchValue}
                   onChange={(e) => setSearchValue(e.target.value)}
                 />
                 {showAutocomplete && (
                   <div className="autocomplete-list">
                     {filteredUniversities.map((uni) => (
                       <div
                         key={uni}
                         className="autocomplete-item"
                         onClick={() => {
                           setFormData({ ...formData, university: uni });
                           setSearchValue(uni);
                           setShowAutocomplete(false);
                         }}
                       >
                         {uni}
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             </>
           )}

           {currentStep === 4 && (
             <>
               <h2>장학금 수혜 여부를 선택해주세요</h2>
               <p className="description">현재 기준으로 체크해주세요. 중복 체크 가능합니다.</p>
               <div className="checkbox-container">
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={formData.scholarships.tuitionFull}
                    onChange={(e) => setFormData({
                      ...formData,
                      scholarships: {
                        ...formData.scholarships,
                        tuitionFull: e.target.checked
                      }
                    })}
                  />
                  <span>전액 장학금을 받아 등록금을 내지 않으시나요?</span>
                </label>
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={formData.scholarships.livingExpenses}
                    onChange={(e) => setFormData({
                      ...formData,
                      scholarships: {
                        ...formData.scholarships,
                        livingExpenses: e.target.checked
                      }
                    })}
                  />
                  <span>등록금성 장학금 외 생활비 장학금을 수혜중이신가요?</span>
                </label>
              </div>
             </>
           )}

           {currentStep === 5 && (
             <>
               <h2>전화번호를 입력해주세요</h2>
               <p className="description">추가로 장학정보를 받아보실 연락처를 입력해주세요</p>
                 <div className="input-container">
                  <input
                    type="tel"
                    className="phone-input"
                    placeholder="'-' 없이 입력해주세요"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    maxLength={11}
                  />
                <label className="checkbox-option tooltip">
                  <input
                    type="checkbox"
                    checked={formData.agreement}
                    onChange={(e) =>
                      setFormData({ ...formData, agreement: e.target.checked })
                    }
                  />
                  <span>개인정보 수집 및 이용에 동의합니다</span>
                  <span className="tooltiptext">
                    <strong>개인정보 수집 및 이용 안내</strong>
                    <br />
                    1. 개인정보의 수집 이용 목적: 장학정보제공
                    <br />
                    2. 수집하는 개인정보의 항목: 휴대폰 번호
                    <br />
                    3. 개인정보의 보유 및 이용 기간: 개인정보의 수집·이용 목적 달성시까지, 또는 고객이 자신의 개인정보 제공 동의를 철회한 때.
                    단, 관련 법령의 규정에 따라 보유할 필요가 있는 경우 해당 법령에서 정한 기간까지.
                    <br />
                    4. 본 이벤트 참여 고객은 개인정보 수집, 활용에 대해 동의를 거부할 권리가 있으며, 비동의 시 신청이 정상적으로 접수되지 않습니다.
                    <br />
                    동의하시는 경우, 체크박스를 클릭해주십시오.
                  </span>
                </label>
                 </div>
             </>
           )}
         </div>

         <div className="button-container">
           {currentStep > 1 && (
             <Button 
               variant="secondary"
               size="large"
               onClick={handleBack}
             >
               이전
             </Button>
           )}
             <Button 
             size="large" 
             onClick={() => {
               if (isCurrentStepValid()) {
               handleNext();
               } else {
               alert('현재 단계의 모든 필드를 올바르게 입력해주세요.');
               }
             }}
             fullWidth={currentStep === 1}
             >
             {currentStep === 5 ? '완료' : '다음'}
             </Button>
         </div>
       </div>
     </div>
   </>
 );
};