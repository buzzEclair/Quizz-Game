import React from "react";

const Cats = ({ handleCat }) => {
  const cats = [
    {
      id: 9,
      name: "General Knowledge",
      style: {
        background: "#FFCD00",
        width: "150px",
        height: "150px",
        top: "2%"
      }
    },
    {
      id: 21,
      name: "Sports",
      style: {
        background: "#2E008B",
        width: "120px",
        height: "120px",
        top: "15%",
        marginLeft: "10px"
      }
    },
    {
      id: 15,
      name: "Video Games",
      style: {
        background: "#00892F",
        width: "70px",
        height: "70px",
        top: "-10%",
        fontSize: "12px"
      }
    },
    {
      id: 16,
      name: "Board Games",
      style: {
        background: "#00AFD7",
        width: "100px",
        height: "100px",
        top: "8%",
        fontSize: "12px"
      }
    },
    {
      id: 17,
      name: "Science Nature",
      style: {
        background: "#FF808B",
        width: "80px",
        height: "80px",
        top: "-6%",
        fontSize: "12px"
      }
    },
    {
      id: 18,
      name: "Science Computers",
      style: {
        background: "#FFC658",
        width: "110px",
        height: "110px",
        top: "5%",
        fontSize: "12px",
        marginLeft: "10px"
      }
    }
  ];
  return (
    <>
      <div className="cats-list">
        {cats.map((item) => (
          <button
            key={item.id}
            style={item.style}
            onClick={() => handleCat(item.id, item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Cats;
