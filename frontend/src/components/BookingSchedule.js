import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import './BookingSchedule.css';

export default function Schedule({ bookings, selectedDate, onStartTimeSelect, onEndTimeSelect}) {
    const params = useParams();
    const [bookingsData, setBookingsData] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    async function fetchBookings() {
        try {
            const response = await fetch(`http://localhost:3001/${params.uniId}/bookings-list`, { method: 'GET' });
            const data = await response.json();
            const filteredData = data.filter(booking => booking.roomID === params.roomId); // Add this line to filter the bookings by room ID
            setBookingsData(filteredData);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    }

    function resetTimeSelection() {
        setStartTime(null);
        setEndTime(null);
    }

    useEffect(() => {
        fetchBookings();
        resetTimeSelection();
    }, [selectedDate]);


    useEffect(() => {
        // Check if the page was reloaded
        const isPageReloaded = performance.navigation.type === performance.navigation.TYPE_RELOAD;

        if (isPageReloaded) {
            console.log("Page has been reloaded");
            fetchBookings();
            handleNewStartTime();
            handleNewEndTime();
        }
    }, []);

    if (selectedDate == null) {
        return null;
    } else {
        console.log(selectedDate);
    }

    const selectedDateString = selectedDate.toDateString();
    const bookingsForDate = bookings[selectedDateString] || [];
    const availableTimeSlots = [
        "09:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "13:00 - 14:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00",
        "17:00 - 18:00",
        "18:00 - 19:00",
        "19:00 - 20:00",
        "20:00 - 21:00",
        "21:00 - 22:00"
    ];

    const availableTimeSlotsFiltered = availableTimeSlots.filter(
        timeSlot => !bookingsForDate.includes(timeSlot)
    );

    function handleTimeSelect(timeSlot) {
        if (!startTime) {
            if (!isTimeSlotBooked(timeSlot)) {
                setStartTime(timeSlot);
                onStartTimeSelect(timeSlot.split(' - ')[0]);
            }
        } else if (!endTime) {
            if (
                availableTimeSlotsFiltered.indexOf(timeSlot) >=
                    availableTimeSlotsFiltered.indexOf(startTime) &&
                    !isTimeSlotBooked(timeSlot)
            ) {
                setEndTime(timeSlot);
                onEndTimeSelect(timeSlot.split(' - ')[1]);
            } 
            else {
                setStartTime(null);
                setEndTime(null);
            }
        }
    }



    function isTimeSlotBooked(timeSlot) {
        return bookingsData.some(
            (booking) =>
                new Date(booking.date).toDateString() ===
                    selectedDate.toDateString() &&
                    (booking.startTime <= timeSlot && booking.endTime >= timeSlot)
        );
    }

    function handleNewStartTime() {
        setStartTime(null);
        fetchBookings();
    }

    function handleNewEndTime() {
        setEndTime(null);
        fetchBookings();
    }

    const selectedTimeRange = availableTimeSlotsFiltered.slice(
        availableTimeSlotsFiltered.indexOf(startTime),
        availableTimeSlotsFiltered.indexOf(endTime) + 1
    );

    return (
        <div className="schedule">
            <p>Available time slots for {selectedDateString}:</p>
            <div className="time-slots">
                <ul>
                    {availableTimeSlotsFiltered.map(timeSlot => {
                        const isBooked = bookingsData.some(booking =>
                            new Date(booking.date).toDateString() === selectedDate.toDateString() &&
                                booking.startTime <= timeSlot &&
                                booking.endTime >= timeSlot
                        );
                        return (
                            <li key={timeSlot}>
                                <button
                                    className={`time-slot-button ${isBooked ? 'booked' : ''} ${timeSlot === startTime || selectedTimeRange.includes(timeSlot) ? 'selected' : ''}`}
                                    onClick={() => handleTimeSelect(timeSlot)}
                                >
                                    {timeSlot}
                                </button>
                            </li>
                        );
                    })}

                </ul>
                <div className="buttons">
                    {startTime && (
                        <Button className="change-button" onClick={handleNewStartTime}>
                            Choose new start time
                        </Button>
                    )}
                    {endTime && (
                        <Button className="change-button" onClick={handleNewEndTime}>
                            Choose new end time
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
