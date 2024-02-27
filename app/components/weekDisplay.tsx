
'use client'
import React, { useState, useRef, useEffect } from "react";
import useInfiniteScroll, {
    InfiniteScrollRef,
    ScrollDirection
} from "react-easy-infinite-scroll-hook";
type WeekEntry = {
    date: number;
    month: string;
    year: string;
};

type WeeksAndLabels = {
    weeks: WeekEntry[];
    monthLabels: string[];
};

type YearWindow = {
    start: number;
    end: number;
};

const createItems = (year: number, length = 52): WeeksAndLabels =>
    generateWeeksForYear(year, length);

const loadMore = async (year: number, length = 52): Promise<WeeksAndLabels> =>
    new Promise((res) => setTimeout(() => res(createItems(year, length)), 52));

const generateWeeksForYear = (beginYear: number, numWeeks: number = 52, startDate: Date = new Date(2024, 0, 1)): WeeksAndLabels => {
    const weeks: WeekEntry[] = [];
    const monthLabels: string[] = [];

    // Calculate the offset for the first week relative to 2024-01-01 by finding the number of days between the two dates and modulo 7 (add 7 to ensure positive result)
    let currentDate = new Date(beginYear, 0, 1)
    const offset = Math.abs(currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) % 7;
    currentDate.setDate(currentDate.getDate() + offset); // Clone the beginDate to avoid mutating the original date
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let lastMonthLabel = "";

    for (let i = 0; i < numWeeks; i++) {
        weeks.push({
            date: currentDate.getDate(),
            month: months[currentDate.getMonth()],
            year: currentDate.getFullYear().toString(),
        });

        // Determine if the month label should be added
        const currentMonthLabel = months[currentDate.getMonth()] + (currentDate.getMonth() === 0 ? " " + currentDate.getFullYear() : "");
        if (lastMonthLabel !== currentMonthLabel) {
            monthLabels.push(currentMonthLabel);
            lastMonthLabel = currentMonthLabel;
        } else {
            monthLabels.push(""); // No label for this entry
        }

        currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
    }

    return { weeks, monthLabels };
};

// Helper function to calculate week number from a date
const getWeekNumber = (date: Date): number => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

const weekWidth = 32;

const WeekDisplay = () => {
    const numWeeks = 52;
    const startYear = 2024;
    const startDate = new Date(startYear, 0, 1);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [weeks, setWeeks] = useState<WeekEntry[]>([]);
    const [monthLabels, setMonthLabels] = useState<string[]>([]);
    const [data, setData] = useState<WeeksAndLabels>(createItems(startYear + 1));
    const [startX, setStartX] = useState(0);
    const [scrollStartX, setScrollStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [yearWindow, setYearWindow] = useState<YearWindow>({ start: startYear + 1, end: startYear + 1 });


    const loadMoreWeeks = async (direction: ScrollDirection) => {
        try {
            if (direction === ScrollDirection.LEFT) {
                yearWindow.start -= 1;
                const newData = await loadMore(yearWindow.start);
                setIsLoading(true);

                setData((prev) => ({ weeks: [...newData.weeks, ...prev.weeks], monthLabels: [...newData.monthLabels, ...prev.monthLabels] } as WeeksAndLabels));
            } else {
                yearWindow.end += 1;
                const newData = await loadMore(yearWindow.end);
                setIsLoading(true);

                setData((prev) => ({ weeks: [...prev.weeks, ...newData.weeks], monthLabels: [...prev.monthLabels, ...newData.monthLabels] } as WeeksAndLabels));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const weekContainerRef: InfiniteScrollRef<HTMLDivElement> = useInfiniteScroll({
        next: loadMoreWeeks,
        columnCount: data.weeks.length,
        hasMore: { left: true, right: true }
    });

    const scrollToToday = () => {
        const today = new Date();
        const weekIndex = weeks.findIndex(week => {
            const weekDate = new Date(today.getFullYear(), months.indexOf(week.month), week.date);
            return today >= weekDate;
        });
        const container = weekContainerRef.current;
        if (container && weekIndex >= 0) {
            const child = container.children[0].children[weekIndex] as HTMLElement;
            container.scrollLeft = child.offsetLeft - container.offsetLeft;
        }
    };

    const scrollWeeks = (direction: 'left' | 'right') => {
        const container = weekContainerRef.current;
        if (container) {
            const scrollWidth = container.offsetWidth;
            container.scrollBy({ left: (direction == 'left' ? -scrollWidth : scrollWidth), behavior: 'smooth' });
        }
    };


    const onDragStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        setStartX(event.pageX);
        const container = weekContainerRef.current;
        if (container) {
            setScrollStartX(container.scrollLeft);
        }
    };

    const onDragMove = (event: MouseEvent) => {
        if (!isDragging) return;
        const container = weekContainerRef.current;
        if (container) {
            const dx = event.pageX - startX;
            const newScrollPosition = scrollStartX - dx;
            container.scrollLeft = newScrollPosition;
        }

    };

    const onDragEnd = () => {
        setIsDragging(false);
    };

    // Attach global event listeners for mouse move and mouse up
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onDragMove);
            window.addEventListener('mouseup', onDragEnd);
        }

        return () => {
            window.removeEventListener('mousemove', onDragMove);
            window.removeEventListener('mouseup', onDragEnd);
        };
    }, [isDragging, onDragMove]);

    return (
        <div className="relative">
            <div className="flex items-center space-x-4 my-4">
                <button onClick={scrollToToday} className="p-2 rounded-full bg-gray-300">Today</button>
                <button onClick={() => scrollWeeks('left')} className="p-2 rounded-full bg-gray-300">Left</button>
                <div
                    ref={weekContainerRef}
                    className="flex flex-row overflow-x-auto cursor-grab scrollbar-hide"
                    onMouseDown={onDragStart}
                >
                    <div className="flex space-x-2 min-w-max select-none">
                        {data.weeks.map((week, index) => (
                            <div className="flex flex-col w-8 text-nowrap" key={index}>
                                <div className="flex flex-row grow">{data.monthLabels[index]}</div>
                                <div className={"flex flex-row grow-0"}>{week.date}</div>
                                <div className={"flex flex-row grow-0 h-32 border-l relative"}>
                                    {(week.year == startYear.toString() && week.date == 1 && week.month == 'Jan') &&
                                    <div className="w-32 h-8 bg-black border rounded absolute top-0 left-0 z-40"></div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => scrollWeeks('right')} className="p-2 rounded-full bg-gray-300">Right</button>
                {isLoading && <div>Loading...</div>}
            </div>
        </div>
    );
}

export default WeekDisplay;