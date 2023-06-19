import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  tr: {
    translation: {
      heroTitle: "Sağlıklı Bir Yaşama Fizyoterapi İle Kavuşun.",
      workingHours: "Çalışma Saatleri",
      orderAppointment: "Randevu Al",
      orderAppointmentText: "Size uygun randevuyu belirleyin.",
      monday: "pazartesi",
      saturday: "cumartesi",
      friday: "cuma",
      sunday: "pazar",
      perfectService: "Danışanlarımız için en iyi hizmeti sağlıyoruz",
      qualityService: "Kaliteli hizmet",
      physiotherapyService: "Fizyoterapi desteği",
      friendlyService: "Güleryüzlü hizmet",
      pleasentEnv: "Nezih ve samimi bir ortam",
      central: "Şehrin merkezinde",
      exerciseCounseling: "Egzersiz Danışmanlığı",
      exerciseCounselingShortText: "Rehabilitasyon İçin Egzersiz,Mat Pilates...",
      learnMore: "DETAYLAR",
      physicalTherapyInWomensHealth: "Kadın Sağlığında Fizik Tedavi",
      physicalTherapyInWomensHealthShortText: "İdrar Kaçırma, Sık Tuvalete çıkma...",
      physiotherapyConsulting: "Fizyoterapi Danışmanlığı",
      physiotherapyConsultingShortText: "Ortopedik Rehabilitasyon, Ağrı Tedavisi...",
    }
  },
  en: {
    translation: {
      heroTitle: "A Way to Healthy Life With Physiotherapy.",
      workingHours: "Working Hours",
      orderAppointment: "Order an Appointment",
      orderAppointmentText: "Select the appropriate appointment for you.",
      monday: "monday",
      saturday: "saturday",
      friday: "friday",
      sunday: "sunday",
      perfectService: "We provided perfect services for the patient",
      qualityService: "Quality service",
      physiotherapyService: "Physiotherapy service",
      friendlyService: "Friendly service",
      pleasentEnv: "A pleasant and friendly environment",
      central: "In the city center",
      exerciseCounseling: "Exercise Counseling",
      exerciseCounselingText: "Exercise for Rehabilitation, Mat Pilates...",
      learnMore: "DETAILS",
      physicalTherapyInWomensHealth: "Physical Therapy in Women's Health",
      physicalTherapyInWomensHealthShortText: "Urinary Incontinence, Frequent Going to the Toilet...",
      physiotherapyConsulting: "Physiotherapy Consulting",
      physiotherapyConsultingShortText: "Orthopedic Rehabilitation, Pain Management...",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;