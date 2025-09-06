import React from "react";
import canvas from "../assets/Ticket/banner.png"; // poster
import bg from "../assets/Ticket/bg.png";        // background
import rectagle from "../assets/Ticket/Rectangle 26.png"
import calendar from "../assets/Ticket/calendar.svg"
import location from "../assets/Ticket/location.svg"
import "../styles/ticket.css"

export default function TicketPage() {
  return (
    <>

      <div
        className="w-full min-h-screen flex justify-center items-start font-josefinn"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",     // fills screen
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative w-full max-w-[1200px] mt-8">
          <img
            src={canvas}
            alt="Poster Banner"
            className="w-full h-auto"
          />

          <p
            className="absolute font-bold text-center"
            style={{
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(12px, 4vw, 48px)",
              color: '#62514F'

            }}
          >
            Pemesanan tiket
            <br></br>
            Talk Show Alive 11.0
            <br></br>
            "MIND"
          </p>

          <img
            src={rectagle}
            alt="Poster Element"
            className="absolute"
            style={{
              top: "27%", // relative to poster height
              left: "50%", // center horizontally
              transform: "translateX(-50%)",
              width: "clamp(100px, 40vw, 500px)", // responsive scaling
            }}
          />

          {/* Div below the rectangle */}
          <div
            className="absolute text-left"
            style={{
              top: "58%",           // adjust a bit below the rectangle
              left: "50%",
              transform: "translateX(-50%)",
              width: "clamp(100px, 40vw, 500px)", // match rectangle width
              fontSize: "clamp(8px, 2vw, 24px)",
            }}
          >
            <p className="flex items-center mb-2">
              <img
                src={calendar}
                alt="icon"
                className="mr-2"
                style={{ width: "clamp(16px, 2vw, 24px)", height: "auto" }}
              />
              Senin 1, Agustus 2025
            </p>
            <p className="flex items-center">
              <img
                src={location}
                alt="icon"
                className="mr-2"
                style={{ width: "clamp(16px, 2vw, 24px)", height: "auto" }}
              />
              UMN
            </p>
          </div>

          <p
            className="absolute font-bold text-center"
            style={{
              top: "66%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(12px, 4vw, 48px)",
              color: '#47553D'
            }}
          >
            Save A Seat Now!
          </p>

          <button
            className="absolute px-4 py-2 rounded shadow-lg text-[#47553D] bg-[#B0BEA6] hover:bg-[#98AA8F]"
            style={{
              top: "72%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(12px, 4vw, 48px)",
            }}
          >
            Click Here
          </button>

        </div>
      </div>
    </>
  );
}

