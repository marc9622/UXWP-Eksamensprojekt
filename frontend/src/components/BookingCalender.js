import { getSuffix } from '../util/Numbers';

export default function BookingsCalender(bookings) {
    return (
        <div>
            <div>
                <h3>This Month:</h3>
                {bookings.bookings.map(day => (
                    <div>
                        The {day.date + getSuffix(day.date)} is {day.bookedAmount} booked
                    </div>
                ))}
            </div>
        </div>
    );
}
