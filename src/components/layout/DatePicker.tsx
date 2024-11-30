import { useState } from "react";

const CustomDatePicker = () => {
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>(""); // Month will start as empty
  const [year, setYear] = useState<string>("");

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const generateDays = () => {
    const totalDays =
      month && year ? daysInMonth(parseInt(month), parseInt(year)) : 31;
    return Array.from({ length: totalDays }, (_, i) => i + 1);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 101 }, (_, i) => currentYear - i); // Last 100 years
  };

  const months = [
    { value: "", label: "Miesiąc" },
    { value: "1", label: "Styczeń" },
    { value: "2", label: "Luty" },
    { value: "3", label: "Marzec" },
    { value: "4", label: "Kwiecień" },
    { value: "5", label: "Maj" },
    { value: "6", label: "Czerwiec" },
    { value: "7", label: "Lipiec" },
    { value: "8", label: "Sierpień" },
    { value: "9", label: "Wrzesień" },
    { value: "10", label: "Październik" },
    { value: "11", label: "Listopad" },
    { value: "12", label: "Grudzień" },
  ];

  return (
    <div className="flex flex-col gap-2 flex-1">
      <div className="flex gap-2">
        {/* Year Selector */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">Rok</option>
          {generateYears().map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Month Selector */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          disabled={!year} // Disable until a year is selected
          className={`border p-2 rounded-md ${
            !year ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        {/* Day Selector */}
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          disabled={!month} // Disable until a month is selected
          className={`border p-2 rounded-md ${
            !month ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <option value="">Dzień</option>
          {generateDays().map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomDatePicker;
