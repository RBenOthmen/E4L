export interface EventColor {
    primary: string;
    secondary: string;
}
export interface EventAction {
    id?: string | number;
    label: string;
    cssClass?: string;
    a11yLabel?: string;
    onClick({ event, sourceEvent, }: {
        event: CalendarEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }): any;
}
export interface CalendarEvent<MetaType = any> {
    id?: string | number;
    start: Date;
    end?: Date;
    title: string;
    color?: EventColor;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;
    professeur_id ?: number;
    eleve_id ?: number;
    organizer_id ?: number;
     recipient_id ?: number;
     status ?: string;
     username_organizer ?: string;
     meetingNumber ?: string; // zoom meeting number
     password ?: string; // zoom meeting password
     join_URL ?: string; // zoom meeting join url
}