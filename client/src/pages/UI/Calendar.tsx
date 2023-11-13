import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { useEffect, useState } from 'react'
import httpClient from '../../httpClient'
import { ClassListType, TeacherListType } from '../../types'


const Calendar = () => {
    const [teachersList, setTeachersList] = useState<TeacherListType[]>([]);
    const [classesList, setClassesList] = useState<ClassListType[]>([]);

    useEffect(() => {
        async function loadPage() {
            try {
                // Fetch teachers and classes
                const teachersResponse = await httpClient.get('//localhost:1222/getTeachers');
                const classesResponse = await httpClient.get('//localhost:1222/getClasses');

                // Update state with fetched data
                setTeachersList(teachersResponse.data);
                setClassesList(classesResponse.data);

                // Find the select element in the DOM
                const selectCalendar = document.querySelectorAll('.fc-toolbar-chunk')[1];

                // Create options for teachers
                const teachersOptions = teachersList.map((teacher) => (
                    `<option value="${teacher.id}">${teacher.name} ${teacher.surname}</option>`
                )).join('');

                // Create options for classes
                const classesOptions = classesList.map((classItem) => (
                    `<option value="${classItem.id}">${classItem.grade} - ${classItem.label}</option>`
                )).join('');

                // Insert the select box with options
                selectCalendar.insertAdjacentHTML('beforeend', `
                    <select>
                        ${teachersOptions}
                        ${classesOptions}
                    </select>
                `);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        }

        loadPage();
    }, [teachersList, classesList]);
    

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
