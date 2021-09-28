import {createStore} from "vuex";

export const store = createStore({
  state() {
    return {
      filepathArray: [],
      isModalOpen: false,
      isNotExistFile: true,
      isOverLimit: false,
      isShownAlert: false,
      isFileSelected: false,
      isGoTooltip: false,
      isAcceptedStatus: "",
      isSubmitting: false,
      isErrorSubmit: false,
      apiCatStatus: "",
      submitDisabled: true,
    };
  },
  getters: {
    sortOnceRandomOrder(state) {
      return shuffle(state.filepathArray);
    },
  },
  mutations: {
    sortNewRandomOrder(state) {
      state.filepathArray = shuffle(state.filepathArray);
    },
    changeIsModalOpen(state, bool) {
      state.isModalOpen = bool;
    },
    changeIsNotExistFile(state, bool) {
      state.isNotExistFile = bool;
    },
    changeIsOverLimit(state, bool) {
      state.isOverLimit = bool;
    },
    changeIsShownAlert(state, bool) {
      state.isShownAlert = bool;
    },
    changeIsFileSelected(state, bool) {
      state.isFileSelected = bool;
    },
    changeApiCatStatus(state, status) {
      state.apiCatStatus = status;
    },
    changeIsAccpetedStatus(state, status) {
      state.isAcceptedStatus = status;
    },
    changeSubmitDisabled(state, bool) {
      state.submitDisabled = bool;
    },
    changeIsGoTooltip(state, bool) {
      state.isGoTooltip = bool;
    },
    changeIsSubmitting(state, bool) {
      state.isSubmitting = bool;
    },
    changeIsErrorSubmit(state, bool) {
      state.isErrorSubmit = bool;
    },
  },
  actions: {},
});

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
