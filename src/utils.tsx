import moment from "moment";

export const formatDuration = (duration: moment.Duration) => {
  return moment.utc(duration.as("millisecond")).format("HH:mm");
};

export function getAuthParams(): {
  type: string | null;
  errorDescription: string | null;
  errorCode: string | null;
} {
  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(
    window.location.hash.replace(/^#/, ""),
  );

  return {
    errorCode: searchParams.get("error_code") ?? hashParams.get("error_code"),
    errorDescription:
      searchParams.get("error_description") ??
      hashParams.get("error_description"),
    type: searchParams.get("type") ?? hashParams.get("type"),
  };
}
