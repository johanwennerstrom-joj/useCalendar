![](https://img.shields.io/badge/Coverage-100%25-83A603.svg?logo=jest&logoColor=white&color=blue&prefix=$coverage$) [![npm](https://img.shields.io/npm/v/calendar-creator)](https://www.npmjs.com/package/calendar-creator)

# useCalendar

(useCalendar name was taken 😢 so it goes under calendar-creator)

Minimal hook for generating logic for calendars

## Example uses

Initializing calendar with todays date

```typescript
import { useCalendar } from 'calendar-creator'

const { interval, monthInText } = useCalendar({ inputDate: new Date() })
```

Using with Locale and custom dateFormat

```typescript
/* Locales are imported seperately from date-fns
   and not included in package */

import fr from 'date-fns/locale/fr'

const { decrement, increment, interval, monthInText } = useCalendar({
    inputDate: new Date(),
    dateFormat: 'dd/MM/yyyy',
    locale: fr,
})
```

## Using calendardata

Map over interval
Use provided formatterfunc to apply default or provided format

```typescript
const App = () => {
	const { interval, formatter } = useCalendar({ inputDate: new Date(), dateFormat: 'dd/MM/yyyy' })

	return (
		<div>
			{interval.map((date) => (
                {/* Date will be formatted to dd/MM/yyyy */}
				<div key={date.getTime()}>{formatter(date)}</div>
			))}
		</div>
	)
}

```

## Incrementing/decrementing currentmonth

Attach increment/decrement to events and change month

```typescript
const App = () => {
    const { increment, decrement, monthInText } = useCalendar({
        inputDate: new Date('2022-05-05'),
    })

    return (
        <div>
            <p>Current month is: {monthInText}</p>
            <button onClick={increment}>Next month</button>
            <button onClick={decrement}>Previous month</button>
        </div>
    )
}
```

## Adjacent dates

If you want adjacent dates to form
complete calendar weeks, pass the adjacent = true argument

```typescript
const { interval } = useCalendar({
    inputDate: new Date('2023-01-04'),
    adjacent: true,
})

// Interval will now start on monday 26 2022 and end on sunday 5 2023
```
