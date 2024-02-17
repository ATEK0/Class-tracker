import { MouseEvent, useEffect, useState } from 'react';
import httpClient from '../../../httpClient';
import { SubjectListType } from '../../../types';
import { Link } from 'react-router-dom';
import { Modal, Label, TextInput, Button } from 'flowbite-react';
import { faPencil, faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import { apiLink } from '../../../config';

const SubjectsDashboard = () => {
  const [subjectList, setSubjectList] = useState<SubjectListType[]>([]);
  const [subjectListArchived, setsubjectListArchived] = useState<SubjectListType[]>([])

  const [openModalCreate, setopenModalCreate] = useState<boolean>(false)
  const [openModalConfirmation, setopenModalConfirmation] = useState<boolean>(false)
  const [openModalConfirmationDearchive, setopenModalConfirmationDearchive] = useState<boolean>(false)
  const [openModalEdit, setopenModalEdit] = useState<boolean>(false)
  const [nameBefore, setnameBefore] = useState<string>("")
  const [useSubjectID, setuseSubjectID] = useState<string>("")
  const [beingDeleted, setbeingDeleted] = useState<string>("")
  const [beingDeletedID, setbeingDeletedID] = useState<string>("")
  const [subjectName, setsubjectName] = useState<any | null | undefined>()

  function onCloseModal() {
    setopenModalCreate(false)
    setsubjectName(null)
    setopenModalEdit(false)
    setnameBefore("")
    setopenModalConfirmation(false)
  }



  async function createSubject() {

    if (subjectName != null) {

      try {
        const create = await httpClient.post(apiLink + "/createSubject", { label: subjectName });
        const resp = create.data;

        if (create.status !== 200) {
          return toast.error(resp);
        }

        loadData()

        setopenModalCreate(false);

        toast.success(resp);
        setsubjectName(null)

      } catch (error) {
        console.error('Error creating subject:', error);

        toast.error("An error occurred while creating the subject");
      }

    } else {
      toast.error("Name cant be empty")
    }

  }


  async function deleteSubject() {

    try {
      const archive = await httpClient.post(apiLink + `/toggleSubject/${beingDeletedID}`);
      const resp = archive.data

      if (archive.status !== 200) {
        return toast.error(resp)
      }

      loadData()

      toast.success(beingDeleted + resp)
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
    onCloseModal()
  }

  function editSubject(event: any, subjectID: string, subjectName: string) {
    event.preventDefault();
    setnameBefore(subjectName.trim())
    setopenModalEdit(true)
    setuseSubjectID(subjectID)
  }

  async function sendEditSubject() {
    const edit = await httpClient.post('//localhost:1222/editSubject/' + useSubjectID, { label: subjectName });
    const resp = edit.data;

    if (edit.status !== 200) {
      return toast.error(resp);
    }

    setopenModalEdit(false);
    loadData()
    toast.success(resp);
  }

  function editButtonClicked(event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, subjectName: string, id: string) {
    event.preventDefault();
    setbeingDeleted(subjectName.trim())
    setbeingDeletedID(id)

    setopenModalConfirmationDearchive(true)
  }

  async function loadData() {
    try {
      const updatedSubjectList = await httpClient.get(apiLink + "/getSubject");
      const updatedSubjectListArchived = await httpClient.get(apiLink + "/getArchivedSubject");
      setsubjectListArchived(updatedSubjectListArchived.data)
      setSubjectList(updatedSubjectList.data);
    } catch (error) {
      console.error('Error fetching subject list:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Subjects</h1>

      <button className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full md:w-1/5 mb-3' onClick={() => { setopenModalCreate(true) }}>New Subject</button>

      <h1 className="font-bold text-1xl text-[#04304D] pt-8 mb-5">Active Subjects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectList.map((subject) => (
          <Link to={"/admin/subjects/" + subject.id} key={subject.id}>
            <div className="bg-white p-4 rounded-lg shadow shadow-slate-400 flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">{subject.label}</h2>
              <div className='flex '>
                <button
                  className='cursor-pointer bg-transparent text-gray-500 hover:text-[#04304d] rounded-sm flex justify-center items-center transition-all duration-100 hover:scale-110'
                >
                  <FontAwesomeIcon icon={faBoxArchive} onClick={(event) => { editButtonClicked(event, subject.label, subject.id) }} className='p-1 w-4 h-4' />
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


      <h1 className="font-bold text-1xl text-[#04304D] pt-8 mb-5">Archived Subjects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectListArchived.map((subject) => (
          <Link to={"/admin/subjects/" + subject.id} key={subject.id}>
            <div className="bg-white p-4 rounded-lg shadow shadow-slate-400 flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">{subject.label}</h2>
              <div className='flex '>
                <button
                  className='cursor-pointer bg-transparent text-gray-500 hover:text-[#04304d] rounded-sm flex justify-center items-center transition-all duration-100 hover:scale-110'
                >
                  <FontAwesomeIcon icon={faBoxArchive} onClick={(event) => { editButtonClicked(event, subject.label, subject.id) }} className='p-1 w-4 h-4' />
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


      {/* Confirm subject deletion modal */}

      <Modal dismissible show={openModalConfirmation} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Archive {beingDeleted}</h3>
            <div className="block">
              <Label htmlFor="">Do you want to archive <b>{beingDeleted}</b>? Every related class will also be archived.</Label>
            </div>


            <div className="w-full flex justify-between">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className='bg-[#04304d]' onClick={deleteSubject}>Archive</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>

      {/* final confirm subject deletion modal */}

      {/* Confirm subject deletion modal */}

      <Modal dismissible show={openModalConfirmationDearchive} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Activate {beingDeleted}</h3>
            <div className="block">
              <Label htmlFor="">Do you want Activate <b>{beingDeleted}</b>? Every related class will also be activated again.</Label>
            </div>


            <div className="w-full flex justify-between">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className='bg-[#04304d]' onClick={deleteSubject}>Activate</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>

      {/* final confirm subject deletion modal */}

    </div>
  );
};

export default SubjectsDashboard;

