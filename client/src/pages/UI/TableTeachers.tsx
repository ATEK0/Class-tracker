import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import httpClient from '../../httpClient';
import { Teacher, TextAlign } from '../../types';
import { apiLink } from '../../config';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import { Modal, Label, Button, TextInput, Select } from 'flowbite-react';

const Table = (props: {
  namesList: string[];
  endpoint: string;
}) => {
  const [tableData, setTableData] = useState<any>([]);
  const [tableCols, setTableCols] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [beingDeleted, setbeingDeleted] = useState<any>([])
  const [beingEdited, setbeingEdited] = useState('')
  const [openModalConfirmDelete, setopenModalConfirmDelete] = useState<boolean>(false);
  const [openModalEdit, setopenModalEdit] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<string>("Save")

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [contact, setContact] = useState<string>("")
  const [birthdate, setBirthDate] = useState<string>("")
  const [teacherState, setState] = useState<any>("")

  useEffect(() => {
    loadTableData();
  }, []);

  async function loadTableData() {
    try {
      const tableDataResp = await httpClient.get(`${apiLink}/${props.endpoint}`);

      const tableColumns = props.namesList.map((name: string) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        selector: (row: { [x: string]: any }) => row[name.toLowerCase()],
        sortable: true,
      }));

      setTableData(tableDataResp.data);
      setTableCols(tableColumns);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading table data:', error);
    }
  }

  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearchText(text);
  };

  const handleEditButtonClick = async (row: any) => {

    setbeingEdited(row.id);

    const resp = await httpClient.post(`${apiLink}/getTeacherInfo`, { "id": row.id });
    const teacherData: Teacher = resp.data;

    setFirstName(teacherData.name)
    setLastName(teacherData.surname)
    setEmail(teacherData.email)
    setAddress(teacherData.address)
    setContact(teacherData.contact)
    setBirthDate(teacherData.birthdate)
    setState(teacherData.state)
    setopenModalEdit(true)
  };

  const handleDeleteButtonClick = async (row: any) => {
    setbeingDeleted([row.id, row.name])
    setopenModalConfirmDelete(true)
  };

  const deleteTeacher = async (teacherID: string) => {
    const resp = await httpClient.delete(`${apiLink}/deleteTeacher/${teacherID}`);
    if (resp.status !== 200) {
      return toast.error(resp.data)
    }

    loadTableData()
    toast.success(resp.data)
    setopenModalConfirmDelete(false)

    console.log('Deletar:', teacherID);
  }

  const onCloseModal = () => {
    setopenModalConfirmDelete(false)
    setopenModalEdit(false)
    setLoadingStatus("Save")

  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    setLoadingStatus("Saving...")

    const formData = {
      firstName,
      lastName,
      email,
      address,
      password,
      contact,
      birthdate,
      teacherState
    };

    try {
      const response = await httpClient.post(`${apiLink}/editTeacher/${beingEdited}`, formData);

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
      <button onClick={() => handleDeleteButtonClick(row)} className='text-lg bg-[#04304d] text-white w-[30px] rounded-md hover:bg-[#04304dc0]'><FontAwesomeIcon icon={faTrashCan} /></button>
    </div>
    ),
  }];

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-3 p-2 border rounded"
      />


      {/* Confirm teacher deletion modal */}

      <Modal dismissible show={openModalConfirmDelete} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Delete {beingDeleted[1]}</h3>
            <div className="block">
              <Label htmlFor="">Do you want to delete <b>{beingDeleted[1]}</b> permanently?</Label>
            </div>


            <div className="w-full flex justify-between">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className='bg-[#c82333]' onClick={() => { deleteTeacher(beingDeleted[0]) }}>Delete</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>

      {/* final confirm teacher deletion modal */}

      {/* modal edit teacher */}
      <Modal dismissible show={openModalEdit} size="w-full" onClose={onCloseModal} popup>
        <Modal.Header>
          <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Edit Teacher</h1>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 m-2">
                <div className="mb-2 block">
                  <Label htmlFor="fName" value="First Name" />
                </div>
                <TextInput
                  id="fName"
                  placeholder="John"
                  value={firstName}
                  type='text'
                  maxLength={50}
                  onChange={(event) => setFirstName(event.target.value)}

                />
              </div>
              <div className="w-full md:w-1/2 m-2">
                <div className="mb-2 block">
                  <Label htmlFor="lName" value="Last Name" />
                </div>
                <TextInput
                  id="lName"
                  placeholder="Doe"
                  value={lastName}
                  type='text'
                  maxLength={50}
                  onChange={(event) => setLastName(event.target.value)}

                />
              </div>
            </div>
            <div className="m-2">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                placeholder="john@doe.com"
                value={email}
                type='email'
                maxLength={345}
                onChange={(event) => setEmail(event.target.value)}

              />
            </div>

            <div className="flex flex-row">
              <div className="w-1/2 m-2">
                <div className="mb-2 block">
                  <Label htmlFor="address" value="Address" />
                </div>
                <TextInput
                  id="address"
                  placeholder="Address"
                  value={address}
                  type='text'
                  maxLength={100}
                  onChange={(event) => setAddress(event.target.value)}

                />
              </div>
              <div className="w-1/2 m-2">
                <div className="mb-2 block">
                  <Label htmlFor="address" value="Contact" />
                </div>
                <TextInput
                  id="contact"
                  placeholder="Contact"
                  value={contact}
                  type='text'
                  maxLength={20}
                  onChange={(event) => setContact(event.target.value)}

                />
              </div>
            </div>

            <div className="flex flex-row">
              <div className="w-1/2 m-2">
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  placeholder="Password"
                  value={password}
                  type='password'
                  onChange={(event) => setPassword(event.target.value)}

                />
              </div>
              <div className="w-1/2 m-2">
                <div className="mb-2 block">
                  <Label htmlFor="state" value="State" />
                </div>
                <Select id="state" onChange={ (event) => { setState(event.target.value); } }>
                  <option value="Active" selected={teacherState == "Active"}>Active</option>
                  <option value="Waiting Aproval" selected={teacherState == "Waiting Aproval"}>Waiting Aproval</option>
                  <option value="Inactive" selected={teacherState == "Inactive"}>Inactive</option>
                </Select>
              </div>
            </div>

            <div className="m-2">
              <button type="submit" className="bg-[#04304d] rounded-md p-2 mt-4 text-white font-bold w-full">{loadingStatus}</button>
            </div>
          </form>

        </Modal.Body>
      </Modal>
      {/* fim modal edit teacher */}

      <DataTable
        columns={columnsWithButton}
        data={filteredData}
        pagination
        responsive
        highlightOnHover
        onRowClicked={(event: { [s: string]: unknown }) => {
          window.location.href = `/profile/${event["id"]}`;
        }}
        customStyles={customStyles}
        progressPending={isLoading}
        progressComponent={<div>Loading...</div>}
      />
    </div>
  );
};

export default Table;
