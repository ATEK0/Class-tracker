import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import httpClient from '../../httpClient';
import { ClassTypeList, TeacherListType, TextAlign } from '../../types';
import { apiLink } from '../../config';
import { faBoxArchive, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Label, Button, TextInput, Select } from 'flowbite-react';
import toast from 'react-hot-toast';

const Table = (props: {
  namesList: string[]; endpoint: string;
}) => {
  const [tableData, setTableData] = useState<any>([]);
  const [tableCols, setTableCols] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const [beingDeleted, setbeingDeleted] = useState<any>([])
  const [beingEdited, setbeingEdited] = useState('')
  const [openModalConfirmDelete, setopenModalConfirmDelete] = useState<boolean>(false);
  const [openModalEdit, setopenModalEdit] = useState<boolean>(false);
  const [archiveModalContent, setarchiveModalContent] = useState<string>("")
  const [archiveModalTitle, setarchiveModalTitle] = useState<string>("")
  const [archiveButtonContent, setarchiveButtonContent] = useState<string>("")
  const [buttonColor, setButtonColor] = useState<string>("")

  const [loadingStatus, setLoadingStatus] = useState<string>("Save")

  const [year, setYear] = useState<string>("")
  const [label, setLabel] = useState<string>("")
  const [classType, setClassType] = useState<string>("")
  const [headteacher, setHeadteacher] = useState<string>("")

  const [teacherList, setTeacherList] = useState<TeacherListType[]>()
  const [classTypeList, setClassTypeList] = useState<ClassTypeList[]>()


  useEffect(() => {
    async function loadTeachersList() {

      const teacherResp = await httpClient.get(apiLink + "/getTeachers",);
      const classListResp = await httpClient.get(apiLink + "/getClassTypes",);
      const fetchedTeachers: TeacherListType[] = teacherResp.data;
      const fetchedClasses: ClassTypeList[] = classListResp.data;
      setTeacherList(fetchedTeachers);
      setClassTypeList(fetchedClasses);

      loadTableData();

    }

    loadTeachersList()

  }, [])

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

  async function handleEditButtonClick(row: { [s: string]: any; }) {
    setbeingEdited(row.id)
    setopenModalEdit(true)

    const classInfoResp = await httpClient.get(`${apiLink}/getClassInfo/${row.id}`);
    const classInfo = classInfoResp.data;

    setYear(classInfo.grade)
    setLabel(classInfo.label)
    setClassType(classInfo.type_id)
    setHeadteacher(classInfo.head_teacher)


  }

  function handleDeleteButtonClick(row: { [s: string]: unknown; }): void {

    setbeingDeleted([row.id, row.label])
    let textContent: any;
    let textTitle: any;
    let buttonContent: any;
    let buttonColor: any;


    if (row.is_archived) {
      textTitle = "Activate " + row.label;
      textContent = "Do you want to activate ";
      buttonContent = "Activate"
      buttonColor = "#04304D"
    } else {
      textTitle = "Archive " + row.label;
      textContent = "Do you want to archive ";
      buttonContent = "Archive"
      buttonColor = "#c82333"
    }


    setarchiveModalTitle(textTitle)
    setarchiveModalContent(textContent)
    setarchiveButtonContent(buttonContent)
    setButtonColor(buttonColor)
    setopenModalConfirmDelete(true)

  }

  async function archiveClass(classID: string,) {

    try {
      const archiveResp = await httpClient.post(`${apiLink}/toggleClass/${classID}`);
      toast.success(archiveResp.data)
      setopenModalConfirmDelete(false)
      window.location.reload()
    } catch {
      toast.error("Error, try again")
    }

  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    setLoadingStatus("Saving...")

    const formData = {
      label,
      grade: year,
      type_id: classType,
      head_teacher: headteacher
    };

    try {
      const response = await httpClient.post(`${apiLink}/editClass/${beingEdited}`, formData);

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
    cell: (row: { [s: string]: unknown }) => (<div>
      <button onClick={() => handleEditButtonClick(row)} className='text-lg bg-[#04304d] text-white w-[30px] rounded-md mr-2 hover:bg-[#04304dc0]'><FontAwesomeIcon icon={faPenToSquare} /></button>
      <button onClick={() => handleDeleteButtonClick(row)} className='text-lg bg-[#04304d] text-white w-[30px] rounded-md hover:bg-[#04304dc0]'><FontAwesomeIcon icon={faBoxArchive} /></button>
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{archiveModalTitle}</h3>
            <div className="block">
              <Label htmlFor="">{archiveModalContent} <b>{beingDeleted[1]}</b>?</Label>
            </div>

            <div className="w-full flex justify-between">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className={`bg-[${buttonColor}]`} onClick={() => { archiveClass(beingDeleted[0]) }}>{archiveButtonContent}</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>

      {/* final confirm class archive modal */}


      {/* modal edit class */}
      <Modal dismissible show={openModalEdit} size="w-full" onClose={onCloseModal} popup>
        <Modal.Header>
          <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Edit Class</h1>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleFormSubmit}>

            <div className="flex flex-row">
              <div className="w-1/2 m-2">
                <div className="mb-2 block">
                  <Label htmlFor="year" value="Year *" />
                </div>
                <TextInput
                  id="year"
                  placeholder="1"
                  value={year}
                  type='number'
                  required
                  onChange={(event) => setYear(event.target.value)}
                />
              </div>
              <div className="w-1/2 m-2">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Class Name *" />
                </div>
                <TextInput
                  id="name"
                  placeholder="Class Name"
                  value={label}
                  type='text'
                  required
                  maxLength={345}
                  onChange={(event) => setLabel(event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row">
              <div className="w-1/2 m-2">
                <div className="mb-2 block">
                  <Label htmlFor="type" value="Class Type *" />
                </div>

                <Select
                  id="type"
                  placeholder="Class Type"
                  value={classType}
                  required
                  onChange={(event) => setClassType(event.target.value)}
                >
                  <option value="" key="" selected></option>

                  {classTypeList?.map((item) => (
                    <option value={item.id} key={item.id}>{item.label}</option>
                  ))}
                </Select>
              </div>
              <div className="w-1/2 m-2">
                <div className="mb-2 block">
                  <Label htmlFor="headteacher" value="Headteacher *" />
                </div>
                <Select
                  id="headteacher"
                  placeholder="Headteacher"
                  value={headteacher}
                  required
                  onChange={(event) => setHeadteacher(event.target.value)}
                >
                  <option value="" key="" selected></option>

                  {teacherList?.map((item) => (
                    <option value={item.teacher_id} key={item.id}>{item.name} {item.surname}</option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="m-2">
              <button type="submit" className="bg-[#04304d] rounded-md p-2 mt-4 text-white font-bold w-full">{loadingStatus}</button>
            </div>
          </form>

        </Modal.Body>
      </Modal>
      {/* fim modal edit class */}

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
        onRowClicked={(event: { [s: string]: unknown; }) => { window.location.href = `classes/${event["id"]}/${event["grade"]}${event["label"]}` }}
        customStyles={customStyles}
        progressPending={isLoading}
        progressComponent={<div>Loading...</div>}
      />
    </div>
  )
}

export default Table


