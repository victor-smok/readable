import {format} from 'date-fns'

export default function formatTimestamp (timestamp) {
  return format(new Date(timestamp), 'D MMM YYYY, h:mma')
}
