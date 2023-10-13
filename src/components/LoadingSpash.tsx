import '../animation/makeAnimation.css'

export function LoadingSpash() {
  return (
    <>
     <div className="flex flex-col w-full h-full items-center justify-center bg-blue-100">
        <div className="flex flex-col relative items-center drop-shadow-lg">
            <div className='w-28 h-4 bg-black animate-bounce'></div>
            <div className='relative w-24 h-16 bg-amber-100'>
                <div className='absolute w-4 h-4 bg-black left-16 top-4'></div>
                <div className='absolute w-2 h-2 bg-white left-[66px] top-4'></div>
            </div>
            <div className='w-40 h-12 bg-green-200'></div>
            <div className='w-48 h-3 bg-green-400'></div>
            <div className='w-52 h-5 bg-green-400'></div>
            <div className="w-60 h-40 bg-green-400 z-10"></div>
            <div className='flex flex-col  w-60 h-60 items-center justify-center bg-[#fff] paper-up drop-shadow-lg animate-bounce absolute top-[-72px] left-60'>
                <p className='font-semibold text-3xl text-[#808080] animate-pulse'>Data</p>
            </div>
            <div className='absolute top-40 left-20 z-20 w-56 h-8 bg-amber-100 border-l-4 rounded-xl border-l-[green]'></div>
            <div className='absolute left-[-48px] w-12 h-8 bg-green-400 top-48'></div>
            <span className='w-3 h-3 absolute left-[-48px] bg-yellow-300 top-48'></span>
            <div className='absolute left-[-72px] w-16 h-12 bg-green-400 top-52'></div>
            <span className='w-3 h-3 absolute left-[-72px] bg-yellow-300 top-52'></span>
            <div className='absolute left-[-98px] w-32 h-12 bg-green-400 top-56'></div>
            <span className='w-3 h-3 absolute left-[-98px] bg-yellow-300 top-56'></span>
            <div className='absolute left-[-108px] w-32 h-10 bg-green-400 top-60'></div>
            <span className='w-3 h-3 absolute left-[-108px] bg-yellow-300 top-60'></span>
            <div className='absolute left-[-144px] w-36 h-8 bg-green-400 top-64'></div>
            <div className='w-52 h-5 bg-green-400'></div>
            <div className='w-40 h-6 bg-green-400'></div>
            <div ></div>
            <div className="flex justify-center">
                <div className=" w-12 h-10 bg-green-200 z-0 animate-leg-left"></div>
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

