/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {abstractMethodFail} from '../assert';

/**
 * A unit of date-time, such as Days or Hours.
 * <p>
 * Measurement of time is built on units, such as years, months, days, hours, minutes and seconds.
 * Implementations of this interface represent those units.
 * <p>
 * An instance of this interface represents the unit itself, rather than an amount of the unit.
 * See {@link Period} for a class that represents an amount in terms of the common units.
 * <p>
 * The most commonly used units are defined in {@link ChronoUnit}.
 * Further units are supplied in {@link IsoFields}.
 * Units can also be written by application code by implementing this interface.
 * <p>
 * The unit works using double dispatch. Client code calls methods on a date-time like
 * {@code LocalDateTime} which check if the unit is a {@code ChronoUnit}.
 * If it is, then the date-time must handle it.
 * Otherwise, the method call is re-dispatched to the matching method in this interface.
 *
 * @interface
 */
export class TemporalUnit {
    /**
     * Gets the duration of this unit, which may be an estimate.
     * <p>
     * All units return a duration measured in standard nanoseconds from this method.
     * The duration will be positive and non-zero.
     * For example, an hour has a duration of {@code 60 * 60 * 1,000,000,000ns}.
     * <p>
     * Some units may return an accurate duration while others return an estimate.
     * For example, days have an estimated duration due to the possibility of
     * daylight saving time changes.
     * To determine if the duration is an estimate, use {@link #isDurationEstimated()}.
     *
     * @return {Duration} the duration of this unit, which may be an estimate, not null
     */
    duration() {
        abstractMethodFail('duration');
    }
    
    /**
     * Checks if the duration of the unit is an estimate.
     * <p>
     * All units have a duration, however the duration is not always accurate.
     * For example, days have an estimated duration due to the possibility of
     * daylight saving time changes.
     * This method returns true if the duration is an estimate and false if it is
     * accurate. Note that accurate/estimated ignores leap seconds.
     *
     * @return {boolean} true if the duration is estimated, false if accurate
     */
    isDurationEstimated() {
        abstractMethodFail('isDurationEstimated');
    }
    
    /**
     * Checks if this unit is date-based.
     *
     * @return {boolean} true if date-based
     */
    isDateBased() {
        abstractMethodFail('isDateBased');
    }
    
    /**
     * Checks if this unit is time-based.
     *
     * @return {boolean} true if time-based
     */
    isTimeBased() {
        abstractMethodFail('isTimeBased');
    }
    
    //-----------------------------------------------------------------------
    /**
     * Checks if this unit is supported by the specified temporal object.
     * <p>
     * This checks that the implementing date-time can add/subtract this unit.
     * This can be used to avoid throwing an exception.
     *
     * @param {Temporal} temporal  the temporal object to check, not null
     * @return {boolean} true if the unit is supported
     */
    isSupportedBy(temporal) {
        abstractMethodFail('isSupportedBy');
    }
    
    /**
     * Returns a copy of the specified temporal object with the specified period added.
     * <p>
     * The period added is a multiple of this unit. For example, this method
     * could be used to add "3 days" to a date by calling this method on the
     * instance representing "days", passing the date and the period "3".
     * The period to be added may be negative, which is equivalent to subtraction.
     * <p>
     * There are two equivalent ways of using this method.
     * The first is to invoke this method directly.
     * The second is to use {@link Temporal#plus(long, TemporalUnit)}:
     * <pre>
     *   // these two lines are equivalent, but the second approach is recommended
     *   temporal = thisUnit.doPlus(temporal);
     *   temporal = temporal.plus(thisUnit);
     * </pre>
     * It is recommended to use the second approach, {@code plus(TemporalUnit)},
     * as it is a lot clearer to read in code.
     * <p>
     * Implementations should perform any queries or calculations using the units
     * available in {@link ChronoUnit} or the fields available in {@link ChronoField}.
     * If the field is not supported a {@code DateTimeException} must be thrown.
     * <p>
     * Implementations must not alter the specified temporal object.
     * Instead, an adjusted copy of the original must be returned.
     * This provides equivalent, safe behavior for immutable and mutable implementations.
     *
     * @param {Temporal} dateTime  the temporal object to adjust, not null
     * @param {number} periodToAdd  the period of this unit to add, positive or negative
     * @return {Temporal} the adjusted temporal object, not null
     * @throws DateTimeException if the period cannot be added
     */
    addTo(dateTime, periodToAdd) {
        abstractMethodFail('addTo');
    }
    
    //-----------------------------------------------------------------------
    /**
     * Calculates the period in terms of this unit between two temporal objects of the same type.
     * <p>
     * This calculates the period between two temporals in terms of this unit.
     * The start and end points are supplied as temporal objects and must be of the same type.
     * The result will be negative if the end is before the start.
     * For example, the period in hours between two temporal objects can be calculated
     * using {@code HOURS.between(startTime, endTime)}.
     * <p>
     * The calculation returns a whole number, representing the number of complete units between the two temporals.
     * For example, the period in hours between the times 11:30 and 13:29 will only b
     * one hour as it is one minute short of two hours.
     * <p>
     * There are two equivalent ways of using this method.
     * The first is to invoke this method directly.
     * The second is to use {@link Temporal#until(Temporal, TemporalUnit)}:
     * <pre>
     *   // these two lines are equivalent
     *   between = thisUnit.between(start, end);
     *   between = start.until(end, thisUnit);
     * </pre>
     * The choice should be made based on which makes the code more readable.
     * <p>
     * For example, this method allows the number of days between two dates to be calculated:
     * <pre>
     *   long daysBetween = DAYS.between(start, end);
     *   // or alternatively
     *   long daysBetween = start.until(end, DAYS);
     * </pre>
     * Implementations should perform any queries or calculations using the units available in
     * {@link ChronoUnit} or the fields available in {@link ChronoField}.
     * If the unit is not supported a DateTimeException must be thrown.
     * Implementations must not alter the specified temporal objects.
     *
     * @param {Temporal} temporal1  the base temporal object, not null
     * @param {Temporal} temporal2  the other temporal object, not null
     * @return {number} the period between temporal1 and temporal2 in terms of this unit;
     *  positive if temporal2 is later than temporal1, negative if earlier
     * @throws DateTimeException if the period cannot be calculated
     * @throws ArithmeticException if numeric overflow occurs
     */
    between(temporal1, temporal2) {
        abstractMethodFail('between');
    }
    
}