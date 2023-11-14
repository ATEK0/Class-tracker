import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import httpClient from '../../httpClient';
import { ClassListType, TeacherListType } from '../../types';
import { Dictionary } from '@fullcalendar/core/internal';

const Calendar = () => {
    const calendarRef = useRef(null);
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const [calendarDataResponse, setCalendarDataResponse] = useState<Dictionary>()


    const loadCalendarData = async (event: { target: { value: any } }) => {
        console.log(event.target.value);

        setCalendarDataResponse([])

        const calendarDataResponse = await httpClient.post('//localhost:1222/getCalendarEvents', { id: event.target.value });


        console.log(calendarDataResponse.data)
        console.log(calendarDataResponse.data)
        setCalendarDataResponse(calendarDataResponse.data)
    };

    const handleButtonClick = async () => {
        try {
            const teachersResponse = await httpClient.get('//localhost:1222/getTeachers');
            const classesResponse = await httpClient.get('//localhost:1222/getClasses');

            const teachersList: TeacherListType[] = teachersResponse.data;
            const classesList: ClassListType[] = classesResponse.data;

            const selectCalendar = document.querySelectorAll('.fc-toolbar-chunk')[1];
            selectCalendar.setAttribute("class", "fc-toolbar-chunk flex flex-col")
            // selectCalendar.classList.add("flex justify-center items-center")

            if (!selectRef.current) {
                const selectElement = document.createElement('select');
                selectElement.setAttribute(
                    'class',
                    'shadow appearance-none m-0 border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                );
                selectElement.setAttribute(
                    'style',
                    'margin-left: 0px !important;'
                );

                selectElement.addEventListener('change', loadCalendarData);

                const optionElement = document.createElement('option');
                optionElement.value = '';
                optionElement.text = 'Choose option';
                optionElement.selected = true;
                optionElement.disabled = true;

                selectElement.appendChild(optionElement);

                const teacherSeparatorElement = document.createElement('option');
                teacherSeparatorElement.value = '';
                teacherSeparatorElement.text = '- TEACHERS -';
                teacherSeparatorElement.disabled = true;

                selectElement.appendChild(teacherSeparatorElement);

                teachersList.forEach((option) => {
                    const optionElement = document.createElement('option');
                    optionElement.value = `teacher-${option.id}`;
                    optionElement.text = `${option.name} ${option.surname}`;

                    selectElement.appendChild(optionElement);
                });

                const classesSeparatorElement = document.createElement('option');
                classesSeparatorElement.value = '';
                classesSeparatorElement.text = '- CLASSES -';
                classesSeparatorElement.disabled = true;

                selectElement.appendChild(classesSeparatorElement);

                classesList.forEach((option) => {
                    const optionElement = document.createElement('option');
                    optionElement.value = `class-${option.id}`;
                    optionElement.text = `${option.grade} ${option.label}`;

                    selectElement.appendChild(optionElement);
                });

                selectCalendar.appendChild(selectElement);

                // Set the ref to the created select element
                selectRef.current = selectElement;
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    useEffect(() => {
        handleButtonClick();
    }, []);

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
            daysOfWeek: [1, 2, 3, 4, 5, 6],
            startTime: '08:00',
            endTime: '24:00'
        }
    ]}
    lazyFetching={true}
    eventOverlap={false}
    hiddenDays={[0]}
    slotMinTime={"08:00"}
    slotMaxTime={"24:00"}
/>

        </div>
    );
};

export default Calendar;
