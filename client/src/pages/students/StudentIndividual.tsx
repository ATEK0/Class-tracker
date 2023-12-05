import { useParams } from "react-router-dom"


const StudentIndividual = () => {

  const { studentID } = useParams()
  const { name } = useParams()
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {studentID}<br />
      {name}
    </div>
  )
}

export default StudentIndividual