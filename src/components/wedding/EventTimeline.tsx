import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AutoScrollCarousel from "./AutoScrollCarousel";
import UserAddressCard from "./UserAddressCard";
import { Notifier } from "./Notifier";
import axios from "axios";
import confetti from "canvas-confetti";
import { useModal } from "../../hooks/useModal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import Switch from "../form/switch/Switch";
import { TimeIcon } from "../../icons";

type TimelineEvents = {
  id: number;
  time: string;
  title: string;
  status: boolean;
  photos: string;
  description: string;
};

const _timelineEvents = [
  {
    id: 1,
    time: "2025-04-17T11:00:00+05:30",
    title: "Wedding Ceremony",
    status: true,
    photos: [
      "/images/carousel/carousel-01.png",
      "/images/carousel/carousel-02.png",
      "/images/carousel/carousel-03.png",
    ],
    description: "The beautiful union ceremony at St. Mary's Church",
  },
  {
    id: 2,
    time: "2025-04-17T12:00:00+05:30",
    title: "Photo Session",
    status: true,
    photos: [
      "/images/carousel/carousel-03.png",
      "/images/carousel/carousel-04.png",
    ],
    description: "Group photos with family and friends",
  },
  {
    id: 3,
    time: "2025-04-17T13:00:00+05:30",
    title: "Reception",
    status: false,
    photos: [],
    description: "Dinner and celebrations at Golden Hall",
  },
  {
    id: 4,
    time: "2025-04-17T14:00:00+05:30",
    title: "First Dance",
    status: false,
    photos: [],
    description: "The newlyweds' first dance as husband and wife",
  },
  {
    id: 5,
    time: "2025-04-17T15:00:00+05:30",
    title: "Cake Cutting",
    status: false,
    photos: [],
    description: "Wedding cake ceremony and dessert time",
  },
];

export default function EventTimeline() {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvents[]>();
  const { isOpen, openModal, closeModal, modalTitle, setModalTitle } =
    useModal();
  const [eventId, setEventId] = useState<number>();
  const [eventTime, setEventTime] = useState<string>();
  const [_eventTime, set_EventTime] = useState<string>();
  const [eventName, setEventName] = useState<string>();
  const [eventDescr, setEventDescr] = useState<string>();
  const [eventStatus, setEventStatus] = useState<boolean>();
  const [eventPhotos, setEventPhotos] = useState<string>();

  useEffect(() => {
    const isoDate = eventTime;
    const date = new Date(isoDate);

    // Get hours and minutes in local time (with offset considered)
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    set_EventTime(`${hours}:${minutes}`);
  }, [eventTime]);

  const updateEventTime = (newTime: any) => {
    if (!eventTime || !newTime) return eventTime;
    // Extract date and timezone from original ISO string
    const datePart = eventTime.toString().split("T")[0];
    const tzPart = eventTime.toString().substring(eventTime.length - 6); // +05:30

    // Add new time to existing date and timezone
    const updatedIso = `${datePart}T${newTime}:00${tzPart}`;
    return updatedIso;
  };

  const handleSave = () => {
    if (eventId !== 0) {
      axios
        .put(`http://localhost:3001/demo/events/${eventId}`, {
          time: updateEventTime(_eventTime),
          title: eventName,
          description: eventDescr,
          status: eventStatus === true ? 1 : 0,
          photos: eventPhotos,
        })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => alert(`"Error:", ${error}`));
    } else {
      axios
        .post(`http://localhost:3001/demo/events`, {
          time: updateEventTime(_eventTime),
          title: eventName,
          description: eventDescr,
          status: eventStatus ? 1 : 0,
          photos: eventPhotos,
        })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => alert(`"Error:", ${error}`));
    }
    closeModal();
  };

  const handleRemove = (id: number) => {
    axios
      .delete(`http://localhost:3001/demo/events/${id}`)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => alert(`"Error:", ${error}`));
    setEventId(0);
  };

  const handleWishes = (wish: string, eventId?: number) => {
    handleWishClick();
    alert(wish + "🎉");
  };

  const letsCelebrate = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleWishClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  useEffect(
    () => {
      letsCelebrate();
    },
    timelineEvents?.flatMap((field) => field.status)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        // .get(`https://dev-5qvzh6ebkuk68u8.api.raw-labs.com/getEvents`)
        .get(`http://localhost:3001/demo/events`)
        .then((response) => {
          setTimelineEvents(response.data);
        })
        .catch((error) => console.error("Error fetching Ip Address:", error));
    }, 10000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="pe-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full h-full flex px-1 justify-center">
            <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 py-2 sm:py-3 px-1 sm:px-1">
              <div className="w-full max-w-4xl">
                {timelineEvents?.map((event, index) => {
                  const isCompleted = Number(event.status) === 1 ? true : false;
                  const isLast = index === timelineEvents.length - 1;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3 }}
                      className="flex items-start relative"
                    >
                      {/* Time */}
                      {/* <div className="text-sm text-gray-500 text-right pr-2 pt-2 min-w-[60px] sm:min-w-[80px] sm:w-24">
                      {event.time}
                    </div> */}
                      <div className="hidden sm:block text-sm text-gray-500 text-right pr-2 pt-2 min-w-[60px] sm:min-w-[80px] sm:w-24">
                        {new Date(event.time).toLocaleTimeString()}
                      </div>

                      {/* Timeline connector + Icon + Card */}
                      <div className="relative pl-6 sm:pl-8 flex-1 pb-10">
                        {/* Connector line */}
                        {!isLast && (
                          <div
                            className={`absolute left-3 top-6 w-0.5 h-full ${
                              isCompleted
                                ? "bg-rose-400"
                                : "bg-gray-300 dark:bg-gray-700"
                            }`}
                          />
                        )}

                        {/* Circle Icon */}
                        <div
                          className={`absolute left-0 top-2 w-6 h-6 flex items-center justify-center rounded-full border-2 z-10 ${
                            isCompleted
                              ? "bg-rose-500 border-rose-500 text-white"
                              : "bg-white border-gray-300 text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                          }`}
                        >
                          {isCompleted ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#f5f0f1"
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                            >
                              <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
                                 4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                                 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                                 6.86-8.55 11.54L12 21.35z"
                              />
                            </svg>
                          ) : (
                            <div className="w-2 h-2 bg-gray-400 rounded-full" />
                          )}
                        </div>

                        {/* Card */}
                        <div className="ml-2 sm:ml-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow w-full">
                          {/* 👇 Mobile layout - visible only on small screens */}
                          <div className="w-full pe-4 pb-3 flex items-center justify-between sm:hidden">
                            {/* Time on the left */}
                            <div className="text-xs text-gray-500">
                              {new Date(event.time).toLocaleTimeString()}
                            </div>

                            {/* Title in the center */}
                            <div className="flex-1 text-center">
                              <h4 className="text-sm font-bold text-rose-700">
                                {event.title}
                              </h4>
                            </div>

                            {/* Close button on the right */}
                            <button
                              onClick={() => {
                                handleRemove(event.id);
                              }}
                              className="flex h-9.5 w-9.5 items-center justify-center border rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:h-11 sm:w-11"
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* 👇 Desktop only: title left, trash button right */}
                          <div className="hidden sm:flex items-center justify-between w-full text-base font-bold text-rose-700">
                            <span>{event.title}</span>
                            <button
                              onClick={() => {
                                handleRemove(event.id);
                              }}
                              className="flex h-11 w-11 items-center justify-center border rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {event.description}
                          </p>
                          {event.photos.length > 0 && (
                            <AutoScrollCarousel images={event.photos} />
                          )}

                          <div className="flex justify-between mt-2 items-center w-full">
                            {/* Left Side Button */}
                            <div>
                              {isCompleted ? (
                                <button
                                  className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-rose-500 dark:bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-theme-xs hover:bg-rose-600 dark:border-gray-700 dark:text-white dark:hover:bg-rose-600 transition"
                                  onClick={() =>
                                    handleWishes(
                                      "Congratulations Both...",
                                      event.id
                                    )
                                  }
                                >
                                  Say Congrats
                                </button>
                              ) : (
                                <button
                                  className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-rose-500 dark:bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-theme-xs hover:bg-rose-600 dark:border-gray-700 dark:text-white dark:hover:bg-rose-600 transition"
                                  onClick={() =>
                                    handleWishes(
                                      "Wishing best for you...",
                                      event.id
                                    )
                                  }
                                >
                                  Wish
                                </button>
                              )}
                            </div>

                            {/* Right Side Button */}
                            <div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setModalTitle("Edit Event Details");
                                  setEventTime(event.time);
                                  setEventId(event.id);
                                  setEventName(event.title);
                                  setEventDescr(event.description);
                                  setEventStatus(event.status);
                                  setEventPhotos(event.photos);
                                  openModal();
                                }}
                              >
                                Edit
                              </Button>
                              {isLast && (
                                <Button
                                  className="ms-2"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setModalTitle("Add New Event Details");
                                    setEventId(0);
                                    setEventTime(event.time);
                                    setEventName("");
                                    setEventDescr("");
                                    setEventStatus(false);
                                    setEventPhotos("");
                                    openModal();
                                  }}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full px-1 justify-center space-y-2">
            <Notifier />
            <UserAddressCard />
          </div>
        </div>
      </div>
      <Modal
        title={modalTitle}
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] m-4"
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label htmlFor="tm">Time Picker Input</Label>
                  <div className="relative">
                    <Input
                      type="time"
                      id="tm"
                      name="tm"
                      value={_eventTime}
                      onChange={(e) => set_EventTime(e.target.value)}
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <TimeIcon className="size-6" />
                    </span>
                  </div>
                </div>
                <div>
                  <Label>Event Name</Label>
                  <Input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    value={eventDescr}
                    onChange={(e) => setEventDescr(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Share photos</Label>
                  <Input
                    type="text"
                    value={eventPhotos}
                    onChange={(e) => setEventPhotos(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Completed ?</Label>
                  <Switch
                    label={eventStatus ? "Yes" : "No"}
                    defaultChecked={eventStatus}
                    onChange={() => setEventStatus(!eventStatus)}
                    color="gray"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
