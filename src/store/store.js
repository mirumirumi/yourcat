import {createStore} from "vuex";

export const store = createStore({
  state() {
    return {
      filepath_array: [
        "/a-short-hike-main-visual.jpg",
        "/a-short-hike-screenshot.jpg",
        "/google-adosensu-auto-insert-function-by-milmemo.png",
        "/how-to-Monetize-by-the-blog.jpg",
        "/how-to-Monetize-by-the-blog.png",
        "/how-to-start-blog.png",
        "/it-takes-two-main-visual.jpg",
        "/it-takes-two-screenshot.jpg",
        "/karabiner-elements.jpg",
        "/karabiner-elements.png",
        "/mansion-renchin.jpg",
        "/milmemo-8vivid.png",
        "/milmemo-8vivid-suki.jpg",
        "/mobile-ad-block.png",
        "/my-cat-Lady.JPG",
        "/my-cats.JPG",
        "/oneshot-main-visual.png",
        "/oneshot-screenshot.jpg",
        "/power-automate-desktop-screenshot.jpg",
        "/programming-code-thumbnail.jpg",
        "/programming-code-thumbnail.png",
        "/RiME-main-visual.jpg",
        "/software-design-2021-5.JPG",
        "/undertale-mainpng.png",
        "/undertale-screenshot.jpg",
        "/video-game-package-and-download.jpg",
        "/whar-is-blogger-doing.png",
      ],
      isModalOpen: false,
      noFile: true,
      overLimit: false,
      showAlert: false,
      fileSelected: false,
      apiCatStatus: "",
      apiSameStatus: "",
      isAcceptedStatus: "",
      submitDisabled: true,
    };
  },
  getters: {
    sortOnceRandomOrder(state) {
      return shuffle(state.filepath_array);
    },
  },
  mutations: {
    toggleIsModalOpen(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    sortNewRandomOrder(state) {
      state.filepath_array = shuffle(state.filepath_array);
    },
    trueNoFile(state) {
      state.noFile = true;
    },
    falseNoFile(state) {
      state.noFile = false;
    },
    trueOverLimit(state) {
      state.overLimit = true;
    },
    falseOverLimit(state) {
      state.overLimit = false;
    },
    trueShowAlert(state) {
      state.showAlert = true;
    },
    falseShowAlert(state) {
      state.showAlert = false;
    },
    changeFileSelected(state, bool) {
      state.fileSelected = bool;
    },
    changeApiCatStatus(state, status) {
      state.apiCatStatus = status;
    },
    // changeApiSameStatus(state, status) {
    //   state.apiSameStatus = status;
    // },
    changeIsAccpetedStatus(state, status) {
      state.isAcceptedStatus = status;
    },
    changeSubmitDisabled(state, bool) {
      state.submitDisabled = bool;
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
