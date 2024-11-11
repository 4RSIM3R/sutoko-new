import { useQuery } from "@tanstack/react-query";
import { ComboBox } from "./ui";

type ComboQueryProps<T> = {
    label: string;
    placeholder: string;
    selectedValue: T | null;
    onChange: (value: T) => void;
    fetchFunction: () => Promise<T[]>;
    queryKey: (string | number | null | undefined)[];
    enabled: boolean;
    disabled: boolean;
    getItemLabel: (item: T) => string; // Function to extract the label from the item
    getItemKey: (item: T) => string | number; // Function to extract the unique key from the item
    className?: string; // Add className as an optional prop
};

export const ComboQuery = <T,>({
    label,
    placeholder,
    selectedValue,
    onChange,
    fetchFunction,
    queryKey,
    enabled,
    disabled,
    getItemLabel,
    getItemKey,
    className, // Include className in the props
}: ComboQueryProps<T>) => {
    const { data: items = [], isLoading } = useQuery<T[]>({
        queryKey,
        queryFn: fetchFunction,
        enabled,
    });

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <ComboBox
                placeholder={placeholder}
                isDisabled={disabled}
                onInputChange={(value) => onChange(value as any)}
            >
                <ComboBox.Input value={selectedValue ? getItemLabel(selectedValue) : ""} readOnly />
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <ComboBox.List>
                        {(items ?? []).map((item) => (
                            <ComboBox.Option key={getItemKey(item)}>
                                {getItemLabel(item)}
                            </ComboBox.Option>
                        ))}
                    </ComboBox.List>
                )}
            </ComboBox>
        </div>
    );
};
