
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='w-full text-center bg-[#04304d] p-5 font-bold text-white'>
            &copy;{currentYear} All rights reserved to Class-Tracker <br />Developed By <a href='https://github.com/ATEK0' target='_blank' className='footer-link-ateko'>ATEKO</a> & <a href='https://github.com/Im-Kayun/' className='footer-link-kayun' target='_blank'>KAYUN</a>
        </div>
    )
}

export default Footer