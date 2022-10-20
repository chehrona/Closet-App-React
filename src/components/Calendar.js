import React, { useEffect } from "react"
import "./css/Calendar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default function Calendar() {

    useEffect(() => {
        generatesCalendar()
    }, []);

    const dateToday = new Date();
    const months = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November",
                        "December"];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const currentMonth = dateToday.getMonth();
    const currentYear = dateToday.getFullYear();

    const firstMonthDate = new Date(dateToday.getFullYear(), dateToday.getMonth(), 1);
    const lastMonthDate = new Date(dateToday.getFullYear(),dateToday.getMonth() + 1, 0).getDate();
    const firstDayIndex = firstMonthDate.getDay();
    const lastDayIndex = new Date(dateToday.getFullYear(),dateToday.getMonth() + 1, 0).getDay();
    
    const prevLastMonthDate = new Date(dateToday.getFullYear(),dateToday.getMonth(), 0).getDate();

    const [prevMonthDays, setPrevMonthDays] = React.useState([]);
    const [currentMonthDays, setCurrentMonthDays] = React.useState([]);
    const [nextMonthDays, setNextMonthDays] = React.useState([]);

    function generatesCalendar() {

        let prevDaysList = [];
        for (let j = firstDayIndex; j > 0; j--) {
            prevDaysList.push(prevLastMonthDate - j + 1);
        }

        setPrevMonthDays(prevDaysList);

        let currentDaysList = [];
        for (let i = 1; i <= lastMonthDate; i++) {
            if (i === new Date().getDate() && dateToday.getMonth() === new Date().getMonth() && 
            dateToday.getFullYear() === new Date().getFullYear()) {
                currentDaysList.push([i])
            } else {
                currentDaysList.push(i)
            }
        }

        setCurrentMonthDays(currentDaysList)

        let nextDaysList = [];
        for (let k = 1; k <= (7 - lastDayIndex - 1); k++) {
            nextDaysList.push(k);
        }

        setNextMonthDays(nextDaysList)
    //     let createdLookBulk = null;
    //     get(ref(db, "createdLooks/")).then(function(snap) {
    //         createdLookBulk = snap.val();
    //     });


    //     get(ref(db, "scheduledLooks/")).then(function(snapshot) {
    //         let lookDate = null;
    //         for (let time in snapshot.val()) {
    //             let lookIDFromDb = snapshot.val()[time].dBLookID;
    //             lookDate = new Date(parseInt(time));
    //             let lookView = look(lookIDFromDb, createdLookBulk[lookIDFromDb].lookToSave);
    
    //             let currentMonthName = $("#currentMonth").text();
    //             let currentYearValue = $("#currentYear").text();
        
    //             if (months.indexOf(currentMonthName) === lookDate.getMonth()
    //                 && currentYearValue == lookDate.getFullYear()) {
    //                     // console.log($(".this-month[data='" + lookDate.getDate() + "']"));
    //                     $(".this-month[data='" + lookDate.getDate() + "']").append(lookView);
    //                 };
    //         }
    //         // console.log($(".days"));
    //     });
    // }
    }

    function showNextMonth() {
        dateToday.setMonth(dateToday.getMonth() - 1);
        generatesCalendar();
    };

    function showPrevMonth() {
        dateToday.setMonth(dateToday.getMonth() + 1);
        generatesCalendar();
    }

    return (
        <div className="page--container">
            <div className="calendar-header-box">Calendar</div>
            <div className="calendar-body-box">
                <div className="month-header-box">
                    <FontAwesomeIcon icon={faCaretLeft} className="nav--arrow" onClick={showPrevMonth}/>
                    <div className="current-month-year" >
                        <div className="current-month">{months[currentMonth]}</div>
                        <div className="current-year">{currentYear}</div>
                    </div>
                    <FontAwesomeIcon icon={faCaretRight} className="nav--arrow" onClick={showNextMonth}/>
                </div>
                <div className="weekday--box">
                    {weekdays.map((weekday, index) => <div key={index}>{weekday}</div>)}
                </div>
                <div className="date--box">
                    {prevMonthDays.map((date, index) => <div className="prev-month-date" key={index}>{date}</div>)}
                    {currentMonthDays.map((date, index) => 
                    <div className={Array.isArray(date) ? "today current-month-date" : "current-month-date"} key={index}>
                        <div className="dates">{Array.isArray(date) ? date[0] : date}</div>
                    </div>)}
                    {nextMonthDays.map((date, index) => <div className="next-month-date" key={index}>{date}</div>)}
                </div>
            </div>
        </div>
    )
}