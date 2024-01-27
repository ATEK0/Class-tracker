import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import httpClient from '../../httpClient';
import { TextAlign } from '../../types';
import { apiLink } from '../../config';
import { faBoxArchive, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
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

  const [beingDeleted, setbeingDeleted] = useState<any>([])
  const [beingEdited, setbeingEdited] = useState('')
  const [openModalConfirmDelete, setopenModalConfirmDelete] = useState<boolean>(false);
  const [openModalEdit, setopenModalEdit] = useState<boolean>(false);
  const [archiveModalContent, setarchiveModalContent] = useState<string>("")
  const [archiveModalTitle, setarchiveModalTitle] = useState<string>("")
  const [archiveButtonContent, setarchiveButtonContent] = useState<string>("")
  const [buttonColor, setButtonColor] = useState<string>("")

  useEffect(() => {
    loadTableData();
  }, []);

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

  function handleEditButtonClick(row: { [s: string]: unknown; }): void {
    throw new Error('Function not implemented.');
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
              <Label htmlFor="">{archiveModalContent} {beingDeleted[1]}?</Label>
            </div>


            <div className="w-full flex justify-between">
              <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
              <Button className={`bg-[${buttonColor}]`} onClick={() => { archiveClass(beingDeleted[0]) }}>{archiveButtonContent}</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>

      {/* final confirm class archive modal */}

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


