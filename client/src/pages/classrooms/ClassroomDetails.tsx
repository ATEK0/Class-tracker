import { Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpClient from '../../httpClient';
import { apiLink } from '../../config';

import { ClassroomDetailsType, TextAlign } from '../../types';
import DataTable from 'react-data-table-component';

const ClassroomDetails = () => {

  const { eventId } = useParams();

  const [classroomDetails, setclassroomDetails] = useState<ClassroomDetailsType>()

  const [searchText, setSearchText] = useState<string>('');
  const [tableCols, setTableCols] = useState<any>([]);
  const [showSensitiveData, setShowSensitiveData] = useState<boolean>()

  const [summary, setSummary] = useState<string>()

  useEffect(() => {

    async function getUserType() {
      const resp = await httpClient.get(apiLink + "/@me");

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
      
      setSummary(classroomData.data.summary)

      setTableCols([{ name: 'Process', selector: (row: any) => row.pNumber, sortable: true }, { name: 'Name', selector: (row: any) => row.name, sortable: true }])
      setclassroomDetails(classroomData.data)

      
    }

    getClassroomData()
    getUserType()



  }, [])

  async function handleFormSubmit() {
    event?.preventDefault()

    console.log(summary)

    // const saveSummary = await httpClient.post(`${apiLink}/createSummary`, { 'classroomID': classroomDetails?.id, 'content': summary})

  }

  const columnsWithButton = [...tableCols, {
    name: 'P | M | L',
    button: true,
    cell: (row: { [s: string]: unknown }) => (
      <div>
        <input type='checkbox' className='m-1' value={"presence"} checked= {true}/>
        <input type='checkbox' className='m-1' value={"material"}/>
        <input type='checkbox' className='m-1' value={"late"}/>
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
      <form action="">
        <h1 className="font-bold text-3xl text-[#04304D] pt-8">{classroomDetails?.subject.label}</h1>
        <p>{classroomDetails?.day} {classroomDetails?.begin} - {classroomDetails?.end}</p>
        <br />
        <p className='text-[#04304D] pb-1'>Summary</p>
        <Textarea className='max-h-[200px] h-[200px] resize-none min-h-[200px]' readOnly={!showSensitiveData} aria-multiline value={summary} onChange={ (event) => { setSummary(event.target.value); }}></Textarea>
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
              <button type="submit" className='px-5 py-2 rounded-lg bg-[#04304d] text-white' onClick={handleFormSubmit}>Save</button>
            </div>
          </div>
        ) : ("")}
      </form>
    </div>
  )
}

export default ClassroomDetails

