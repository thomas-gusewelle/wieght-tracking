import { useEffect, useState, useRef } from "react";
import { BiChevronDown } from "react-icons/bi";

const Accordian = ({ title, body }) => {
  const [isOpen, setIsOpen] = useState(false);
  const accordianBody = useRef<HTMLDivElement>();

  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log(accordianBody.current);
    let aB = accordianBody.current;
    if (!isOpen) {
      aB.style.maxHeight = "0px";
    }
    if (isOpen) {
      aB.style.maxHeight = aB.scrollHeight + "px";
      console.log(aB.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="w-full mb-2">
      <div className="w-full h-[2px] bg-stone-700 mb-2"></div>
      <div
        className="flex justify-between items-center cursor-pointer px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-xl">{title}</h4>
        <div
          className={`${
            !isOpen ? "" : "rotate-180"
          } transition-all duration-500 ease-in-out`}
        >
          <BiChevronDown size={25} />
        </div>
      </div>
      <div
        id="accordianBody"
        ref={accordianBody}
        className={`${
          isOpen ? "mb-6" : "mb-0"
        } mt-2 font-thin px-4 overflow-hidden transition-all duration-500 ease-in-out`}
      >
        <p>{body}</p>
      </div>
    </div>
  );
};

export default Accordian;
