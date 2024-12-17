import React, { useState, useEffect } from 'react';

const Checkbox = ({ dropdownName, options, selectedOptions, setSelectedOptions }) => {
    const [localSelectedOptions, setLocalSelectedOptions] = useState(selectedOptions || []);

    useEffect(() => {
        // Đảm bảo luôn đồng bộ với prop từ cha
        setLocalSelectedOptions(selectedOptions || []);
    }, [selectedOptions]);

    const handleCheckboxClick = (option) => {
        const isSelected = localSelectedOptions.some(
            (opt) => String(opt.category_id) === String(option.category_id)
        );

        const updatedOptions = isSelected
            ? localSelectedOptions.filter(
                (opt) => String(opt.category_id) !== String(option.category_id)
            )
            : [...localSelectedOptions, option];

        // Cập nhật cả local state và state của cha
        setLocalSelectedOptions(updatedOptions);
        setSelectedOptions(updatedOptions);
    };


    return (
        <div className="hidden pt-1 w-2/3 md:flex md:flex-col text-left">
            <div className="bg-zinc-300 rounded-t-lg">
                <label
                    className="inline-flex justify-between w-full rounded-t-md bg-white px-4 py-2 text-lg md:text-base font-medium text-gray-700"
                    id={`${dropdownName}-dropdown`}
                >
                    {dropdownName}

                </label>
            </div>
            <div className=" w-full rounded-b-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby={`${dropdownName}-dropdown`}>
                    {options.map((option) => (
                        <div key={option.category_id} className="flex items-center px-4 py-2 hover:bg-zinc-300">
                            <label className="flex items-center w-full cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={localSelectedOptions.some((opt) => opt.category_id === option.category_id)}
                                    className=" cursor-pointer block h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    onChange={() => handleCheckboxClick(option)}
                                />
                                <div className="ml-1 text-xs lg:text-sm text-gray-700 w-full ">{option.category_name}</div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Checkbox;