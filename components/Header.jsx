import { forwardRef } from 'react';

const Header = forwardRef((props, ref) => {
    return (
        <header ref={ref} className="fixed top-0 left-0 py-4 w-full archivo z-40 -translate-y-full" style={{
            color: '#003018'
        }}>
            
            <div className="container flex justify-between items-center">

                <div className="Logo font-black uppercase tracking-tighter text-md cursor-pointer text-[#C44536]">Espeto caiçara</div>

                <ul className="Infos flex items-center justify-center gap-6">
                    <li className="cursor-pointer font-light hover:text-[#C44536] transition-colors duration-150 ease-out">Home</li>
                    <li className="cursor-pointer font-light hover:text-[#C44536] transition-colors duration-150 ease-out">Sobre</li>
                    <li className="cursor-pointer font-light hover:text-[#C44536] transition-colors duration-150 ease-out">História</li>
                    <li className="cursor-pointer px-4 py-1 rounded-full border-2 border-[#C44536] text-[#C44536] font-medium archivo tracking-widest transition-all duration-300 hover:bg-[#C44536] hover:text-[#EAE2D6] ease-out">Cardápio</li>
                </ul>

            </div>

        </header>
    );
});

export default Header;