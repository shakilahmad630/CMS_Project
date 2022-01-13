import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

export function fromModel(value: string | null): NgbTimeStruct | null {
    if (!value) {
        return null;
    }
    const split = value.split(':');
    return {
        hour: parseInt(split[0], 10),
        minute: parseInt(split[1], 10),
        second: parseInt(split[2], 10)
    };
}

export function toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
}