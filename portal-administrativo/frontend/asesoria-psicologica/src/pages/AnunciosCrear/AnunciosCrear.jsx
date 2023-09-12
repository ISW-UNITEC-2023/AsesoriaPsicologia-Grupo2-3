import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

function AnunciosCrear() {
  const { quill, quillRef } = useQuill();
  const [value, setValue] = useState();

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log(quillRef.current.firstChild.innerHTML);
        setValue(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ textAlign: "left" }}>Titulo del tema</h3>

      <input
        type="text"
        className="form-control"
        placeholder="Ingrese el titulo"
      />

      <div style={{ width: "100%", height: 300 }}>
        <div ref={quillRef} />
      </div>
    </div>
  );
}

export default AnunciosCrear;
