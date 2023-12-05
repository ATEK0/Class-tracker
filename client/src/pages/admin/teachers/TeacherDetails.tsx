import { useParams } from "react-router-dom";

const TeacherDetails = () => {

    const { name } = useParams();
    const { teacherID } = useParams();   
  return (
    <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        teacher details
        <br />
        {name}
        <br />
        {teacherID}
    </div>
  )
}

export default TeacherDetails