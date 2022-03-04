import React from 'react';
import { FieldContainer, FieldLabel, FieldNote, Input } from '../common';

type TextInputProps = {
    value: string;
    label?: string;
    note?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
};

const TextInput: React.FC<TextInputProps> = ({ value, label, note, placeholder, disabled, onChange, ...rest }) => {
    return (
        <FieldContainer>
            {label && <FieldLabel>{label}:</FieldLabel>}
            <Input
                {...rest}
                value={value}
                type="text"
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                disabled={disabled}
            />
            {note && <FieldNote>{note}</FieldNote>}
        </FieldContainer>
    );
};

export default TextInput;
