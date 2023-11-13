import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Loading = () => {
  return (
    <div className='pt-[100px] pl-[24px] mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 text-4xl text-indigo-500 pb-8 flex justify-center'>

        <FontAwesomeIcon icon={faSpinner} className='animate-spin'/>
        
    </div>
  )
}

export default Loading