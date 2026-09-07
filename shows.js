/* =========================================================
   209 SLAM SESH
   UPCOMING EVENT SYSTEM
========================================================= */


/*
    EVENTBRITE ORGANIZER PAGE
--------------------------------------------------------- */

const EVENTBRITE_ORGANIZER_URL =
    "https://www.eventbrite.com/o/34408735843";



/*
    UPCOMING EVENTS
---------------------------------------------------------

    Add future events here.

    Once the Eventbrite automation is connected,
    this array can be replaced by the API response.

    Leave this array empty when no show is announced.

========================================================= */

const slamSeshEvents = [

    /*
    EXAMPLE:

    {
        title: "209 Slam Sesh: Turf Wars",

        date: "2026-09-26",

        doors: "6:00 PM",

        bell: "7:00 PM",

        venue: "BMF Ranch",

        location: "15712 Curry Ave, Lodi, CA 95240",

        image: "assets/turf-wars.jpg",

        ticketUrl:
            "https://www.eventbrite.com/e/YOUR-EVENT",

        description:
            "Live professional wrestling at the BMF Ranch."
    }
    */

];



/* =========================================================
   DOM
========================================================= */

const eventContainer =
    document.getElementById("upcomingEvent");



/* =========================================================
   HELPERS
========================================================= */

function parseLocalDate(dateString) {

    const parts = dateString.split("-");

    return new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
    );

}



function formatEventDate(dateString) {

    const date =
        parseLocalDate(dateString);


    return new Intl.DateTimeFormat(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    )
    .format(date)
    .toUpperCase();

}



function getUpcomingEvents() {

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    return slamSeshEvents

        .filter(event => {

            return (
                parseLocalDate(event.date) >= today
            );

        })

        .sort((a, b) => {

            return (
                parseLocalDate(a.date) -
                parseLocalDate(b.date)
            );

        });

}



/* =========================================================
   RENDER UPCOMING SHOW
========================================================= */

function renderUpcomingEvent(event) {

    const ticketUrl =
        event.ticketUrl ||
        EVENTBRITE_ORGANIZER_URL;


    eventContainer.innerHTML = `

        <article class="featured-event">


            <div class="featured-event-poster">

                ${
                    event.image

                        ? `

                            <img
                                src="${event.image}"
                                alt="${event.title}"
                            >

                        `

                        : `

                            <div class="event-poster-fallback">

                                <span>
                                    BMF ENTERTAINMENT
                                </span>

                                <strong>
                                    209
                                    <br>
                                    SLAM SESH
                                </strong>

                            </div>

                        `
                }

            </div>



            <div class="featured-event-info">


                <span class="featured-event-label">

                    NEXT SLAM SESH

                </span>


                <h3>

                    ${event.title}

                </h3>


                <div class="event-date">

                    ${formatEventDate(event.date)}

                </div>


                <div class="event-details">


                    ${
                        event.doors

                            ? `

                                <div>

                                    <span>
                                        DOORS
                                    </span>

                                    <strong>
                                        ${event.doors}
                                    </strong>

                                </div>

                            `

                            : ""
                    }


                    ${
                        event.bell

                            ? `

                                <div>

                                    <span>
                                        BELL TIME
                                    </span>

                                    <strong>
                                        ${event.bell}
                                    </strong>

                                </div>

                            `

                            : ""
                    }


                    <div>

                        <span>
                            VENUE
                        </span>

                        <strong>
                            ${event.venue || "BMF Ranch"}
                        </strong>

                    </div>


                </div>


                ${
                    event.location

                        ? `

                            <p class="event-location">

                                ${event.location}

                            </p>

                        `

                        : ""
                }


                ${
                    event.description

                        ? `

                            <p class="event-description">

                                ${event.description}

                            </p>

                        `

                        : ""
                }


                <div class="event-buttons">


                    <a
                        href="${ticketUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-red"
                    >

                        GET TICKETS ↗

                    </a>


                    <a
                        href="${EVENTBRITE_ORGANIZER_URL}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-outline"
                    >

                        ALL BMF EVENTS ↗

                    </a>


                </div>


            </div>


        </article>

    `;

}



/* =========================================================
   EMPTY STATE
========================================================= */

function renderNoUpcomingEvent() {

    eventContainer.innerHTML = `

        <div class="no-event">


            <span class="no-event-number">
                209
            </span>


            <div class="no-event-copy">


                <span class="featured-event-label">

                    NO UPCOMING EVENTS

                </span>


                <h3>

                    NOTHING ON THE CARD...
                    <span>
                        YET.
                    </span>

                </h3>


                <p>

                    The next 209 Slam Sesh has not
                    been announced.

                    Check back for the next night of
                    live professional wrestling at
                    the BMF Ranch.

                </p>


                <a
                    href="${EVENTBRITE_ORGANIZER_URL}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-red"
                >

                    VIEW BMF EVENTBRITE ↗

                </a>


            </div>


        </div>

    `;

}



/* =========================================================
   INITIALIZE
========================================================= */

function initEvents() {

    if (!eventContainer) {

        return;

    }


    const upcoming =
        getUpcomingEvents();


    if (!upcoming.length) {

        renderNoUpcomingEvent();

        return;

    }


    renderUpcomingEvent(
        upcoming[0]
    );

}



initEvents();
