import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import endOfWeek from 'date-fns/endOfWeek'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'

const getStart = (date: Date, locale?: Locale) => {
    const start = startOfMonth(date)
    if (getDay(start) === 1) {
        return start
    }
    return startOfWeek(start, { weekStartsOn: 2, locale })
}

const getEnd = (date: Date, locale?: Locale) => {
    const end = endOfMonth(date)
    if (getDay(end) === 0) {
        return end
    }
    return endOfWeek(end, { weekStartsOn: 2, locale })
}

export { getStart, getEnd }
