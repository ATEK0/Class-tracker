import React, { ChangeEvent, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import httpClient from '../../httpClient';
import { ClassListType, ClassroomType, SubjectListType, TeacherListType, TextAlign } from '../../types';
import { apiLink } from '../../config';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Label, Button } from 'flowbite-react';
import toast from 'react-hot-toast';

const Table = (props: {
  namesList: string[]; endpoint: string;
}) => {
  const [tableData, setTableData] = useState<any>([]);
  const [tableCols, setTableCols] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const [openModalConfirmDelete, setopenModalConfirmDelete] = useState<boolean>(false);
  const [openModalEdit, setopenModalEdit] = useState<boolean>(false);

  const [loadingStatus, setLoadingStatus] = useState<string>("Save")

  const [clickedClassroom, setclickedClassroom] = useState<ClassroomType>()


  const [teacherList, setTeacherList] = useState<TeacherListType[]>([]);
  const [classList, setClassList] = useState<ClassListType[]>([]);
  const [subjectList, setSubjectList] = useState<SubjectListType[]>([]);

  const [teacher, setTeacher] = useState<string>('');
  const [subject, setSubject] = useState<string>("");
  const [class_ID, setClass_ID] = useState<string>("");
  const [date, setDate] = useState<string>('');
  const [beginTime, setBeginTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');


  useEffect(() => {

    const fetchData = async () => {
      try {

        const classResp = await httpClient.get(apiLink + "/getClasses");
        const fetchedClass: ClassListType[] = classResp.data;
        setClassList(fetchedClass);


      } catch (error) {

        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    loadTableData();

  }, [])


  const handleTeacherChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setTeacher(event.target.value);
  };

  const handleSubjectChange = async (event: ChangeEvent<HTMLSelectElement>) => {

    const selectedSubject = event.target.value;
    setSubject(selectedSubject);

    const teacherResp = await httpClient.post(apiLink + "/getClassSubjectTeachers", {
      class_ID,
      subject: selectedSubject,
    });

    const fetchedTeachers: TeacherListType[] = teacherResp.data;
    setTeacherList(fetchedTeachers);

  };


  const handleClassChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setClass_ID(event.target.value);
    const subjectResp = await httpClient.get(apiLink + "/getClassSubjects/" + event.target.value);
    const fetchedSubjects: SubjectListType[] = subjectResp.data;
    setSubjectList(fetchedSubjects);
    setTeacherList([]);

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


  async function loadTableData() {
    try {
      const tableDataResp = await httpClient.get(`${apiLink}/${props.endpoint}`);

      const tableColumns = props.namesList.map((name: string) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        selector: (row: { [x: string]: any; }) => row[name.toLowerCase()],
        sortable: true,
      }));

      setTableData(tableDataResp.data);
      setTableCols(tableColumns);
      setIsLoading(false);
    } catch {
    }
  }

  const onCloseModal = () => {
    setopenModalConfirmDelete(false)
    setopenModalEdit(false)
  }

  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearchText(text);
  };

  async function handleEditButtonClick(row: ClassroomType) {

    setopenModalEdit(true)



    setclickedClassroom(row)

  }

  function handleDeleteButtonClick(row: ClassroomType) {

    setclickedClassroom(row)

    setopenModalConfirmDelete(true)

  }

  async function deleteClassroom() {

    try {
      const deleteResp = await httpClient.delete(`${apiLink}/deleteClassroom/${clickedClassroom?.classroomID}`);
      toast.success(deleteResp.data)
      setopenModalConfirmDelete(false)
      loadTableData()
    } catch {
      toast.error("Error, try again")
    }

  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    setLoadingStatus("Saving...")

    const formData = {
      teacher_id: teacher,
      subject_id: subject,
      class_ID: class_ID,
      date: date,
      beginTime: beginTime,
      endTime: endTime
    };

    try {
      const response = await httpClient.post(`${apiLink}/editClassroom/${clickedClassroom?.classroomID}`, formData);

      if (response.status !== 200) {
        return toast.error(response.data)
      }

      loadTableData()
      onCloseModal()

      setTimeout(() => {
        toast.success(response.data)
      }, 1000);

    } catch (error) {
      toast.error("Error, try again")
      setLoadingStatus("Save")
    }

  }


  const filteredData = tableData.filter((item: { [s: string]: unknown } | ArrayLike<unknown>) =>
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

  const columnsWithButton = [...tableCols, {
    name: 'Actions',
    button: true,
    cell: (row: ClassroomType) => (<div>
      <button onClick={() => { handleEditButtonClick(row) }} className='text-lg bg-[#04304d] text-white w-[30px] rounded-md mr-2 hover:bg-[#04304dc0]'><FontAwesomeIcon icon={faPenToSquare} /></button>
      <button onClick={() => handleDeleteButtonClick(row)} className='text-lg bg-[#04304d] text-white w-[30px] rounded-md hover:bg-[#04304dc0]'><FontAwesomeIcon icon={faXmark} /></button>
    </div>
    ),
  }];

  return (
    <div>

      {/* Confirm class archive modal */}

      <Modal dismissible show={openModalConfirmDelete} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Delete Classroom </h3>
            <div className="block">
              <Label htmlFor="">Are you sure you want to delete this classroom: <br />Class: <b>{clickedClassroom?.class}</b><br />Subject: <b>{clickedClassroom?.subject}</b><br />Day: <b>{clickedClassroom?.day}</b><br />From: <b>{clickedClassroom?.begin}</b><br />To: <b>{clickedClassroom?.end}</b></Label>
            </div>

            <div className="w-full flex justify-end gap-2">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className={`bg-[#c82333]`} onClick={() => { deleteClassroom() }}>Delete</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>

      {/* final confirm class archive modal */}


      {/* modal edit class */}
      <Modal dismissible show={openModalEdit} size="w-full" onClose={onCloseModal} popup>
        <Modal.Header>
          <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Edit Classroom</h1>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleFormSubmit}>

            <div className="flex flex-row gap-3 justify-between mb-4">


              <div className='w-full'>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                  Class
                </label>
                <select onChange={handleClassChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" key={""} selected>Select Class</option>
                  {classList.map((item) => (
                    <option value={item.id} key={item.id}>{item.grade}º {item.label}</option>
                  ))}

                </select>
              </div>

              <div className='w-full'>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                  Subject
                </label>
                <select onChange={(event) => { setSubject(event.target.value); handleSubjectChange(event) }} className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" key={""} selected>{(subjectList.length > 0) ? 'Select Subject' : 'No Subjects'}</option>
                  {subjectList.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div className='w-full'>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                  Teacher
                </label>

                <select onChange={handleTeacherChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="" key={""} selected>{(subjectList.length > 0) ? 'Select Teacher' : 'No Teachers'}</option>
                  {teacherList.map((item) => (
                    <option value={item.id} key={item.id}>{item.name} {item.surname}</option>
                  ))}

                </select>
              </div>

            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 z-0">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                  Date
                </label>
                <input onChange={handleDateChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="date" />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div>

                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                    Begin
                  </label>
                  <input onChange={handleBeginTimeChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="time" step={3600} />

                </div>
                <div>

                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                    End
                  </label>
                  <input onChange={handleEndTimeChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="time" step={3600} />

                </div>
              </div>

            </div>

            <div className="m-2">
              <button type="submit" className="bg-[#04304d] rounded-md p-2 mt-4 text-white font-bold w-full">{loadingStatus}</button>
            </div>
          </form>

        </Modal.Body>
      </Modal>
      {/* fim modal edit classroom */}

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-3 p-2 border rounded"
      />

      <DataTable
        columns={columnsWithButton}
        data={filteredData}
        pagination
        responsive
        highlightOnHover
        onRowClicked={(event: { [s: string]: unknown; }) => { window.location.href = `/summary/${event["classroomID"]}`; }}
        customStyles={customStyles}
        progressPending={isLoading}
        progressComponent={<div>Loading...</div>}
      />
    </div>
  )
}

export default Table


