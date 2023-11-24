import React from 'react'

const Admin = (props: { user: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; surname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined } }) => {
  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8 h-full flex justify-center items-center'>
        <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
          <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
          <div className="text-center mt-2 text-3xl font-bold text-[#04304d]">{props.user.name} {props.user.surname}</div>
          <div className="text-center mt-2 font-light text-sm">{props.user.id}</div>
          <div className="text-center font-normal text-lg">{props.user.type}</div>
          {/* <div className="px-6 text-center mt-2 font-light text-sm">
          <p>
              Front end Developer, avid reader. Love to take a long walk, swim
          </p>
          </div> */}
          <hr className="mt-8" />
          <div className="flex p-4">
          <div className="w-1/3 text-center p-1">
            <button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full' >Password</button>
          </div>
          <div className="w-0 border border-gray-300">
              
          </div>
          <div className="w-1/3 text-center p-1">
          <button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full' >Imagem</button>
          </div>
          <div className="w-0 border border-gray-300">
              
          </div>
          <div className="w-1/3 text-center p-1">
              <button type="button" className='bg-[#04304d] p-2 rounded-md text-white font-bold w-full' >Ajuda</button>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Admin