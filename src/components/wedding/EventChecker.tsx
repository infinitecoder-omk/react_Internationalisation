import { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "./app/modules/auth";
import { useMutation } from "react-query";
import { getUserByToken, login } from "./app/modules/auth/core/_requests";
import * as authHelper from "./app/modules/auth/core/AuthHelpers";
const timeSpan = import.meta.env.VITE_SESSION_TIMEOUT;

export const useTimeout = () => {
  const { currentUser, saveAuth, setCurrentUser, logout } = useAuth();
  const [timeLeft, setTimeLeft] = useState(timeSpan * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const loggedInUser = currentUser?.emp_Code || "";
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("is model opened?? :", modalOpen);
  }, [modalOpen]);

  const processRequest = useMutation(
    (payload: any) => login(payload.empid, payload.password, payload.server),
    {
      onSuccess: async (response: any) => {
        const { responseStatus, message } = response.data;
        setIsLoading(false);

        if (responseStatus === "E") {
          console.log("Got Error...");
          setIsLoading(false);
          Swal.fire({
            title: "Failed to Re-Login",
            icon: "error",
            text: message,
            input: "password",
            inputPlaceholder: "Enter your password",
            inputAttributes: { "aria-label": "Enter your password here" },
            showCancelButton: true,
            confirmButtonText: "Re-Login",
            cancelButtonText: "Logout",
            reverseButtons: true,
            allowOutsideClick: false,
            preConfirm: (password) => {
              if (!password) {
                Swal.showValidationMessage("Password is required.");
                return false;
              }
              return password;
            },
          }).then((result) => {
            if (result.isConfirmed) {
              const payload = {
                empid: loggedInUser,
                password: result.value,
                server: "mac",
              };
              processRequest.mutate(payload);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              logout();
            }
          });
        } else {
          if (response.data.status === "UnAuthorized") {
            console.log("Failure...");
            throw new Error(response.data.message);
          }
          console.log("Success...");
          setModalOpen(false);
          resetTimer();
          
          setIsLoading(true);
          saveAuth(response.data);
          const { data: user } = await getUserByToken(
            response.data.api_token,
            response.data.refreshToken
          );
          setCurrentUser(user);
          setIsLoading(false);
        }
      },
      onError: (error: Error) => {
        console.log("Exception...");
        const { message } = error;
        Swal.fire({
          title: "Error",
          icon: "error",
          text: message,
          input: "password",
          inputPlaceholder: "Enter your password",
          inputAttributes: { "aria-label": "Enter your password here" },
          showCancelButton: true,
          confirmButtonText: "Re-Login",
          cancelButtonText: "Logout",
          reverseButtons: true,
          allowOutsideClick: false,
          preConfirm: (password) => {
            if (!password) {
              Swal.showValidationMessage("Password is required.");
              return false;
            }
            return password;
          },
        }).then((result) => {
          if (result.isConfirmed) {
            const payload = {
              empid: loggedInUser,
              password: result.value,
              server: "mac",
            };
            processRequest.mutate(payload);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            logout();
          }
        });
      },
    }
  );

  const handleTimeout = useCallback(() => {
    setIsLoading(true);
    console.log("handleTimeout...");
    setModalOpen(true);
    // clearInterval(intervalRef.current);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Reset the ref after clearing
    }
    

    Swal.fire({
      title: "Session Timeout",
      icon: "warning",
      text: "Enter password to re-login",
      input: "password",
      inputPlaceholder: "Enter your password",
      inputAttributes: { "aria-label": "Enter your password here" },
      showCancelButton: true,
      confirmButtonText: "Re-Login",
      cancelButtonText: "Logout",
      reverseButtons: true,
      allowOutsideClick: false,
      preConfirm: (password) => {
        if (!password) {
          Swal.showValidationMessage("Password is required.");
          return false;
        }
        return password;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          empid: loggedInUser,
          password: result.value,
          server: "mac",
        };
        processRequest.mutate(payload);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        logout();
      }
    });
  }, [logout, processRequest]);

  // Function to reset and restart the timer
  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!modalOpen) {
      const newExpireTime = Date.now() + timeSpan * 60 * 1000;
      authHelper.getAuth() !== undefined && localStorage.setItem("expireTime", newExpireTime.toString());
      setTimeLeft(timeSpan * 60);
    }
    !modalOpen && startTimer();
  }, [modalOpen]);

  // Function to start the countdown timer
  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!modalOpen) {
      intervalRef.current = setInterval(() => {
        const expireTime = localStorage.getItem("expireTime");
        if (!expireTime) return;

        const remainingTime = Math.max(
          parseInt(expireTime, 10) - Date.now(),
          0
        );
        setTimeLeft(Math.floor(remainingTime / 1000));

        if (remainingTime <= 0 && currentUser !== undefined) {
          // clearInterval(intervalRef.current);
          handleTimeout();
        }
      }, 1000);
    }
  }, [resetTimer]);

  // Attach event listeners to reset the timer on user activity
  const attachEventListeners = useCallback(() => {
    if (!modalOpen) {
      const updateExpireTimeListener = resetTimer;
      const elements = document.querySelectorAll(
        "button, input, a, select, .menu, .btn, .menu-item"
      );

      elements.forEach((element) => {
        !modalOpen && element.removeEventListener("click", updateExpireTimeListener);
        element.addEventListener("click", updateExpireTimeListener);
      });
    }
  }, [resetTimer]);

  useEffect(() => {
    !modalOpen && resetTimer(); // Initialize timer
    !modalOpen && attachEventListeners();

    const observer = new MutationObserver(() => {
      !modalOpen && attachEventListeners(); // Reattach listeners when DOM changes
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      observer.disconnect();
    };
  }, [resetTimer, attachEventListeners]);

  return timeLeft;
};
