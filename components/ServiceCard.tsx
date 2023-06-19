import { useTranslation } from "react-i18next";

export const ServiceCard = function(props:any){
  const { t, i18n } = useTranslation();
  
  return (
    <div className='col-md-3 col-sm-6 col-12 mb-md-0 mb-5'>
      <div className="fza-service-card d-flex flex-column rounded-4 bg-secondary shadow p-3 gap-3 h-100">
        <div className={`fza-service-card__icon fza-service-card__icon--${props.icon}`}></div>
        <h2>{props.title}</h2>
        <p className="mb-5">
          {props.text}
        </p>
        <a href="#" className="btn btn-outline-secondary mx-auto px-5 mt-auto">{t('learnMore')}</a>
      </div>
    </div>
  )
}