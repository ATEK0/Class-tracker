import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import { HiOutlineAcademicCap } from "react-icons/hi2"
import toast from 'react-hot-toast';
import Table from '../../UI/TableClasses';

const ClassroomDashboard: React.FC = () => {

  const [TableData, setTableData] = useState<any[]>([])
  const [TableCols, setTableCols] = useState<any[]>([])

  const [IsLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {

    async function loadTableData() {

      try {
        // const tableDataResp = await httpClient.get(`//localhost:1222/getClassrooms`); //fazer endpoint para getClassrooms

        const tableDataResp = [
          { id: 1, name: 'John Doe', age: 25, city: 'New York' },
          { id: 2, name: 'Jane Doe', age: 30, city: 'San Francisco' },
        ]

        const tableColumns = Object.keys(tableDataResp[0]).map((name) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize the first letter
          selector: name,
          sortable: true,
        }));

        // setTableData(tableDataResp.data)
        setTableData(tableDataResp)
        setTableCols(tableColumns)
        setIsLoading(false)

      } catch {
        toast.error("Error loading data. Try again")
      }
    }

    loadTableData()

  }, [])


  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Classrooms</h1>

      <div className="gap-3 grid grid-cols-1 md:grid-cols-4 mb-5">

        <Link to="/admin/classrooms/new" className="w-full bg-red text-[#04304D] p-10 border rounded-2xl shadow-sm font-bold text-center flex flex-col items-center hover:scale-105 transition-all duration-300 shadow-[#04304d4f]">
          <HiOutlineAcademicCap className="w-14 h-14 mb-3" />
          Create Classroom
        </Link>

      </div>

      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Classrooms</h1>
      <Table endpoint={"getClasses"} namesList={["grade", "label"]} />

    </div>
  )
}

export default ClassroomDashboard 