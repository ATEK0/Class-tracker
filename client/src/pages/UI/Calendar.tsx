import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { useEffect, useRef } from 'react'
import httpClient from '../../httpClient'
import { ClassListType, TeacherListType } from '../../types'


const Calendar = () => {

    const selectRef = useRef<HTMLSelectElement | null>(null);

    async function loadCalendarData(event: { target: { value: any } }) {
        console.log(event.target.value)
        const calendarDataResponse = await httpClient.get('//localhost:1222/getClasses');

        console.log(calendarDataResponse.data)
    }

    useEffect(() => {
        async function loadPage() {
            try {
                const teachersResponse = await httpClient.get('//localhost:1222/getTeachers');
                const classesResponse = await httpClient.get('//localhost:1222/getClasses');
                
                const teachersList: TeacherListType[] = teachersResponse.data;
                const classesList: ClassListType[] = classesResponse.data;

                // Find the select element in the DOM
                const selectCalendar = document.querySelectorAll('.fc-toolbar-chunk')[1];


                // Check if select has already been created
                if (!selectRef.current) {
                    const selectElement = document.createElement('select');
                    selectElement.setAttribute("style", "shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline") 

                    selectElement.onchange = loadCalendarData

                    const optionElement = document.createElement('option');
                    optionElement.value = "";
                    optionElement.text = "Choose option";
                    optionElement.selected = true
                
                    selectElement.appendChild(optionElement);


                    teachersList.forEach((option) => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option.id;
                        optionElement.text = option.name + " " + option.surname;
                    
                        selectElement.appendChild(optionElement);
                    });

                    classesList.forEach((option) => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option.id;
                        optionElement.text = option.grade + " " + option.label;
                    
                        selectElement.appendChild(optionElement);
                    });

                    selectCalendar.appendChild(selectElement);

                    // Set the ref to the created select element
                    selectRef.current = selectElement;
                }
            } catch (error) {
                console.error('Error loading data:', error);
            }
        }

        loadPage();
    }, []);
    
    

    const clickEvent = (info: any) => {
        console.log('Event: ' + info.event.title);
        console.log('ID: ' + info.event.id);

        window.location.href = `/summary/${info.event.id}`;
    }

    const handleDateClick = (arg: { dateStr: any }) => {
        alert(arg.dateStr)
    }

    return (
        <div className='text-[#04304D] font-bold'>
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
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
