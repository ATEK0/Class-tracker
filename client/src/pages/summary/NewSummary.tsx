import React from 'react'

const NewSummary = () => {

  return (
    <div className='pt-[64px] mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold py-3 text-[#04304d]'>Schedule new class</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                        Date
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="date"/>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                        Time
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="time" step={3600}/>
                </div>
                
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                Class Title
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="text" placeholder="Class Title" />
            </div>
            <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
                    Summary
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-80 resize-none" id="summary" placeholder="Summary Content" ></textarea>
            </div>
            <div className='flex justify-end'>
                <button type="button" className='px-5 py-2 rounded-lg bg-[#04304d] text-white'>Create</button>
            </div>
        </form>

    </div>
  )

}

export default NewSummary