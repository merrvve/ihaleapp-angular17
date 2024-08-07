import { Route } from "@angular/router";
import { MeetingsComponent } from "./meetings/meetings.component";

export const TOPLANTI_ROUTES: Route[] = [
    { path: 'listele', component: MeetingsComponent },
    { path: '', redirectTo: 'listele', pathMatch: 'full' }
]