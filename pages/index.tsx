//*Components
import Navbar from '../components/Navbar'; 
import WhiteWave from './../components/WhiteWave'; 
import WhiteWave2 from '../components/WhiteWave2'; 
import Slider from '../components/Slider'; 

import { useTranslation } from 'react-i18next';
import './../i18n';
import { useEffect } from 'react';
import { InfoCards } from '../components/InfoCards';
import $ from 'jquery';
import {TweenLite} from "gsap";
import { Services } from '../components/Services';

const Home = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    import('bootstrap');

    $.fn.parallax = function(resistance:any, mouse:any) {
      let el = $(this);
      TweenLite.to(el, 0.2, {
        x: ((mouse.clientX - window.innerWidth / 2) / resistance),
        y: ((mouse.clientY - window.innerHeight / 2) / resistance)
      });
    };
    
    $(document).mousemove(function(e:Event) {
      // $(".background").parallax(-30, e);
      $(".fza-parallax").parallax(40, e);
      // $(".cloud2").parallax(20, e);
      // $(".cloud3").parallax(30, e);
      });
  }, [])

  return (
    <div>
      <div className='fza-hero position-relative min-vh-100 d-flex flex-column'>
        <Navbar/>
        <div className='container flex-grow-1 d-flex flex-column'>
            <h1 className='text-light display-3 col-md-6 col-12 my-auto'>
              {t('heroTitle')}
            </h1>
        <InfoCards/>
        </div>
        <WhiteWave/>
      </div>

      <div className='bg-white d-flex'>
        <div className='container min-vh-100'>
          <div className='row h-100'>
            <div className='col-md-6 col-12 my-auto'>
              <h1>{t('perfectService')}</h1>
              <p>
                Lorem ipsum
              </p>
              <div className='row'>
                <div className='col-md-6 d-flex align-items-center mb-md-0 mb-3'>
                  <i className="bi bi-check-circle text-success fs-5 me-2"></i> {t('qualityService')}
                </div>

                <div className='col-md-6 d-flex align-items-center mb-md-0 mb-3'>
                  <i className="bi bi-check-circle text-success fs-5 me-2"></i> {t('physiotherapyService')}
                </div>

                <div className='col-md-6 d-flex align-items-center mb-md-0 mb-3'>
                  <i className="bi bi-check-circle text-success fs-5 me-2"></i> {t('friendlyService')}
                </div>

                <div className='col-md-6 d-flex align-items-center mb-md-0 mb-3'>
                  <i className="bi bi-check-circle text-success fs-5 me-2"></i> {t('pleasentEnv')}
                </div>

                <div className='col-md-6 d-flex align-items-center mb-md-0 mb-3'>
                  <i className="bi bi-check-circle text-success fs-5 me-2"></i> {t('central')}
                </div>
              </div>
            </div>
            <div className='fza-bg-physiotherapy position-relative col-md-6 col-12 h-100'>
              <div className='fza-parallax'></div>
            </div>
          </div>
          
        </div>
      </div>

      <div className='bg-light'>
        <WhiteWave2/>
        <Services/>
      </div>

    </div>
    
  )
}

export default Home
