import {createStore} from "vuex";
import { shuffle } from "@/utils/util.js";

export const store = createStore({
  state() {
    return {
      imgDataArrayState: [],
      blocks: [],
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
  getters: {
    getBlocks(state) {
      return randomBlocks(state.blocks);
    }
  },
  mutations: {
    sortNewRandomOrder(state) {
      state.blocks = randomBlocks(state.blocks);
      state.imgDataArrayState = shuffle(state.imgDataArrayState);
    },
    sortNewRandomOrder_1(state, addedImage) {
      state.blocks = randomBlocks(state.blocks);
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

function randomBlocks() {
  function getRandomRange(min, max) {
    return Math.floor(Math.random() * (min - max + 1) + max);
  }
  let result = [];
  [...Array(30)].map(() => {
    const minHeight = 111;
    const maxHeight = 333;
    const height =  getRandomRange(minHeight, maxHeight);
    const minWidth = 222;
    const maxWidth = 555;
    const width =  getRandomRange(minWidth, maxWidth);
    result.push({
      size: {
        width: width,
        height: height,
      }
    })
  });
  return result;
}


