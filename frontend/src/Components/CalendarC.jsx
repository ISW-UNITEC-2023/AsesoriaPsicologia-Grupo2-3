
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"
import esLocale from '@fullcalendar/core/locales/es';
import React, { useState, useEffect, useRef } from "react";
import { getVerify } from "../Utilities/user-services";

function havePrivilege(userPrivilege, privilege) {
    const isAuthorized = userPrivilege && userPrivilege.privileges && privilege.some((privilege) =>
        userPrivilege.privileges.includes(privilege)
    );
    return isAuthorized;
}

function CalendarC() {
    //Privilegios del usuario logueado
    const verifyRef = useRef(null);
    const updatePrivileges = async () => {
        try {
            const data = await getVerify(props.userData.user_data.id_user);
            verifyRef.current = data;
        } catch (error) {
            console.error("Error updating privileges:", error);
        }
    };

    useEffect(() => {
        async function update() {
            await updatePrivileges();
        }
        update();
    }, []);


    return (
        <div>
            {
                havePrivilege(verifyRef.current, [69]) &&
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    height="auto"
                    locale={esLocale}
                />
            }
        </div>
    )


}

export default CalendarC;