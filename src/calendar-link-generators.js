var MS_IN_MINUTES = 60 * 1000

var formatTime = function(date) {
  return date.toISOString().replace(/-|:|\.\d+/g, '')
}

var calculateEndTime = function(event) {
  return event.end
    ? formatTime(event.end)
    : formatTime(new Date(event.start.getTime() + (event.duration * MS_IN_MINUTES)))
}

module.exports = {
  google: function(event) {
    var startTime = formatTime(event.start)
    var endTime = calculateEndTime(event)

    var href = encodeURI([
      'https://www.google.com/calendar/render',
      '?action=TEMPLATE',
      '&text=' + (event.title || ''),
      '&dates=' + (startTime || ''),
      '/' + (endTime || ''),
      '&details=' + (event.description || ''),
      '&location=' + (event.address || ''),
      '&sprop=&sprop=name:'
    ].join(''))
    return href
  },

  yahoo: function(event) {
    var eventDuration = event.end
      ? ((event.end.getTime() - event.start.getTime()) / MS_IN_MINUTES)
      : event.duration

    // Yahoo dates are crazy, we need to convert the duration from minutes to hh:mm
    var yahooHourDuration = eventDuration < 600
      ? '0' + Math.floor((eventDuration / 60))
      : Math.floor((eventDuration / 60)) + ''

    var yahooMinuteDuration = eventDuration % 60 < 10
      ? '0' + eventDuration % 60
      : eventDuration % 60 + ''

    var yahooEventDuration = yahooHourDuration + yahooMinuteDuration

    // Remove timezone from event time
    var st = formatTime(new Date(event.start - (event.start.getTimezoneOffset() *
                                                MS_IN_MINUTES))) || ''

    var href = encodeURI([
      'http://calendar.yahoo.com/?v=60&view=d&type=20',
      '&title=' + (event.title || ''),
      '&st=' + st,
      '&dur=' + (yahooEventDuration || ''),
      '&desc=' + (event.description || ''),
      '&in_loc=' + (event.address || '')
    ].join(''))

    return href
  },

  ics: function(event, eClass, calendarName) {
    var startTime = formatTime(event.start)
    var endTime = calculateEndTime(event)

    var href = encodeURI(
      'data:text/calendar;charset=utf8,' + [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'URL:' + document.URL,
        'DTSTART:' + (startTime || ''),
        'DTEND:' + (endTime || ''),
        'SUMMARY:' + (event.title || ''),
        'DESCRIPTION:' + (event.description || ''),
        'LOCATION:' + (event.address || ''),
        'END:VEVENT',
        'END:VCALENDAR'].join('\n'))

    return href
  },

  ical: function(event) {
    return this.ics(event, 'icon-ical', 'iCal')
  },

  outlook: function(event) {
    return this.ics(event, 'icon-outlook', 'Outlook')
  }
}
