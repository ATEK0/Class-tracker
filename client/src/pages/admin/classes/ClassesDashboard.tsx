import { Link } from 'react-router-dom';
import Table from '../../UI/TableClasses';
import { faHouseCircleCheck, faHouseCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button, Select } from 'flowbite-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { ClassListType, SubjectListType } from '../../../types';

import httpClient from '../../../httpClient';
import { apiLink } from '../../../config';
import toast from 'react-hot-toast';

const ClassesDashboard = () => {

  const [openModalAssignSubject, setopenModalAssignSubject] = useState<boolean>(false)

  const [classList, setClassList] = useState<ClassListType[]>([]);
  const [subjectList, setSubjectList] = useState<SubjectListType[]>([]);

  const [subject, setSubject] = useState<string>("");
  const [class_ID, setClass_ID] = useState<string>("");


  function onCloseModal() {
    setopenModalAssignSubject(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        const classResp = await httpClient.get(apiLink + "/getClasses");
        const fetchedClass: ClassListType[] = classResp.data;
        setClassList(fetchedClass);


        const subjectResp = await httpClient.get(apiLink + "/getSubject");
        const fetchedSubjects = subjectResp.data;
        setSubjectList(fetchedSubjects);

      } catch (error) {

        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClassChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setClass_ID(event.target.value);

  };

  const handleSubjectChange = async (event: ChangeEvent<HTMLSelectElement>) => {

    const selectedSubject = event.target.value;
    setSubject(selectedSubject);

  };



  async function assignSubject() {

    const assignSubjectResp = await httpClient.post(`${apiLink}/assignSubject`, {"classID": class_ID, "subjectID": subject})
    toast.success(assignSubjectResp.data)

    onCloseModal()
  }


  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Classes</h1>

      <Link to={"/admin/classes/new"}><button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full md:w-1/5 mb-3 mr-2' >Create Class</button></Link>
      <button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full md:w-1/5 mb-3' onClick={() => { setopenModalAssignSubject(!openModalAssignSubject) }} >Assign Subjects to Class</button>

      <h1 className="font-bold text-2xl text-[#04304D] pt-8 mb-5"><FontAwesomeIcon icon={faHouseCircleCheck} /> Active Classes</h1>
      <Table endpoint={"getClasses"} namesList={["grade", "label", "headteacher"]} />


      <h1 className="font-bold text-2xl text-[#04304D] pt-8 mb-5"><FontAwesomeIcon icon={faHouseCircleXmark} /> Archived Classes</h1>
      <Table endpoint={"getArchivedClasses"} namesList={["grade", "label", "headteacher"]} />


      {/* Modal assign subject to class */}
      <Modal dismissible show={openModalAssignSubject} size="full" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Assign Subject to Class</h3>
            <div className="flex gap-2">

              <div className="class w-full">
                <label htmlFor="">Class</label>
                <Select className='' onChange={handleClassChange}>
                  <option value="" key={""} selected></option>
                  {classList.map((item) => (
                    <option value={item.id} key={item.id}>{item.grade}º {item.label}</option>
                  ))}
                </Select>

              </div>

              <div className="subject w-full">
                <label htmlFor="">Subject</label>
                <Select className='' onChange={handleSubjectChange}>
                  <option value="" key={""} selected></option>
                  {subjectList.map((item) => (
                    <option value={item.id} key={item.id}>{item.label}</option>
                  ))}
                </Select>

              </div>
            </div>

            <div className="w-full flex justify-end gap-2">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className={`bg-[#04304d]`} onClick={assignSubject}>Assign</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>


    </div>
  );
};

export default ClassesDashboard;


