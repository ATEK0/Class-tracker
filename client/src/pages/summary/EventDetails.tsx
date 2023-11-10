import { useParams } from 'react-router-dom';

const EventDetails = () => {
    
    const { eventId } = useParams();

  return (
    <div className='pt-[64px] mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <h2>Event Details</h2>
        <p>Event ID: {eventId}</p>
    </div>
  )
}

export default EventDetails

