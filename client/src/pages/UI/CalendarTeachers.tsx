import { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import httpClient from '../../httpClient';
import { Dictionary } from '@fullcalendar/core/internal';
import { apiLink } from '../../config';
const Calendar = () => {
    const calendarRef = useRef(null);
    const [calendarDataResponse, setCalendarDataResponse] = useState<Dictionary>()


    useEffect(() => {
        loadCalendarData()
        determineView()
    }, [])
    


    const loadCalendarData = async () => {
        const user = await httpClient.get(`${apiLink}/@me`)
        console.log(user.data.classId)
        const classId = "teacher-" + user.data.id
        setCalendarDataResponse([])

        try {
            const calendarDataResponse = await httpClient.post(`${apiLink}/getCalendarEvents`, { id: classId });

            setCalendarDataResponse(calendarDataResponse.data)
        } catch {
        }

    };

    const determineView = () => {
        const width = window.innerWidth;

        const selectCalendar = document.querySelector('.fc-header-toolbar');


        if (selectCalendar) {

            if (width <= 600) {
                selectCalendar.setAttribute("class", "fc-header-toolbar fc-toolbar fc-toolbar-ltr flex flex-col gap-y-5");
                return 'timeGridDay'; // Set to daily view for small screens
            } else {
                selectCalendar.setAttribute("class", "fc-header-toolbar fc-toolbar fc-toolbar-ltr flex flex-row");
                return 'timeGridWeek'; // Set to monthly view for larger screens
            }

        }

    };

    const clickEvent = (info: any) => {
        console.log('Event: ' + info.event.title);
        console.log('ID: ' + info.event.id);
        window.location.href = `/summary/${info.event.id}`;
    };

    return (

        <div className='text-[#04304D] font-bold'>

            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='timeGridWeek'
                weekends={true}
                events={calendarDataResponse}
                eventClick={clickEvent}
                eventColor='#378006'
                displayEventTime={true}
                displayEventEnd={true}
                views={{
                    dayGridMonth: {
                        type: 'dayGridMonth',
                        buttonText: 'Month',
                    },
                    timeGridWeek: {
                        type: 'timeGridWeek',
                        buttonText: 'Week',
                    },
                    timeGridDay: {
                        type: 'timeGridDay',
                        buttonText: 'Day',
                    },
                }}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                businessHours={[
                    {
                        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                        startTime: '08:00',
                        endTime: '23:00'
                    }
                ]}
                lazyFetching={true}
                eventOverlap={false}
                hiddenDays={[0]}
                slotMinTime={"08:00"}
                slotMaxTime={"23:00"}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }} 
                slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}  
            />


        </div>
    );
};

export default Calendar;
