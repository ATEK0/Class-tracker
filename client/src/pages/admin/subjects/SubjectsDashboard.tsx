import { MouseEvent, useEffect, useState } from 'react';
import httpClient from '../../../httpClient';
import { SubjectListType } from '../../../types';
import { Link } from 'react-router-dom';
import { Modal, Label, TextInput, Button } from 'flowbite-react';
import { faPencil, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';

const SubjectsDashboard = () => {
  const [subjectList, setSubjectList] = useState<SubjectListType[]>([]);

  const [openModalCreate, setopenModalCreate] = useState(false)
  const [openModalEdit, setopenModalEdit] = useState(false)
  const [nameBefore, setnameBefore] = useState("")
  const [useSubjectID, setuseSubjectID] = useState("")
  const [subjectName, setsubjectName] = useState<MouseEvent<HTMLButtonElement, MouseEvent> | null>()

  function onCloseModal() {
    setopenModalCreate(false)
    setsubjectName(null)
    setopenModalEdit(false)
    setnameBefore("")
  }

  async function updateSubjectList() {
    let maxRetries = 3;
    let currentRetry = 0;
  
    while (currentRetry < maxRetries) {
      try {
        const updatedSubjectList = await httpClient.get("//localhost:1222/getSubject");
        setSubjectList(updatedSubjectList.data);
        return;
      } catch (error) {
        console.error('Error updating subject list:', error);
        currentRetry++;
      }
    }

    console.error('Max retries reached. Unable to update subject list.');
  }
  

  async function createSubject() {
    try {
      const create = await httpClient.post('//localhost:1222/createSubject', { label: subjectName });
      const resp = create.data;
  
      if (resp.message === "ok") {

        await updateSubjectList()
  

        setopenModalCreate(false);
  
        toast.success("Subject created successfully");
      } else {
        toast.error("Failed to create subject");
      }
    } catch (error) {
      console.error('Error creating subject:', error);

      toast.error("An error occurred while creating the subject");
    }
  }
  

  async function deleteSubject(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, subjectID: string, subjectName: string) {
    event.preventDefault();
  
    try {
      await httpClient.delete(`//localhost:1222/deleteSubject/${subjectID}`);
      
      await updateSubjectList()
      
      toast.success(subjectName + " deleted successfully")
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  }
  
  function editSubject(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, subjectID: string, subjectName: string) {
    event.preventDefault();
    setnameBefore(subjectName)
    setopenModalEdit(true)
    setuseSubjectID(subjectID)
  }

  async function sendEditSubject() {
    const edit = await httpClient.post('//localhost:1222/editSubject/'+useSubjectID, { label: subjectName });
    const resp = edit.data;

    if (resp.message === "ok") {
      setopenModalEdit(false);
      await updateSubjectList()
      toast.success("Subject changed successfully");
    } else {
      toast.error("Failed to edit subject");
    } 
  }

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

      <Button className='bg-[#04304d] my-3 flex justify-center items-center' onClick={() => {setopenModalCreate(true)}}><FontAwesomeIcon icon={faPlus} className='mr-2 w-5 h-5'/>New Subject</Button>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectList.map((subject) => (
          <Link to={"/admin/subjects/" + subject.id} key={subject.id}>
            <div className="bg-white p-4 rounded-lg shadow shadow-slate-400 flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">{subject.label}</h2>
              <div className='flex '>
                <button
                  className='cursor-pointer bg-transparent text-gray-500 hover:text-[#04304d] rounded-sm flex justify-center items-center transition-all duration-100 hover:scale-110'
                  onClick={(event) => deleteSubject(event, subject.id, subject.label)}
                >
                  <FontAwesomeIcon icon={faTrashCan} className='p-1 w-4 h-4' />
                </button>
                <button
                  className='cursor-pointer bg-transparent text-gray-500 hover:text-[#04304d] rounded-sm flex justify-center items-center transition-all duration-100 hover:scale-110'
                  onClick={(event) => editSubject(event, subject.id, subject.label)}
                >
                  <FontAwesomeIcon icon={faPencil} className='p-1 w-4 h-4' />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* modal create subject */}
      <Modal dismissible show={openModalCreate} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Subject</h3>
            <div className="block">
              <Label htmlFor="subjectName" value="Subject Name" />
            </div>
            <TextInput id="subjectName" maxLength={50} placeholder='Insert the Subject Name' required onChange={(event) => setsubjectName(event.target.value)} />

            <div className="w-full flex justify-between">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className='bg-[#04304d]' onClick={createSubject}>Create</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
      {/* final modal create subject */}


      {/* modal edit subject */}
      <Modal dismissible show={openModalEdit} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit {nameBefore}</h3>
            <div className="block">
              <Label htmlFor="subjectEditName" value="New name" />
            </div>
            <TextInput id="subjectEditName" maxLength={50} placeholder={nameBefore} required onChange={(event) => setsubjectName(event.target.value)} />

            <div className="w-full flex justify-between">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className='bg-[#04304d]' onClick={sendEditSubject}>Edit</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
      {/* final modal edit subject */}

    </div>
  );
};

export default SubjectsDashboard;
