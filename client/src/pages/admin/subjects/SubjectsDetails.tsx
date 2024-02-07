import { useParams } from "react-router-dom"
import Table from "../../UI/TableTeachers"

const SubjectsDetails = () => {

  const { subjectID } = useParams()

  return (
    <div className="pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8">
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5 ">Subject Information</h1>


      <h1 className="font-bold text-1xl text-[#04304D] pt-8 mb-5">Teachers that teach this subject</h1>
      <Table endpoint={"/getSubjectTeachers/" + subjectID} namesList={["id", "name"]}/>
    </div>
  )
}

export default SubjectsDetails