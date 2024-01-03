import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import httpClient from '../../httpClient';
import { TextAlign } from '../../types';
import { apiLink } from '../../config';

const Table = (props: {
    namesList: string[]; endpoint: string; classNumber: string;
}) => {
    const [tableData, setTableData] = useState<any>([]);
    const [tableCols, setTableCols] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
  
    useEffect(() => {
      async function loadTableData() {
        try {
          const tableDataResp = await httpClient.get(`${apiLink}/${props.endpoint}`, { "class_id":"1" });
          console.log(tableDataResp)
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
  
      loadTableData();
    }, []);
  
    const handleSearch = (text: React.SetStateAction<string>) => {
      setSearchText(text);
    };
  
    const filteredData = tableData.filter((item: { [s: string]: unknown; } | ArrayLike<unknown>) =>
      Object.values(item).some(
        (value) =>
          value && value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  
    const customStyles = {
      headRow: {
        style: {
          backgroundColor: '#04304D',
          color: 'white'
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
          textAlign: 'center' as TextAlign | undefined
        },
      },
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                className="mb-3 p-2 border rounded"
            />

            <DataTable
                columns={tableCols}
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