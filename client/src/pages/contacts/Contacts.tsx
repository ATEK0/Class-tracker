import atekoCartoon from "../../assets/ateko.png"
import kayunCartoon from "../../assets/kayun.png"

const Contacts = () => {
    return (
        <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8 h-full flex items-center flex-col gap-1'>
            <h1 className="font-bold text-3xl text-[#04304D] pt-8 text-center">Our team is here to help you out</h1>
            <div className="grid grid-rows-2 md:grid-cols-2 gap-3 w-full h-full">
                <div className="card w-full bg-[#8400ff] text-white text-center p-2 rounded-md flex justify-center flex-col gap-2 items-center">
                    <h1 className="text-2xl font-bold">Afonso Almeida</h1>
                    <img src={atekoCartoon} className="rounded-full w-fit" alt="cartoon Afonso Almeida"/>
                    <p>Software Developer</p>
                    <p className="text-xl font-bold">afonso.almeida.2022006@my.istec.pt</p>
                    <p className="text-xl font-bold animate-bounce">codebyateko.com</p>
                </div>
                <div className="card w-full bg-[#3078c6] text-white text-center p-2 rounded-md flex justify-center flex-col gap-2 items-center">
                    <h1 className="text-2xl font-bold">Bruno Moreira</h1>
                    <img src={kayunCartoon} className="rounded-full w-fit" alt="cartoon Bruno Moreira"/>
                    <p>Back-end Developer</p>   
                    <p className="text-xl font-bold">bruno.moreira.2022013@my.istec.pt</p>
                    <p className="text-xl font-bold animate-bounce">github.com/Im-Kayun</p>
                </div>
            </div>
        </div>
    )
}

export default Contacts