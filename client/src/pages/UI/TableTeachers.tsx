import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import httpClient from '../../httpClient';
import { ClassListType, TextAlign } from '../../types';
import { apiLink } from '../../config';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import { Modal, Label, Button, TextInput } from 'flowbite-react';

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


      <DataTable
        columns={columnsWithButton}
        data={filteredData}
        pagination
        responsive
        highlightOnHover
        onRowClicked={(event: { [s: string]: unknown }) => {
          window.location.href = `profile/${event["id"]}`;
        }}
        customStyles={customStyles}
        progressPending={isLoading}
        progressComponent={<div>Loading...</div>}
      />
    </div>
  );
};

export default Table;
