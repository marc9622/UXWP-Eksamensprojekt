import { asTimeString } from "../util/Numbers";

export default function BookingsSchedule(bookings) {
    return (
        <div>
            <div>
                <h3>Todays Schedule:</h3>
                {bookings.bookings.map(booking => (
                    <div>
                        Booking {booking.id} from {asTimeString(booking.startTimeHour, booking.startTimeMinute)} to {asTimeString(booking.endTimeHour, booking.endTimeMinute)}
                    </div>
                ))}
            </div>
        </div>
    );
}
