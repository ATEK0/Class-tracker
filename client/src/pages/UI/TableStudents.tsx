import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import httpClient from '../../httpClient';
import { TextAlign } from '../../types';
import { apiLink } from '../../config';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';

const Table = (props: {
    namesList: string[];
    endpoint: string;
}) => {
    const [tableData, setTableData] = useState<any>([]);
    const [tableCols, setTableCols] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

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

    const handleEditButtonClick = (row: { [s: string]: unknown }) => {
        console.log('Editar:', row.id);
    };

    const handleDeleteButtonClick = async (row: { [s: string]: unknown }) => {
        const resp = await httpClient.delete(`${apiLink}/deleteStudent/${row.id}`);
        if (resp.data.message == 'ok') {
            loadTableData()
            toast.success("Student deleted")
        } else {
            toast.error("Student Not Found")
        }
        console.log('Deletar:', row.id);
    };

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

    const conditionalRowStyles = [
        {
            when: (row: { [s: string]: unknown }) => true, 
            style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
        },
    ];

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

            <DataTable
                columns={columnsWithButton}
                data={filteredData}
                pagination
                responsive
                highlightOnHover
                onRowClicked={(event: { [s: string]: unknown }) => {
                    window.location.href = `students/${event["id"]}/${event["name"]}`;
                }}
                customStyles={customStyles}
                progressPending={isLoading}
                progressComponent={<div>Loading...</div>}
                conditionalRowStyles={conditionalRowStyles}
            />
        </div>
    );
};

export default Table;
