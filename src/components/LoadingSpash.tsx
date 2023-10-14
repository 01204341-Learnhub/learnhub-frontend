import '../animation/makeAnimation.css'

export function LoadingSpash() {
  return (
    <>
     <div className="flex flex-col w-full h-full items-center justify-center bg-blue-50">
        <div className="flex flex-col relative items-center drop-shadow-lg">
            <div className='w-28 h-8 bg-black rounded-lg animate-bounce'></div>
            <div className='relative w-24 h-16 bg-amber-100 rounded-xl'>
                <div className='absolute w-4 h-4 bg-black rounded-lg left-16 top-4'></div>
                <div className='absolute w-4 h-4 bg-amber-400 rounded-tr-xl rounded-br-xl top-6 left-24'></div>
                <div className='absolute w-2 h-2 bg-white rounded-full left-[66px] top-4'></div>
                <div className='absolute w-4 h-4 bg-red-300 top-10 left-12 rounded-full' ></div>
            </div>
            <div className='w-40 h-12 bg-green-300'></div>
            <div className='w-48 h-3 bg-green-400'></div>
            <div className='w-52 h-5 bg-green-400'></div>
            <div className="w-60 h-40 bg-green-400 z-10"></div>
            <div className='flex flex-col  w-60 h-60 items-center justify-center bg-[#fff] paper-up drop-shadow-lg animate-bounce absolute top-[-72px] left-60'>
                <p className='font-semibold text-3xl text-[#808080] animate-pulse'>Data</p>
            </div>
            <div className='absolute top-40 left-32 z-20 w-52 h-8 bg-amber-100 border-l-4 rounded-xl border-l-[green]'></div>
            <div className='absolute left-[-48px] w-12 h-8 bg-green-400 top-[224px]'></div>
            <span className='w-3 h-3 absolute left-[-48px] bg-yellow-300 top-[224px]'></span>
            <div className='absolute left-[-72px] w-24 h-12 bg-green-400 top-[244px]'></div>
            <span className='w-3 h-3 absolute left-[-72px] bg-yellow-300 top-[244px]'></span>
            <div className='absolute left-[-98px] w-32 h-12 bg-green-400 top-[264px]'></div>
            <span className='w-3 h-3 absolute left-[-98px] bg-yellow-300 top-[264px]'></span>
            <div className='absolute left-[-108px] w-32 h-10 bg-green-400 top-[280px]'></div>
            <span className='w-3 h-3 absolute left-[-108px] bg-yellow-300 top-[280px]'></span>
            <div className='absolute left-[-144px] w-36 h-8 bg-green-400 top-[296px]'></div>
            <div className='absolute bg-lime-100 w-8 h-28 top-52 left-52 rounded-tl-2xl rounded-bl-2xl z-20'></div>
            <div className='w-52 h-5 bg-green-400'></div>
            <div className='w-40 h-6 bg-green-400'></div>
            <div ></div>
            <div className="flex justify-center">
                <div className=" w-12 h-10 bg-green-300 z-0 animate-leg-left"></div>
                <div className=" w-12 h-10 bg-green-400 animate-leg-right"></div>
            </div>
        </div>
        <div className="">
            <h1 className="text-2xl mt-12 pb-12 font-bold animate-pulse">Dragodgi กำลังนำข้อมูลมาให้คุณ โปรดรอสักครู่ . . .</h1>
        </div>
     </div>
    </>
  );
}

