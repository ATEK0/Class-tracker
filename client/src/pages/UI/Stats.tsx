import { useState, useEffect } from "react";
import httpClient from "../../httpClient";
import { apiLink } from "../../config";

export default function Stats(props: { type: string; }) {
  const [classCount, setClassCount] = useState("-");
  const [subjectCount, setSubjectCount] = useState("-");
  const [studentCount, setStudentCount] = useState("-");
  const [teacherCount, setTeacherCount] = useState("-");
  const [classroomCount, setclassroomCount] = useState("-");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const classCountresp = await httpClient.get(`${apiLink}/getClassesCount?type=${props.type}`);
        const subjectCountresp = await httpClient.get(`${apiLink}/getSubjectCount?type=${props.type}`);
        const studentCountresp = await httpClient.get(`${apiLink}/getStudentsCount?type=${props.type}`);
        if (props.type == "Admin") {
          const teacherCountresp = await httpClient.get(`${apiLink}/getTeachersCount?type=${props.type}`);
          setTeacherCount(teacherCountresp.data);
        } else {
          const teacherClassroomCountresp = await httpClient.get(`//localhost:1222/getTeacherClassroomsCount`);
          setTeacherCount(teacherClassroomCountresp.data);
        }
        if (props.type == 'Teacher') {
          const classroomCountresp = await httpClient.get(`${apiLink}/getTeacherClassroomsCount`);
          setclassroomCount(classroomCountresp.data)

        }

        setClassCount(classCountresp.data);
        setSubjectCount(subjectCountresp.data);
        setStudentCount(studentCountresp.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    fetchData(); 
  }, []); 

  let stats = [
    { id: 1, name: 'Classes', value: classCount },
    { id: 2, name: 'Subjects', value: subjectCount },
    { id: 3, name: 'Students', value: studentCount },
    { id: 4, name: 'Teachers', value: teacherCount }
  ];

  if (props.type == "Teacher") {
    stats = [
      { id: 1, name: 'Classes', value: classCount },
      { id: 2, name: 'Subjects', value: subjectCount },
      { id: 3, name: 'Students', value: studentCount },
      { id: 3, name: 'Today Classes', value: classroomCount },
    ];
  }


  return (
    <div className="sm:pb-16 pb-8 pt-5">
      <div className="mx-auto max-w-7xl">
        <dl className="grid grid-cols-2 gap-x-0.5 gap-y-10 text-center lg:grid-cols-4 ">
          {stats.map((stat) => (
            <div key={stat.id} className={`mx-auto flex max-w-xs flex-col w-full h-full p-5 rounded-xl ${stat.id === 1 ? "md:rounded-s-xl" : ""} ${stat.id === 4 ? "md:rounded-e-xl" : ""} bg-[#04304D] gap-y-4`}>
              <dt className="text-base leading-7 text-white font-bold">{stat.name}</dt>
              <dd className="order-first text-3xl tracking-tight text-white font-bold sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
