import {FetchResponse} from "../../types";
import {LectureResponse} from "./types";

export const fetchProgram = (): Promise<FetchResponse<LectureResponse>> => {
    return fetch('https://sleepingpill.javazone.no/public/allSessions/javazone_2023').then((r) => {
        if (r.ok) {
            return r.json();
        } else {
            return 'ERROR';
        }
    });
};
