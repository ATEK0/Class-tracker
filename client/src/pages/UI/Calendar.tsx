import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

const Calendar = () => {
    const handleDateClick = (arg: { dateStr: any }) => {
        alert(arg.dateStr)
    }

    const clickEvent = (info: any) => {
        console.log('Event: ' + info.event.title);
        console.log('ID: ' + info.event.id);

        window.location.href = `/event/${info.event.id}`;
    }

    return (
        
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        dateClick={handleDateClick}
        events={[
            { id: 'event1', title: 'event 1', date: '2023-11-09T12:00:00' },
            { id: 'event2', title: 'event 3', date: '2023-11-09T13:00:00' },
            { id: 'event3', title: 'event 3', date: '2023-11-09T14:00:00' },
            { id: 'event4', title: 'event 3', date: '2023-11-09T15:00:00' },
            { id: 'event5', title: 'event 3', date: '2023-11-09T16:00:00' },
            { id: 'event6', title: 'event 2', date: '2023-11-10' }
        ]}
        eventClick={clickEvent}
        />

    )
}

export default Calendar
