import React, { ChangeEvent, useState, useEffect } from 'react'
import httpClient from '../../httpClient';
import { ClassListType, SubjectListType, TeacherListType } from '../../types';


const NewSummary: React.FC = () => {
    const [teacherList, setTeacherList] = useState<TeacherListType[]>([]);
    const [classList, setClassList] = useState<ClassListType[]>([]);
    const [subjectList, setSubjectList] = useState<SubjectListType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                

                const classResp = await httpClient.get("//localhost:1222/get_classes");
                const fetchedClass: ClassListType[] = classResp.data;
                setClassList(fetchedClass);


            } catch (error) {
                console.error("Error fetching data----------------:", error);
            }
        };

        fetchData();
    }, []);

    const [teacher, setTeacher] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [class_ID, setClass_ID] = useState<BigInteger>();
    const [date, setDate] = useState<string>('');
    const [beginTime, setBeginTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [classTitle, setClassTitle] = useState<string>('');
    const [summaryContent, setSummaryContent] = useState<string>('');

    const handleTeacherChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        setTeacher(event.target.value);
    };

    const handleSubjectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        setSubject(event.target.value);
        const teacherResp = await httpClient.get("//localhost:1222/get_teachers");
        const fetchedTeachers: TeacherListType[] = teacherResp.data;
        setTeacherList(fetchedTeachers);
    };

    const handleClassChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        setClass_ID(event.target.value);
        const subjectResp = await httpClient.post("//localhost:1222/getClassSubjects", {class_ID});
        console.log(class_ID)
        console.log(subjectResp)
        const fetchedSubjects: SubjectListType[] = subjectResp.data;
        setSubjectList(fetchedSubjects);
                
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleBeginTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBeginTime(event.target.value);
    };

    const handleEndTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEndTime(event.target.value);
    };

    const handleClassTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setClassTitle(event.target.value);
    };

    const handleSummaryContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setSummaryContent(event.target.value);
    };

    const createSummary = () => {

        console.log({
            teacher,
            subject,
            class_ID,
            date,
            beginTime,
            endTime,
            classTitle,
            summaryContent,
        });
    };

    if (classList.length === 0 ) { //|| teacherList.length === 0 || subjectList.length === 0
        return <div>Loading...</div>; // You can replace this with a loading indicator
    }

  return (
    <div className='pt-[64px] mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold py-3 text-[#04304d]'>Schedule new class</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex flex-row gap-3 justify-between mb-4">


                <div className='w-full'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                        Class
                    </label>
                    <select onChange={handleClassChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="" key={"a"} selected>Select Class</option>
                        {classList.map((item) => (
                            <option value={item.id} key={item.id}>{item.grade}{item.label}</option>                        
                        ))}
                        
                    </select>
                </div>

                <div className='w-full'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                        Subject
                    </label>
                    <select onChange={handleSubjectChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="" key={"a"} selected>Select Subject</option>
                        {subjectList.map((item) => (
                            <option value={item.id} key={item.id}>{item.name}</option>                        
                        ))}
                    </select>
                </div>
                
                <div className='w-full'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                        Teacher
                    </label>
                    
                    <select onChange={handleTeacherChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="" key={"a"} selected>Select Teacher</option>
                        {teacherList.map((item) => (
                            <option value={item.id} key={item.id}>{item.name}</option>                        
                        ))}
                        
                    </select>
                </div>

            </div>
            
            <div className="mb-4 grid grid-cols-2 gap-3 z-0">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                        Date
                    </label>
                    <input onChange={handleDateChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="date"/>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <div>

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                            Begin
                        </label>
                        <input onChange={handleBeginTimeChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="time" step={3600}/>
                    
                    </div>
                    <div>

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                            End
                        </label>
                        <input onChange={handleEndTimeChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="time" step={3600}/>
                    
                    </div>
                </div>
                
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                Class Title
            </label>
            <input onChange={handleClassTitleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="text" placeholder="Class Title" />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
                    Summary
                </label>
                <textarea onChange={handleSummaryContentChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-80 resize-none" id="summary" placeholder="Summary Content" ></textarea>
            </div>
            <div className='flex justify-end'>
                <button type="button" onClick={createSummary} className='px-5 py-2 rounded-lg bg-[#04304d] text-white'>Create</button>
            </div>
        </form>

    </div>
  )

}

export default NewSummary