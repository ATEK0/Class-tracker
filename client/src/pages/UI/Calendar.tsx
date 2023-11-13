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

        window.location.href = `/summary/${info.event.id}`;
    }

    return (
        <div className='text-[#04304D] font-bold'>
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            dateClick={handleDateClick}
            events={[
                { id: 'event1', title: 'event 1', start: '2023-11-09T12:00:00',end: '2023-11-09T15:00:00', color: "red" },
                { id: 'event2', title: 'event 3', date: '2023-11-09T13:00:00', color: "green" },
                { id: 'event3', title: 'event 3', date: '2023-11-09T14:00:00', color: "blue" },
                { id: 'event4', title: 'event 3', date: '2023-11-09T15:00:00', color: "red" },
                { id: 'event5', title: 'event 3', date: '2023-11-09T16:00:00', color: "red" },
                { id: 'event6', title: 'event 2', date: '2023-11-10', color: "red" }
            ]}
            eventClick={clickEvent}
            eventColor= '#378006'
            displayEventTime={true}
            displayEventEnd={true}
            />
        </div>
    )
}

export default Calendar
