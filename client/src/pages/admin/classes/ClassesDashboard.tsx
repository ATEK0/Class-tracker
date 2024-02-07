import { Link } from 'react-router-dom';
import Table from '../../UI/TableClasses';
import { faHouseCircleCheck, faHouseCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClassesDashboard = () => {


  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Classes</h1>
      
      <Link to={"/admin/classes/new"}><button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full md:w-1/5 mb-3 mr-2' >Create Class</button></Link>
      <Link to={"/admin/classes/new"}><button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full md:w-1/5 mb-3' >Assign Subjects to Class</button></Link>
      
      <h1 className="font-bold text-2xl text-[#04304D] pt-8 mb-5"><FontAwesomeIcon icon={faHouseCircleCheck} /> Active Classes</h1>
      <Table endpoint={"getClasses"} namesList={["grade", "label", "headteacher"]}/>


      <h1 className="font-bold text-2xl text-[#04304D] pt-8 mb-5"><FontAwesomeIcon icon={faHouseCircleXmark} /> Archived Classes</h1>
      <Table endpoint={"getArchivedClasses"} namesList={["grade", "label", "headteacher"]}/>

    </div>
  );
};

export default ClassesDashboard;
