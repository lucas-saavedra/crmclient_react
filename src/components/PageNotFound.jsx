
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-blue-900 h-screen ">
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                <div className="w-full font-mono flex flex-col items-center relative z-10">
                    <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4 mb-4">
                        You are all alone here
                        <p className='animate-pulse'>...</p>
                    </h1>
                    <p className="font-extrabold text-6xl  my-44 text-white animate-bounce">
                        404
                    </p>
                    <button className='bg-blue-500 p-3 rounded text-2xl'
                        onClick={() => navigate('/')}
                    >Back to the menu</button>
                </div>
            </div>
        </div>

    )
}
