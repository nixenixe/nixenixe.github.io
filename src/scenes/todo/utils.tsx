import moment from "moment";

export const formatDuration = (duration: moment.Duration) => {
    return moment.utc(duration.as('millisecond')).format('HH:mm');
};