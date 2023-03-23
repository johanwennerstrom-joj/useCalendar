import format from 'date-fns/format'
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'

import type { Locale } from 'date-fns'

import { useCallback, useMemo, useState } from 'react'

interface ICalendarReturnType {
    date: string
    monthInText: string
    increment: () => void
    decrement: () => void
    monthLength: number
    interval: Date[]
    formatter: () => string
}

interface IUseCalendar {
    /**
     *  @param {Date} inputDate - Startdate for calendar.
     */
    inputDate: Date
    /**
     *  @param {string} dateFormat - Format for date. Defaults to dd-mm-yyyy.
     */
    dateFormat?: string
    /**
     *  @param {Locale} locale - Provided date-fns locale.
     */
    locale?: Locale
}

/**
 * @typedef {Object} Calendar
 * @property {string} date - Formatted current date.
 * @property {string} monthInText - Current month in plain text.
 * @property {function} increment - Increment the current month.
 * @property {function} decrement - Decrement the current month.
 * @property {number} monthLength - Length of current month.
 * @property {Date[]} interval - Array of all dates in current month
 * @property {function} formatter - Date-fns based formatter function with applied dateFormat and locale
 */

/**
 *  useCalendar hook - returns calendar object
 * 	@return {Calendar}
 */
const useCalendar = ({
    inputDate,
    dateFormat = 'dd-MM-yyyy',
    locale,
}: IUseCalendar) => {
    const [currentDate, setCurrentDate] = useState(inputDate)

    const formatter = useCallback(
        (date: Date) => {
            return format(date, dateFormat, { locale })
        },
        [dateFormat, locale]
    )

    const calendar = useMemo(
        () => ({
            date: format(currentDate, dateFormat, { locale: locale }),
            monthInText: format(currentDate, 'MMMM', { locale: locale }),
            increment: () =>
                setCurrentDate((prevMonth) => addMonths(prevMonth, 1)),
            decrement: () =>
                setCurrentDate((prevMonth) => subMonths(prevMonth, 1)),
            monthLength: getDaysInMonth(currentDate),
            interval: eachDayOfInterval({
                start: startOfMonth(currentDate),
                end: endOfMonth(currentDate),
            }),
            formatter,
        }),
        [dateFormat, locale, currentDate, formatter]
    )

    return calendar
}

export { useCalendar }
