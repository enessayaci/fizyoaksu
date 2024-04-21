import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { tr } from "date-fns/locale/tr";
registerLocale("tr", tr);
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useTranslation } from "react-i18next";
import { Button, Form, Modal } from "react-bootstrap";
import { start } from "repl";

export const Calendar = function () {
    const { t, i18n } = useTranslation();
    const [showOffcanvasUpdate, setShowOffcanvasUpdate] = useState(false);
    const [showOffcanvasNew, setShowOffcanvasNew] = useState(false);
    const [showConflicts, setShowConflicts] = useState(false);
    const [startDate, setStartDate] = useState(new Date(new Date().setMinutes(30)));
    const [endDate, setEndDate] = useState();
    const [minTime, setMinTime] = useState<any>(new Date());
    const [minTimeEnd, setMinTimeEnd] = useState<any>(new Date());
    const [maxTimeEnd, setMaxTimeEnd] = useState<any>(new Date());
    const [maxDateEnd, setMaxDateEnd] = useState<any>(new Date());
    const [firstConflictedDate, setFirstConflictedDate] = useState<any>(
      new Date()
    );
    const [inputData, setInputData] = useState<CalendarEventCreate>({
      title: "",
      doctorId: "",
      start: new Date(),
      end: new Date(),
      backgroundColor: "#ff9d00",
    });

    const [selectedDoctor, setSelectedDoctor] = useState<string>("");

    const [selectedEvent, setSelectedEvent]: any = useState<any>({});

    const [ calendarEvents , setCalendarEvents ] = useState<any[]>([]);  
    const [ doctorEvents, setDoctorEvents ] = useState<any[]>([]);  
    const [ conflictingEvents, setConflictingEvents ] = useState<any[]>([]);  
    const [doctors, setDoctors] = useState<any>([]);  
    const [allExcludeTimes, setAllExcludeTimes] = useState<Date[]>([]);
    const [excludeTimes, setExcludeTimes] = useState<Date[]>([]);
    const [excludeTimesEnd, setExcludeTimesEnd] = useState<Date[]>([]);
    const [futureExcludeTimes, setFutureExcludeTimes] = useState<Date[]>([]);

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
      console.log("startDate: ", startDate);
      setEndDate(get30MinutesLater(new Date(startDate)))  
      setMinTimeEnd(get30MinutesLater(new Date(startDate)));
      setInputData((prev) => ({
        ...prev,
        start: startDate,
      }));
    }, [startDate]);
  
  useEffect(() => {

    setInputData((prev) => ({
      ...prev,
      end: endDate,
    }));
    
  }, [endDate]);


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

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const get30MinutesLater = (date) => {
    // Create a new Date object from the startDate
    let _30MinutesLater = new Date(date);

    // Add 30 minutes to this new Date object
    _30MinutesLater.setMinutes(_30MinutesLater.getMinutes() + 30);

    return _30MinutesLater;
  };

  const detectMaxEnd = () => {
    setMinTimeEnd(get30MinutesLater(new Date(startDate)));
    console.log("sorted: " , futureExcludeTimes.sort());
    
    const firstConflictedDate = futureExcludeTimes.sort()[0]
    console.log("firstConflictedDate: ", firstConflictedDate);
    if (!firstConflictedDate) {
      const maxDate = new Date(8640000000000000); // This is the maximum date
      setFirstConflictedDate(maxDate);
    } else {
      setFirstConflictedDate(firstConflictedDate);
    }

    setEndDate(get30MinutesLater(new Date(startDate)));
    setMaxTimeEnd(new Date(firstConflictedDate));
    setMaxDateEnd(new Date(firstConflictedDate));

    if (firstConflictedDate && startDate && isSameDay(firstConflictedDate, startDate)) {
      console.log("111111");

      setMinTimeEnd(get30MinutesLater(new Date(startDate)));
      
      
    }
  }

    const handleFormDataChange = (event) => {
      const { name, value } = event.target;
      setInputData((prev) => ({ ...prev, [name]: value }));
    };

  const handleChangeDoctor = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStartDate(roundDate(new Date()));
    setMinTime(roundDate(new Date()));
    const doctorId = event.target.value;
    setSelectedDoctor(doctorId);
    setInputData((prev) => ({ ...prev, doctorId: doctorId }));
      
    const doctor: DoctorResponse = doctors.find((doctor: DoctorResponse) => doctor._id == doctorId)

    setInputData((prev) => ({ ...prev, backgroundColor: doctor.calendarBackgroundColor} ))
        // const evts = await fetchEvents(doctorId);
        // console.log("evts: ", evts);
        // setDoctorEvents(evts)
  };
  

    const roundDate = function(_date: Date){
        let date = new Date(_date);
        let minutes = date.getMinutes();
        if (minutes > 0 && minutes < 30) {
          date = new Date(date.setMinutes(30));
        } else if (minutes > 30) {
          date = new Date(date.setMinutes(0));
          date = new Date(date.setHours(date.getHours() + 1));
        }

        return date;
    }

    const handleStartChange = (rawdate: Date) => {
        
      let date = roundDate(rawdate)
        
      if (date < new Date()) {
        date = roundDate(new Date())
      }
      setStartDate(date);

        if (isSameDay(new Date(), date)) {

          setMinTime(new Date());
        }
        else {
          setMinTime(new Date(new Date(new Date().setHours(0,0,0)).setMinutes(0)));
        }
        
    }
  
  const handleEndChange = (rawdate: Date) => {
    let date = roundDate(rawdate);

    if (date <= startDate) {
      date = roundDate(get30MinutesLater(new Date(startDate)));
    }

    setEndDate(date);

    if (isSameDay(startDate, date)) {
      setMinTimeEnd(new Date(startDate));
    } else {
      setMinTimeEnd(
        new Date(new Date(new Date(date).setHours(0, 0, 0)).setMinutes(0))
      );
    }
  };
    
    const submitCreateAppointment = async function () {
        event.preventDefault(); // Prevent the default form submit action
        

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
          } else if (response.status == 409) {
            console.log("Success:", data.data);
            setShowConflicts(true)
            setConflictingEvents(data.data);
          }
          else {
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
  
  const handleCloseConflicts = (()=> {
    setShowConflicts(false)
  })

  const handleSubmitWithConflicts = async () => {
    try {
      const response = await fetch("/api/createEventWithConflicts", {
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

  function formatDateInterval(startDate, endDate) {
    const options = {
      year: "numeric", // Year as four digits
      month: "long", // Month as full name
      day: "numeric", // Day as a number
      weekday: "long", // Day of the week as full name
      hour: "2-digit", // Hour as two digits
      minute: "2-digit", // Minute as two digits
      hour12: false, // Use 24-hour clock
    };

    const options2 = {
      year: "numeric", // Year as four digits
      month: "long", // Month as full name
      day: "numeric", // Day as a number
      weekday: "long", // Day of the week as full name
    };
    if (isSameDay(startDate, endDate)) {
      // Format the date part
      const dateStr = startDate.toLocaleDateString("tr-TR", options2);

      // Format the time part
      
      const startTimeStr = new Date(startDate).toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const endTimeStr = new Date(endDate).toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return `${dateStr} ● ${startTimeStr} - ${endTimeStr}`;
    } else {
      return `${new Date(startDate).toLocaleString("tr-TR", options)} - ${new Date(endDate).toLocaleString("tr-TR", options)}`;
    }
  }

  return (
    <div>
      <FullCalendar
        dayMaxEventRows={4}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        locale={"tr-TR"}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        initialView="dayGridMonth"
        weekends={true}
        events={calendarEvents}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "timeGridWeek,timeGridDay,dayGridMonth", // user can switch between the two
        }}
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
                minDate={startDate}
                minTime={minTimeEnd}
                maxTime={new Date().setHours(23, 30)}
                selected={endDate}
                onChange={(date: any) => {
                  setEndDate(date);
                  setInputData((prev) => ({
                    ...prev,
                    end: new Date(date),
                  }));
                  handleEndChange(new Date(date));
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

      <Modal show={showConflicts} onHide={handleCloseConflicts}>
        <Modal.Header closeButton>
          <Modal.Title>Aynı Tarihe Denk Gelen Rendevu !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Yeni Randevu:</h5>
            <span className="me-3">{inputData.title}</span>
            <i>
              {" "}
              {formatDateInterval(
                new Date(inputData.start),
                new Date(inputData.end)
              )}{" "}
            </i>
          </div>
          <hr></hr>
          <div className="ms-3">
            Eklemeye çalıştığınız randevu, aşağıdaki randevularla aynı zamana
            denk geliyor.
          </div>
          <ul>
            {conflictingEvents.map(
              (calendarEvent: CalendarEventResponse, index) => (
                <li key={`${calendarEvent._id}_${index}`}>
                  <span className="me-3">{calendarEvent.title}</span>
                  <i className="font-italic">
                    {formatDateInterval(
                      new Date(calendarEvent.start),
                      new Date(calendarEvent.end)
                    )}
                  </i>
                </li>
              )
            )}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConflicts}>
            İptal
          </Button>
          <Button variant="primary" onClick={handleSubmitWithConflicts}>
            Onayla
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

