import { useTranslation } from "react-i18next";

export const InfoCards = function(){
  const { t, i18n } = useTranslation();
  
  return (
    <div className='row mt-auto fzt-z-1'>
        <div className='col-xxl-3 col-lg-4 col-md-6 col-9 mb-md-0 mb-5 mx-md-0 mx-auto'>
          <div className='fza-infocard bg-primary text-white shadow fza-rounded w-100 h-100 p-3'>
            <div className="d-flex">
              <span className="fza-infocard-icon display-3"><i className="bi bi-clock-fill"></i></span>
              <h4 className='fw-semibold'>
                {t('workingHours')}
              </h4>
            </div>
            <p className='border-bottom border-white mb-0 pb-3'>
              <span>{t('monday')} - {t('friday')}</span><span className='float-end'>08:30 - 22:00</span>
            </p>
            <p className='mb-0 pt-3'>
              <span>{t('saturday')} - {t('sunday')}</span><span className='float-end'>08:30 - 19:00</span>
            </p>
          </div>
        </div>

        <div className='col-xxl-3 col-lg-4 col-md-6 col-9 mb-md-0 mb-5 mx-md-0 mx-auto'>
          <a href="#" className="h-100 text-decoration-none">
            <div className='fza-infocard bg-primary text-white shadow fza-rounded w-100 h-100 p-3'>
              <div className="d-flex">
                <span className="fza-infocard-icon display-3"><i className="bi bi-calendar-week-fill"></i></span>
                <h4 className='fw-semibold'>
                  {t('orderAppointment')}
                </h4>
              </div>
              <p className='mb-0 ps-md-5 ps-4 ms-xl-1'>
                <span>{t('orderAppointmentText')}</span>
              </p>
            </div>
          </a>
        </div>
    </div>
  )
}