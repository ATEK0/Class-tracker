import { Textarea } from 'flowbite-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ClassroomDetails = () => {

  const { eventId } = useParams();

  useEffect(() => {

    async function getClassroomData() {

    }

    getClassroomData()

    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  const alertUser = (e: { preventDefault: () => void; returnValue: string; }) => {
    e.preventDefault()
    e.returnValue = ''
  }


  return (
    <div className='pt-[64px] mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8">Aula 123</h1>
      <br />
      <p className='text-[#04304D] pb-1'>Summary</p>
      <Textarea className='max-h-[200px] h-[200px] resize-none min-h-[200px] ' aria-multiline></Textarea>
      <br />
      <br />

      <p className='text-[#04304D] pb-1'>Students</p>

      <div className='w-full flex justify-end gap-1'>
        <button type="button" className='px-5 py-2 rounded-lg bg-gray-500 text-white'>Cancel</button>
        <button type="button" className='px-5 py-2 rounded-lg bg-[#04304d] text-white'>Save</button>
      </div>

    </div>
  )
}

export default ClassroomDetails

