import { useEffect } from "react";

interface PaginationBarProps {
    pageCount: number;
}

function PaginationBar({ pageCount }: PaginationBarProps) {
    const countNumbers: number[] = [];

    useEffect(() => {
        for (let index = 1; index <= pageCount; index += 1) {
            countNumbers.push(index);
            console.log(`${index} ye`);
        }
        console.log(countNumbers);
        console.log(pageCount);
    }, [pageCount]);

    return (
        <div>
            {countNumbers.map((number, idx) => (
                <div key={`pagination-${number}-${idx}`}>{number}</div>
            ))}
        </div>
    );
}

export default PaginationBar;
