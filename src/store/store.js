import {createStore} from "vuex";
import { shuffle } from "@/utils/util.js";

export const store = createStore({
  state() {
    return {
      imgDataArrayState: [],
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
      isLoadingPhotos: true,
      isCompletedSubmit: false,
    };
  },
  mutations: {
    sortNewRandomOrder(state) {
      state.imgDataArrayState = shuffle(state.imgDataArrayState);
    },
    sortNewRandomOrder_1(state, addedImage) {
      state.imgDataArrayState = [addedImage].concat(state.imgDataArrayState);
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
    changeIsLoadingPhotos(state, bool) {
      state.isLoadingPhotos = bool;
    },
    changeIsCompletedSubmit(state, bool) {
      state.isCompletedSubmit = bool;
    },
  },
  actions: {},
});


