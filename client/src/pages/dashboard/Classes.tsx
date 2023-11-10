import { useFetchUser } from "../../controllers/getUserData";


const stats = [
    { id: 1, name: 'Turmas', value: '44' },
    { id: 2, name: 'Alunos', value: '$119' },
    { id: 3, name: 'Sumários', value: '46,000' },
    { id: 4, name: 'Sumários', value: '46,000' },
  ]

const Classes = () => {

    const user = useFetchUser();
    
  return (
    <div className="sm:py-16 py-8">
        <h1 className="font-bold text-3xl text-[#04304D]">Olá {user?.email},</h1><br />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-x-0.5 gap-y-10 text-center lg:grid-cols-4 ">
            {stats.map((stat) => (
              <div key={stat.id} className={`mx-auto flex max-w-xs flex-col w-full h-full p-5 ${stat.id == 1 ? "rounded-s-xl" : ""} ${stat.id == 4 ? "rounded-e-xl" : ""} bg-[#04304D] gap-y-4`}>
                <dt className="text-base leading-7 text-white font-bold">{stat.name}</dt>
                <dd className="order-first text-3xl tracking-tight text-white font-bold sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
  )
}

export default Classes
  