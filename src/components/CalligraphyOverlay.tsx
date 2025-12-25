const CalligraphyOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] opacity-5" aria-hidden="true">
      <div 
        className="absolute font-arabic text-[20rem] text-primary opacity-10 -rotate-[15deg] whitespace-nowrap"
        style={{ top: "10%", left: "5%" }}
      >
        الله
      </div>
      <div 
        className="absolute font-arabic text-[20rem] text-primary opacity-10 -rotate-[15deg] whitespace-nowrap"
        style={{ top: "30%", right: "5%" }}
      >
        الرحمن
      </div>
      <div 
        className="absolute font-arabic text-[20rem] text-primary opacity-10 -rotate-[15deg] whitespace-nowrap"
        style={{ bottom: "20%", left: "10%" }}
      >
        الرحيم
      </div>
    </div>
  );
};

export default CalligraphyOverlay;
