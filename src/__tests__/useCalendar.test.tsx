import { renderHook, act, waitFor } from '@testing-library/react'
import { useCalendar } from '../useCalendar'

test('takes input values and returns calendar object', () => {
    const { result } = renderHook(() =>
        useCalendar({
            inputDate: new Date('2022-02-01'),
            dateFormat: 'dd/MM/yyyy',
        })
    )
    expect(result.current.date).toBe('01/02/2022')

    // Check increment/decrement
    act(() => {
        result.current.increment()
    })
    expect(result.current.date).toBe('01/03/2022')
    act(() => {
        result.current.decrement()
    })
    expect(result.current.date).toBe('01/02/2022')

    // Check monthlength
    expect(result.current.monthLength).toBe(28)

    // Check month in plain text
    expect(result.current.monthInText).toBe('February')

    // Check interval
    const interval = result.current.interval
    expect(interval).toHaveLength(28)
    waitFor(() => {
        expect(interval[0]).toBe('01/02/2022')
        expect(interval[interval.length - 1]).toBe('28/02/2022')
    })
})

test('It provides fallback for dateFormat', () => {
    const { result } = renderHook(() =>
        useCalendar({ inputDate: new Date('1990/02/02') })
    )
    expect(result.current.date).toBe('02-02-1990')
})

test('Provides formatter function with applied formats', () => {
    const { result } = renderHook(() =>
        useCalendar({
            inputDate: new Date('1990/02/02'),
            dateFormat: 'dd-MM-yyyy',
        })
    )
    const formatted = result.current.formatter(new Date('12/02/2022'))
    expect(formatted).toBe('02-12-2022')
})
