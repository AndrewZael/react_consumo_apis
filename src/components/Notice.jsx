import React from "react";

const Notice = (props) => {
  //console.log(props);
  return (
    <div className="text-center w-75 mx-auto px-2 my-4">
      <img src={props.data.img} alt={props.data.title} width="100%" />
      <h2 className="mt-4">{props.data.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: props.data.message }}></p>
    </div>
  );
};

export default Notice;
