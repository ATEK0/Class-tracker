import { Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpClient from '../../httpClient';
import { apiLink } from '../../config';

import { ClassroomDetailsType, TextAlign, User } from '../../types';
import DataTable from 'react-data-table-component';
import { useFetchUser } from '../../controllers/getUserData';

const ClassroomDetails = () => {

  const { eventId } = useParams();

  const [classroomDetails, setclassroomDetails] = useState<ClassroomDetailsType>()

  const [searchText, setSearchText] = useState<string>('');
  const [tableData, setTableData] = useState<any>([]);
  const [tableCols, setTableCols] = useState<any>([]);
  const [showSensitiveData, setShowSensitiveData] = useState<boolean>()
  const [user, setUser] = useState<User>()


  useEffect(() => {

    async function getUserType() {
      const resp = await httpClient.get(apiLink + "/@me");
      setUser(resp.data);
      let user = resp.data;

      if (user) {
        if (user.userType === 'Admin' || user.userType === 'Teacher') {
          setShowSensitiveData(true)
          console.log("correto")
        } else {
          setShowSensitiveData(false)
        }
        console.log(user.userType)

      }
    }

    async function getClassroomData() {
      const classroomData = await httpClient.post(`${apiLink}/getClassroomInfo`, { 'classroomID': eventId })
      setTableData(classroomData.data.students)
      setTableCols([{ name: 'Process', selector: (row: any) => row.pNumber, sortable: true }, { name: 'Name', selector: (row: any) => row.name, sortable: true }])
      setclassroomDetails(classroomData.data)
    }

    getClassroomData()
    getUserType()



  }, [])



  const columnsWithButton = [...tableCols, {
    name: 'P | M | L',
    button: true,
    cell: (row: { [s: string]: unknown }) => (<div>
    </div>
    ),
  }];

  const filteredData = classroomDetails?.students.filter((item: { [s: string]: unknown } | ArrayLike<unknown>) =>
    Object.values(item).some(
      (value) => value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#04304D',
        color: 'white',
      },
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center' as TextAlign | undefined,
      },
    },
    cells: {
      style: {
        cursor: 'pointer',
        textAlign: 'center' as TextAlign | undefined,
      },
    },
  };

  return (
    <div className='pt-[64px] mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8">{classroomDetails?.subject.label}</h1>
      <p>{classroomDetails?.day} {classroomDetails?.begin} - {classroomDetails?.end}</p>
      <br />
      <p className='text-[#04304D] pb-1'>Summary</p>
      <Textarea className='max-h-[200px] h-[200px] resize-none min-h-[200px]' readOnly={!showSensitiveData} aria-multiline></Textarea>
      <br />
      <br />


      {showSensitiveData ? (
        <div>
          <p className='text-[#04304D] pb-1'>Students</p>


          {filteredData ? (
            <DataTable
              columns={columnsWithButton}
              data={filteredData}
              pagination
              responsive
              highlightOnHover
              customStyles={customStyles}
              progressComponent={<div>Loading...</div>}
            />
          ) : ''}


          <div className='w-full flex justify-end gap-1'>
            <button type="button" className='px-5 py-2 rounded-lg bg-gray-500 text-white'>Cancel</button>
            <button type="button" className='px-5 py-2 rounded-lg bg-[#04304d] text-white'>Save</button>
          </div>
        </div>
      ) : ("")}

    </div>
  )
}

export default ClassroomDetails

