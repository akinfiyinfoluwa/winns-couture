import { useEffect, useRef, useState } from "react";

// Multi-select dropdown component
interface MultiSelectDropdownProps {
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  label: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const displayText = selectedValues.length === 0 
    ? placeholder 
    : `${selectedValues.length} ${label.toLowerCase()}${selectedValues.length === 1 ? '' : 's'} selected`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black/20 bg-white border border-gray-300 text-left flex justify-between items-center text-sm sm:text-base"
      >
        <span className={selectedValues.length === 0 ? 'text-gray-500' : 'text-black'}>
          {displayText}
        </span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleToggleOption(option.value)}
                className="mr-2 rounded"
              />
              <span className="flex-1">{option.label}</span>
              {option.value.startsWith('bg-') && (
                <div className={`w-4 h-4 rounded-full ml-2 ${option.value} ${option.value === 'bg-white' ? 'border border-gray-300' : ''}`}></div>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;