import { useTranslation } from "react-i18next";
import { ServiceCard } from "./ServiceCard";

export const Services = function(){
  const { t, i18n } = useTranslation();
  
  return (
    <div className="container">
      <div className='row justify-content-between'>
        <ServiceCard title= {t('exerciseCounseling')} icon="exercise-counseling" text={t('exerciseCounselingShortText')}/>
        <ServiceCard title= {t('physicalTherapyInWomensHealth')} icon="women-health" text={t('physicalTherapyInWomensHealthShortText')}/>
        <ServiceCard title= {t('physiotherapyConsulting')} icon="physiotherapy-consulting" text={t('physiotherapyConsultingShortText')}/>
    </div>
    </div>
  )
}