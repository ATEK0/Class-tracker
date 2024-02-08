import { Link, useParams } from 'react-router-dom';
import Calendar from '../../UI/Calendar';
import TableStudentClass from '../../UI/TableStudentClass';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import httpClient from '../../../httpClient';
import { apiLink } from '../../../config';
import toast from 'react-hot-toast';
import { Modal, Label, Button } from 'flowbite-react';

const ClassDetails = () => {
    const { classId } = useParams();
    const { classLabel } = useParams();   

    const [openModalConfirmUnassign, setopenModalConfirmUnassign] = useState<boolean>()

    const [subjectList, setsubjectList] = useState([])
    const [subjectClicked, setsubjectClicked] = useState<string>("")

    useEffect(() => {
      loadSubjectClass()
    }, [])
    

    async function loadSubjectClass() {
      const subjectClassList = await httpClient.get(`${apiLink}/getClassSubjects/${classId}`);
      setsubjectList(subjectClassList.data)
    }


    async function deassignButtonClicked(event:any, subjectID: string) {
      event.preventDefault()
      setsubjectClicked(subjectID)
      setopenModalConfirmUnassign(true)

    }

    async function confirmUnassign() {
      const unassignSubject = await httpClient.post(`${apiLink}/unassignSubject`, { "classID": classId, "subjectID": subjectClicked });
      
      toast.success(unassignSubject.data)

      loadSubjectClass()

      onCloseModal()
    }

    function onCloseModal() {
      setopenModalConfirmUnassign(false)
    }

  return (
    <div className='pt-[64px] pb-5 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>

        <h1 className='font-bold text-3xl text-[#04304D] pt-8 mb-5 text-center'>Class {classLabel}</h1>

        <h1 className='font-bold text-2xl text-[#04304D] mb-5'>Schedule </h1>

        <Calendar id={"class-" + classId} />

        <h1 className='font-bold text-2xl text-[#04304D] py-5'>Student List </h1>

        <TableStudentClass endpoint={"/getClassStudents"} namesList={["Id", "Name", "Surname"]} class_id={classId}/>

        <h1 className='font-bold text-2xl text-[#04304D] py-5'>Subjects List </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectList.map((subject: {id: string, name: string}) => (
          <Link to={"/admin/subjects/" + subject.id} key={subject.id}>
            <div className="bg-white p-4 rounded-lg shadow shadow-slate-400 flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">{subject.name}</h2>
              <div className='flex '>
                <button
                  className='cursor-pointer bg-transparent text-gray-500 hover:text-[#04304d] rounded-sm flex justify-center items-center transition-all duration-100 hover:scale-110'
                >
                  <FontAwesomeIcon icon={faSquareMinus} onClick={(event) => {deassignButtonClicked(event, subject.id)}} className='p-1 w-4 h-4' />
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

    </div>
  )
}

export default ClassDetails