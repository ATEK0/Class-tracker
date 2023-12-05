
const NewStudent = () => {

  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">New Students</h1>
      Create a new student
      <form>
        <input type="text" name="teste2" />
        <input type="text" name="teste1" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewStudent;
