"use client";

import React from "react";
import { twJoin } from "tailwind-merge";
import { IconCamera, IconFolder, IconPaperclip, IconFile } from "justd-icons";
import {
    FileTrigger as FileTriggerPrimitive,
    type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components";
import { Button, FieldGroup, Label } from "./ui";

interface EnhancedFilePickerProps {
    label: string;
    name: string;
    isRequired?: boolean;
    onChange: (files:  File[]) => void;
    ref?: React.RefObject<HTMLInputElement>;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    accept?: string[];
    multiple?: boolean;
    className?: string;
    value?:  File[];
    withIcon?: boolean;
    intent?: "primary" | "secondary" | "danger" | "warning";
    size?: "medium" | "large" | "square-petite" | "extra-small" | "small";
    shape?: "square" | "circle";
    appearance?: "solid" | "outline" | "plain";
}

export const FilePicker: React.FC<EnhancedFilePickerProps> = ({
    label,
    name,
    isRequired = false,
    onChange,
    ref,
    accept,
    multiple = false,
    className,
    value,
    withIcon = true,
    intent = "primary",
    size = "medium",
    shape = "square",
    appearance = "outline",
}) => {
    return (
        <div className={twJoin("flex flex-col gap-y-1.5", className)}>
            <Label className="mb-1.5">
                {label} {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <FileTriggerPrimitive
                onSelect={(e) => {
                    let files = Array.from(e ?? []);
                    onChange(files);
                }}
                acceptedFileTypes={accept}
                allowsMultiple={multiple}
                ref={ref}
            >
                <Button
                    isDisabled={false}
                    intent={intent}
                    size={size}
                    shape={shape}
                    appearance={appearance}
                    className="flex items-center gap-2"
                >
                    {withIcon && (
                        <>
                            {accept?.includes("camera") ? (
                                <IconCamera />
                            ) : accept?.includes("folder") ? (
                                <IconFolder />
                            ) : (
                                <IconPaperclip className="rotate-45" />
                            )}
                        </>
                    )}
                    <span>
                        {ref?.current?.value}
                        {multiple
                            ? "Browse Files"
                            : accept?.includes("folder")
                                ? "Browse Folder"
                                : "Browse File"}
                    </span>
                </Button>
            </FileTriggerPrimitive>
            {value && (
                <span className="text-sm text-muted-fg">
                    Selected: {value[0]?.name}
                </span>
            )}
        </div>
    );
};
