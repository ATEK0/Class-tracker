import { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import httpClient from '../../httpClient';
import { ClassListType, TeacherListType } from '../../types';
import { Dictionary } from '@fullcalendar/core/internal';
import toast from 'react-hot-toast';

const Calendar = (props: any) => {
    const calendarRef = useRef(null);
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const [calendarDataResponse, setCalendarDataResponse] = useState<Dictionary>()


    const loadCalendarData = async (event: { target: { value: any } }) => {
        console.log(event.target.value);

        setCalendarDataResponse([])

        try {
            const calendarDataResponse = await httpClient.post('//localhost:1222/getCalendarEvents', { id: event.target.value });

            setCalendarDataResponse(calendarDataResponse.data)
            toast.success("Schedule Loaded")
        } catch {
        }

    };

    const handleButtonClick = async () => {
        try {
            const teachersResponse = await httpClient.get('//localhost:1222/getTeachers');
            const classesResponse = await httpClient.get('//localhost:1222/getClasses');

            const teachersList: TeacherListType[] = teachersResponse.data;
            const classesList: ClassListType[] = classesResponse.data;

            const selectCalendar = document.querySelectorAll('.fc-toolbar-chunk')[1];
            selectCalendar.setAttribute("class", "fc-toolbar-chunk flex flex-col justify-center items-center text-center")

            if (!selectRef.current) {
                const selectElement = document.createElement('select');
                selectElement.setAttribute(
                    'class',
                    'shadow appearance-none m-0 min-w-[210px] w-[210px] border rounded py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                );
                selectElement.setAttribute(
                    'style',
                    'margin-left: 0px !important;'
                );

                selectElement.addEventListener('change', loadCalendarData);

                const optionElement = document.createElement('option');
                optionElement.value = '';
                optionElement.text = 'Choose schedule';
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
                    optionElement.text = `${option.name}`;

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

                selectRef.current = selectElement;
            }
        } catch (error) {
            console.error('Error loading data:', error);
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

    const handleResize = () => {
        const calendarApi = calendarRef.current.getApi();
        const newView = determineView();
        calendarApi.changeView(newView);
    };

    useEffect(() => {

        window.addEventListener('resize', handleResize);



        if (!props.id) {
            handleButtonClick();
        } else {
            const simulatedEvent: { target: { value: any } } = {
                target: {
                    value: props.id, // Replace with the desired value
                },
            };

            loadCalendarData(simulatedEvent);
        }

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };

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
