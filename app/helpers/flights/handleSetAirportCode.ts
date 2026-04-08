const setAirportCode = (
  code: string,
  setAirportCode: React.Dispatch<React.SetStateAction<string>>,
) => {
  const formattedCode = code.replace(/[^A-Za-z]/g, "").toUpperCase();
  setAirportCode(formattedCode);
};

export default setAirportCode;
