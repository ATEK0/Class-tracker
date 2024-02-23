import { Link, useParams } from 'react-router-dom';
import Calendar from '../../UI/Calendar';
import TableStudentClass from '../../UI/TableStudentClass';
import { faSquareMinus, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useEffect, useState } from 'react';
import httpClient from '../../../httpClient';
import { apiLink } from '../../../config';
import toast from 'react-hot-toast';
import { Modal, Label, Button, Select } from 'flowbite-react';
import { TeacherListType } from '../../../types';

const ClassDetails = () => {
  const { classId } = useParams();
  const { classLabel } = useParams();

  const [openModalConfirmUnassign, setopenModalConfirmUnassign] = useState<boolean>()
  const [openModalAssignTeacher, setopenModalAssignTeacher] = useState<boolean>()
  const [openModalDeassignTeacher, setopenModalDeassignTeacher] = useState<boolean>()

  const [subjectList, setsubjectList] = useState([])
  const [subjectClickedName, setsubjectClickedName] = useState<string>("")
  const [subjectClickedID, setsubjectClickedID] = useState<string>("")

  const [teacherList, setteacherList] = useState<TeacherListType[]>([])

  const [teacher, setteacher] = useState<string>("")

  useEffect(() => {
    loadSubjectClass()
  }, [])


  async function loadSubjectClass() {
    const subjectClassList = await httpClient.get(`${apiLink}/getClassSubjects/${classId}`);
    setsubjectList(subjectClassList.data)
  }


  async function deassignButtonClicked(event: any, subjectID: string) {
    event.preventDefault()
    setsubjectClickedID(subjectID)
    setopenModalConfirmUnassign(true)

  }

  async function confirmUnassign() {
    const unassignSubject = await httpClient.post(`${apiLink}/unassignSubject`, { "classID": classId, "subjectID": subjectClickedID });

    toast.success(unassignSubject.data)

    loadSubjectClass()

    onCloseModal()
  }

  function onCloseModal() {
    setopenModalConfirmUnassign(false)
    setopenModalAssignTeacher(false)
    setopenModalDeassignTeacher(false)
  }

  async function assignTeacherButtonClicked(event: any, subjectID: string, subjectName: string) {
    event.preventDefault()

    const teacherResp = await httpClient.get(apiLink + "/getTeachers");

    const fetchedTeachers: TeacherListType[] = teacherResp.data;
    setteacherList(fetchedTeachers);

    setsubjectClickedName(subjectName)
    setsubjectClickedID(subjectID)
    setopenModalAssignTeacher(true)
  }

  async function confirmAssignTeacher() {

    console.log(classId, subjectClickedID, teacher)
    const assignTeacher = await httpClient.post(`${apiLink}/assignTeacher`, { "classID": classId, "subjectID": subjectClickedID, "teacherID": teacher });
    toast.success(assignTeacher.data)

    onCloseModal()

  }

  const handleTeacherChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setteacher(event.target.value);
  };

  async function deAssignTeacherButtonClicked(event: any, subjectID: string, subjectName: string) {
    event.preventDefault()
    const teacherResp = await httpClient.get(apiLink + "/getTeachers");

    const fetchedTeachers: TeacherListType[] = teacherResp.data;
    setteacherList(fetchedTeachers);
    setopenModalDeassignTeacher(true)
    setsubjectClickedName(subjectName)
    setsubjectClickedID(subjectID)
  }

  async function deassignTeacher() {

    const assignTeacher = await httpClient.post(`${apiLink}/unassignTeacher`, { "classID": classId, "subjectID": subjectClickedID, "teacherID": teacher });

    console.log(classId, subjectClickedID, teacher)

    if ("Error occurred" == assignTeacher.data) {
      toast.error(assignTeacher.data)
    } else {
      toast.success(assignTeacher.data)
    }

    onCloseModal()
  }

  return (
    <div className='pt-[64px] pb-5 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>

      <h1 className='font-bold text-3xl text-[#04304D] pt-8 mb-5 text-center'>Class {classLabel}</h1>

      <h1 className='font-bold text-2xl text-[#04304D] mb-5'>Schedule </h1>

      <Calendar id={"class-" + classId} />

      <h1 className='font-bold text-2xl text-[#04304D] py-5'>Student List </h1>

      <TableStudentClass endpoint={"/getClassStudents"} namesList={["Id", "Name", "Surname"]} class_id={classId} />

      <h1 className='font-bold text-2xl text-[#04304D] py-5'>Subjects List </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectList.map((subject: { id: string, name: string }) => (
          <Link to={"/admin/subjects/" + subject.id} key={subject.id}>
            <div className="bg-white p-4 rounded-lg shadow shadow-slate-400 flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">{subject.name}</h2>
              <div className='flex '>
                <button
                  className='cursor-pointer bg-transparent text-gray-500 hover:text-[#04304d] rounded-sm flex justify-center items-center transition-all duration-100 hover:scale-110'
                >
                  <FontAwesomeIcon icon={faSquareMinus} onClick={(event) => { deassignButtonClicked(event, subject.id) }} className='p-1 w-4 h-4' />
                </button>
                <button
                  className='cursor-pointer bg-transparent text-gray-500 hover:text-[#04304d] rounded-sm flex justify-center items-center transition-all duration-100 hover:scale-110'
                >
                  <FontAwesomeIcon icon={faUserPlus} onClick={(event) => { assignTeacherButtonClicked(event, subject.id, subject.name) }} className='p-1 w-4 h-4' />
                </button>
                <button
                  className='cursor-pointer bg-transparent text-gray-500 hover:text-[#04304d] rounded-sm flex justify-center items-center transition-all duration-100 hover:scale-110'
                >
                  <FontAwesomeIcon icon={faUserMinus} onClick={(event) => { deAssignTeacherButtonClicked(event, subject.id, subject.name) }} className='p-1 w-4 h-4' />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Modal dismissible show={openModalConfirmUnassign} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Unassign Subject</h3>
            <div className="block">
              <Label htmlFor="">Are you sure you want to unassign this subject?</Label>
            </div>
            <div className="w-full flex justify-between">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className='bg-[#c82333]' onClick={confirmUnassign}>Unassign</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>


      <Modal dismissible show={openModalAssignTeacher} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Assign Teacher to {subjectClickedName}</h3>
            <div className="block">

              <Select onChange={handleTeacherChange}>
                <option value={""} key={""} selected></option>
                {teacherList.map((teacher) => (

                  <option value={teacher.id} key={teacher.id}>{teacher.name}</option>

                ))}

              </Select>



            </div>
            <div className="w-full flex justify-end gap-2">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className='bg-[#008141]' onClick={confirmAssignTeacher}>Assign</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>

      {/* modal unassign teacher from subject */}
      <Modal dismissible show={openModalDeassignTeacher} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Deassign Teacher to {subjectClickedName}</h3>
            <div className="block">

              <Select onChange={handleTeacherChange}>
                <option value={""} key={""} selected></option>
                {teacherList.map((teacher) => (

                  <option value={teacher.id} key={teacher.id}>{teacher.name}</option>

                ))}

              </Select>



            </div>
            <div className="w-full flex justify-end gap-2">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className='bg-[#008141]' onClick={deassignTeacher}>Deasign</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default ClassDetails