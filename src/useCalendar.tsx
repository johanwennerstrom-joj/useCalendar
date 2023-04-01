import format from 'date-fns/format'
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'

import { useCallback, useMemo, useState } from 'react'
import { getEnd, getStart } from './util'
import { IUseCalendar } from './types'

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
 * @example
 *  const {date, monthInText, interval} = useCalendar({inputDate: new Date()})
 * @returns {Calendar}
 */
const useCalendar = ({
    inputDate,
    dateFormat = 'dd-MM-yyyy',
    locale,
    adjacent,
    monthFormat = 'MMMM',
}: IUseCalendar) => {
    const [currentDate, setCurrentDate] = useState(inputDate)

    const formatter = useCallback(
        (date: Date) => {
            return format(date, dateFormat, { locale })
        },
        [dateFormat, locale]
    )

    const getInterval = useMemo(() => {
        return eachDayOfInterval({
            start: adjacent
                ? getStart(currentDate, locale)
                : startOfMonth(currentDate),
            end: adjacent
                ? getEnd(currentDate, locale)
                : endOfMonth(currentDate),
        }).map((d) => formatter(d))
    }, [currentDate])

    const calendar = useMemo(
        () => ({
            date: format(currentDate, dateFormat, { locale: locale }),
            monthInText: format(currentDate, monthFormat, { locale: locale }),
            increment: () =>
                setCurrentDate((prevMonth) => addMonths(prevMonth, 1)),
            decrement: () =>
                setCurrentDate((prevMonth) => subMonths(prevMonth, 1)),
            monthLength: getDaysInMonth(currentDate),
            interval: getInterval,
            formatter,
        }),
        [dateFormat, locale, currentDate, formatter]
    )

    return calendar
}

export { useCalendar }
