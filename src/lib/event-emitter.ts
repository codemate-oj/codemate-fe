import mitt from "mitt";

type Events = {
  showScratch: void;
  refreshHomepage: void;
};

const emitter = mitt<Events>();

export default emitter;
