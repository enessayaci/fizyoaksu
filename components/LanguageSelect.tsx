import React, { useEffect, useState } from 'react';
// import $ from 'jquery';
import i18next from 'i18next';

export const LanguageSelect = function(){
  const [currentLang, setCurrentLang] = useState(i18next.language);

  useEffect(()=>{
    i18next.changeLanguage(currentLang);
  },[currentLang]);
  
  return(
    <div>
    <div className="dropdown">
  <button className="btn btn-outline-primary d-flex align-items-center dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <CurrentLanguage currentLang={currentLang}/>
    {/* {(currentLang == 'tr' ? '<span class="rek-flag rek-flag-tr"></span>TR': currentLang=='en' ? (<span class="rek-flag rek-flag-en"></span>+'EN') : 'E NE O ZMN?')} */}
  </button>
  <ul className="dropdown-menu mt-1 dropdown-menu-end start-0">
  <li>
              <button className={"btn btn-transparent shadow-none d-flex w-100 text-dark" + (currentLang == 'tr' ? ' opacity-100' : ' opacity-50')} onClick={()=>{setCurrentLang('tr')}}>
                <div className='rek-flag rek-flag-tr me-1'></div>TR
              </button>
            </li>
            <li>
            <button className={"btn btn-transparent shadow-none d-flex w-100 text-dark" + (currentLang == 'en' ? ' opacity-100' : ' opacity-50')} onClick={()=>{setCurrentLang('en')}}>
                <div className='rek-flag rek-flag-en me-1'></div>EN
              </button>
            </li>
  </ul>
</div>
      {/* <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <ul>
            <li>
              <button className={"btn border border-white" + (currentLang == 'tr' ? 'btn-primary text-dark' : 'btn-transparent text-white')} onClick={()=>{i18next.changeLanguage('tr')}}>TR</button>
            </li>
            <li>
              <button className={"btn border border-white" + (currentLang == 'en' ? 'btn-primary text-dark' : 'btn-transparent text-white')} onClick={()=>{i18next.changeLanguage('tr')}}>EN</button>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  )
}

const CurrentLanguage = function({currentLang}){
  let _currentLang = currentLang.toUpperCase();

  return(
    <div className='d-flex'>
      <div className={"rek-flag me-1 rek-flag"+(currentLang == 'tr' ? '-tr' : currentLang == 'en' ? '-en' : 'e ama yani')}></div>{_currentLang}
    </div>
  )
}
