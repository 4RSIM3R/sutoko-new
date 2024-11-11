import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ComboBox } from "./ui";

type ComboQueryProps<T> = {
  label: string;
  placeholder: string;
  selectedValue: T | null;
  onChange: (value: T) => void;
  fetchFunction: (inputValue: string) => Promise<T[]>;
  queryKey: (string | number | null | undefined)[];
  enabled?: boolean;
  disabled?: boolean;
  getItemLabel: (item: T) => string;
  getItemKey: (item: T) => string | number;
  className?: string;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const ComboQuery = <T,>({
  label,
  placeholder,
  selectedValue,
  onChange,
  fetchFunction,
  queryKey,
  enabled = true,
  disabled = false,
  getItemLabel,
  getItemKey,
  className,
}: ComboQueryProps<T>) => {
  const [inputValue, setInputValue] = useState<string>("");

  // State to control the visibility of the ComboBox list
  const [isOpen, setIsOpen] = useState(false);

  // Debounce the input value to prevent excessive API calls
  const debouncedInputValue = useDebounce(inputValue, 300);

  // Update input value when selectedValue changes
  useEffect(() => {
    if (selectedValue) {
      setInputValue(getItemLabel(selectedValue));
    } else {
      setInputValue("");
    }
  }, [selectedValue, getItemLabel]);

  // Fetch data using TanStack Query
  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery<T[]>({
    queryKey: [...queryKey, debouncedInputValue],
    queryFn: () => fetchFunction(debouncedInputValue),
    enabled, // Fetches data even when input is empty
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true); // Open the list when the user types
  };

  // Handle selection change
  const handleSelectionChange = (key: React.Key) => {
    const selectedItem = items.find((item) => getItemKey(item) === key);
    if (selectedItem) {
      onChange(selectedItem);
      setInputValue(getItemLabel(selectedItem));
      setIsOpen(false); // Close the list after selection
    }
  };

  // Open the ComboBox list when items are available
  useEffect(() => {
    if (items.length >0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [items, inputValue]);

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <ComboBox
        placeholder={placeholder}
        isDisabled={disabled}
        onSelectionChange={(value) => handleSelectionChange(value as any)}
      >
        <ComboBox.Input value={inputValue} onChange={handleInputChange} />
        {isLoading ? (
          <div className="p-2">Loading...</div>
        ) : isError ? (
          <div className="p-2 text-red-500">Error: {(error as Error).message}</div>
        ) : (
          isOpen && (
            <ComboBox.List isOpen>
              {items.map((item) => (
                <ComboBox.Option key={getItemKey(item)} id={getItemKey(item)}>
                  {getItemLabel(item)}
                </ComboBox.Option>
              ))}
            </ComboBox.List>
          )
        )}
      </ComboBox>
    </div>
  );
};
