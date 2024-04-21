import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { tr } from "date-fns/locale/tr";
registerLocale("tr", tr);
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";

export const Calendar = function () {
    const { t, i18n } = useTranslation();
    const [showOffcanvasUpdate, setShowOffcanvasUpdate] = useState(false);
    const [showOffcanvasNew, setShowOffcanvasNew] = useState(false);
    const [startDate, setStartDate] = useState(new Date(new Date().setMinutes(30)));
    const [endDate, setEndDate] = useState();
    const [minTime, setMinTime] = useState<any>(new Date());
    const [inputData, setInputData] = useState<CalendarEventCreate>({
      title: "",
      doctorId: "",
      start: new Date(),
      end: new Date(),
      backgroundColor: "#fff",
    });

    const [selectedDoctor, setSelectedDoctor] = useState<string>("");

    const [selectedEvent, setSelectedEvent]: any = useState<any>({});

    const [ calendarEvents , setCalendarEvents ] = useState<any[]>([]);  
    const [ doctorEvents, setDoctorEvents] = useState<any[]>([]);  
    const [doctors, setDoctors] = useState<any>([]);  
    const [allExcludeTimes, setAllExcludeTimes] = useState<Date[]>([]);
    const [excludeTimes, setExcludeTimes] = useState<Date[]>([]);

    async function fetchEvents(doctorId = "0") {
        try {
            let endpoint = "/api/getEvents";
            if (doctorId != "0") {
              endpoint += `/${doctorId}`;
            }
            const response = await fetch(endpoint);
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const res = await response.json();
            const evts = res.map(({ _id, ...rest }) => {
            return { id: _id, ...rest };
            });
          
            return evts;
      } catch (error) {
            console.error("Error fetching data: ", error);
      }
    }

    useEffect(() => {
        console.log("allExcludeTimes: ", allExcludeTimes);
        
        
    }, [allExcludeTimes])

    useEffect(() => {
      console.log("excludeTimes: ", excludeTimes);
    }, [excludeTimes]);

    useEffect(() => {
        const getEvents = async () => {
            const events = await fetchEvents();
            console.log("events:", events);
            
            setCalendarEvents(events);
        }

        getEvents();
        
    }, [])

    useEffect(() => {
      async function fetchDoctors() {
        try {
          const response = await fetch("/api/getDoctors");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const res = await response.json();
          setDoctors(res);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
      fetchDoctors();
    }, []);

    const handleFormDataChange = (event) => {
      const { name, value } = event.target;
      setInputData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeDoctor = async (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setStartDate(roundDate(new Date()));
        setMinTime(new Date());
        const doctorId = event.target.value;
        setSelectedDoctor(doctorId);
        setInputData((prev) => ({ ...prev, doctorId: doctorId }));
        const evts = await fetchEvents(doctorId);
        console.log("evts: ", evts);
        setDoctorEvents(evts)
        let excludeTimes: Date[] = [];

        evts.forEach((event: any) => {
          const interval = 30; // minutes

          let currentTime = new Date(event.start);

          while (currentTime < new Date(event.end)) {
            excludeTimes.push(new Date(currentTime)); // Push a new Date object to avoid mutability issues
            currentTime = new Date(currentTime.getTime() + interval * 60000); // Add 30 minutes
          }
        });

        setAllExcludeTimes(excludeTimes);
        console.log(":::::excludeTimes: ", excludeTimes);
        
    };

    const roundDate = function(_date: Date){
        let date = new Date(_date);
        let minutes = date.getMinutes();
        if (minutes < 15) {
          date = new Date(date.setMinutes(0));
        } else if (minutes < 45) {
          date = new Date(date.setMinutes(30));
        } else {
          // If the minutes are 45 or more, set minutes to 0 and add one hour.
          date = new Date(date.setMinutes(0));
            date = new Date(date.setHours(date.getHours() + 1));
        }

        return date;
    }

    const handleStartChange = (rawdate: Date) => {
        
        let date = roundDate(rawdate)
        
        setStartDate(date);

        const isSameDay = (d1: Date, d2: Date) => {
            console.log("d1: ", d1);
            console.log("d2: ", d2);
            
          return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
          );
        };

        if (isSameDay(new Date(), date)) {

          setMinTime(new Date());
        } else {
          setMinTime(new Date(new Date(new Date().setHours(0,0,0)).setMinutes(0)));
        }
        
        const pastFilteredDates = allExcludeTimes.filter((excludedDate) => {
            // Log the original date
            console.log("Original excludedDate:", excludedDate);

            // Create new Date instances for comparison to avoid altering original dates
            const tempExcludedDate = new Date(excludedDate);
            const tempDate = new Date(date);

            // Compare dates after setting time to midnight
            if (
              tempExcludedDate.setHours(0, 0, 0, 0) >=
              tempDate.setHours(0, 0, 0, 0)
            ) {
              console.log("Normalized excludedDate:", tempExcludedDate);
              return true;
            }
            return false;
          });
        


        

        const selectedDateExcludings = pastFilteredDates.filter((_date) =>
          isSameDay(_date, date)
        );

        console.log("selectedDateExcludings: ", selectedDateExcludings);
        

        setExcludeTimes(selectedDateExcludings);
        console.log("pastFilteredDates: ", pastFilteredDates);
        
    }

    function compareTimeOnly(time1, time2) {
      // Extract hours and minutes and convert them to minutes since midnight
      const minutes1 = time1.getHours() * 60 + time1.getMinutes();
      const minutes2 = time2.getHours() * 60 + time2.getMinutes();

      return minutes1 <= minutes2;
    }
    
    const submitCreateAppointment = async function () {
        event.preventDefault(); // Prevent the default form submit action

        if (compareTimeOnly(startDate, minTime)) {
            console.log("Start time is less than or equal to minimum time.");
            return;
        }
        
        console.log("inputData: ", JSON.stringify(inputData));
        

        try {
          const response = await fetch("/api/createEvent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inputData),
          });

            const data = await response.json();
            
          if (response.ok) {
            console.log("Success:", data.data);
            alert("Record created successfully!");
          } else {
            throw new Error(data.message || "Failed to create record");
          }
        } catch (error) {
          console.error("Error:", error);
          alert(error.message);
        }
    }

    const handleEventClick = function (evt: any) {
        setShowOffcanvasUpdate(true);
        setSelectedEvent(evt)
        console.log(evt);
    }

    const handleDateClick = (arg) => {
        setShowOffcanvasNew(true);
    };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        initialView="dayGridMonth"
        weekends={true}
        events={calendarEvents}
      />

      <Offcanvas
        show={showOffcanvasUpdate}
        onHide={() => {
          setShowOffcanvasUpdate(false);
        }}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Rezervasyonu Güncelle</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h4> {selectedEvent.event?._def.title} </h4>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas
        show={showOffcanvasNew}
        onHide={() => {
          setShowOffcanvasNew(false);
        }}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Randevu Oluştur</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={submitCreateAppointment}>
            <Form.Group className="mb-3" controlId="formGroupTitle">
              <Form.Label>Randevu Başlığı </Form.Label>
              <Form.Control
                required
                name="title"
                value={inputData.title}
                onChange={handleFormDataChange}
                placeholder="örn: Enes Sayacı"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDoctor">
              <Form.Label>Fizyoterapist</Form.Label>
              <Form.Select
                required
                value={selectedDoctor}
                onChange={handleChangeDoctor}
              >
                <option disabled value="">
                  Fizyoterapist Seçiniz
                </option>
                {doctors.map((doctor: DoctorResponse) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name} {doctor.surname}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupStartDate">
              <Form.Label>Başlangıç Tarihi</Form.Label>
              <DatePicker
                required
                locale={tr}
                showTimeSelect
                minDate={new Date()}
                minTime={minTime}
                maxTime={new Date().setHours(23, 30)}
                selected={startDate}
                excludeTimes={excludeTimes}
                onChange={(date: any) => {
                  setStartDate(date);
                  setInputData((prev) => ({
                    ...prev,
                    start: new Date(date),
                  }));
                  handleStartChange(new Date(date));
                }}
                dateFormat="Pp"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEndDate">
              <Form.Label>Bitiş Tarihi</Form.Label>
              <DatePicker
                required
                locale={tr}
                showTimeSelect
                selected={endDate}
                onChange={(date: any) => {
                  setEndDate(date);
                  setInputData((prev) => ({
                    ...prev,
                    end: new Date(date),
                  }));
                }}
                dateFormat="Pp"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
