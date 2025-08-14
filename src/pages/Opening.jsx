import React from "react";
import {Link} from 'react-router-dom'

function Opening() {
  return (
    <div className="font-itim flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl">WELCOME TO ALIVE</h1>
        <h3 className="text-lg">Want To Know More About US?</h3>
        <h3 className="text-lg">Click on the windows knobs!</h3>
        <Link to="/home" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
        Tombol
        </Link>
      </div>
    </div>
  );
}

export default Opening;
