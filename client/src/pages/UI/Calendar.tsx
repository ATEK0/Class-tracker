import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { useEffect, useRef } from 'react'
import httpClient from '../../httpClient'
import { ClassListType, TeacherListType } from '../../types'

import timeGridPlugin from '@fullcalendar/timegrid';


const Calendar = () => {

    const selectRef = useRef<HTMLSelectElement | null>(null);

    async function loadCalendarData(event: { target: { value: any } }) {
        console.log(event.target.value)
        const calendarDataResponse = await httpClient.post('//localhost:1222/getCalendarEvents', { id: event.target.value });

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
                    optionElement.disabled = true
                
                    selectElement.appendChild(optionElement);


                    const teacherSeparatorElement = document.createElement('option');
                    teacherSeparatorElement.value = "";
                    teacherSeparatorElement.text = "- TEACHERS -";
                    teacherSeparatorElement.disabled = true
                
                    selectElement.appendChild(teacherSeparatorElement);


                    teachersList.forEach((option) => {
                        const optionElement = document.createElement('option');
                        optionElement.value = "teacher-" + option.id;
                        optionElement.text = option.name + " " + option.surname;
                    
                        selectElement.appendChild(optionElement);
                    });

                    const classesSeparatorElement = document.createElement('option');
                    classesSeparatorElement.value = "";
                    classesSeparatorElement.text = "- CLASSES -";
                    classesSeparatorElement.disabled = true
                
                    selectElement.appendChild(classesSeparatorElement);

                    classesList.forEach((option) => {
                        const optionElement = document.createElement('option');
                        optionElement.value = "class-" + option.id;
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
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                dateClick={handleDateClick}
                events={[
                    // ... (your events)
                ]}
                eventClick={clickEvent}
                eventColor='#378006'
                displayEventTime={true}
                displayEventEnd={true}
                views={{
                    dayGridMonth: {
                        type: 'dayGridMonth',
                        buttonText: 'Month'
                    },
                    timeGridWeek: {
                        type: 'timeGridWeek',
                        buttonText: 'Week'
                    },
                    timeGridDay: {
                        type: 'timeGridDay',
                        buttonText: 'Day'
                    }
                }}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
            />
        </div>
    )
}

export default Calendar
