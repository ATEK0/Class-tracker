import { useEffect, useState } from 'react';
import httpClient from '../../../httpClient';
import { SubjectListType } from '../../../types';
import { Link } from 'react-router-dom';

const SubjectsDashboard = () => {
  const [subjectList, setSubjectList] = useState<SubjectListType[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const subjectList = await httpClient.get("//localhost:1222/getSubject");
        const fetchedSubjectList: SubjectListType[] = subjectList.data;
        setSubjectList(fetchedSubjectList);
      } catch (error) {
        console.error('Error fetching subject list:', error);
      }
    }

    loadData();
  }, []);

  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Subjects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectList.map((subject) => (
          <Link to={"/admin/subjects/" + subject.id}>
            <div key={subject.id} className="bg-white p-4 rounded-lg shadow shadow-slate-400 flex justify-center items-center hover:scale-105 ease-in-out duration-300">
              <h2 className="text-xl font-semibold mb-2">{subject.label}</h2>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectsDashboard;
