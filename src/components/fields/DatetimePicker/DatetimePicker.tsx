import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FieldContainer } from '../common';
import styled from 'styled-components';

type DatetimePickerProps = ReactDatePickerProps;

export const DatetimePicker: React.FC<DatetimePickerProps> = ({ ...rest }) => {
    const { t } = useTranslation();

    return (
        <DatePickerContainer>
            <ReactDatePicker
                dateFormat="MMM d, yyyy h:mm aa"
                placeholderText={t('common.select-date')}
                autoComplete="off"
                {...rest}
            />
        </DatePickerContainer>
    );
};

const DatePickerContainer = styled(FieldContainer)`
    width: fit-content;

    .react-datepicker__input-container {
        input {
            background: ${(props) => props.theme.input.background.primary};
            border: 2px solid ${(props) => props.theme.input.borderColor.primary};
            box-sizing: border-box;
            mix-blend-mode: normal;
            border-radius: 12px;
            height: 60px;
            padding: 20px 20px 20px 20px;
            outline: 0;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 25px;
            color: ${(props) => props.theme.input.textColor.primary};
            &::selection {
                background: ${(props) => props.theme.input.background.selection.primary};
            }
            &:focus {
                border: 2px solid ${(props) => props.theme.input.borderColor.focus.primary};
                box-sizing: border-box;
            }
            &:disabled {
                opacity: 0.4;
                cursor: default;
            }
            &.error {
                border: 2px solid #e53720;
            }
        }
    }

    .react-datepicker {
        display: flex !important;
        border: none;
        background: ${(props) => props.theme.background.tertiary};
        border-radius: 10px;
    }

    .react-datepicker__month-container {
        width: 300px;
        height: 260px;
        padding-top: 20px;
        border-radius: 10px 0 0 10px;
    }

    .react-datepicker__header {
        background: transparent;
        border: none;
        padding: 0;
        margin: 0;
    }

    .react-datepicker__month {
        margin: 0;
    }

    .react-datepicker__current-month {
        font-weight: 600;
        font-size: 16px;
        line-height: 32px;
        letter-spacing: 0.35px;
        color: ${(props) => props.theme.textColor.primary};
    }

    .react-datepicker__day-name {
        font-weight: bold;
        font-size: 10px;
        line-height: 16px;
        letter-spacing: 1px;
        color: ${(props) => props.theme.textColor.primary};
        text-transform: uppercase;
    }

    .react-datepicker__day {
        font-weight: bold !important;
        font-size: 13px !important;
        height: 24px !important;
        letter-spacing: 0.4px;
        color: #f6f6fe !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
    }

    .react-datepicker__week,
    .react-datepicker__day-names {
        padding: 0 30px;
        margin-bottom: 0;
    }

    .react-datepicker__day--keyboard-selected {
        background: #0a2e66 !important;
    }

    .react-datepicker__week .react-datepicker__day--selected,
    .react-datepicker__week .react-datepicker__day--range-start {
        background: ${(props) => props.theme.background.secondary} !important;
        color: ${(props) => props.theme.textColor.primary} !important;
        box-sizing: border-box;
        border-radius: 50% !important;
        width: 1.7rem !important;
        margin: 0.166rem !important;
        padding: 0;
        z-index: 2 !important;
    }

    .react-datepicker__day--disabled {
        color: #4564ae !important;
    }

    .react-datepicker__day--in-range {
        position: relative;
        background: ${(props) => props.theme.textColor.secondary} !important;
        z-index: 1 !important;
        color: ${(props) => props.theme.textColor.primary} !important;
    }

    .react-datepicker__day--in-range:first-child {
        border-top-left-radius: 16px !important;
        border-bottom-left-radius: 16px !important;
    }

    .react-datepicker__day--in-range:last-child {
        border-top-right-radius: 16px !important;
        border-bottom-right-radius: 16px !important;
    }

    .react-datepicker__navigation {
        top: 136px !important;
        width: 28px !important;
        height: 28px !important;
        border: none !important;
    }

    .react-datepicker__navigation--previous {
        left: 8px !important;
    }

    .react-datepicker__navigation--next {
        right: 140px !important;
    }

    .react-datepicker__time-container {
        border: none;
        width: 130px;
        height: 260px;
        background: transparent;
        .react-datepicker__time {
            height: 100% !important;
            background: transparent;
            border-radius: 10px;
        }
    }

    .react-datepicker-time__header {
        display: none;
    }

    .react-datepicker__time-box {
        width: 100% !important;
        padding-top: 15px;
        padding-bottom: 15px;
        height: 100% !important;
    }

    .react-datepicker__time-list {
        height: 100% !important;
        position: relative;
    }

    .react-datepicker__time-list-item {
        width: 94px !important;
        border: 0.5px solid #f6f6fe;
        border-radius: 10px !important;
        padding: 6px 10px !important;
        font-weight: bold;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 1px;
        margin: auto;
        margin-bottom: 3px !important;
        color: ${(props) => props.theme.textColor.primary};
    }

    .react-datepicker__time-list-item--selected {
        background: ${(props) => props.theme.background.secondary};
    }

    .react-datepicker__time-list-item:hover {
        background: ${(props) => props.theme.background.secondary};
    }

    .react-datepicker__time-list::-webkit-scrollbar-thumb {
        background: transparent !important;
    }

    .react-datepicker__time-list::-webkit-scrollbar-track {
        background: transparent !important;
    }

    .react-datepicker__triangle {
        :after,
        :before {
            border-bottom-color: ${(props) => props.theme.borderColor.tertiary} !important;
            top: 0;
        }
    }
`;

export default DatetimePicker;
