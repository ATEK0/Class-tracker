import atekoCartoon from "../../assets/ateko.png"
import kayunCartoon from "../../assets/kayun.png"

const Contacts = () => {
    return (
        <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8 h-full flex items-center flex-col md:flex-row md:justify-center gap-3'>

            <div className="w-full max-w-sm bg-[#8400ff] rounded-lg shadow mt-2">
                <div className="flex flex-col items-center pb-10 text-white">
                    <img className="w-28 h-28 m-3 rounded-full shadow-lg" src={atekoCartoon} alt="Bonnie image" />
                    <h5 className="mb-1 text-xl font-medium ">Afonso Almeida</h5>
                    <span className="text-sm">Software developer</span>
                    <span className="text-md font-bold">afonso.almeida.2022006@my.istec.pt</span>
                    <a href="https://codebyateko.com" className="text-md font-bold animate-bounce">codebyateko.com</a>
                </div>
            </div>

            <div className="w-full max-w-sm bg-[#3078c6] rounded-lg shadow mt-2">
                <div className="flex flex-col items-center pb-10 text-white">
                    <img className="w-28 h-28 m-3 rounded-full shadow-lg" src={kayunCartoon} alt="Bonnie image" />
                    <h5 className="mb-1 text-xl font-medium ">Bruno Moreira</h5>
                    <span className="text-sm">Back-end Developer</span>
                    <span className="text-md font-bold">bruno.moreira.2022013@my.istec.pt</span>
                    <a href="https://github.com/Im-Kayun" className="text-md font-bold animate-bounce">github.com/Im-Kayun</a>
                </div>
            </div>

        </div>
    )
}

export default Contacts