import Table from '../../UI/TableStudents'

const StudentsDashboard = () => {
  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Students</h1>
      <Table endpoint={"/getStudents"} namesList={["process", "name", "email", "class"]}/>
    </div>
  )
}

export default StudentsDashboard