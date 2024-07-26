// import { toast } from "react-toastify";

// export const MyToast = (msg, backgroundColor) => {
//   return toast(msg, {
//     position: "bottom-right",
//     autoClose: 20000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//     // type: type,
//     transition : 'Slide',
//     style:{backgroundColor, color: 'white'}

//   });
// };

// export { toast };

import { toast, cssTransition } from "react-toastify";

const Slide = cssTransition({
  enter: "slideIn",
  exit: "slideOut",
  duration: [300, 250],
});

export const MyToast = (msg, type, backgroundColor) => {
  return toast(msg, {
    position: "bottom-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
    type: type,
    // style: { backgroundColor, color: "white" },
    autoClose: 2000,
    style: {
      backgroundColor:
        type === "error" ? "rgba(217,92,92,.95)" : "rgba(91,189,114,.95)",
      color: "white",
    },
  });
};

export { toast };
