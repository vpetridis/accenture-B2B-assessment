// enums to use across scripts
const en = {
  NO_STOCK: "NO_STOCK",
  INCORRECT_DETAILS: "INCORRECT_DETAILS",
  processing: "processing",
  error: "error",
  success: "success",
};
Object.freeze(en);

const handleError = (e) => {
  const state = { title: "Error page", message: null };
  switch (e?.errorCode) {
    case en.NO_STOCK:
      state.message = "No stock has been found";
      return state;
    case en.INCORRECT_DETAILS:
      state.message = "Incorrect details have been entered";
      return state;
    case null:
    case undefined:
      return state;
  }
};

/* Note: this task can also be executed with a reducer function
but for loops work better with async operations. */
const getProcessingPage = async (args = [{ state: "", errorCode: nullI }]) => {
  let temp = { title: "", message: null };
  for (const s of args) {
    const { state } = s;
    if (state === en.processing) {
      temp = s;
      console.log("Processing...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    if (state === en.error) {
      const msg = handleError(s);
      temp = msg;
      console.log("Error: ", msg);
    }
    if (state === en.success) {
      console.log("SUCCESS", { title: "Order complete", message: null });
      temp = { title: "Order complete", message: null };
    }
  }
  return temp;
};

// I have added various states from the assignment for you to examine
const initialState = [
  { state: "processing" },
  { state: "error" },
  { state: "error", errorCode: "NO_STOCK" },
  { state: "processing" },
  { state: "error", errorCode: undefined },
  { state: "processing" },
  { state: "processing" },
  { state: "processing" },
  { state: "error", errorCode: "INCORRECT_DETAILS" },
  { state: "success" },
];

/* For demonstration purposes, I am logging the currentState
 but you can save it in a variable, globally or locally */
getProcessingPage(initialState).then((currentState) =>
  console.log("---- CURRENT STATE :", currentState)
);
