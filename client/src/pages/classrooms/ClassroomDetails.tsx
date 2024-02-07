import { Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpClient from '../../httpClient';
import { apiLink } from '../../config';

import { ClassroomDetailsType, Student, TextAlign } from '../../types';
import DataTable from 'react-data-table-component';
import toast from 'react-hot-toast';

const ClassroomDetails = () => {

  const { eventId } = useParams();

  const [classroomDetails, setclassroomDetails] = useState<ClassroomDetailsType>()
  const [checkboxState, setCheckboxState] = useState<any>({});

  const [searchText, setSearchText] = useState<string>('');
  const [tableCols, setTableCols] = useState<any>([]);
  const [showSensitiveData, setShowSensitiveData] = useState<boolean>()

  const [summary, setSummary] = useState<string>()


  useEffect(() => {

    getClassroomData()
    getUserType()

  }, [])

  const handleCheckboxChange = (rowId: string, fieldName: string) => {
    setCheckboxState((prevState: { [x: string]: { [x: string]: any; }; }) => ({
      ...prevState,
      [rowId]: {
        ...prevState[rowId],
        [fieldName]: !prevState[rowId]?.[fieldName]
      }
    }));

  };

  async function getClassroomData() {
    try {
      const classroomData = await httpClient.post(`${apiLink}/getClassroomInfo`, { 'classroomID': eventId });

      setSummary(classroomData.data.summary);
      setTableCols([
        { name: 'Process', selector: (row: any) => row.pNumber, sortable: true },
        { name: 'Name', selector: (row: any) => row.name, sortable: true }
      ]);

      setclassroomDetails(classroomData.data);

    } catch (error) {
      console.error("Error fetching classroom data:", error);
    }
  }


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


  async function handleFormSubmit(event: { preventDefault: () => void; }) {
    event?.preventDefault()

    let absences: any[][] = []
    let allUser = document.querySelectorAll(".student") as NodeListOf<HTMLInputElement>;


    
    allUser.forEach((elemento) => {
      console.log(elemento.checked)
      if (elemento.checked) {
        absences.push([elemento.id, elemento.name])
      }
      
    })

    const saveSummary = await httpClient.post(`${apiLink}/manageClassroom`, { 'classroomID': eventId, summary, absences})

    toast.success(saveSummary.data)

  }

  const columnsWithButton = [...tableCols, {
    name: 'P | M | L',
    button: true,
    cell: (row: Student) => (
      <div>
        <input
          type='checkbox'
          className='m-1 student'
          name={"presence"}
          id={row.id}
          checked={checkboxState[row.id]?.presence || false}
          onChange={() => handleCheckboxChange(row.id, 'presence')}
        />
        <input
          type='checkbox'
          className='m-1 student'
          name={"material"}
          id={row.id}
          checked={checkboxState[row.id]?.material || false}
          onChange={() => handleCheckboxChange(row.id, 'material')}
        />
        <input
          type='checkbox'
          className='m-1 student'
          name={"late"}
          id={row.id}
          checked={checkboxState[row.id]?.late || false}
          onChange={() => handleCheckboxChange(row.id, 'late')}
        />
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
        <Textarea className='max-h-[200px] h-[200px] resize-none min-h-[200px]' readOnly={!showSensitiveData} aria-multiline value={summary} onChange={(event) => { setSummary(event.target.value); }}></Textarea>
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

